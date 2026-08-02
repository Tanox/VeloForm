import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

const insertMock = vi.fn();
const updateMock = vi.fn();
const deleteMock = vi.fn();
const selectMock = vi.fn(() => ({ single: vi.fn().mockResolvedValue({ data: { id: 'row-1' }, error: null }) }));
const eqMock = vi.fn(() => ({ single: vi.fn().mockResolvedValue({ data: { id: 'row-1' }, error: null }) }));
const orderMock = vi.fn(() => ({ data: [], error: null } as unknown as { data: unknown[]; error: unknown }));
const fromMock = vi.fn(() => ({
  insert: insertMock,
  update: updateMock,
  delete: deleteMock,
  select: selectMock,
  eq: eqMock,
  order: orderMock,
}));

vi.mock('@/lib/supabase', () => ({
  getSupabaseClient: () => ({ from: fromMock }),
  isSupabaseConfigured: () => true,
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
      insertMock.mockResolvedValue({ data: { id: 'row-1' }, error: null } as unknown as { data: { id: string }; error: unknown });
      updateMock.mockResolvedValue({ error: null } as unknown as { error: unknown });
      deleteMock.mockResolvedValue({ error: null } as unknown as { error: unknown });
    });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('saveConfigurationToSupabase', () => {
    it('inserts when config id is missing', async () => {
      const id = await saveConfigurationToSupabase({ ...baseConfig, id: undefined as never }, 'user-1');
      expect(insertMock).toHaveBeenCalled();
      expect(id).toBe('row-1');
    });

    it('updates when config id exists', async () => {
      const id = await saveConfigurationToSupabase(baseConfig, 'user-1');
      expect(updateMock).toHaveBeenCalled();
      expect(id).toBe('config-1');
    });

    it('returns local id when supabase client unavailable', async () => {
      const { getSupabaseClient } = await import('@/lib/supabase');
      vi.mocked(getSupabaseClient).mockReturnValueOnce(null as never);
      const id = await saveConfigurationToSupabase(baseConfig, 'user-1');
      expect(id).toBe('config-1');
    });
  });

  describe('loadConfigurationsFromSupabase', () => {
    it('returns mapped configurations', async () => {
      orderMock.mockResolvedValueOnce({
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
      } as unknown as { data: unknown[]; error: unknown });
      const result = await loadConfigurationsFromSupabase('user-1');
      expect(result.length).toBe(1);
      expect(result[0].bikeType).toBe('Road');
    });

    it('returns empty array on error', async () => {
      orderMock.mockResolvedValueOnce({ data: null, error: new Error('boom') } as unknown as { data: unknown[]; error: unknown });
      const result = await loadConfigurationsFromSupabase('user-1');
      expect(result).toEqual([]);
    });
  });

  describe('deleteConfigurationFromSupabase', () => {
    it('deletes scoped to owner', async () => {
      await deleteConfigurationFromSupabase('config-1', 'user-1');
      expect(deleteMock).toHaveBeenCalled();
      expect(eqMock).toHaveBeenCalledWith('user_id', 'user-1');
    });
  });
});
