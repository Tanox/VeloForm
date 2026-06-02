import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import { isFirebaseConfigured } from './firebase-service';

describe('firebase-service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('isFirebaseConfigured', () => {
    it('should return true when Firebase project ID is configured', () => {
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'test-project-id';
      expect(isFirebaseConfigured()).toBe(true);
    });

    it('should return false when Firebase project ID is not set', () => {
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = undefined;
      expect(isFirebaseConfigured()).toBe(false);
    });

    it('should return false when Firebase project ID is placeholder value', () => {
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID = 'YOUR_PROJECT_ID';
      expect(isFirebaseConfigured()).toBe(false);
    });
  });
});
