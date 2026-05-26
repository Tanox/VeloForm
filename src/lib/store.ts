'use client';

import { create } from 'zustand';
import { ConfigState, ConfigComponent, Configuration, BikeType } from '@/types';
import { getDefaultsForType, APP_CONSTANTS } from './constants';

interface ConfigStore extends ConfigState {
  setActiveType: (type: BikeType) => void;
  replaceComponent: (newComponent: ConfigComponent) => void;
  setComponents: (components: ConfigComponent[]) => void;
  loadConfiguration: (config: Configuration) => void;
  resetToDefaults: () => void;
  toggleLibrary: () => void;
  toggleComponentSelector: (componentId?: string) => void;
  setMyConfigs: (configs: Configuration[]) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setSaving: (saving: boolean) => void;
  setConfigId: (id: string | null) => void;
  setManualConfigName: (name: string | null) => void;
  getTotalCost: () => number;
  getTotalWeight: () => number;
  saveConfiguration: () => Promise<void>;
  deleteConfiguration: (configId: string) => Promise<void>;
  loadMyConfigs: (userId?: string) => Promise<void>;
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

export const useConfigStore = create<ConfigStore>((set, get) => ({
  activeType: 'Road',
  components: getDefaultsForType('Road'),
  configId: null,
  manualConfigName: null,
  allDbComponents: [],
  showLibrary: false,
  myConfigs: [],
  isLoggedIn: false,
  isSaving: false,
  showComponentSelector: false,
  editingComponentId: '',
  userId: null,

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

  loadConfiguration: (config: Configuration) =>
    set({
      activeType: config.bikeType,
      components: config.components,
      configId: config.id || null,
      manualConfigName: config.name,
    }),

  resetToDefaults: () =>
    set((state) => ({
      components: getDefaultsForType(state.activeType),
      configId: null,
      manualConfigName: null,
    })),

  toggleLibrary: () => set((state) => ({ showLibrary: !state.showLibrary })),

  toggleComponentSelector: (componentId?: string) =>
    set((state) => ({
      showComponentSelector: !state.showComponentSelector,
      editingComponentId: componentId || state.editingComponentId,
    })),

  setMyConfigs: (configs: Configuration[]) => set({ myConfigs: configs }),
  setLoggedIn: (loggedIn: boolean) => set({ isLoggedIn: loggedIn }),
  setSaving: (saving: boolean) => set({ isSaving: saving }),
  setConfigId: (id: string | null) => set({ configId: id }),
  setManualConfigName: (name: string | null) => set({ manualConfigName: name }),
  setUserId: (userId: string | null) => set({ userId }),

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

  saveConfiguration: async () => {
    const state = get();
    set({ isSaving: true });

    try {
      const config: Configuration = {
        id: state.configId || undefined,
        bikeType: state.activeType,
        name: state.manualConfigName || `${state.activeType} Build`,
        components: [...state.components],
        totalCost: state.getTotalCost(),
        estimatedWeight: state.getTotalWeight(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Try to save to Firebase (dynamic import to avoid server issues)
      try {
        const { saveConfigurationToFirebase } = await import('./firebase-service');
        const savedId = await saveConfigurationToFirebase(config, state.userId || undefined);
        config.id = savedId;
      } catch (error) {
        console.warn('Firebase save failed, using local only:', error);
        if (!config.id) {
          config.id = `config_${Date.now()}`;
        }
      }

      set((prevState) => {
        const existingIndex = prevState.myConfigs.findIndex((c) => c.id === config.id);
        if (existingIndex >= 0) {
          const updated = [...prevState.myConfigs];
          updated[existingIndex] = config;
          return { myConfigs: updated, configId: config.id || null, isSaving: false };
        }
        return {
          myConfigs: [...prevState.myConfigs, config],
          configId: config.id || null,
          isSaving: false,
        };
      });
    } catch (error) {
      console.error('Failed to save configuration:', error);
      set({ isSaving: false });
    }
  },

  deleteConfiguration: async (configId: string) => {
    try {
      const { deleteConfigurationFromFirebase } = await import('./firebase-service');
      await deleteConfigurationFromFirebase(configId);
    } catch (error) {
      console.warn('Failed to delete from Firebase:', error);
    }

    set((state) => ({
      myConfigs: state.myConfigs.filter((c) => c.id !== configId),
      configId: state.configId === configId ? null : state.configId,
    }));
  },

  loadMyConfigs: async (userId?: string) => {
    try {
      const { loadConfigurationsFromFirebase } = await import('./firebase-service');
      const configs = await loadConfigurationsFromFirebase(userId);
      set({ myConfigs: configs, userId: userId || null });
    } catch (error) {
      console.error('Failed to load configurations:', error);
    }
  },
}));
