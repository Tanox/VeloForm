'use client';

/**
 * Supabase 客户端初始化
 * 使用原生 @supabase/supabase-js，不依赖 auth-helpers-nextjs
 * 确保 SSR 和浏览器环境都能正常工作
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseLogger } from './logger';

const SUPABASE_PLACEHOLDERS = new Set(['YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY']);

/**
 * 检查 Supabase 环境变量是否已配置
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return false;
  if (SUPABASE_PLACEHOLDERS.has(url) || SUPABASE_PLACEHOLDERS.has(anonKey)) return false;
  // 安全检查：URL 必须使用 HTTPS
  return url.startsWith('https://');
}

let clientSingleton: SupabaseClient | null = null;

/**
 * 获取 Supabase 客户端
 * 浏览器环境：单例模式
 * SSR 环境：每次创建新实例
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) {
    return null;
  }

  // SSR 环境（typeof window === 'undefined'）
  if (typeof window === 'undefined') {
    try {
      return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
    } catch (error) {
      supabaseLogger.error('Supabase SSR initialization error:', error);
      return null;
    }
  }

  // 浏览器环境：使用单例
  if (clientSingleton) {
    return clientSingleton;
  }

  try {
    clientSingleton = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
        global: {
          // 设置 30s 超时，防止请求长时间挂起
          fetch: (url, options) => {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 30_000);
            return fetch(url, { ...options, signal: controller.signal }).finally(() =>
              clearTimeout(timeout)
            );
          },
        },
      }
    );
  } catch (error) {
    supabaseLogger.error('Supabase initialization error:', error);
    clientSingleton = null;
  }

  return clientSingleton;
}

/**
 * 重置客户端（测试用）
 */
export function resetSupabaseClient(): void {
  clientSingleton = null;
}
