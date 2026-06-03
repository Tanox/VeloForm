'use client';

import { useState } from 'react';
import { useConfigStore } from '@/lib/store';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Loader2, TrendingUp, Scale, Share2, Zap, Bike, User } from 'lucide-react';
import { ShareModal } from './ShareModal';
import { CostBreakdownChart } from './CostBreakdownChart';

export function SummaryPanel() {
  const t = useTranslation();
  const [showShareModal, setShowShareModal] = useState(false);
  const { 
    activeType, 
    getTotalCost, 
    getTotalWeight, 
    manualConfigName, 
    resetToDefaults, 
    isSaving, 
    saveConfiguration,
    userId 
  } = useConfigStore((state) => ({
    activeType: state.activeType,
    getTotalCost: state.getTotalCost,
    getTotalWeight: state.getTotalWeight,
    manualConfigName: state.manualConfigName,
    resetToDefaults: state.resetToDefaults,
    isSaving: state.isSaving,
    saveConfiguration: state.saveConfiguration,
    userId: state.userId,
  }));
  
  const isLoggedIn = userId !== null;
  
  const totalCost = getTotalCost();
  const totalWeight = getTotalWeight();

  const handleSave = async () => {
    await saveConfiguration();
  };

  const getBikeTypeIcon = (type: string) => {
    const icons: Record<string, typeof Bike> = {
      Road: Bike,
      MTB: Zap,
      Fold: Scale,
    };
    return icons[type] || Bike;
  };

  const BikeIcon = getBikeTypeIcon(activeType);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="sticky top-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-primary/15 to-accent/15 rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-tr-full" />
        
        <div className="relative space-y-5 sm:space-y-6 p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xs sm:text-sm font-medium text-muted mb-1 sm:mb-2">
                {t('configurator.currentBuild')}
              </h3>
              <p className="text-xl sm:text-2xl font-display font-bold text-foreground">
                {manualConfigName || `${activeType} Build`}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <BikeIcon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted uppercase tracking-wider">
                  {t(`bikeTypes.${activeType.toLowerCase()}`) || activeType}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div 
              className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-5"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-primary/20 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
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
              className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800/50 rounded-xl sm:rounded-2xl p-4 sm:p-5"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-accent/20 rounded-lg">
                  <Scale className="w-4 h-4 text-accent" />
                </div>
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

          <CostBreakdownChart />

          <div className="space-y-3 pt-2">
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
            
            <div className="grid grid-cols-2 gap-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full" onClick={() => setShowShareModal(true)} size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  {t('share.title')}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full" onClick={resetToDefaults} size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t('configurator.reset')}
                </Button>
              </motion.div>
            </div>
          </div>

          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl"
            >
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-amber-500 font-medium">
                    {t('configurator.loginToSave')}
                  </p>
                  <p className="text-xs text-amber-500/70 mt-1">
                    {t('configurator.loginToSaveHint')}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
      
      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
    </motion.div>
  );
}