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
      delete process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      delete process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
      delete process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

      const { validateEnv } = await import('./env');
      const result = validateEnv();

      expect(result.ok).toBe(false);
      expect(result.missing.length).toBeGreaterThan(0);
      expect(result.message).toContain('Missing required environment variables');
    });

    it('should succeed when all required variables are present', async () => {
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-key';
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test.firebaseapp.com';

      const { validateEnv } = await import('./env');
      const result = validateEnv();

      expect(result.ok).toBe(true);
      expect(result.missing).toEqual([]);
    });
  });

  describe('getEnv', () => {
    it('should return env value when set', async () => {
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'my-project';
      const { getEnv } = await import('./env');
      expect(getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID')).toBe('my-project');
    });

    it('should return fallback when env is missing', async () => {
      delete process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      const { getEnv } = await import('./env');
      expect(getEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', 'fallback')).toBe(
        'fallback'
      );
    });
  });

  describe('getEnvSnapshot', () => {
    it('should return a snapshot containing required keys', async () => {
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'p';
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'k';
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'd';

      const { getEnvSnapshot, REQUIRED_ENV_KEYS } = await import('./env');
      const snapshot = getEnvSnapshot();
      for (const key of REQUIRED_ENV_KEYS) {
        expect(key in snapshot).toBe(true);
      }
    });
  });
});
