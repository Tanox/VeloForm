'use client';

/**
 * 🔁 兼容层：将分散的关注点 store 聚合成原有的单一 useConfigStore API
 * 新代码请直接从 @/lib/stores/* 和 @/lib/config-service 导入
 * 这一层主要服务于未迁移的旧组件与测试文件
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ConfigComponent, Configuration, BikeType } from '@/types';
import { getDefaultsForType, APP_CONSTANTS } from '@/lib/constants';
import { toast } from '@/lib/toast';
import { configLogger } from '@/lib/logger';

// 业务逻辑从 store 中剥离到独立的 service 模块，保持 store 聚焦状态管理
import {
  saveConfigurationToSupabase,
  deleteConfigurationFromSupabase,
} from '@/lib/supabase-service';
import { isSupabaseConfigured } from '@/lib/supabase';

export interface ConfigState {
  // 配置数据
  activeType: BikeType;
  components: ConfigComponent[];
  configId: string | null;
  manualConfigName: string | null;

  // UI 状态
  showComponentSelector: boolean;
  editingComponentId: string;
  isSaving: boolean;

  // 用户与收藏
  userId: string | null;
  myConfigs: Configuration[];
  comparingConfigIds: string[];
}

export interface ConfigStoreActions {
  // 配置操作
  setActiveType: (type: BikeType) => void;
  replaceComponent: (newComponent: ConfigComponent) => void;
  setComponents: (components: ConfigComponent[]) => void;
  loadConfiguration: (config: Configuration) => void;
  resetToDefaults: () => void;
  setConfigId: (id: string | null) => void;
  setManualConfigName: (name: string | null) => void;

  // UI 操作
  toggleComponentSelector: (componentId?: string) => void;
  setSaving: (saving: boolean) => void;

  // 用户操作
  setUserId: (userId: string | null) => void;
  setMyConfigs: (configs: Configuration[]) => void;

  // 计算
  getTotalCost: () => number;
  getTotalWeight: () => number;
  getComparingConfigs: () => Configuration[];

  // 业务操作
  saveConfiguration: () => Promise<void>;
  deleteConfiguration: (configId: string) => Promise<void>;
  generateShareableLink: () => string;
  exportConfiguration: () => string;
  toggleCompare: (configId: string) => void;
  clearCompare: () => void;
}

export interface LegacyConfigStore extends ConfigState, ConfigStoreActions {}

const MAX_COMPARE = 3;

export const useConfigStore = create<LegacyConfigStore>()(
  persist(
    (set, get) => ({
      // --- 初始状态 ---
      activeType: 'Road',
      components: getDefaultsForType('Road'),
      configId: null,
      manualConfigName: null,
      showComponentSelector: false,
      editingComponentId: '',
      isSaving: false,
      userId: null,
      myConfigs: [],
      comparingConfigIds: [],

      // --- 配置操作 ---
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

      setConfigId: (id: string | null) => set({ configId: id }),
      setManualConfigName: (name: string | null) => set({ manualConfigName: name }),

      // --- UI 操作 ---
      toggleComponentSelector: (componentId?: string) =>
        set((state) => ({
          showComponentSelector: !state.showComponentSelector,
          editingComponentId: componentId || state.editingComponentId,
        })),

      setSaving: (saving: boolean) => set({ isSaving: saving }),

      // --- 用户操作 ---
      setUserId: (userId: string | null) => set({ userId }),
      setMyConfigs: (configs: Configuration[]) => set({ myConfigs: configs }),

      // --- 计算操作 ---
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

      getComparingConfigs: () => {
        const state = get();
        return state.comparingConfigIds
          .map((id) => state.myConfigs.find((c) => c.id === id))
          .filter(Boolean) as Configuration[];
      },

      // --- 业务操作（云端同步/分享/导出）---
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

          try {
            if (!isSupabaseConfigured()) {
              toast('warning', 'Cloud sync unavailable, saving locally');
            } else {
              const savedId = await saveConfigurationToSupabase(config, state.userId || undefined);
              config.id = savedId;
              toast('success', 'Configuration saved to cloud');
            }
          } catch (supabaseError: unknown) {
            const error = supabaseError as { code?: string };
            if (error?.code === '42501') {
              toast('error', 'Permission denied. Please log in.');
            } else if (error?.code === 'PGRST301') {
              toast('warning', 'Cloud service unavailable, saved locally');
            } else {
              configLogger.error('Supabase error:', supabaseError);
              toast('error', 'Failed to sync with cloud, saved locally');
            }
          }

          const existingIndex = state.myConfigs.findIndex((c) => c.id === config.id);
          if (existingIndex >= 0) {
            const updated = [...state.myConfigs];
            updated[existingIndex] = config;
            set({
              myConfigs: updated,
              configId: config.id || null,
              isSaving: false,
            });
          } else {
            set({
              myConfigs: [...state.myConfigs, config],
              configId: config.id || null,
              isSaving: false,
            });
          }
        } catch (error) {
          configLogger.error('Critical save error:', error);
          toast('error', 'Failed to save configuration');
          set({ isSaving: false });
        }
      },

      deleteConfiguration: async (configId: string) => {
        try {
          if (isSupabaseConfigured()) {
            await deleteConfigurationFromSupabase(configId);
            toast('info', 'Configuration deleted from cloud');
          }
        } catch (error) {
          configLogger.warn('Failed to delete from Supabase:', error);
          toast('warning', 'Deleted locally but may still exist in cloud');
        }

        set((state) => ({
          myConfigs: state.myConfigs.filter((c) => c.id !== configId),
          configId: state.configId === configId ? null : state.configId,
          comparingConfigIds: state.comparingConfigIds.filter((id) => id !== configId),
        }));
      },

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

      toggleCompare: (configId: string) => {
        set((state) => {
          const isComparing = state.comparingConfigIds.includes(configId);
          if (isComparing) {
            return {
              comparingConfigIds: state.comparingConfigIds.filter((id) => id !== configId),
            };
          }
          if (state.comparingConfigIds.length >= MAX_COMPARE) {
            toast('warning', 'You can compare up to 3 configurations');
            return state;
          }
          return {
            comparingConfigIds: [...state.comparingConfigIds, configId],
          };
        });
      },

      clearCompare: () => set({ comparingConfigIds: [] }),
    }),
    {
      name: 'veloform-config-storage',
    }
  )
);

// --- 细粒度 selector hooks（保持向后兼容）---
export const useActiveType = () => useConfigStore((s) => s.activeType);
export const useComponents = () => useConfigStore((s) => s.components);
export const useMyConfigs = () => useConfigStore((s) => s.myConfigs);
export const useIsSaving = () => useConfigStore((s) => s.isSaving);
export const useUserId = () => useConfigStore((s) => s.userId);
export const useTotalCost = () =>
  useConfigStore((s) => s.components.reduce((sum, c) => sum + c.price, 0));
export const useTotalWeight = () =>
  useConfigStore((s) => {
    const baseWeight = APP_CONSTANTS.BASE_WEIGHTS[s.activeType];
    const componentWeight = s.components.reduce((sum, c) => sum + c.weight, 0);
    return (baseWeight + componentWeight) / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR;
  });
