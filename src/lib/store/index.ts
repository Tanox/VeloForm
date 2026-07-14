/**
 * Store 模块索引
 * src/lib/store/index.ts v4.1.0
 */

// 类型导出
export type { ConfigState, ConfigStoreActions, LegacyConfigStore } from './types';

// 业务操作导出
export {
  createSaveConfiguration,
  createDeleteConfiguration,
  generateShareableLink,
  exportConfiguration,
  createToggleCompare,
  MAX_COMPARE,
} from './actions';

// 选择器导出
export {
  selectActiveType,
  selectComponents,
  selectMyConfigs,
  selectIsSaving,
  selectUserId,
  selectTotalCost,
  selectTotalWeight,
} from './selectors';
