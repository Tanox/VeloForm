// 文件路径: src/lib/env.ts v4.4.9
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

/** .env.example 的占位值：未替换时同样视为缺失，避免误判为「已配置」 */
export function isEnvPlaceholder(value: string | undefined): boolean {
  if (!value) return true;
  const normalized = value.trim();
  return normalized.length === 0 || /^YOUR_[A-Z0-9_]+$/.test(normalized);
}

export function validateEnv(): EnvValidationResult {
  const missing = REQUIRED_ENV_KEYS.filter((key) => isEnvPlaceholder(process.env[key]));

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

// 所有环境均校验并告警：生产环境缺少云端变量会静默降级，必须可见。
// 仅告警不抛错，避免缺少可选云端配置时直接阻断部署。
const result = validateEnv();
if (!result.ok) {
  logger.warn('Environment validation warning:', result.message);
}
