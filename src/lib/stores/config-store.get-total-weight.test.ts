/**
 * config-store.get-total-weight.test.ts - 总重量计算相关测试
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { useConfigStore } from './config-store';
import type { ConfigComponent } from '@/types';

describe('ConfigStore', () => {
  beforeAll(() => {
    const state = useConfigStore.getState();
    if (!state.components || state.components.length === 0) {
      state.setActiveType('Road');
    }
  });

  describe('getTotalWeight', () => {
    it('应该正确计算总重量（包含基础重量）', () => {
      const mockComponents: ConfigComponent[] = [
        {
          id: 'test-1',
          name: 'Component 1',
          category: 'Frame',
          price: 100,
          weight: 1000,
          bikeType: 'Road',
          brand: 'Brand',
          specs: {},
        },
      ];

      useConfigStore.setState({
        activeType: 'Road',
        components: mockComponents,
      });

      const totalWeight = useConfigStore.getState().getTotalWeight();
      expect(totalWeight).toBeGreaterThan(0);
    });
  });
});
