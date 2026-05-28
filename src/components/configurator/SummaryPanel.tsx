'use client';

import { useConfigStore } from '@/lib/store';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Loader2, TrendingUp, Scale } from 'lucide-react';

export function SummaryPanel() {
  const t = useTranslation();
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

  const handleSave = async () => {
    await saveConfiguration();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="sticky top-20 sm:top-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-bl-full" />
        <div className="relative space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-xs sm:text-sm font-medium text-muted mb-1 sm:mb-2">
              {t('configurator.currentBuild')}
            </h3>
            <p className="text-xl sm:text-2xl font-display font-bold text-foreground">
              {manualConfigName || `${activeType} Build`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div 
              className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-5"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary/70" />
                <p className="text-xs text-muted/80 uppercase tracking-wide">
                  {t('configurator.totalCost')}
                </p>
              </div>
              <motion.p
                key={totalCost}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 0.4 }}
                className="text-2xl sm:text-3xl font-bold text-primary"
              >
                {formatCurrency(totalCost)}
              </motion.p>
            </motion.div>
            <motion.div 
              className="bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-5"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent/70" />
                <p className="text-xs text-muted/80 uppercase tracking-wide">
                  {t('configurator.estimatedWeight')}
                </p>
              </div>
              <motion.p
                key={totalWeight}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 0.4 }}
                className="text-2xl sm:text-3xl font-bold text-accent"
              >
                {formatWeight(totalWeight)}
              </motion.p>
            </motion.div>
          </div>

          <div className="space-y-2 sm:space-y-3 pt-2">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full" size="md" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t('configurator.saving')}
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t('configurator.saveBuild')}
                  </>
                )}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="w-full" size="md" onClick={resetToDefaults}>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('configurator.reset')}
              </Button>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
