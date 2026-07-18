/**
 * config-store.reset-to-defaults.test.ts - 重置默认值相关测试
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { useConfigStore } from './config-store';

describe('ConfigStore', () => {
  beforeAll(() => {
    const state = useConfigStore.getState();
    if (!state.components || state.components.length === 0) {
      state.setActiveType('Road');
    }
  });

  describe('resetToDefaults', () => {
    it('应该重置组件为当前车型的默认值', () => {
      const { setActiveType, resetToDefaults } = useConfigStore.getState();

      setActiveType('MTB');
      resetToDefaults();

      const state = useConfigStore.getState();
      expect(state.configId).toBeNull();
      expect(state.manualConfigName).toBeNull();
    });
  });
});
