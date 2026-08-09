import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// 链式 query builder mock：中间方法返回自身（可继续链式），builder 本身是 thenable，
// await 时解析为 resolved；single 直接返回 Promise。__setResolved 用于测试覆盖解析值。
function makeBuilder(initial: { data: unknown; error: unknown }) {
  let resolved = initial;
  const builder: Record<string, unknown> = {
    select: vi.fn(() => builder),
    insert: vi.fn(() => builder),
    update: vi.fn(() => builder),
    delete: vi.fn(() => builder),
    eq: vi.fn(() => builder),
    order: vi.fn(() => builder),
    single: vi.fn(() => Promise.resolve(resolved)),
    __setResolved: (v: { data: unknown; error: unknown }) => {
      resolved = v;
    },
  };
  builder.then = (onFulfilled: (v: { data: unknown; error: unknown }) => unknown) =>
    Promise.resolve(resolved).then(onFulfilled);
  return builder as Record<string, unknown> & {
    then: (onFulfilled: (v: { data: unknown; error: unknown }) => unknown) => Promise<unknown>;
    __setResolved: (v: { data: unknown; error: unknown }) => void;
  };
}

const insertMock = makeBuilder({ data: { id: 'row-1' }, error: null });
const loadMock = makeBuilder({ data: [], error: null });
const deleteMock = makeBuilder({ data: null, error: null });

const fromMock = vi.fn((table: string) => {
  if (table === 'configurations') {
    return {
      insert: insertMock.insert,
      update: insertMock.update,
      delete: deleteMock.delete,
      select: loadMock.select,
      eq: loadMock.eq,
      order: loadMock.order,
      single: insertMock.single,
    };
  }
  return makeBuilder({ data: null, error: null });
});

const getSupabaseClientMock = vi.fn(() => ({ from: fromMock }));
const isSupabaseConfiguredMock = vi.fn(() => true);

vi.mock('@/lib/supabase', () => ({
  getSupabaseClient: () => getSupabaseClientMock(),
  isSupabaseConfigured: () => isSupabaseConfiguredMock(),
}));

import {
  saveConfigurationToSupabase,
  loadConfigurationsFromSupabase,
  deleteConfigurationFromSupabase,
} from './supabase-service';
import type { Configuration } from '@/types';

const baseConfig: Configuration = {
  id: 'config-1',
  userId: 'user-1',
  bikeType: 'Road',
  name: 'Road Build',
  components: [],
  totalCost: 0,
  estimatedWeight: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('supabase-service', () => {
    beforeEach(() => {
      vi.clearAllMocks();
      insertMock.__setResolved({ data: { id: 'row-1' }, error: null });
      loadMock.__setResolved({ data: [], error: null });
      deleteMock.__setResolved({ data: null, error: null });
    });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('saveConfigurationToSupabase', () => {
    it('inserts when config id is missing', async () => {
      const id = await saveConfigurationToSupabase({ ...baseConfig, id: undefined as never }, 'user-1');
      expect(insertMock.insert).toHaveBeenCalled();
      expect(id).toBe('row-1');
    });

    it('updates when config id exists', async () => {
      const id = await saveConfigurationToSupabase(baseConfig, 'user-1');
      expect(insertMock.update).toHaveBeenCalled();
      expect(id).toBe('config-1');
    });

    it('returns local id when supabase client unavailable', async () => {
      getSupabaseClientMock.mockReturnValueOnce(null as never);
      const id = await saveConfigurationToSupabase(baseConfig, 'user-1');
      expect(id).toBe('config-1');
    });
  });

  describe('loadConfigurationsFromSupabase', () => {
    it('returns mapped configurations', async () => {
      loadMock.__setResolved({
        data: [
          {
            id: 'row-1',
            user_id: 'user-1',
            bike_type: 'Road',
            name: 'Road Build',
            components: [],
            total_cost: 0,
            estimated_weight: 0,
            created_at: '2026-01-01',
            updated_at: '2026-01-02',
          },
        ],
        error: null,
      });
      const result = await loadConfigurationsFromSupabase('user-1');
      expect(result.length).toBe(1);
      expect(result[0].bikeType).toBe('Road');
    });

    it('returns empty array on error', async () => {
      loadMock.__setResolved({ data: null, error: new Error('boom') });
      const result = await loadConfigurationsFromSupabase('user-1');
      expect(result).toEqual([]);
    });
  });

  describe('deleteConfigurationFromSupabase', () => {
    it('deletes scoped to owner', async () => {
      await deleteConfigurationFromSupabase('config-1', 'user-1');
      expect(deleteMock.delete).toHaveBeenCalled();
      expect(deleteMock.eq).toHaveBeenCalledWith('user_id', 'user-1');
    });
  });
});
