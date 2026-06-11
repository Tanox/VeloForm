/**
 * user-store.test.ts - 用户状态管理测试
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { useUserStore } from './user-store';

describe('UserStore', () => {
  beforeEach(() => {
    useUserStore.setState({ userId: null });
  });

  describe('setUserId', () => {
    it('应该设置用户 ID', () => {
      const { setUserId } = useUserStore.getState();

      setUserId('user-123');

      expect(useUserStore.getState().userId).toBe('user-123');
    });

    it('应该支持设置为 null', () => {
      useUserStore.setState({ userId: 'user-123' });

      useUserStore.getState().setUserId(null);

      expect(useUserStore.getState().userId).toBeNull();
    });
  });

  describe('clearUser', () => {
    it('应该清除用户信息', () => {
      useUserStore.setState({ userId: 'user-456' });

      useUserStore.getState().clearUser();

      expect(useUserStore.getState().userId).toBeNull();
    });
  });
});
