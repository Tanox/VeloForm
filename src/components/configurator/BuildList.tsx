'use client';

import { useComponents, useConfigUIStore } from '@/lib/stores';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { Edit3, Plus, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const categoryIcons: Record<string, string> = {
  frame: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>`,
  drivetrain: `<circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>`,
  wheels: `<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="1"></circle><line x1="12" y1="2" x2="12" y2="5"></line><line x1="12" y1="19" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.05" y2="7.05"></line><line x1="16.95" y1="16.95" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="5" y2="12"></line><line x1="19" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.05" y2="16.95"></line><line x1="16.95" y1="7.05" x2="19.07" y2="4.93"></line>`,
  handlebar: `<path d="M18 14h-5V6h-2v8H6l6 6 6-6z"></path>`,
  saddle: `<ellipse cx="12" cy="7" rx="8" ry="3"></ellipse><path d="M4 7v5c0 4 4 6 8 6s8-2 8-6V7"></path><line x1="12" y1="13" x2="12" y2="22"></line>`,
  tires: `<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="5"></circle>`,
};

const categoryLabels: Record<string, string> = {
  frame: 'Frame / 车架',
  drivetrain: 'Drivetrain / 传动',
  wheels: 'Wheels / 轮组',
  handlebar: 'Handlebar / 操控',
  saddle: 'Saddle / 座垫',
  tires: 'Tires / 轮胎',
};

export function BuildList() {
  const t = useTranslation();
  const components = useComponents();
  const toggleComponentSelector = useConfigUIStore((state) => state.toggleComponentSelector);
  const [isLoading, setIsLoading] = useState(false);

  const totalCategories = APP_CONSTANTS.COMPONENT_CATEGORIES.length;
  const completedCategories = new Set(components.map((c) => c.category)).size;
  const completionPercentage = Math.round((completedCategories / totalCategories) * 100);

  const handleEdit = (componentId: string) => {
    setIsLoading(true);
    toggleComponentSelector(componentId);
    setTimeout(() => setIsLoading(false), 300);
  };

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
            <motion.div
              key={component.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="relative flex items-center gap-4 p-4 bg-card border border-border rounded-xl cursor-pointer overflow-hidden group hover:border-border-strong hover:bg-surface-hover transition-all duration-200"
              onClick={() => handleEdit(component.id)}
            >
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-primary rounded-r-sm"
                initial={{ height: 0 }}
                whileHover={{ height: 24 }}
                transition={{ duration: 0.2 }}
                aria-hidden="true"
              />

              <div className="w-11 h-11 rounded-lg bg-background flex items-center justify-center flex-shrink-0 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: categoryIcons[component.category.toLowerCase()] || categoryIcons.frame }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
                  {categoryLabels[component.category.toLowerCase()] || component.category}
                </div>
                <div className="text-sm font-semibold text-foreground truncate">
                  {component.name}
                </div>
                {component.brand && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {component.brand}
                  </div>
                )}
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-sm font-mono font-semibold text-foreground">
                  {formatCurrency(component.price)}
                </div>
                <div className="text-xs font-mono text-muted-foreground mt-0.5">
                  {formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}
                </div>
              </div>

              <motion.button
                className="w-8 h-8 rounded-md border border-border bg-background text-muted-foreground flex items-center justify-center flex-shrink-0"
                initial={{ opacity: 0, x: -8 }}
                whileHover={{ opacity: 1, x: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(component.id);
                }}
                aria-label={`编辑 ${component.name}`}
                whileHover={{ borderColor: 'var(--primary)', color: 'var(--primary)', backgroundColor: 'var(--primary)/5' }}
                transition={{ duration: 0.15 }}
              >
                <Edit3 className="w-4 h-4" aria-hidden="true" />
              </motion.button>
            </motion.div>
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