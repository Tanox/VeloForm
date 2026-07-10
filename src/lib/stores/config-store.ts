'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BikeType, ConfigComponent } from '@/types';
import { getDefaultsForType, APP_CONSTANTS } from '@/lib/constants';

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

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
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

      getTotalCost: () => {
        const state = get();
        return state.components.reduce((sum, comp) => sum + comp.price, 0);
      },

      getTotalWeight: () => {
        const state = get();
        const baseWeight = APP_CONSTANTS.BASE_WEIGHTS[state.activeType];
        const componentWeight = state.components.reduce((sum, comp) => sum + comp.weight, 0);
        return (baseWeight + componentWeight) / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR;
      },
    }),
    {
      name: 'veloform-config-storage',
      skipHydration: true,
    }
  )
);

// Selective hooks for fine-grained reactivity
export const useActiveType = () => useConfigStore((s) => s.activeType);
export const useComponents = () => useConfigStore((s) => s.components);
export const useConfigId = () => useConfigStore((s) => s.configId);
export const useManualConfigName = () => useConfigStore((s) => s.manualConfigName);
export const useTotalCost = () =>
  useConfigStore((s) => s.components.reduce((sum, c) => sum + c.price, 0));
export const useTotalWeight = () =>
  useConfigStore((s) => {
    const baseWeight = APP_CONSTANTS.BASE_WEIGHTS[s.activeType];
    const componentWeight = s.components.reduce((sum, c) => sum + c.weight, 0);
    return (baseWeight + componentWeight) / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR;
  });
