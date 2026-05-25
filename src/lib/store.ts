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
}));
