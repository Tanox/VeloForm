'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { X, GitCompare } from 'lucide-react';

interface ComparePanelHeaderProps {
  configCount: number;
  onClose: () => void;
}

function ComparePanelHeaderBase({ configCount, onClose }: ComparePanelHeaderProps) {
  const t = useTranslation();
  return (
    <div id="compare-panel-header" className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <GitCompare className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            {t('compare.panelTitle')}
            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
              {configCount} {t('compare.configCount')}
            </span>
          </h3>
          <p className="text-sm text-muted-foreground">{t('compare.panelSubtitle')}</p>
        </div>
      </div>

      <Button
        id="compare-panel-close"
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="hover:bg-surface-tertiary"
      >
        <X className="w-4 h-4 mr-2" />
        {t('compare.close')}
      </Button>
    </div>
  );
}

export const ComparePanelHeader = React.memo(ComparePanelHeaderBase);
