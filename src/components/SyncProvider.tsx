'use client';

import { useEffect, useRef, useState } from 'react';
import { useConfigStore } from '@/lib/store';
import { subscribeToAuthChanges } from '@/lib/auth';
import { loadConfigurationsFromFirebase } from '@/lib/firebase-service';

/**
 * SyncProvider 负责：
 * 1. 订阅认证状态变化（subscribeToAuthChanges）
 * 2. 在用户已认证时，从 Firebase 拉取其云端配置并写入本地 store
 * 3. 组件卸载时自动取消订阅，避免内存泄漏
 *
 * 延迟加载策略：仅在浏览器端（typeof window !== 'undefined'）建立订阅，
 * 避免 SSR 阶段触发副作用。
 */
export function SyncProvider({ children }: { children: React.ReactNode }) {
  const { setMyConfigs, setUserId } = useConfigStore();
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const hasSubscribedRef = useRef(false);
  const [hydrated, setHydrated] = useState(false);

  // 等待客户端完成 hydration 后再建立任何订阅
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    // 保证仅建立一次订阅（StrictMode 下多次调用也会被去重）
    if (hasSubscribedRef.current) return;
    hasSubscribedRef.current = true;

    // 取消 Firebase 模块的 SSR 依赖
    // 懒加载订阅函数，避免 SSR 打包时把 Firebase SDK 打入初始 bundle
    let disposed = false;

    const doSubscribe = () => {
      const unsub = subscribeToAuthChanges(async (user) => {
        if (disposed) return;
        if (user) {
          setUserId(user.uid);
          try {
            const configs = await loadConfigurationsFromFirebase(user.uid);
            if (!disposed) {
              setMyConfigs(configs);
            }
          } catch (error) {
            if (!disposed) {
              console.error('Failed to load configurations:', error);
            }
          }
        } else {
          setUserId(null);
          setMyConfigs([]);
        }
      });
      unsubscribeRef.current = unsub;
    };

    // 使用 requestIdleCallback / setTimeout 延后订阅，
    // 避免影响首屏关键渲染路径
    const schedule = (cb: () => void) => {
      const w = typeof window !== 'undefined' ? window : null;
      if (w && typeof (w as { requestIdleCallback?: unknown }).requestIdleCallback === 'function') {
        const id = (w as { requestIdleCallback: (c: () => void) => number }).requestIdleCallback(cb);
        return () => (w as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
      }
      const id = setTimeout(cb, 0);
      return () => clearTimeout(id);
    };

    const cancelScheduled = schedule(doSubscribe);
    return () => {
      disposed = true;
      cancelScheduled();
      unsubscribeRef.current?.();
      unsubscribeRef.current = null;
    };
  }, [hydrated, setUserId, setMyConfigs]);

  return <>{children}</>;
}
