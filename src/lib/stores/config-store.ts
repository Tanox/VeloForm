// 文件路径: src/lib/stores/config-store.ts v4.4.9
'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import { BikeType, ConfigComponent } from '@/types';
import { getDefaultsForType } from '@/lib/constants';
import { calculateTotals } from '@/lib/config-totals';
import { safeJSONStorage } from '@/lib/storage';

export interface ConfigStoreState {
  activeType: BikeType;
  components: ConfigComponent[];
  configId: string | null;
  manualConfigName: string | null;
}

export interface ConfigStoreActions {
  setActiveType: (type: BikeType) => void;
  replaceComponent: (newComponent: ConfigComponent) => void;
  setComponents: (components: ConfigComponent[]) => void;
  loadConfiguration: (config: {
    bikeType: BikeType;
    components: ConfigComponent[];
    configId?: string | null;
    manualConfigName?: string | null;
  }) => void;
  resetToDefaults: () => void;
  getTotalCost: () => number;
  getTotalWeight: () => number;
}

export type ConfigStore = ConfigStoreState & ConfigStoreActions;

const configStoreCreator: StateCreator<ConfigStore> = (set, get) => ({
  activeType: 'Road',
  components: getDefaultsForType('Road'),
  configId: null,
  manualConfigName: null,

  setActiveType: (type: BikeType) =>
    set({
      activeType: type,
      components: getDefaultsForType(type),
      configId: null,
      manualConfigName: null,
    }),

  replaceComponent: (newComponent: ConfigComponent) =>
    set((state) => ({
      components: state.components.map((comp) =>
        comp.category === newComponent.category ? newComponent : comp
      ),
    })),

  setComponents: (components: ConfigComponent[]) => set({ components }),

  loadConfiguration: (config) =>
    set({
      activeType: config.bikeType,
      components: config.components,
      configId: config.configId ?? null,
      manualConfigName: config.manualConfigName ?? null,
    }),

  resetToDefaults: () =>
    set((state) => ({
      components: getDefaultsForType(state.activeType),
      configId: null,
      manualConfigName: null,
    })),

  getTotalCost: () => calculateTotals(get().components, get().activeType).totalCost,

  getTotalWeight: () => calculateTotals(get().components, get().activeType).estimatedWeight,
});

export const useConfigStore = create<ConfigStore>()(
  persist(configStoreCreator, {
    name: 'veloform-config-storage',
    skipHydration: true,
    storage: safeJSONStorage,
  })
);

// Selective hooks for fine-grained reactivity
export const useActiveType = () => useConfigStore((s) => s.activeType);
export const useComponents = () => useConfigStore((s) => s.components);
export const useConfigId = () => useConfigStore((s) => s.configId);
export const useManualConfigName = () => useConfigStore((s) => s.manualConfigName);
export const useTotalCost = () =>
  useConfigStore((s) => calculateTotals(s.components, s.activeType).totalCost);
export const useTotalWeight = () =>
  useConfigStore((s) => calculateTotals(s.components, s.activeType).estimatedWeight);
