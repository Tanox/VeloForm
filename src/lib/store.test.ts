import { describe, it, expect, beforeEach } from 'vitest';
import { useConfigStore } from '@/lib/store';
import type { Configuration } from '@/types';

describe('useConfigStore', () => {
  beforeEach(() => {
    useConfigStore.setState({
      activeType: 'Road',
      components: [],
      configId: null,
      manualConfigName: null,
      myConfigs: [],
      isSaving: false,
      showComponentSelector: false,
      editingComponentId: '',
      userId: null,
      comparingConfigIds: [],
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

  describe('generateShareableLink', () => {
    it('should generate a valid shareable link', () => {
      const state = useConfigStore.getState();
      const link = state.generateShareableLink();
      expect(link).toContain(window.location.origin);
      expect(link).toContain('?config=');
    });
  });

  describe('exportConfiguration', () => {
    it('should export configuration as JSON', () => {
      const state = useConfigStore.getState();
      const exported = state.exportConfiguration();
      const parsed = JSON.parse(exported);
      
      expect(parsed).toHaveProperty('name');
      expect(parsed).toHaveProperty('bikeType');
      expect(parsed).toHaveProperty('totalCost');
      expect(parsed).toHaveProperty('estimatedWeight');
      expect(parsed).toHaveProperty('components');
    });
  });

  describe('toggleCompare', () => {
    it('should add config to compare list', () => {
      const state = useConfigStore.getState();
      state.toggleCompare('config_1');
      expect(useConfigStore.getState().comparingConfigIds).toContain('config_1');
    });

    it('should remove config from compare list', () => {
      const state = useConfigStore.getState();
      state.toggleCompare('config_1');
      state.toggleCompare('config_1');
      expect(useConfigStore.getState().comparingConfigIds).not.toContain('config_1');
    });
  });
});
