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
  useConfigUIStore,
} from '@/lib/stores';
import { saveConfiguration as saveConfig } from '@/lib/config-service';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import { useWhimsy } from '@/lib/whimsy-copy';
import { Card } from '@/components/ui/card';
import { TrendingUp, Scale } from 'lucide-react';
import { ShareModal } from './ShareModal';
import { VersionHistory } from './VersionHistory';
import { CostBreakdownChart } from './CostBreakdownChart';
import {
  MobileSummaryBar,
  CompletionIndicator,
  StatCard,
  getBikeTypeIcon,
} from './SummaryPanel.parts';
import { ActionButtons, LoginPrompt } from './SummaryPanel.actions';

export function SummaryPanel() {
  const t = useTranslation();
  const w = useWhimsy();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const activeType = useActiveType();
  const totalCost = useTotalCost();
  const totalWeight = useTotalWeight();
  const manualConfigName = useManualConfigName();
  const resetToDefaults = useConfigStore((s) => s.resetToDefaults);
  const isSaving = useIsSaving();
  const userId = useUserId();

  const isLoggedIn = userId !== null;
  const setSaving = useConfigUIStore((s) => s.setSaving);

  const handleSave = useCallback(
    async () => {
      // 进入保存态：禁用按钮，防止连点/快捷键造成并发写入与重复记录
      setSaving(true);
      try {
        await saveConfig();
        const savedId = useConfigStore.getState().configId;
        if (savedId) {
          window.dispatchEvent(
            new CustomEvent('veloform:celebrate', {
              detail: {
                title: w('save.savedTitle'),
                message: w('save.savedMsg'),
                icon: '🚀',
              },
            })
          );
        }
      } finally {
        setSaving(false);
      }
    },
    [w, setSaving]
  );

  const BikeIcon = useMemo(() => getBikeTypeIcon(activeType), [activeType]);

  return (
    <>
      <Card id="summary-panel" className="sticky top-20 z-30">
        <div className="space-y-5 p-5">
          {/* 移动端固定摘要条：滚动时始终可见实时价格与重量 */}
          <MobileSummaryBar />

          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {t('configurator.currentBuild')}
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

          {/* 配置完成度指示器 */}
          <CompletionIndicator />

          <div className="grid grid-cols-2 gap-3" role="list">
            <StatCard
              labelKey="configurator.totalCost"
              value={formatCurrency(totalCost)}
              icon={TrendingUp}
            />
            <StatCard
              labelKey="configurator.estimatedWeight"
              value={formatWeight(totalWeight)}
              icon={Scale}
            />
          </div>

          <CostBreakdownChart />

          <ActionButtons
            onSave={handleSave}
            isSaving={isSaving}
            onShare={() => setShowShareModal(true)}
            onVersionHistory={() => setShowVersionHistory(true)}
            onReset={resetToDefaults}
          />

          {!isLoggedIn && <LoginPrompt />}
        </div>
      </Card>

      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
      <VersionHistory isOpen={showVersionHistory} onClose={() => setShowVersionHistory(false)} />
    </>
  );
}
