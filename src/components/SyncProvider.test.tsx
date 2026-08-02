import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { SyncProvider } from './SyncProvider';

const mockUnsubscribe = vi.fn();

vi.mock('@/lib/auth', () => {
  const authModule = {
    subscribeToAuthChanges: (cb: (u: unknown) => void) => {
      (authModule as Record<string, unknown>).__cb = cb;
      return mockUnsubscribe;
    },
  };
  return authModule;
});
vi.mock('@/lib/supabase-service', () => ({
  loadConfigurationsFromSupabase: vi.fn(async () => []),
}));

import { useUserStore } from '@/lib/stores/user-store';
import { useCompareStore } from '@/lib/stores/compare-store';
import * as authModule from '@/lib/auth';

function getAuthCallback(): (u: unknown) => void {
  return (authModule as unknown as Record<string, (u: unknown) => void>).__cb;
}

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
    await act(async () => {
      await Promise.resolve();
    });
    await act(async () => {
      getAuthCallback()({ uid: 'user-1' });
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
    await act(async () => {
      getAuthCallback()(null);
    });
    expect(useUserStore.getState().userId).toBeNull();
  });
});
