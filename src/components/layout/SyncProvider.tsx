// 文件路径: src/components/layout/SyncProvider.tsx v4.4.9
'use client';

import { useEffect, useRef, useState } from 'react';
import { useCompareStore, useUserStore } from '@/lib/stores';
import { useConfigStore } from '@/lib/stores/config-store';
import { useConfigUIStore } from '@/lib/stores/config-ui-store';
import { subscribeToAuthChanges, SupabaseUser } from '@/lib/auth';
import { loadConfigurationsFromSupabase } from '@/lib/supabase-service';
import { mergeConfigurations } from '@/lib/config-sync';
import { supabaseLogger } from '@/lib/logger';

/**
 * SyncProvider 负责：
 * 1. 订阅认证状态变化（subscribeToAuthChanges）
 * 2. 登录后拉取云端配置并与本地草稿合并，加载失败保持本地数据
 * 3. 登出仅清除用户标识，本地配置属于设备，不清空
 * 4. 组件卸载时自动取消订阅，避免内存泄漏
 */
export function SyncProvider({ children }: { children: React.ReactNode }) {
  const setMyConfigs = useCompareStore((s) => s.setMyConfigs);
  const setUserId = useUserStore((s) => s.setUserId);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const hasSubscribedRef = useRef(false);
  const [hydrated, setHydrated] = useState(false);

  // 等待客户端完成 hydration 后再建立任何订阅，并手动 rehydrate 所有 persist store
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
      if (!user) {
        setUserId(null);
        return;
      }
      setUserId(user.uid);
      try {
        const remote = await loadConfigurationsFromSupabase(user.uid);
        if (disposed) return;
        // 合并而非全量替换：本地草稿与云端配置都保留
        const local = useCompareStore.getState().myConfigs;
        setMyConfigs(mergeConfigurations(local, remote));
      } catch (error) {
        if (!disposed) {
          // 加载失败时保持本地数据，绝不把空数组当作「云端无配置」
          supabaseLogger.error('Failed to load configurations; keeping local data:', error);
        }
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
