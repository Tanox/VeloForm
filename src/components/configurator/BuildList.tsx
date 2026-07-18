'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useComponents, useConfigUIStore } from '@/lib/stores';
import { APP_CONSTANTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Plus, ArrowRight } from 'lucide-react';
import { BuildListItem } from './BuildListItem';

export function BuildList() {
  const t = useTranslation();
  const components = useComponents();
  const toggleComponentSelector = useConfigUIStore((state) => state.toggleComponentSelector);
  const [isLoading, setIsLoading] = useState(false);

  const totalCategories = APP_CONSTANTS.COMPONENT_CATEGORIES.length;
  const completedCategories = new Set(components.map((c) => c.category)).size;
  const completionPercentage = Math.round((completedCategories / totalCategories) * 100);

  const handleEdit = useCallback((componentId: string) => {
    setIsLoading(true);
    toggleComponentSelector(componentId);
    setTimeout(() => setIsLoading(false), 300);
  }, [toggleComponentSelector]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground uppercase tracking-wider">组件清单</span>
          <span className="px-2 py-0.5 text-xs font-mono text-muted-foreground bg-card border border-border rounded-md">
            {components.length} / {totalCategories}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-28 h-1.5 bg-background rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground">{completionPercentage}%</span>
        </div>
      </div>

      {components.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center">
            <Plus className="w-8 h-8 text-muted-foreground" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">
            {t('configurator.emptyState.title')}
          </h4>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            {t('configurator.emptyState.description')}
          </p>
          <Button onClick={() => toggleComponentSelector()} size="lg">
            {t('configurator.emptyState.cta')}
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {components.map((component, index) => (
            <BuildListItem
              key={component.id}
              component={component}
              index={index}
              onEdit={handleEdit}
            />
          ))}

          {components.length < totalCategories && (
            <button
              onClick={() => toggleComponentSelector()}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span className="text-sm font-medium">添加组件</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
