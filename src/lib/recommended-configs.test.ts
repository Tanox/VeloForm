// 文件路径: src/lib/recommended-configs.test.ts v4.4.9
import { describe, it, expect } from 'vitest';
import { recommendedConfigurations } from './recommended-configs';
import { calculateTotals } from './config-totals';

describe('recommendedConfigurations', () => {
  it('提供四类推荐配置且 id 唯一', () => {
    expect(recommendedConfigurations).toHaveLength(4);
    expect(new Set(recommendedConfigurations.map((c) => c.id)).size).toBe(4);
  });

  it('总价与重量均由组件明细派生，与唯一计算口径一致', () => {
    recommendedConfigurations.forEach((config) => {
      const totals = calculateTotals(config.components, config.bikeType);
      expect(config.totalCost).toBe(totals.totalCost);
      expect(config.estimatedWeight).toBe(totals.estimatedWeight);
      expect(Number.isFinite(config.totalCost)).toBe(true);
      expect(Number.isFinite(config.estimatedWeight)).toBe(true);
    });
  });
});
