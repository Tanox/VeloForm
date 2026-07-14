/**
 * Store 选择器 hooks
 * src/lib/store/selectors.ts v4.1.0
 */

import { APP_CONSTANTS } from '@/lib/constants';
import type { LegacyConfigStore } from './types';

/**
 * 选择当前激活的自行车类型
 */
export const selectActiveType = (state: LegacyConfigStore) => state.activeType;

/**
 * 选择组件列表
 */
export const selectComponents = (state: LegacyConfigStore) => state.components;

/**
 * 选择我的配置列表
 */
export const selectMyConfigs = (state: LegacyConfigStore) => state.myConfigs;

/**
 * 选择保存状态
 */
export const selectIsSaving = (state: LegacyConfigStore) => state.isSaving;

/**
 * 选择用户 ID
 */
export const selectUserId = (state: LegacyConfigStore) => state.userId;

/**
 * 计算总成本
 */
export const selectTotalCost = (state: LegacyConfigStore) =>
  state.components.reduce((sum, c) => sum + c.price, 0);

/**
 * 计算总重量
 */
export const selectTotalWeight = (state: LegacyConfigStore) => {
  const baseWeight = APP_CONSTANTS.BASE_WEIGHTS[state.activeType];
  const componentWeight = state.components.reduce((sum, c) => sum + c.weight, 0);
  return (baseWeight + componentWeight) / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR;
};

/**
 * 细粒度 selector hooks（保持向后兼容）
 * 这些 hooks 提供了更精确的订阅，避免不必要的重渲染
 */
export const useActiveType = (store: {
  (selector: typeof selectActiveType): ReturnType<typeof selectActiveType>;
}) => store(selectActiveType);

export const useComponents = (store: {
  (selector: typeof selectComponents): ReturnType<typeof selectComponents>;
}) => store(selectComponents);

export const useMyConfigs = (store: {
  (selector: typeof selectMyConfigs): ReturnType<typeof selectMyConfigs>;
}) => store(selectMyConfigs);

export const useIsSaving = (store: {
  (selector: typeof selectIsSaving): ReturnType<typeof selectIsSaving>;
}) => store(selectIsSaving);

export const useUserId = (store: {
  (selector: typeof selectUserId): ReturnType<typeof selectUserId>;
}) => store(selectUserId);

export const useTotalCost = (store: { (selector: (state: LegacyConfigStore) => number): number }) =>
  store(selectTotalCost);

export const useTotalWeight = (store: {
  (selector: (state: LegacyConfigStore) => number): number;
}) => store(selectTotalWeight);
