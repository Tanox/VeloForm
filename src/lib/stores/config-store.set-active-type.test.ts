/**
 * config-store.set-active-type.test.ts - 车型设置相关测试
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { useConfigStore } from './config-store';
import type { BikeType } from '@/types';

describe('ConfigStore', () => {
  beforeAll(() => {
    const state = useConfigStore.getState();
    if (!state.components || state.components.length === 0) {
      state.setActiveType('Road');
    }
  });

  describe('setActiveType', () => {
    it('应该设置车型并重置组件为默认值', () => {
      const { setActiveType } = useConfigStore.getState();

      setActiveType('MTB');

      const state = useConfigStore.getState();
      expect(state.activeType).toBe('MTB');
      expect(state.configId).toBeNull();
      expect(state.manualConfigName).toBeNull();
    });

    it('应该支持所有车型类型', () => {
      const types: BikeType[] = ['Road', 'MTB', 'Fold'];

      types.forEach((type) => {
        useConfigStore.getState().setActiveType(type);
        expect(useConfigStore.getState().activeType).toBe(type);
      });
    });
  });
});
