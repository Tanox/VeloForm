'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import type { LucideIcon } from 'lucide-react';
import { ANIMATION_DELAY_STEP } from '@/lib/animation';

interface AboutStatCardProps {
  icon: LucideIcon;
  labelKey: string;
  index: number;
  getInitial: (props: Record<string, number>) => Record<string, number>;
  getTransition: (delay?: number) => { duration: number; delay: number };
}

function AboutStatCardBase({ icon: Icon, labelKey, index, getInitial, getTransition }: AboutStatCardProps) {
  const t = useTranslation();
  return (
    <motion.div
      key={labelKey}
      initial={getInitial({ opacity: 0, y: 20 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={getTransition(index * ANIMATION_DELAY_STEP)}
      className="text-center p-6 rounded-2xl bg-surface border border-border-light hover:border-primary/30 transition-colors"
    >
      <Icon className="w-10 h-10 text-primary mx-auto mb-4" />
      <div className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
        {t(`${labelKey}.value`)}
      </div>
      <div className="text-sm text-muted">{t(`${labelKey}.label`)}</div>
    </motion.div>
  );
}

export const AboutStatCard = React.memo(AboutStatCardBase);
