'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useConfigStore } from '@/lib/stores';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import { recommendedConfigurations } from '@/lib/recommended-configs';
import { Zap, Star, Sparkles, Bike } from 'lucide-react';

const tagIcons: Record<string, typeof Zap> = {
  Recommended: Star,
  Lightweight: Zap,
  Popular: Sparkles,
  Value: Zap,
  XC: Bike,
  Urban: Sparkles,
  Compact: Star,
};

const tagColors: Record<string, string> = {
  Recommended: 'bg-yellow-500/20 text-yellow-400',
  Lightweight: 'bg-green-500/20 text-green-400',
  Popular: 'bg-purple-500/20 text-purple-400',
  Value: 'bg-blue-500/20 text-blue-400',
  XC: 'bg-orange-500/20 text-orange-400',
  Urban: 'bg-pink-500/20 text-pink-400',
  Compact: 'bg-cyan-500/20 text-cyan-400',
};

export function RecommendedConfigs() {
  const t = useTranslation();
  const loadConfiguration = useConfigStore((s) => s.loadConfiguration);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground">
          {t('recommended.title')}
        </h2>
        <p className="text-sm text-muted">{t('recommended.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedConfigurations.map((config, index) => (
          <motion.div
            key={config.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-accent/5 rounded-bl-full" />
              
              <div className="relative p-6">
                <div className="flex items-center gap-2 mb-3">
                  {config.tags?.map((tag) => {
                    const Icon = tagIcons[tag] || Star;
                    return (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${tagColors[tag] || 'bg-zinc-800 text-zinc-400'}`}
                      >
                        <Icon className="w-3 h-3" />
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {config.name}
                </h3>
                <p className="text-muted text-sm mb-4">{config.description}</p>

                <div className="flex items-center gap-6 mb-4">
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">
                      {t('configurator.totalCost')}
                    </p>
                    <p className="text-lg font-bold text-primary">
                      {formatCurrency(config.totalCost)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">
                      {t('configurator.estimatedWeight')}
                    </p>
                    <p className="text-lg font-bold text-accent">
                      {formatWeight(config.estimatedWeight)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wider">
                      {t('library.bikeType')}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {t(`bikeTypes.${config.bikeType.toLowerCase()}`) || config.bikeType}
                    </p>
                  </div>
                </div>

                <Button className="w-full" onClick={() => loadConfiguration(config)}>
                  {t('recommended.load')}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}