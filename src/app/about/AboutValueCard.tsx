'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import type { LucideIcon } from 'lucide-react';
import { ANIMATION_DELAY_STEP } from '@/lib/animation';

interface AboutValueCardProps {
  icon: LucideIcon;
  labelKey: string;
  index: number;
  getInitial: (props: Record<string, number>) => Record<string, number>;
  getTransition: (delay?: number) => { duration: number; delay: number };
}

function AboutValueCardBase({ icon: Icon, labelKey, index, getInitial, getTransition }: AboutValueCardProps) {
  const t = useTranslation();
  return (
    <motion.div
      key={labelKey}
      initial={getInitial({ opacity: 0, y: 20 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={getTransition(index * ANIMATION_DELAY_STEP)}
      className="p-8 rounded-2xl bg-surface border border-border-light hover:border-primary/30 hover:shadow-lg transition-all"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <h3 className="text-xl font-display font-semibold text-foreground mb-3">
        {t(`${labelKey}.title`)}
      </h3>
      <p className="text-secondary leading-relaxed">
        {t(`${labelKey}.description`)}
      </p>
    </motion.div>
  );
}

export const AboutValueCard = React.memo(AboutValueCardBase);
