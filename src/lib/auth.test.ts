import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Firebase app
vi.mock('./firebase', () => ({
  app: null, // Simulate unconfigured Firebase
}));

describe('auth', () => {
  describe('when Firebase is not configured', () => {
    it('should handle missing auth gracefully', async () => {
      const { getCurrentUser } = await import('./auth');
      const user = getCurrentUser();
      expect(user).toBeNull();
    });
  });
});
