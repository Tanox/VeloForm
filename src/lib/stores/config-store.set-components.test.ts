/**
 * config-store.set-components.test.ts - 组件列表设置相关测试
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

  describe('setComponents', () => {
    it('应该设置完整的组件列表', () => {
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

      expect(useConfigStore.getState().components).toEqual(mockComponents);
    });
  });
});
