import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('env', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('validateEnv', () => {
    it('should report missing required variables', async () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const { validateEnv } = await import('./env');
      const result = validateEnv();

      expect(result.ok).toBe(false);
      expect(result.missing.length).toBeGreaterThan(0);
      expect(result.message).toContain('Missing required environment variables');
    });

    it('should succeed when all required variables are present', async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiJ9...';

      const { validateEnv } = await import('./env');
      const result = validateEnv();

      expect(result.ok).toBe(true);
      expect(result.missing).toEqual([]);
    });
  });

  describe('getEnv', () => {
    it('should return env value when set', async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://my-project.supabase.co';
      const { getEnv } = await import('./env');
      expect(getEnv('NEXT_PUBLIC_SUPABASE_URL')).toBe('https://my-project.supabase.co');
    });

    it('should return fallback when env is missing', async () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      const { getEnv } = await import('./env');
      expect(getEnv('NEXT_PUBLIC_SUPABASE_URL', 'fallback')).toBe('fallback');
    });
  });

  describe('getEnvSnapshot', () => {
    it('should return a snapshot containing required keys', async () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiJ9...';

      const { getEnvSnapshot, REQUIRED_ENV_KEYS } = await import('./env');
      const snapshot = getEnvSnapshot();
      for (const key of REQUIRED_ENV_KEYS) {
        expect(key in snapshot).toBe(true);
      }
    });
  });
});
