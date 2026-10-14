'use client';

import { useMemo } from 'react';
import { useActiveType, useTotalCost, useTotalWeight, useComponents } from '@/lib/stores';
import { getDefaultsForType, APP_CONSTANTS } from '@/lib/constants';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import { TrendingUp, Scale, Zap, Bike } from 'lucide-react';

const getBikeTypeIcon = (type: string): typeof Bike => {
  const icons: Record<string, typeof Bike> = {
    Road: Bike,
    MTB: Zap,
    Fold: Scale,
  };
  return icons[type] || Bike;
};
export { getBikeTypeIcon };

// 移动端固定摘要条：滚动时始终可见实时价格与重量
export function MobileSummaryBar() {
  const t = useTranslation();
  const totalCost = useTotalCost();
  const totalWeight = useTotalWeight();
  return (
    <div className="lg:hidden flex items-center justify-between gap-3 rounded-lg bg-surface-secondary border border-border-light px-3 py-2">
      <div className="flex flex-col">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {t('configurator.totalCost')}
        </span>
        <span className="text-sm font-display font-semibold text-foreground">
          {formatCurrency(totalCost)}
        </span>
      </div>
      <div className="flex flex-col text-right">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
          {t('configurator.estimatedWeight')}
        </span>
        <span className="text-sm font-display font-semibold text-foreground">
          {formatWeight(totalWeight)}
        </span>
      </div>
    </div>
  );
}

// 配置完成度指示器：已自定义（与默认不同）的分类数 / 总分类数
export function CompletionIndicator() {
  const t = useTranslation();
  const activeType = useActiveType();
  const components = useComponents();
  const totalCategories = APP_CONSTANTS.COMPONENT_CATEGORIES.length;
  const customizedCount = useMemo(() => {
    const defaults = getDefaultsForType(activeType);
    return components.filter((c) => {
      const d = defaults.find((x) => x.category === c.category);
      return d ? d.id !== c.id : true;
    }).length;
  }, [components, activeType]);
  const completionPct = Math.round((customizedCount / totalCategories) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {t('configurator.completion')}
        </p>
        <p className="text-xs text-muted-foreground">
          {t('configurator.selectedOf', { count: customizedCount, total: totalCategories })}
        </p>
      </div>
      <div
        className="h-2 w-full rounded-full bg-surface-secondary overflow-hidden"
        role="progressbar"
        aria-valuenow={customizedCount}
        aria-valuemin={0}
        aria-valuemax={totalCategories}
        aria-label={t('configurator.completion') as string}
      >
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${completionPct}%` }}
        />
      </div>
    </div>
  );
}

// 统计卡片：复用展示总价 / 总重量
export function StatCard({
  labelKey,
  value,
  icon: Icon,
}: {
  labelKey: string;
  value: string;
  icon: typeof TrendingUp;
}) {
  const t = useTranslation();
  return (
    <div role="listitem" className="bg-surface-secondary border border-border-light rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-background rounded-md" aria-hidden="true">
          <Icon className="w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          {t(labelKey)}
        </p>
      </div>
      <p
        className="text-2xl font-display font-semibold text-foreground tracking-tight"
        aria-label={`${t(labelKey)}: ${value}`}
      >
        {value}
      </p>
    </div>
  );
}
