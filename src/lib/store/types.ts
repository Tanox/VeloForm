/**
 * Store 类型定义
 * src/lib/store/types.ts v4.1.0
 */

import type { ConfigComponent, Configuration, BikeType } from '@/types';

/**
 * 配置状态
 */
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

/**
 * 配置操作
 */
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

/**
 * 遗留的配置 Store（向后兼容）
 */
export interface LegacyConfigStore extends ConfigState, ConfigStoreActions {}
