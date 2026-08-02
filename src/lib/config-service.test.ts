import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock 外部依赖以避免真实网络/UI 副作用
vi.mock('@/lib/toast', () => ({
  toast: vi.fn(),
}));
vi.mock('@/lib/supabase-service', () => ({
  saveConfigurationToSupabase: vi.fn(async () => 'cloud-id-123'),
  deleteConfigurationFromSupabase: vi.fn(async () => undefined),
}));
vi.mock('@/lib/supabase', () => ({
  isSupabaseConfigured: () => false,
}));

import { saveConfiguration, deleteConfiguration, exportConfiguration, generateShareableLink } from './config-service';
import { useConfigStore } from '@/lib/stores/config-store';
import { useCompareStore } from '@/lib/stores/compare-store';

describe('config-service', () => {
  beforeEach(() => {
    useConfigStore.setState({
      activeType: 'Road',
      components: [],
      configId: null,
      manualConfigName: null,
    });
    useCompareStore.setState({ comparingConfigIds: [], myConfigs: [] });
  });

  describe('saveConfiguration', () => {
    it('builds a configuration and appends to myConfigs', async () => {
      await saveConfiguration();
      const myConfigs = useCompareStore.getState().myConfigs;
      expect(myConfigs.length).toBe(1);
      expect(myConfigs[0].bikeType).toBe('Road');
      expect(useConfigStore.getState().configId).toBe(myConfigs[0].id);
    });

    it('updates existing config instead of duplicating', async () => {
      await saveConfiguration();
      const id = useCompareStore.getState().myConfigs[0].id;
      useConfigStore.setState({ configId: id });
      await saveConfiguration();
      expect(useCompareStore.getState().myConfigs.length).toBe(1);
    });
  });

  describe('deleteConfiguration', () => {
    it('removes config from myConfigs by id', async () => {
      await saveConfiguration();
      const id = useCompareStore.getState().myConfigs[0].id;
      await deleteConfiguration(id);
      expect(useCompareStore.getState().myConfigs.length).toBe(0);
    });
  });

  describe('exportConfiguration', () => {
    it('returns valid JSON with components and totals', () => {
      const json = exportConfiguration();
      const parsed = JSON.parse(json);
      expect(parsed.bikeType).toBe('Road');
      expect(Array.isArray(parsed.components)).toBe(true);
      expect(typeof parsed.totalCost).toBe('number');
      expect(typeof parsed.estimatedWeight).toBe('number');
    });
  });

  describe('generateShareableLink', () => {
    it('produces a URL with encoded config param', () => {
      const link = generateShareableLink();
      expect(link).toContain('/?config=');
    });

    it('handles unicode component names without throwing', () => {
      useConfigStore.setState({
        activeType: 'Road',
        components: [
          {
            id: 'c1',
            name: '中文组件名称',
            category: 'Frame',
            bikeType: 'Road',
            price: 100,
            weight: 200,
          } as never,
        ],
        configId: null,
        manualConfigName: '我的配置',
      });
      expect(() => generateShareableLink()).not.toThrow();
    });
  });
});
