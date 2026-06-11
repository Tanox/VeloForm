'use client';

import { useState } from 'react';
import {
  useActiveType,
  useTotalCost,
  useTotalWeight,
  useManualConfigName,
  useConfigStore,
  useIsSaving,
  useUserId,
} from '@/lib/stores';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { useConfigStore as useLegacyStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Loader2, TrendingUp, Scale, Share2, Zap, Bike, User, Sparkles } from 'lucide-react';
import { ShareModal } from './ShareModal';
import { CostBreakdownChart } from './CostBreakdownChart';

export function SummaryPanel() {
  const t = useTranslation();
  const [showShareModal, setShowShareModal] = useState(false);
  const activeType = useActiveType();
  const totalCost = useTotalCost();
  const totalWeight = useTotalWeight();
  const manualConfigName = useManualConfigName();
  const resetToDefaults = useConfigStore((s) => s.resetToDefaults);
  const saveConfiguration = useLegacyStore((s) => s.saveConfiguration);
  const isSaving = useIsSaving();
  const userId = useUserId();

  const isLoggedIn = userId !== null;

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
      <Card className="sticky top-24 overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
        {/* 装饰背景 */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-radial from-primary/20 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-radial from-accent/10 to-transparent rounded-tr-full" />

        <div className="relative space-y-5 sm:space-y-6 p-5 sm:p-6">
          {/* 标题区 */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  当前配置
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-display font-bold text-foreground">
                {manualConfigName || `${activeType} Build`}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="p-1.5 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg">
                  <BikeIcon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-xs text-muted uppercase tracking-wider">
                  {t(`bikeTypes.${activeType.toLowerCase()}`) || activeType}
                </span>
              </div>
            </div>
          </div>

          {/* 统计卡片 */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <motion.div
              className="relative bg-surface-tertiary/50 backdrop-blur-sm border border-border-light rounded-2xl p-4 sm:p-5 overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {/* 顶部装饰线 */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-transparent" />

              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-primary/20 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <p className="text-xs text-muted/80 uppercase tracking-wide font-medium">
                  {t('configurator.totalCost')}
                </p>
              </div>
              <motion.p
                key={totalCost}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent"
              >
                {formatCurrency(totalCost)}
              </motion.p>
            </motion.div>

            <motion.div
              className="relative bg-surface-tertiary/50 backdrop-blur-sm border border-border-light rounded-2xl p-4 sm:p-5 overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {/* 顶部装饰线 */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-transparent" />

              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-accent/20 rounded-lg">
                  <Scale className="w-4 h-4 text-accent" />
                </div>
                <p className="text-xs text-muted/80 uppercase tracking-wide font-medium">
                  {t('configurator.estimatedWeight')}
                </p>
              </div>
              <motion.p
                key={totalWeight}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent"
              >
                {formatWeight(totalWeight)}
              </motion.p>
            </motion.div>
          </div>

          {/* 成本分解图表 */}
          <CostBreakdownChart />

          {/* 操作按钮 */}
          <div className="space-y-3 pt-2">
            {/* 保存按钮 */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                className="w-full btn-gradient"
                size="lg"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    保存中...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    保存配置
                  </>
                )}
              </Button>
            </motion.div>

            {/* 次要操作 */}
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowShareModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-tertiary/50 border border-border-light hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <Share2 className="w-4 h-4 text-muted" />
                <span className="text-sm font-medium text-foreground">分享</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetToDefaults}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-surface-tertiary/50 border border-border-light hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4 text-muted" />
                <span className="text-sm font-medium text-foreground">重置</span>
              </motion.button>
            </div>
          </div>

          {/* 登录提示 */}
          {!isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-500">
                    {t('configurator.loginToSave')}
                  </p>
                  <p className="text-xs text-muted mt-1 leading-relaxed">
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
