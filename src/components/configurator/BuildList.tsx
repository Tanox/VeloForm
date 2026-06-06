'use client';

import { useConfigStore } from '@/lib/store';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n';
import { Edit3, Eye, Zap, Package, Settings, Heart, Car, ArrowRight, Cog, CircleDashed, Wrench, Fan } from 'lucide-react';
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

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      'Frame': Settings,
      'Drivetrain': Wrench,
      'Wheelset': CircleDashed,
      'Cockpit': Zap,
      'Tires': Fan,
    };
    return icons[category] || Package;
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
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-xl lg:text-2xl font-display font-bold text-foreground">
            {t('configurator.buildList')}
          </h3>
          <p className="text-sm text-muted mt-1">Configure your dream bike</p>
        </div>
        <div className="flex items-center gap-2 text-muted text-sm">
          <Eye className="w-4 h-4" />
          <span>{components.length} {t('common.components')}</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {components.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-4 bg-zinc-900/50 rounded-full flex items-center justify-center"
            >
              <Package className="w-10 h-10 text-muted" />
            </motion.div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              {t('configurator.emptyState.title')}
            </h4>
            <p className="text-sm text-muted mb-6 max-w-md mx-auto">
              {t('configurator.emptyState.description')}
            </p>
            <Button onClick={() => toggleComponentSelector()}>
              {t('configurator.emptyState.cta')}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="component-list"
            className="space-y-3"
          >
            {components.map((component, index) => {
              const CategoryIcon = getCategoryIcon(component.category);
              return (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ 
                    delay: index * 0.08, 
                    type: 'spring', 
                    stiffness: 100,
                    damping: 20,
                  }}
                >
                  <div 
                    className="component-item flex items-center gap-4 p-4 rounded-xl bg-surface border border-border/50 cursor-pointer hover:border-primary/30 hover:bg-surface/80 transition-all"
                    onClick={() => handleEdit(component.id)}
                  >
                    <div className="component-icon w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CategoryIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="chip mb-2 inline-block px-2 py-0.5 bg-secondary rounded-full text-xs text-muted uppercase tracking-wider">
                        {getCategoryTranslation(component.category)}
                      </span>
                      <h4 className="font-semibold text-foreground truncate">
                        {component.name}
                      </h4>
                      <p className="text-xs text-muted mt-1">
                        {component.brand || component.description || component.category}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(component.price)}
                      </p>
                      <p className="text-sm text-muted">
                        {formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}
                      </p>
                    </div>
                    <motion.button 
                      className="p-2 rounded-lg text-muted hover:text-primary hover:bg-secondary/50 transition-all"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(component.id);
                      }}
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}