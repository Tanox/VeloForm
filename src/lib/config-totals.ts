// 文件路径: src/lib/config-totals.ts v4.4.9
import { APP_CONSTANTS } from '@/lib/constants';
import type { BikeType, ConfigComponent } from '@/types';

export interface ConfigTotals {
  totalCost: number;
  estimatedWeight: number;
}

/**
 * 全站唯一的价格 / 重量计算口径。
 * 过滤非有限值与负数，避免被篡改的 localStorage 数据产生 NaN 或负值展示。
 */
export function calculateTotals(
  components: readonly ConfigComponent[],
  bikeType: BikeType
): ConfigTotals {
  const valid = components.filter(
    (comp) => Number.isFinite(comp.price) && Number.isFinite(comp.weight)
  );
  const totalCost = valid.reduce((sum, comp) => sum + Math.max(0, comp.price), 0);
  const componentWeight = valid.reduce((sum, comp) => sum + Math.max(0, comp.weight), 0);
  const estimatedWeight =
    (APP_CONSTANTS.BASE_WEIGHTS[bikeType] + componentWeight) /
    APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR;
  return { totalCost, estimatedWeight };
}
