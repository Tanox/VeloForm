import { describe, it, expect, beforeEach } from 'vitest';
import { useConfigStore } from '@/lib/stores/config-store';

describe('useConfigStore', () => {
  beforeEach(() => {
    useConfigStore.setState({
      activeType: 'Road',
      components: [],
      configId: null,
      manualConfigName: null,
    });
  });

  describe('setActiveType', () => {
    it('should update active type', () => {
      useConfigStore.getState().setActiveType('MTB');
      expect(useConfigStore.getState().activeType).toBe('MTB');
    });

    it('should reset components when changing type', () => {
      useConfigStore.getState().setActiveType('MTB');
      expect(useConfigStore.getState().components.length).toBeGreaterThan(0);
    });
  });

  describe('getTotalCost', () => {
    it('should calculate total cost correctly', () => {
      const state = useConfigStore.getState();
      const cost = state.getTotalCost();
      expect(typeof cost).toBe('number');
      expect(cost).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getTotalWeight', () => {
    it('should calculate total weight correctly', () => {
      const state = useConfigStore.getState();
      const weight = state.getTotalWeight();
      expect(typeof weight).toBe('number');
      expect(weight).toBeGreaterThan(0);
    });
  });

  describe('resetToDefaults', () => {
    it('should reset components to defaults for active type', () => {
      useConfigStore.getState().setActiveType('MTB');
      const before = useConfigStore.getState().components.length;
      useConfigStore.getState().resetToDefaults();
      expect(useConfigStore.getState().components.length).toBe(before);
      expect(useConfigStore.getState().configId).toBeNull();
    });
  });
});
