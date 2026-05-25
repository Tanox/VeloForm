'use client';

import { useConfigStore } from '@/lib/store';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Loader2 } from 'lucide-react';

export function SummaryPanel() {
  const { activeType, getTotalCost, getTotalWeight, manualConfigName, resetToDefaults, isSaving, saveConfiguration } =
    useConfigStore((state) => ({
      activeType: state.activeType,
      getTotalCost: state.getTotalCost,
      getTotalWeight: state.getTotalWeight,
      manualConfigName: state.manualConfigName,
      resetToDefaults: state.resetToDefaults,
      isSaving: state.isSaving,
      saveConfiguration: state.saveConfiguration,
    }));
  const totalCost = getTotalCost();
  const totalWeight = getTotalWeight();

  return (
    <Card className="sticky top-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-muted mb-2">Current Build</h3>
          <p className="text-2xl font-display font-bold text-foreground">
            {manualConfigName || `${activeType} Build`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-zinc-900 rounded-xl p-4">
            <p className="text-xs text-muted uppercase tracking-wide mb-1">Total Cost</p>
            <motion.p
              key={totalCost}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              className="text-2xl font-bold text-primary"
            >
              {formatCurrency(totalCost)}
            </motion.p>
          </div>
          <div className="bg-zinc-900 rounded-xl p-4">
            <p className="text-xs text-muted uppercase tracking-wide mb-1">Est. Weight</p>
            <motion.p
              key={totalWeight}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              className="text-2xl font-bold text-accent"
            >
              {formatWeight(totalWeight)}
            </motion.p>
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full" size="lg" onClick={saveConfiguration} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isSaving ? 'Saving...' : 'Save Build'}
          </Button>
          <Button variant="outline" className="w-full" onClick={resetToDefaults}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}
