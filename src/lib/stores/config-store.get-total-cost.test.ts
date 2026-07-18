/**
 * config-store.get-total-cost.test.ts - 总成本计算相关测试
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

  describe('getTotalCost', () => {
    it('应该正确计算总成本', () => {
      const mockComponents: ConfigComponent[] = [
        {
          id: 'test-1',
          name: 'Component 1',
          category: 'Frame',
          price: 100,
          weight: 500,
          bikeType: 'Road',
          brand: 'Brand',
          specs: {},
        },
        {
          id: 'test-2',
          name: 'Component 2',
          category: 'Drivetrain',
          price: 200,
          weight: 800,
          bikeType: 'Road',
          brand: 'Brand',
          specs: {},
        },
      ];

      useConfigStore.getState().setComponents(mockComponents);

      const totalCost = useConfigStore.getState().getTotalCost();
      expect(totalCost).toBe(300);
    });
  });
});
