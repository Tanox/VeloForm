'use client';

import { useState, useCallback, useMemo } from 'react';
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
import { saveConfiguration as saveConfig } from '@/lib/config-service';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Save, RefreshCw, Loader2, TrendingUp, Scale, Share2, Zap, Bike, User } from 'lucide-react';
import { ShareModal } from './ShareModal';
import { CostBreakdownChart } from './CostBreakdownChart';

const getBikeTypeIcon = (type: string): typeof Bike => {
  const icons: Record<string, typeof Bike> = {
    Road: Bike,
    MTB: Zap,
    Fold: Scale,
  };
  return icons[type] || Bike;
};

export function SummaryPanel() {
  const t = useTranslation();
  const [showShareModal, setShowShareModal] = useState(false);
  const activeType = useActiveType();
  const totalCost = useTotalCost();
  const totalWeight = useTotalWeight();
  const manualConfigName = useManualConfigName();
  const resetToDefaults = useConfigStore((s) => s.resetToDefaults);
  const isSaving = useIsSaving();
  const userId = useUserId();

  const isLoggedIn = userId !== null;

  const handleSave = useCallback(async () => {
    await saveConfig();
  }, []);

  const BikeIcon = useMemo(() => getBikeTypeIcon(activeType), [activeType]);

  return (
    <>
      <Card className="sticky top-24">
        <div className="space-y-5 p-5">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              当前配置
            </p>
            <p className="text-xl font-display font-semibold text-foreground tracking-tight">
              {manualConfigName || `${activeType} Build`}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="p-1.5 bg-surface-tertiary rounded-md" aria-hidden="true">
                <BikeIcon className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                {t(`bikeTypes.${activeType.toLowerCase()}`) || activeType}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3" role="list">
            <div role="listitem" className="bg-surface-secondary border border-border-light rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-background rounded-md" aria-hidden="true">
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  {t('configurator.totalCost')}
                </p>
              </div>
              <p
                className="text-2xl font-display font-semibold text-foreground tracking-tight"
                aria-label={`总价: ${formatCurrency(totalCost)}`}
              >
                {formatCurrency(totalCost)}
              </p>
            </div>

            <div role="listitem" className="bg-surface-secondary border border-border-light rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 bg-background rounded-md" aria-hidden="true">
                  <Scale className="w-4 h-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                  {t('configurator.estimatedWeight')}
                </p>
              </div>
              <p
                className="text-2xl font-display font-semibold text-foreground tracking-tight"
                aria-label={`总重量: ${formatWeight(totalWeight)}`}
              >
                {formatWeight(totalWeight)}
              </p>
            </div>
          </div>

          <CostBreakdownChart />

          <div className="space-y-3 pt-2">
            <Button
              size="lg"
              className="w-full"
              onClick={handleSave}
              disabled={isSaving}
              aria-label={isSaving ? '保存配置中' : '保存配置'}
              aria-busy={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
                  保存中...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" aria-hidden="true" />
                  保存配置
                </>
              )}
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => setShowShareModal(true)}
                aria-label="分享配置"
              >
                <Share2 className="w-4 h-4 mr-2" aria-hidden="true" />
                分享
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={resetToDefaults}
                aria-label="重置为默认配置"
              >
                <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                重置
              </Button>
            </div>
          </div>

          {!isLoggedIn && (
            <div className="p-4 bg-primary/5 border border-primary/15 rounded-lg">
              <div className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <User className="w-4 h-4 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {t('configurator.loginToSave')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('configurator.loginToSaveHint')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
    </>
  );
}
