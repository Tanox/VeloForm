'use client';

/**
 * 🔁 兼容层：将分散的关注点 store 聚合成原有的单一 useConfigStore API
 * src/lib/store.ts v4.1.0
 *
 * 新代码请直接从 @/lib/stores/* 和 @/lib/config-service 导入
 * 这一层主要服务于未迁移的旧组件与测试文件
 *
 * 模块拆分：
 * - types.ts: 类型定义 (ConfigState, ConfigStoreActions, LegacyConfigStore)
 * - actions.ts: 业务操作 (save/delete/share/export/toggleCompare)
 * - selectors.ts: 细粒度选择器 hooks
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import type { Configuration } from '@/types';
import { getDefaultsForType, APP_CONSTANTS } from '@/lib/constants';
import { toast } from '@/lib/toast';

// 导入拆分后的模块
export type { ConfigState, ConfigStoreActions, LegacyConfigStore } from './store/types';
import type { LegacyConfigStore } from './store/types';
import {
  createSaveConfiguration,
  createDeleteConfiguration,
  generateShareableLink,
  exportConfiguration,
  createToggleCompare,
  MAX_COMPARE,
} from './store/actions';
import {
  selectActiveType,
  selectComponents,
  selectMyConfigs,
  selectIsSaving,
  selectUserId,
  selectTotalCost,
  selectTotalWeight,
} from './store/selectors';

// 业务逻辑从 store 中剥离到独立的 service 模块，保持 store 聚焦状态管理
import {
  saveConfigurationToSupabase,
  deleteConfigurationFromSupabase,
} from '@/lib/supabase-service';
import { isSupabaseConfigured } from '@/lib/supabase';

/**
 * Store 创建器
 * 聚合所有状态和操作
 */
const configStoreCreator: StateCreator<LegacyConfigStore> = (set, get) => ({
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
  setActiveType: (type) =>
    set({
      activeType: type,
      components: getDefaultsForType(type),
      configId: null,
      manualConfigName: null,
    }),

  replaceComponent: (newComponent) =>
    set((state) => ({
      components: state.components.map((comp) =>
        comp.category === newComponent.category ? newComponent : comp
      ),
    })),

  setComponents: (components) => set({ components }),

  loadConfiguration: (config) =>
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

  setConfigId: (id) => set({ configId: id }),
  setManualConfigName: (name) => set({ manualConfigName: name }),

  // --- UI 操作 ---
  toggleComponentSelector: (componentId) =>
    set((state) => ({
      showComponentSelector: !state.showComponentSelector,
      editingComponentId: componentId || state.editingComponentId,
    })),

  setSaving: (saving) => set({ isSaving: saving }),

  // --- 用户操作 ---
  setUserId: (userId) => set({ userId }),
  setMyConfigs: (configs) => set({ myConfigs: configs }),

  // --- 计算操作 ---
  getTotalCost: () => selectTotalCost(get()),
  getTotalWeight: () => selectTotalWeight(get()),
  getComparingConfigs: () => {
    const state = get();
    return state.comparingConfigIds
      .map((id) => state.myConfigs.find((c) => c.id === id))
      .filter(Boolean) as Configuration[];
  },

  // --- 业务操作（使用拆分的模块）---
  saveConfiguration: createSaveConfiguration(get, set),
  deleteConfiguration: createDeleteConfiguration(get, set),
  generateShareableLink: () => generateShareableLink(get),
  exportConfiguration: () => exportConfiguration(get),
  toggleCompare: createToggleCompare(get, set),
  clearCompare: () => set({ comparingConfigIds: [] }),
});

/**
 * 创建并导出 store 实例
 */
export const useConfigStore = create<LegacyConfigStore>()(
  persist(configStoreCreator, {
    name: 'veloform-config-storage',
  })
);

// --- 细粒度 selector hooks（保持向后兼容）---
export const useActiveType = () => useConfigStore(selectActiveType);
export const useComponents = () => useConfigStore(selectComponents);
export const useMyConfigs = () => useConfigStore(selectMyConfigs);
export const useIsSaving = () => useConfigStore(selectIsSaving);
export const useUserId = () => useConfigStore(selectUserId);
export const useTotalCost = () => useConfigStore(selectTotalCost);
export const useTotalWeight = () => useConfigStore(selectTotalWeight);

// 导出拆分模块的常量
export { MAX_COMPARE };
