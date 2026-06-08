'use client';

import { useConfigStore } from '@/lib/store';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n';
import { Edit3, Settings, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function BuildList() {
  const t = useTranslation();
  const components = useConfigStore((state) => state.components);
  const toggleComponentSelector = useConfigStore((state) => state.toggleComponentSelector);
  const [isLoading, setIsLoading] = useState(false);

  const getCategoryTranslation = (category: string) => {
    const key = `categories.${category.toLowerCase()}`;
    const translated = t(key);
    return translated === key ? category : translated;
  };

  const totalCategories = APP_CONSTANTS.COMPONENT_CATEGORIES.length;
  const completedCategories = new Set(components.map(c => c.category)).size;
  const completionPercentage = Math.round((completedCategories / totalCategories) * 100);

  const handleEdit = (componentId: string) => {
    setIsLoading(true);
    toggleComponentSelector(componentId);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
            {t('configurator.buildList')}
          </h3>
          <div className="flex items-center gap-3 sm:gap-4 mt-2">
            <div className="flex items-center gap-2 text-muted text-xs sm:text-sm">
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{components.length} {t('common.components')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPercentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
                <span className="text-xs text-muted font-medium">
                  {completedCategories}/{totalCategories}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {components.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-8 sm:py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 bg-zinc-900/50 rounded-full flex items-center justify-center"
            >
              <Package className="w-8 h-8 sm:w-10 sm:h-10 text-muted" />
            </motion.div>
            <h4 className="text-base sm:text-lg font-semibold text-foreground mb-2">
              {t('configurator.emptyState.title')}
            </h4>
            <p className="text-xs sm:text-sm text-muted mb-4 sm:mb-6 max-w-md mx-auto px-4">
              {t('configurator.emptyState.description')}
            </p>
            <Button onClick={() => toggleComponentSelector()} className="touch-target">
              {t('configurator.emptyState.cta')}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="component-list"
            className="space-y-3 sm:space-y-4"
          >
            {components.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ 
                  delay: index * 0.05, 
                  type: 'spring', 
                  stiffness: 100,
                  damping: 20,
                }}
                whileHover={{ scale: 1.01, x: 4 }}
                whileTap={{ scale: 0.99 }}
              >
                <Card 
                  variant="default"
                  className="p-3 sm:p-4 flex items-center justify-between group cursor-pointer touch-target"
                  onClick={() => handleEdit(component.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary/80">
                        {getCategoryTranslation(component.category)}
                      </span>
                    </div>
                    <h4 className="font-semibold text-foreground mt-1 sm:mt-1.5 truncate group-hover:text-gradient transition-all duration-300 text-sm sm:text-base">
                      {component.name}
                    </h4>
                    {component.brand && (
                      <p className="text-[10px] sm:text-xs text-muted mt-0.5">{component.brand}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3 sm:gap-6 ml-2 sm:ml-4">
                    <div className="text-right">
                      <p className="text-primary font-bold text-sm sm:text-lg">
                        {formatCurrency(component.price)}
                      </p>
                      <p className="text-[10px] sm:text-sm text-muted/70">
                        {formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}
                      </p>
                    </div>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 90 }} 
                      whileTap={{ scale: 0.9 }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(component.id);
                        }}
                        aria-label={`编辑 ${component.name}`}
                        className="touch-target"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}