/**
 * Environment variable validation (Supabase migration)
 * 从 Firebase 迁移至 Supabase，使用 NEXT_PUBLIC_SUPABASE_URL 和
 * NEXT_PUBLIC_SUPABASE_ANON_KEY 替代 Firebase 相关变量。
 */

import { logger } from './logger';

export const REQUIRED_ENV_KEYS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const;

export type RequiredEnvKey = (typeof REQUIRED_ENV_KEYS)[number];

export type Env = Record<RequiredEnvKey, string> & {
  [key: string]: string | undefined;
};

export interface EnvValidationResult {
  ok: boolean;
  missing: RequiredEnvKey[];
  message?: string;
}

export function validateEnv(): EnvValidationResult {
  const missing = REQUIRED_ENV_KEYS.filter((key) => {
    const v = process.env[key];
    return !v || v.trim().length === 0;
  });

  if (missing.length > 0) {
    return {
      ok: false,
      missing,
      message:
        `Missing required environment variables: ${missing.join(', ')}\n` +
        `Please copy .env.example to .env and fill in the required values.`,
    };
  }
  return { ok: true, missing: [] };
}

/**
 * 读取指定 env 变量，缺失时返回 fallback。类型安全。
 */
export function getEnv<K extends RequiredEnvKey>(key: K, fallback?: string): string {
  const v = process.env[key];
  if (!v || v.trim().length === 0) {
    if (fallback !== undefined) return fallback;
    return '';
  }
  return v;
}

/**
 * 返回全部 env 的只读快照。
 */
export function getEnvSnapshot(): Env {
  const snapshot: Env = {} as Env;
  for (const key of REQUIRED_ENV_KEYS) {
    snapshot[key] = process.env[key] ?? '';
  }
  return snapshot;
}

// 仅在开发模式下自动校验，避免生产环境因缺失变量崩溃。
if (process.env.NODE_ENV === 'development') {
  const result = validateEnv();
  if (!result.ok) {
    logger.warn('Environment validation warning:', result.message);
  }
}
