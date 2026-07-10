'use client';

import { useEffect, useRef, useState } from 'react';
import { useCompareStore, useUserStore } from '@/lib/stores';
import { useConfigStore } from '@/lib/stores/config-store';
import { useConfigUIStore } from '@/lib/stores/config-ui-store';
import { subscribeToAuthChanges, SupabaseUser } from '@/lib/auth';
import { loadConfigurationsFromSupabase } from '@/lib/supabase-service';
import { supabaseLogger } from '@/lib/logger';

/**
 * SyncProvider 负责：
 * 1. 订阅认证状态变化（subscribeToAuthChanges）
 * 2. 在用户已认证时，从 Supabase 拉取其云端配置并写入本地 store
 * 3. 组件卸载时自动取消订阅，避免内存泄漏
 */
export function SyncProvider({ children }: { children: React.ReactNode }) {
  const setMyConfigs = useCompareStore((s) => s.setMyConfigs);
  const setUserId = useUserStore((s) => s.setUserId);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const hasSubscribedRef = useRef(false);
  const [hydrated, setHydrated] = useState(false);

  // 等待客户端完成 hydration 后再建立任何订阅
  // 同时手动 rehydrate 所有 persist store，避免 SSR/CSR 不一致
  useEffect(() => {
    if (typeof window === 'undefined') return;
    useConfigStore.persist.rehydrate();
    useUserStore.persist.rehydrate();
    useCompareStore.persist.rehydrate();
    useConfigUIStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (hasSubscribedRef.current) return;
    hasSubscribedRef.current = true;

    let disposed = false;

    const handleAuthChange = async (user: SupabaseUser | null) => {
      if (disposed) return;
      if (user) {
        setUserId(user.uid);
        try {
          const configs = await loadConfigurationsFromSupabase(user.uid);
          if (!disposed) {
            setMyConfigs(configs);
          }
        } catch (error) {
          if (!disposed) {
            supabaseLogger.error('Failed to load configurations:', error);
          }
        }
      } else {
        setUserId(null);
        setMyConfigs([]);
      }
    };

    const unsubscribe = subscribeToAuthChanges(handleAuthChange);
    unsubscribeRef.current = unsubscribe;

    return () => {
      disposed = true;
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, [hydrated, setUserId, setMyConfigs]);

  return <>{children}</>;
}
