'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useComparingConfigs, useCompareStore, useConfigStore } from '@/lib/stores';
import { useTranslation } from '@/lib/i18n';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  X,
  TrendingDown,
  TrendingUp,
  Minus,
  GitCompare,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export function ComparePanel() {
  const t = useTranslation();
  const comparingConfigs = useComparingConfigs();
  const clearCompare = useCompareStore((s) => s.clearCompare);
  const loadConfiguration = useConfigStore((s) => s.loadConfiguration);
  const toggleCompare = useCompareStore((s) => s.toggleCompare);

  if (comparingConfigs.length < 2) return null;

  const categories = comparingConfigs[0]?.components.map((c) => c.category) || [];
  const costs = comparingConfigs
    .map((c) => c.totalCost)
    .filter((v): v is number => typeof v === 'number');
  const weights = comparingConfigs
    .map((c) => c.estimatedWeight)
    .filter((v): v is number => typeof v === 'number');
  const minCost = costs.length > 0 ? Math.min(...costs) : 0;
  const minWeight = weights.length > 0 ? Math.min(...weights) : 0;

  const getBestValue = (values: number[], lowerIsBetter: boolean = true) => {
    return lowerIsBetter ? Math.min(...values) : Math.max(...values);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50"
      >
        {/* 主面板 */}
        <div className="bg-surface-secondary/95 backdrop-blur-xl border-t border-border-light shadow-2xl">
          {/* 头部 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <GitCompare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    配置对比
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {comparingConfigs.length} 个配置
                    </span>
                  </h3>
                  <p className="text-sm text-muted-foreground">比较不同配置的成本和重量差异</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={clearCompare}
                className="hover:bg-surface-tertiary"
              >
                <X className="w-4 h-4 mr-2" />
                关闭
              </Button>
            </div>

            {/* 对比表格 */}
            <div className="overflow-x-auto rounded-2xl border border-border-light overflow-hidden">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-surface-tertiary/50">
                    <th className="text-left py-4 px-5 text-sm font-semibold text-muted-foreground w-1/5">
                      组件
                    </th>
                    {comparingConfigs.map((config) => (
                      <th key={config.id} className="text-center py-4 px-4">
                        <div className="flex flex-col items-center">
                          <span className="font-bold text-foreground">{config.name}</span>
                          <span className="text-xs text-muted-foreground mt-1 px-2 py-0.5 bg-surface-tertiary/50 rounded-full">
                            {config.bikeType}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => {
                    const components = comparingConfigs.map((config) =>
                      config.components.find((c) => c.category === category)
                    );
                    const prices = components.map((c) => c?.price || 0);
                    const weights = components.map((c) => c?.weight || 0);
                    const bestPrice = getBestValue(prices);
                    const bestWeight = getBestValue(weights);

                    return (
                      <tr key={category} className="border-t border-border-light">
                        <td className="py-4 px-5">
                          <span className="text-sm font-semibold text-foreground">
                            {t(`categories.${category.toLowerCase()}`) || category}
                          </span>
                        </td>
                        {components.map((comp, idx) => (
                          <td key={idx} className="text-center py-4 px-4">
                            <div className="space-y-1.5">
                              <p className="text-sm font-medium text-foreground truncate max-w-[150px] mx-auto">
                                {comp?.name || '-'}
                              </p>
                              <p
                                className={`text-base font-bold ${
                                  comp?.price === bestPrice && prices.length > 1
                                    ? 'text-accent'
                                    : 'text-primary'
                                }`}
                              >
                                {comp ? formatCurrency(comp.price) : '-'}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {comp ? formatWeight(comp.weight / 1000) : '-'}
                              </p>
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })}

                  {/* 总成本行 */}
                  <tr className="border-t-2 border-border bg-gradient-to-r from-primary/5 to-transparent">
                    <td className="py-5 px-5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-foreground">总成本</span>
                        <Sparkles className="w-4 h-4 text-primary" />
                      </div>
                    </td>
                    {comparingConfigs.map((config, idx) => (
                      <td key={idx} className="text-center py-5 px-4">
                        <div className="space-y-2">
                          <p
                            className={`text-xl font-bold ${
                              config.totalCost === minCost && comparingConfigs.length > 1
                                ? 'text-accent'
                                : 'text-primary'
                            }`}
                          >
                            {formatCurrency(config.totalCost)}
                          </p>
                          {idx > 0 && (
                            <div className="flex items-center justify-center gap-1">
                              {config.totalCost < comparingConfigs[idx - 1].totalCost ? (
                                <>
                                  <TrendingDown className="w-3.5 h-3.5 text-accent" />
                                  <span className="text-xs text-accent font-medium">
                                    -
                                    {Math.abs(
                                      ((config.totalCost - comparingConfigs[idx - 1].totalCost) /
                                        comparingConfigs[idx - 1].totalCost) *
                                        100
                                    ).toFixed(1)}
                                    %
                                  </span>
                                </>
                              ) : config.totalCost > comparingConfigs[idx - 1].totalCost ? (
                                <>
                                  <TrendingUp className="w-3.5 h-3.5 text-red-500" />
                                  <span className="text-xs text-red-500 font-medium">
                                    +
                                    {Math.abs(
                                      ((config.totalCost - comparingConfigs[idx - 1].totalCost) /
                                        comparingConfigs[idx - 1].totalCost) *
                                        100
                                    ).toFixed(1)}
                                    %
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">持平</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* 总重量行 */}
                  <tr className="border-t border-border-light bg-surface-tertiary/30">
                    <td className="py-5 px-5">
                      <span className="text-sm font-bold text-foreground">预估重量</span>
                    </td>
                    {comparingConfigs.map((config, idx) => (
                      <td key={idx} className="text-center py-5 px-4">
                        <p
                          className={`text-lg font-bold ${
                            config.estimatedWeight === minWeight && comparingConfigs.length > 1
                              ? 'text-accent'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {formatWeight(config.estimatedWeight)}
                        </p>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 操作按钮 */}
            <div className="flex flex-wrap gap-3 mt-4">
              {comparingConfigs.map((config) => (
                <motion.div
                  key={config.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 min-w-[150px]"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      loadConfiguration(config);
                      clearCompare();
                    }}
                    className="w-full border-primary/30 hover:bg-primary/5 hover:border-primary"
                  >
                    加载 {config.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
