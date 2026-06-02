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
    it('should throw error when required variables are missing', async () => {
      // Remove required env vars
      delete process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
      delete process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
      delete process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

      const { validateEnv } = await import('./env');
      
      expect(() => validateEnv()).toThrow('Missing required environment variables');
    });

    it('should not throw when all required variables are present', async () => {
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project';
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY = 'test-key';
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 'test.firebaseappomain';

      const { validateEnv } = await import('./env');
      
      expect(() => validateEnv()).not.toThrow();
    });
  });
});
