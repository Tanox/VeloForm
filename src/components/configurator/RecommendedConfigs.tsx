'use client';

import { motion } from 'framer-motion';
import { useConfigStore } from '@/lib/stores';
import { useTranslation } from '@/lib/i18n';
import { recommendedConfigurations } from '@/lib/recommended-configs';
import { RecommendedConfigCard } from './RecommendedConfigCard';

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
        <h2 className="text-2xl font-display font-bold text-foreground tracking-tight">
          {t('recommended.title')}
        </h2>
        <p className="text-sm text-muted-foreground">{t('recommended.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendedConfigurations.map((config, index) => (
          <RecommendedConfigCard
            key={config.id}
            config={config}
            index={index}
            onLoad={loadConfiguration}
          />
        ))}
      </div>
    </motion.div>
  );
}
