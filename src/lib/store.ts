'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ConfigState, ConfigComponent, Configuration, BikeType } from '@/types';
import { getDefaultsForType, APP_CONSTANTS } from './constants';
import { toast } from './toast';

interface ConfigStore extends ConfigState {
  setActiveType: (type: BikeType) => void;
  replaceComponent: (newComponent: ConfigComponent) => void;
  setComponents: (components: ConfigComponent[]) => void;
  loadConfiguration: (config: Configuration) => void;
  resetToDefaults: () => void;
  toggleComponentSelector: (componentId?: string) => void;
  setMyConfigs: (configs: Configuration[]) => void;
  setSaving: (saving: boolean) => void;
  setConfigId: (id: string | null) => void;
  setManualConfigName: (name: string | null) => void;
  setUserId: (userId: string | null) => void;
  getTotalCost: () => number;
  getTotalWeight: () => number;
  saveConfiguration: () => Promise<void>;
  deleteConfiguration: (configId: string) => Promise<void>;
  generateShareableLink: () => string;
  exportConfiguration: () => string;
  toggleCompare: (configId: string) => void;
  clearCompare: () => void;
  getComparingConfigs: () => Configuration[];
  comparingConfigIds: string[];
  userId: string | null;
}

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
      activeType: 'Road',
      components: getDefaultsForType('Road'),
      configId: null,
      manualConfigName: null,
      myConfigs: [],
      isSaving: false,
      showComponentSelector: false,
      editingComponentId: '',
      userId: null,
      comparingConfigIds: [] as string[],

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

      toggleComponentSelector: (componentId?: string) =>
        set((state) => ({
          showComponentSelector: !state.showComponentSelector,
          editingComponentId: componentId || state.editingComponentId,
        })),

      setMyConfigs: (configs: Configuration[]) => set({ myConfigs: configs }),
      setSaving: (saving: boolean) => set({ isSaving: saving }),
      setConfigId: (id: string | null) => set({ configId: id }),
      setManualConfigName: (name: string | null) => set({ manualConfigName: name }),
      setUserId: (userId: string | null) => set({ userId }),

      generateShareableLink: () => {
        const state = get();
        const config = {
          bikeType: state.activeType,
          components: state.components,
          name: state.manualConfigName || `${state.activeType} Build`,
        };
        const encoded = btoa(JSON.stringify(config));
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        return `${origin}/?config=${encoded}`;
      },

      exportConfiguration: () => {
        const state = get();
        const exportData = {
          name: state.manualConfigName || `${state.activeType} Build`,
          bikeType: state.activeType,
          totalCost: state.getTotalCost(),
          estimatedWeight: state.getTotalWeight(),
          components: state.components.map((comp) => ({
            category: comp.category,
            name: comp.name,
            price: comp.price,
            weight: comp.weight,
          })),
          exportedAt: new Date().toISOString(),
        };
        return JSON.stringify(exportData, null, 2);
      },

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
            id: state.configId || `config_${Date.now()}`,
            userId: state.userId || 'anonymous',
            bikeType: state.activeType,
            name: state.manualConfigName || `${state.activeType} Build`,
            components: [...state.components],
            totalCost: state.getTotalCost(),
            estimatedWeight: state.getTotalWeight(),
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          // Try to save to Firebase with detailed error handling
          try {
            const { saveConfigurationToFirebase, isFirebaseConfigured } = await import('./firebase-service');
            
            if (!isFirebaseConfigured()) {
              toast('warning', 'Cloud sync unavailable, saving locally');
            } else {
              const savedId = await saveConfigurationToFirebase(config, state.userId || undefined);
              config.id = savedId;
              toast('success', 'Configuration saved to cloud');
            }
          } catch (firebaseError: any) {
            // Detailed error classification
            if (firebaseError.code === 'permission-denied') {
              toast('error', 'Permission denied. Please log in.');
            } else if (firebaseError.code === 'unavailable') {
              toast('warning', 'Cloud service unavailable, saved locally');
            } else {
              console.error('Firebase error:', firebaseError);
              toast('error', 'Failed to sync with cloud, saved locally');
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
          console.error('Critical save error:', error);
          toast('error', 'Failed to save configuration');
          set({ isSaving: false });
        }
      },

      deleteConfiguration: async (configId: string) => {
        try {
          const { deleteConfigurationFromFirebase, isFirebaseConfigured } = await import('./firebase-service');
          
          if (isFirebaseConfigured()) {
            await deleteConfigurationFromFirebase(configId);
            toast('info', 'Configuration deleted from cloud');
          }
        } catch (error) {
          console.warn('Failed to delete from Firebase:', error);
          toast('warning', 'Deleted locally but may still exist in cloud');
        }

        set((state) => ({
          myConfigs: state.myConfigs.filter((c) => c.id !== configId),
          configId: state.configId === configId ? null : state.configId,
          comparingConfigIds: state.comparingConfigIds.filter((id) => id !== configId),
        }));
      },

      toggleCompare: (configId: string) => {
        set((state) => {
          const isComparing = state.comparingConfigIds.includes(configId);
          if (isComparing) {
            return {
              comparingConfigIds: state.comparingConfigIds.filter((id) => id !== configId),
            };
          }
          if (state.comparingConfigIds.length >= 3) {
            toast('warning', 'You can compare up to 3 configurations');
            return state;
          }
          return {
            comparingConfigIds: [...state.comparingConfigIds, configId],
          };
        });
      },

      clearCompare: () => set({ comparingConfigIds: [] }),

      getComparingConfigs: () => {
        const state = get();
        return state.comparingConfigIds
          .map((id) => state.myConfigs.find((c) => c.id === id))
          .filter(Boolean) as Configuration[];
      },
    }),
    {
      name: 'veloform-config-storage',
    }
  )
);

// Performance-optimized selective hooks
export const useTotalCost = () => 
  useConfigStore((state) => 
    state.components.reduce((sum, comp) => sum + comp.price, 0)
  );

export const useTotalWeight = () => 
  useConfigStore((state) => {
    const baseWeight = APP_CONSTANTS.BASE_WEIGHTS[state.activeType];
    const componentWeight = state.components.reduce((sum, comp) => sum + comp.weight, 0);
    return (baseWeight + componentWeight) / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR;
  });

export const useActiveType = () => useConfigStore((state) => state.activeType);
export const useComponents = () => useConfigStore((state) => state.components);
export const useMyConfigs = () => useConfigStore((state) => state.myConfigs);
export const useIsSaving = () => useConfigStore((state) => state.isSaving);
export const useUserId = () => useConfigStore((state) => state.userId);