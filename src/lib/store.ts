/**
 * @file store.ts
 * @version v3.4.0
 * @description 配置状态管理模块 - 使用 Zustand 管理自行车配置的状态、组件选择和 Firebase 数据持久化
 * 
 * @overview
 * 该模块是应用程序状态管理的核心，负责：
 * - 管理自行车类型（Road、MTB、CX、Gravel）和对应的组件配置
 * - 处理组件的添加、替换和删除操作
 * - 计算配置的总成本和总重量
 * - 通过 Firebase 实现配置的云端保存、加载和删除
 * - 管理用户认证状态和 UI 交互状态（侧边栏、选择器等）
 * 
 * @architecture
 * 使用 Zustand 状态管理库，采用集中式状态管理模式：
 * - State: 包含配置数据、UI 状态、用户信息
 * - Actions: 同步和异步函数用于修改状态
 * - Getters: 计算属性用于派生数据
 * 
 * @firebase-integration
 * Firebase 集成采用动态导入模式，避免服务端执行问题：
 * 1. saveConfiguration: 先保存到 Firebase，失败时使用本地 ID 回退
 * 2. deleteConfiguration: 删除 Firebase 数据，同时更新本地状态
 * 3. loadMyConfigs: 从 Firebase 加载用户配置列表
 * 所有 Firebase 操作都有错误处理，确保降级到本地存储
 * 
 * @dependencies
 * - zustand: 状态管理
 * - @/types: ConfigState, ConfigComponent, Configuration, BikeType
 * - @/lib/constants: getDefaultsForType, APP_CONSTANTS
 * - @/lib/firebase-service: Firebase CRUD 操作
 */

'use client';

import { create } from 'zustand';
import { ConfigState, ConfigComponent, Configuration, BikeType } from '@/types';
import { getDefaultsForType, APP_CONSTANTS } from './constants';

/**
 * @interface ConfigStore
 * @extends ConfigState
 * @description 自行车配置管理 Store 接口，定义所有状态属性和操作方法
 * 
 * @state activeType - 当前选中的自行车类型
 * @state components - 当前配置的组件列表
 * @state configId - 当前配置的唯一标识符
 * @state manualConfigName - 用户手动输入的配置名称
 * @state allDbComponents - 从数据库加载的所有可用组件
 * @state showLibrary - 侧边栏库的显示状态
 * @state myConfigs - 用户保存的所有配置列表
 * @state isLoggedIn - 用户登录状态
 * @state isSaving - 保存操作进行中的状态
 * @state showComponentSelector - 组件选择器弹窗的显示状态
 * @state editingComponentId - 当前正在编辑的组件 ID
 * @state userId - 当前登录用户的唯一标识符
 */
interface ConfigStore extends ConfigState {
  /**
   * @method setActiveType
   * @description 切换自行车类型并重置组件为新类型的默认配置
   * @param {BikeType} type - 要切换的自行车类型（Road、MTB、CX、Gravel）
   * @returns {void}
   * 
   * @behavior
   * 1. 更新 activeType 为新类型
   * 2. 使用 getDefaultsForType 加载新类型的默认组件
   * 3. 清空 configId 和 manualConfigName（新类型无关联配置）
   * 
   * @example
   * setActiveType('MTB'); // 切换到山地车并加载默认 MTB 组件
   */
  setActiveType: (type: BikeType) => void;

  /**
   * @method replaceComponent
   * @description 替换指定分类的组件
   * @param {ConfigComponent} newComponent - 要替换的新组件对象
   * @returns {void}
   * 
   * @logic
   * 遍历当前组件列表，若组件的 category 与新组件相同则替换，否则保持不变
   * 这确保每个分类只有一个组件
   * 
   * @example
   * replaceComponent({ id: 'frame-001', category: 'frame', name: 'Carbon Frame', price: 1500, weight: 800 });
   */
  replaceComponent: (newComponent: ConfigComponent) => void;

  /**
   * @method setComponents
   * @description 直接设置组件列表（用于批量更新）
   * @param {ConfigComponent[]} components - 新的组件数组
   * @returns {void}
   * 
   * @usage
   * 通常用于从配置加载完整组件集，而非单个替换
   */
  setComponents: (components: ConfigComponent[]) => void;

  /**
   * @method loadConfiguration
   * @description 加载已有配置到编辑器
   * @param {Configuration} config - 要加载的配置对象
   * @returns {void}
   * 
   * @behavior
   * 1. 设置 activeType 为配置的车类型
   * 2. 设置 components 为配置中的组件列表
   * 3. 设置 configId 为配置的 ID（用于后续更新）
   * 4. 设置 manualConfigName 为配置的名称
   * 
   * @example
   * loadConfiguration(savedConfig); // 加载用户之前保存的配置
   */
  loadConfiguration: (config: Configuration) => void;

  /**
   * @method resetToDefaults
   * @description 重置当前类型的所有组件为默认配置
   * @returns {void}
   * 
   * @behavior
   * 1. 获取当前类型的默认组件
   * 2. 清空 configId 和 manualConfigName
   * 3. 保留当前 activeType
   * 
   * @note
   * 此操作不可撤销，用户应先保存当前配置
   */
  resetToDefaults: () => void;

  /**
   * @method toggleLibrary
   * @description 切换组件库侧边栏的显示/隐藏状态
   * @returns {void}
   * 
   * @ui-effect
   * 控制右侧组件库面板的展开折叠
   */
  toggleLibrary: () => void;

  /**
   * @method toggleComponentSelector
   * @description 切换组件选择器弹窗的显示/隐藏状态
   * @param {string} [componentId] - 可选，要编辑的组件 ID
   * @returns {void}
   * 
   * @behavior
   * 1. 切换 showComponentSelector 状态
   * 2. 若提供 componentId 则设置 editingComponentId，否则保持原值
   * 
   * @example
   * toggleComponentSelector('frame-001'); // 打开选择器编辑车架
   * toggleComponentSelector(); // 关闭选择器
   */
  toggleComponentSelector: (componentId?: string) => void;

  /**
   * @method setMyConfigs
   * @description 设置用户保存的配置列表
   * @param {Configuration[]} configs - 配置数组
   * @returns {void}
   * 
   * @usage
   * 用于更新本地状态中的用户配置列表
   */
  setMyConfigs: (configs: Configuration[]) => void;

  /**
   * @method setLoggedIn
   * @description 设置用户登录状态
   * @param {boolean} loggedIn - 是否已登录
   * @returns {void}
   * 
   * @side-effects
   * 登录状态变化可能触发配置列表的重新加载
   */
  setLoggedIn: (loggedIn: boolean) => void;

  /**
   * @method setSaving
   * @description 设置保存操作的状态
   * @param {boolean} saving - 是否正在保存
   * @returns {void}
   * 
   * @usage
   * 用于显示/隐藏保存中的加载指示器
   */
  setSaving: (saving: boolean) => void;

  /**
   * @method setConfigId
   * @description 设置当前配置的唯一标识符
   * @param {string | null} id - 配置 ID，null 表示未保存的配置
   * @returns {void}
   */
  setConfigId: (id: string | null) => void;

  /**
   * @method setManualConfigName
   * @description 设置用户手动输入的配置名称
   * @param {string | null} name - 配置名称，null 使用默认名称
   * @returns {void}
   */
  setManualConfigName: (name: string | null) => void;

  /**
   * @method setUserId
   * @description 设置当前登录用户的 ID
   * @param {string | null} userId - 用户 ID，null 表示未登录
   * @returns {void}
   */
  setUserId: (userId: string | null) => void;

  /**
   * @method getTotalCost
   * @description 计算当前配置的总成本
   * @returns {number} 所有组件价格的累加总和
   * 
   * @calculation
   * 将 components 数组中所有组件的 price 属性求和
   * 
   * @example
   * const cost = getTotalCost(); // 返回如 5499
   */
  getTotalCost: () => number;

  /**
   * @method getTotalWeight
   * @description 计算当前配置的总重量
   * @returns {number} 重量值（单位：磅）
   * 
   * @calculation
   * 1. 获取当前类型的基准重量（BASE_WEIGHTS）
   * 2. 累加所有组件的重量
   * 3. 除以 WEIGHT_CONVERSION_FACTOR 转换为磅
   * 
   * @formula
   * totalWeight = (baseWeight + sum(component.weights)) / WEIGHT_CONVERSION_FACTOR
   */
  getTotalWeight: () => number;

  /**
   * @method saveConfiguration
   * @description 保存当前配置到 Firebase 或本地存储
   * @returns {Promise<void>}
   * 
   * @async
   * @fires
   * 1. 设置 isSaving = true 显示加载状态
   * 2. 构建 Configuration 对象
   * 3. 调用 Firebase 保存（失败时降级到本地 ID）
   * 4. 更新 myConfigs 列表（新增或更新）
   * 5. 设置 isSaving = false
   * 
   * @firebase-flow
   * 1. 动态导入 firebase-service 避免服务端问题
   * 2. 调用 saveConfigurationToFirebase 保存数据
   * 3. 若失败，记录警告并生成时间戳本地 ID
   * 
   * @error-handling
   * - Firebase 保存失败时降级到本地存储
   * - 确保 config.id 始终有值
   * - 保存失败后重置 isSaving 状态
   */
  saveConfiguration: () => Promise<void>;

  /**
   * @method deleteConfiguration
   * @description 删除指定配置
   * @param {string} configId - 要删除的配置 ID
   * @returns {Promise<void>}
   * 
   * @async
   * @behavior
   * 1. 尝试从 Firebase 删除配置
   * 2. 从本地 myConfigs 列表中移除
   * 3. 若删除的是当前配置，清空 configId
   * 
   * @error-handling
   * Firebase 删除失败时仍从本地删除（允许离线操作）
   */
  deleteConfiguration: (configId: string) => Promise<void>;

  /**
   * @method loadMyConfigs
   * @description 从 Firebase 加载用户的所有保存配置
   * @param {string} [userId] - 可选的用户 ID，不提供则加载所有公开配置
   * @returns {Promise<void>}
   * 
   * @async
   * @behavior
   * 1. 动态导入 Firebase 服务
   * 2. 调用 loadConfigurationsFromFirebase 获取配置列表
   * 3. 更新 myConfigs 和 userId 状态
   * 
   * @error-handling
   * 加载失败时记录错误但不影响 UI
   */
  loadMyConfigs: (userId?: string) => Promise<void>;

  /**
   * @property {string | null} userId
   * @description 当前登录用户的唯一标识符
   * @type {string | null}
   * 
   * @values
   * - string: 已登录用户的 Firebase UID
   * - null: 用户未登录或未加载
   */
  userId: string | null;

}

/**
 * @constant useConfigStore
 * @description Zustand Store 实例，用于管理自行车配置状态
 * 
 * @initial-state
 * - activeType: 'Road' - 默认自行车类型
 * - components: getDefaultsForType('Road') - Road 类型的默认组件
 * - configId: null - 新配置无 ID
 * - manualConfigName: null - 使用默认命名
 * - allDbComponents: [] - 空数组，待从数据库加载
 * - showLibrary: false - 侧边栏默认隐藏
 * - myConfigs: [] - 空配置列表
 * - isLoggedIn: false - 默认未登录
 * - isSaving: false - 默认未保存
 * - showComponentSelector: false - 选择器默认隐藏
 * - editingComponentId: '' - 无编辑中的组件
 * - userId: null - 未设置用户
 * 
 * @access-pattern
 * 推荐在组件中使用选择器解构：
 * const { components, getTotalCost } = useConfigStore();
 * 
 * @persistence
 * 状态默认存储在内存中，可配合 zustand/persist 实现本地持久化
 */
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
