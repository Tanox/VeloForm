/**
 * config-store.load-configuration.test.ts - 配置加载相关测试
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { useConfigStore } from './config-store';
import type { ConfigComponent, BikeType } from '@/types';

describe('ConfigStore', () => {
  beforeAll(() => {
    const state = useConfigStore.getState();
    if (!state.components || state.components.length === 0) {
      state.setActiveType('Road');
    }
  });

  describe('loadConfiguration', () => {
    it('应该加载完整的配置', () => {
      const mockConfig = {
        bikeType: 'Road' as BikeType,
        components: [
          {
            id: 'test-frame',
            name: 'Road Frame',
            category: 'Frame',
            price: 600,
            weight: 1200,
            bikeType: 'Road',
            brand: 'Brand',
            specs: {},
          },
        ] as ConfigComponent[],
        configId: 'config-123',
        manualConfigName: 'My Road Build',
      };

      useConfigStore.getState().loadConfiguration(mockConfig);

      const state = useConfigStore.getState();
      expect(state.activeType).toBe('Road');
      expect(state.components).toEqual(mockConfig.components);
      expect(state.configId).toBe('config-123');
      expect(state.manualConfigName).toBe('My Road Build');
    });
  });
});
