'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import { Star } from 'lucide-react';
import { type Configuration } from '@/types';
import { tagIcons, tagColors } from './recommended-config-data';

interface RecommendedConfigCardProps {
  config: Configuration;
  index: number;
  onLoad: (config: Configuration) => void;
}

function RecommendedConfigCardBase({ config, index, onLoad }: RecommendedConfigCardProps) {
  const t = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" aria-hidden="true" />

        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-3">
            {config.tags?.map((tag) => {
              const Icon = tagIcons[tag] || Star;
              return (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${tagColors[tag] || 'bg-surface-tertiary text-foreground-secondary'}`}
                >
                  <Icon className="w-3 h-3" />
                  {tag}
                </span>
              );
            })}
          </div>

          <h3 className="text-xl font-display font-semibold text-foreground mb-2 tracking-tight">
            {config.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{config.description}</p>

          <div className="flex items-center gap-6 mb-5">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {t('configurator.totalCost')}
              </p>
              <p className="text-lg font-display font-bold text-foreground">
                {formatCurrency(config.totalCost)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {t('configurator.estimatedWeight')}
              </p>
              <p className="text-lg font-display font-bold text-foreground">
                {formatWeight(config.estimatedWeight)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {t('library.bikeType')}
              </p>
              <p className="text-lg font-display font-semibold text-foreground">
                {t(`bikeTypes.${config.bikeType.toLowerCase()}`) || config.bikeType}
              </p>
            </div>
          </div>

          <Button className="w-full" onClick={() => onLoad(config)}>
            {t('recommended.load')}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

export const RecommendedConfigCard = memo(RecommendedConfigCardBase);
