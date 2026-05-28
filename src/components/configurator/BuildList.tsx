'use client';

import { useConfigStore } from '@/lib/store';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { APP_CONSTANTS } from '@/lib/constants';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useTranslation } from '@/lib/i18n';
import { Edit3, Settings } from 'lucide-react';
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-display font-bold text-foreground">
          {t('configurator.buildList')}
        </h3>
        <div className="flex items-center gap-2 text-muted text-sm">
          <Settings className="w-4 h-4" />
          <span>{components.length} {t('common.components')}</span>
        </div>
      </div>
      {components.map((component, index) => (
        <motion.div
          key={component.id}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
          whileHover={{ scale: 1.01, x: 4 }}
        >
          <Card className="flex items-center justify-between gap-3 sm:gap-4 group">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary/80">
                  {getCategoryTranslation(component.category)}
                </span>
              </div>
              <h4 className="font-semibold text-foreground mt-1 text-sm sm:text-base truncate group-hover:text-gradient transition-all duration-300">
                {component.name}
              </h4>
            </div>
            <div className="flex items-center gap-3 sm:gap-6 ml-auto flex-shrink-0">
              <div className="text-right">
                <p className="text-primary font-bold text-base sm:text-lg">{formatCurrency(component.price)}</p>
                <p className="text-xs sm:text-sm text-muted/70">{formatWeight(component.weight / APP_CONSTANTS.WEIGHT_CONVERSION_FACTOR)}</p>
              </div>
              <motion.div whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleComponentSelector(component.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
