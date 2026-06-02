'use client';

import { useConfigStore } from '@/lib/store';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n';
import { Edit3, Settings, ChevronRight, Package } from 'lucide-react';
import { motion } from 'framer-motion';

export function BuildList() {
  const t = useTranslation();
  const components = useConfigStore((state) => state.components);
  const toggleComponentSelector = useConfigStore((state) => state.toggleComponentSelector);

  const getCategoryTranslation = (category: string) => {
    const key = `categories.${category.toLowerCase()}`;
    const translated = t(key);
    return translated === key ? category : translated;
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      Frame: 'frame',
      Drivetrain: 'gear',
      Wheelset: 'circle',
      Suspension: 'spring',
      Cockpit: 'navigation',
      Tires: 'circle-dot',
    };
    return icons[category] || 'package';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-foreground">
              {t('configurator.buildList')}
            </h3>
            <p className="text-sm text-muted">{t('configurator.buildListSubtitle')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-muted text-sm">
          <Settings className="w-4 h-4" />
          <span>{components.length} {t('common.components')}</span>
        </div>
      </div>

      <div className="space-y-3">
        {components.map((component, index) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
            whileHover={{ scale: 1.01, x: 4 }}
            className="group"
          >
            <Card className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:border-primary/50">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <span className="text-lg sm:text-xl text-primary">
                    {getCategoryIcon(component.category) === 'package' ? (
                      <Package className="w-6 h-6" />
                    ) : null}
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-primary/80">
                    {getCategoryTranslation(component.category)}
                  </span>
                  {component.brand && (
                    <span className="text-xs text-muted/60 bg-zinc-800/50 px-2 py-0.5 rounded-full">
                      {component.brand}
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-foreground text-sm sm:text-base truncate group-hover:text-gradient transition-all duration-300">
                  {component.name}
                </h4>
                {component.model && (
                  <p className="text-xs text-muted/70 mt-0.5">
                    {component.model}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 sm:gap-5 ml-auto flex-shrink-0">
                <div className="text-right">
                  <p className="text-primary font-bold text-base sm:text-lg">{formatCurrency(component.price)}</p>
                  <p className="text-xs sm:text-sm text-muted/70">{formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}</p>
                </div>
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 90 }} 
                  whileTap={{ scale: 0.9 }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComponentSelector(component.id);
                    }}
                    className="p-2 hover:bg-primary/10 hover:text-primary"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {components.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800/50 flex items-center justify-center">
            <Package className="w-8 h-8 text-muted" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">
            {t('configurator.noComponents')}
          </h4>
          <p className="text-muted text-sm">
            {t('configurator.noComponentsHint')}
          </p>
        </motion.div>
      )}
    </div>
  );
}