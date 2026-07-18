/**
 * config-store.replace-component.test.ts - 组件替换相关测试
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

  describe('replaceComponent', () => {
    it('应该替换指定类别的组件', () => {
      const initialComponents: ConfigComponent[] = [
        {
          id: 'initial-frame',
          name: 'Initial Frame',
          category: 'Frame',
          price: 400,
          weight: 900,
          bikeType: 'Road',
          brand: 'InitialBrand',
          specs: {},
        },
        {
          id: 'initial-wheelset',
          name: 'Initial Wheelset',
          category: 'Wheelset',
          price: 200,
          weight: 1200,
          bikeType: 'Road',
          brand: 'InitialBrand',
          specs: {},
        },
      ];

      useConfigStore.setState({
        activeType: 'Road',
        components: initialComponents,
      });

      const mockComponent: ConfigComponent = {
        id: 'test-frame',
        name: 'Test Frame',
        category: 'Frame',
        price: 500,
        weight: 1000,
        bikeType: 'Road',
        brand: 'TestBrand',
        specs: {},
      };

      const { replaceComponent } = useConfigStore.getState();
      replaceComponent(mockComponent);

      const state = useConfigStore.getState();
      const found = state.components?.find((c) => c.category === 'Frame');
      expect(found).toEqual(mockComponent);
    });

    it('应该保留其他类别的组件不变', () => {
      const initialComponents: ConfigComponent[] = [
        {
          id: 'initial-frame',
          name: 'Initial Frame',
          category: 'Frame',
          price: 400,
          weight: 900,
          bikeType: 'Road',
          brand: 'InitialBrand',
          specs: {},
        },
        {
          id: 'initial-wheelset',
          name: 'Initial Wheelset',
          category: 'Wheelset',
          price: 200,
          weight: 1200,
          bikeType: 'Road',
          brand: 'InitialBrand',
          specs: {},
        },
      ];

      useConfigStore.setState({
        activeType: 'Road',
        components: initialComponents,
      });

      const mockComponent: ConfigComponent = {
        id: 'test-wheelset',
        name: 'Test Wheelset',
        category: 'Wheelset',
        price: 300,
        weight: 1500,
        bikeType: 'Road',
        brand: 'TestBrand',
        specs: {},
      };

      useConfigStore.getState().replaceComponent(mockComponent);

      const state = useConfigStore.getState();
      const frameComponent = state.components?.find((c) => c.category === 'Frame');
      expect(frameComponent?.id).toBe('initial-frame');
    });
  });
});
