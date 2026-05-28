'use client';

import { motion } from 'framer-motion';
import { useConfigStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { X, TrendingDown, TrendingUp, Minus } from 'lucide-react';

export function ComparePanel() {
  const t = useTranslation();
  const comparingConfigs = useConfigStore((state) => state.getComparingConfigs());
  const clearCompare = useConfigStore((state) => state.clearCompare);
  const loadConfiguration = useConfigStore((state) => state.loadConfiguration);
  const toggleCompare = useConfigStore((state) => state.toggleCompare);

  if (comparingConfigs.length < 2) return null;

  const categories = comparingConfigs[0]?.components.map((c) => c.category) || [];
  const minCost = Math.min(...comparingConfigs.map((c) => c.totalCost));
  const minWeight = Math.min(...comparingConfigs.map((c) => c.estimatedWeight));

  const getBestValue = (values: number[], lowerIsBetter: boolean = true) => {
    return lowerIsBetter ? Math.min(...values) : Math.max(...values);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-xl border-t border-zinc-800 z-50 p-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {t('compare.title')} ({comparingConfigs.length} {t('compare.configs')})
          </h3>
          <Button variant="ghost" size="sm" onClick={clearCompare}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted">
                  {t('compare.component')}
                </th>
                {comparingConfigs.map((config) => (
                  <th key={config.id} className="text-center py-3 px-4">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-foreground">{config.name}</span>
                      <span className="text-xs text-muted">{config.bikeType}</span>
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
                  <tr key={category} className="border-t border-zinc-800">
                    <td className="py-3 px-4 text-sm font-medium text-muted">
                      {t(`categories.${category.toLowerCase()}`) || category}
                    </td>
                    {components.map((comp, idx) => (
                      <td key={idx} className="text-center py-3 px-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-foreground truncate">
                            {comp?.name}
                          </p>
                          <p
                            className={`text-sm font-semibold ${
                              comp?.price === bestPrice && prices.length > 1
                                ? 'text-green-500'
                                : 'text-primary'
                            }`}
                          >
                            {formatCurrency(comp?.price || 0)}
                          </p>
                          <p
                            className={`text-xs ${
                              comp?.weight === bestWeight && weights.length > 1
                                ? 'text-green-500'
                                : 'text-muted'
                            }`}
                          >
                            {formatWeight((comp?.weight || 0) / 1000)}
                          </p>
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr className="border-t border-zinc-700 bg-zinc-900/50">
                <td className="py-3 px-4 text-sm font-semibold text-foreground">
                  {t('configurator.totalCost')}
                </td>
                {comparingConfigs.map((config, idx) => (
                  <td key={idx} className="text-center py-3 px-4">
                    <p
                      className={`text-lg font-bold ${
                        config.totalCost === minCost && comparingConfigs.length > 1
                          ? 'text-green-500'
                          : 'text-primary'
                      }`}
                    >
                      {formatCurrency(config.totalCost)}
                    </p>
                    {idx > 0 && (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {config.totalCost < comparingConfigs[idx - 1].totalCost ? (
                          <>
                            <TrendingDown className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-500">
                              -{((config.totalCost - comparingConfigs[idx - 1].totalCost) /
                                comparingConfigs[idx - 1].totalCost) *
                                100}%
                            </span>
                          </>
                        ) : config.totalCost > comparingConfigs[idx - 1].totalCost ? (
                          <>
                            <TrendingUp className="w-3 h-3 text-red-500" />
                            <span className="text-xs text-red-500">
                              +{((config.totalCost - comparingConfigs[idx - 1].totalCost) /
                                comparingConfigs[idx - 1].totalCost) *
                                100}%
                            </span>
                          </>
                        ) : (
                          <Minus className="w-3 h-3 text-muted" />
                        )}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-t border-zinc-700 bg-zinc-900/50">
                <td className="py-3 px-4 text-sm font-semibold text-foreground">
                  {t('configurator.estimatedWeight')}
                </td>
                {comparingConfigs.map((config, idx) => (
                  <td key={idx} className="text-center py-3 px-4">
                    <p
                      className={`text-lg font-bold ${
                        config.estimatedWeight === minWeight && comparingConfigs.length > 1
                          ? 'text-green-500'
                          : 'text-accent'
                      }`}
                    >
                      {formatWeight(config.estimatedWeight)}
                    </p>
                    {idx > 0 && (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {config.estimatedWeight < comparingConfigs[idx - 1].estimatedWeight ? (
                          <>
                            <TrendingDown className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-500">
                              -{((config.estimatedWeight -
                                comparingConfigs[idx - 1].estimatedWeight) /
                                comparingConfigs[idx - 1].estimatedWeight) *
                                100}%
                            </span>
                          </>
                        ) : config.estimatedWeight > comparingConfigs[idx - 1].estimatedWeight ? (
                          <>
                            <TrendingUp className="w-3 h-3 text-red-500" />
                            <span className="text-xs text-red-500">
                              +{((config.estimatedWeight -
                                comparingConfigs[idx - 1].estimatedWeight) /
                                comparingConfigs[idx - 1].estimatedWeight) *
                                100}%
                            </span>
                          </>
                        ) : (
                          <Minus className="w-3 h-3 text-muted" />
                        )}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex gap-3 mt-4">
          {comparingConfigs.map((config) => (
            <Button
              key={config.id}
              variant="outline"
              size="sm"
              onClick={() => {
                loadConfiguration(config);
                clearCompare();
              }}
              className="flex-1"
            >
              {t('compare.load')} {config.name}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={clearCompare}>
            {t('compare.close')}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}