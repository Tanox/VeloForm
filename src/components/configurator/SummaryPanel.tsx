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
    userId,
    components 
  } = useConfigStore((state) => ({
    activeType: state.activeType,
    getTotalCost: state.getTotalCost,
    getTotalWeight: state.getTotalWeight,
    manualConfigName: state.manualConfigName,
    resetToDefaults: state.resetToDefaults,
    isSaving: state.isSaving,
    saveConfiguration: state.saveConfiguration,
    userId: state.userId,
    components: state.components,
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

  const getComponentCost = (category: string) => {
    const component = components.find(c => c.category === category);
    return component ? component.price : 0;
  };

  const BikeIcon = getBikeTypeIcon(activeType);

  const categories = ['Frame', 'Drivetrain', 'Wheelset', 'Cockpit', 'Tires'];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <Card className="p-6">
        <h3 className="text-xl font-display font-bold text-foreground mb-6">
          Build Summary
        </h3>

        <div className="text-center py-4 mb-4 bg-secondary/50 rounded-xl">
          <p className="text-sm text-muted mb-2">Total Cost</p>
          <motion.p
            key={totalCost}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.4 }}
            className="text-4xl font-display font-bold text-primary animate-counter"
          >
            {formatCurrency(totalCost)}
          </motion.p>
        </div>

        <div className="text-center py-4 mb-6 bg-secondary/50 rounded-xl">
          <p className="text-sm text-muted mb-2">Estimated Weight</p>
          <motion.p
            key={totalWeight}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.4 }}
            className="text-4xl font-display font-bold text-primary animate-counter"
          >
            {formatWeight(totalWeight)}
          </motion.p>
        </div>

        <div className="space-y-3 mb-6">
          {categories.map((category) => {
            const cost = getComponentCost(category);
            return (
              <div key={category} className="flex justify-between text-sm py-2 border-b border-border">
                <span className="text-muted">{category}</span>
                <span className="text-primary font-medium">{formatCurrency(cost)}</span>
              </div>
            );
          })}
        </div>

        <div className="space-y-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white shadow-lg shadow-primary/20 hover:shadow-primary/40" size="md" onClick={handleSave} disabled={isSaving}>
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
      </Card>
      
      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
    </motion.div>
  );
}