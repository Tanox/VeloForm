import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase client - 模拟 Supabase 客户端
vi.mock('./supabase', () => ({
  getSupabaseClient: () => null, // Simulate unconfigured Supabase
  isSupabaseConfigured: () => false,
}));

describe('auth', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe('when Supabase is not configured', () => {
    it('should handle missing auth gracefully', async () => {
      const { getCurrentUser } = await import('./auth');
      const user = await getCurrentUser();
      expect(user).toBeNull();
    });

    it('should return no-op for subscription when unconfigured', async () => {
      const { subscribeToAuthChanges } = await import('./auth');
      const unsubscribe = subscribeToAuthChanges(() => {});
      expect(typeof unsubscribe).toBe('function');
      unsubscribe(); // Should not throw
    });
  });
});
