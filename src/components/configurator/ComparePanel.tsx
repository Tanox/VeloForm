'use client';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useComparingConfigs, useCompareStore, useConfigStore } from '@/lib/stores';
import { useTranslation } from '@/lib/i18n';
import { ComparePanelHeader } from './ComparePanelHeader';
import { CompareTable } from './CompareTable';
import { CompareActions } from './CompareActions';

export function ComparePanel() {
  const t = useTranslation();
  const comparingConfigs = useComparingConfigs();
  const clearCompare = useCompareStore((s) => s.clearCompare);
  const loadConfiguration = useConfigStore((s) => s.loadConfiguration);

  const getBestValue = useCallback((values: number[], lowerIsBetter: boolean = true) => {
    return lowerIsBetter ? Math.min(...values) : Math.max(...values);
  }, []);

  const handleLoad = useCallback(
    (config: (typeof comparingConfigs)[number]) => {
      loadConfiguration(config);
      clearCompare();
    },
    [loadConfiguration, clearCompare]
  );

  if (comparingConfigs.length < 2) return null;

  const costs = comparingConfigs
    .map((c) => c.totalCost)
    .filter((v): v is number => typeof v === 'number');
  const weights = comparingConfigs
    .map((c) => c.estimatedWeight)
    .filter((v): v is number => typeof v === 'number');
  const minCost = costs.length > 0 ? Math.min(...costs) : 0;
  const minWeight = weights.length > 0 ? Math.min(...weights) : 0;

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
            <ComparePanelHeader configCount={comparingConfigs.length} onClose={clearCompare} />
            <CompareTable
              comparingConfigs={comparingConfigs}
              minCost={minCost}
              minWeight={minWeight}
              getBestValue={getBestValue}
              t={t}
            />
            <CompareActions comparingConfigs={comparingConfigs} onLoad={handleLoad} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
