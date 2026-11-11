// 文件路径: src/lib/env.test.ts v4.4.9
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
// 静态导入：env.ts 的导出均为纯读 process.env 的函数，动态 import 在 fork 池下会超时
import { validateEnv, getEnv, getEnvSnapshot, REQUIRED_ENV_KEYS } from './env';

describe('env', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('validateEnv', () => {
    it('should report missing required variables', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const result = validateEnv();

      expect(result.ok).toBe(false);
      expect(result.missing.length).toBeGreaterThan(0);
      expect(result.message).toContain('Missing required environment variables');
    });

    it('should succeed when all required variables are present', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiJ9...';

      const result = validateEnv();

      expect(result.ok).toBe(true);
      expect(result.missing).toEqual([]);
    });
  });

  describe('getEnv', () => {
    it('should return env value when set', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://my-project.supabase.co';
      expect(getEnv('NEXT_PUBLIC_SUPABASE_URL')).toBe('https://my-project.supabase.co');
    });

    it('should return fallback when env is missing', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      expect(getEnv('NEXT_PUBLIC_SUPABASE_URL', 'fallback')).toBe('fallback');
    });
  });

  describe('getEnvSnapshot', () => {
    it('should return a snapshot containing required keys', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiJ9...';

      const snapshot = getEnvSnapshot();
      for (const key of REQUIRED_ENV_KEYS) {
        expect(key in snapshot).toBe(true);
      }
    });
  });
});
