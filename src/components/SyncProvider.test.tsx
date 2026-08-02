import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { SyncProvider } from './SyncProvider';

const mockUnsubscribe = vi.fn();
const subscribeMock = vi.fn(() => mockUnsubscribe);

vi.mock('@/lib/auth', () => ({
  subscribeToAuthChanges: (cb: (u: unknown) => void) => {
    subscribeMock(cb);
    return mockUnsubscribe;
  },
}));
vi.mock('@/lib/supabase-service', () => ({
  loadConfigurationsFromSupabase: vi.fn(async () => []),
}));

import { useUserStore } from '@/lib/stores/user-store';
import { useCompareStore } from '@/lib/stores/compare-store';

describe('SyncProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useUserStore.setState({ userId: null });
    useCompareStore.setState({ myConfigs: [], comparingConfigIds: [] });
  });

  it('renders children', () => {
    render(
      <SyncProvider>
        <span>child content</span>
      </SyncProvider>
    );
    expect(screen.getByText('child content')).toBeTruthy();
  });

  it('updates userId and loads configs on auth change', async () => {
    render(
      <SyncProvider>
        <span>child</span>
      </SyncProvider>
    );
    // 等待 hydration effect 完成
    await act(async () => {
      await Promise.resolve();
    });
    const cb = subscribeMock.mock.calls[0][0];
    await act(async () => {
      await cb({ uid: 'user-1' });
    });
    expect(useUserStore.getState().userId).toBe('user-1');
  });

  it('clears user state when signed out', async () => {
    useUserStore.setState({ userId: 'user-1' });
    render(
      <SyncProvider>
        <span>child</span>
      </SyncProvider>
    );
    await act(async () => {
      await Promise.resolve();
    });
    const cb = subscribeMock.mock.calls[0][0];
    await act(async () => {
      await cb(null);
    });
    expect(useUserStore.getState().userId).toBeNull();
  });
});
