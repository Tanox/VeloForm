'use client';

import React from 'react';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import { Configuration } from '@/types';
import { TrendingDown, TrendingUp, Minus, Sparkles } from 'lucide-react';

interface CompareTableProps {
  comparingConfigs: Configuration[];
  minCost: number;
  minWeight: number;
  getBestValue: (values: number[], lowerIsBetter?: boolean) => number;
  t: (key: string, params?: Record<string, string | number>) => string | readonly string[];
}

function CompareTableBase({ comparingConfigs, minCost, minWeight, getBestValue, t }: CompareTableProps) {
  const categories = comparingConfigs[0]?.components.map((c) => c.category) || [];

  return (
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
  );
}

export const CompareTable = React.memo(CompareTableBase);
