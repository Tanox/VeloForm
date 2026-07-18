'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DELAY_STEP } from '@/lib/animation';
import { AboutContactInfo } from './AboutContactInfo';

interface AboutContactSectionProps {
  getInitial: (props: Record<string, number>) => Record<string, number>;
  getTransition: (delay?: number) => { duration: number; delay: number };
}

export function AboutContactSection({ getInitial, getTransition }: AboutContactSectionProps) {
  const t = useTranslation();

  return (
    <motion.section
      initial={getInitial({ opacity: 0, y: 40 })}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={getTransition(0)}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-secondary/50"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={getInitial({ opacity: 0, y: 20 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition(0)}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
            {t('about.contact.title')}
          </h2>
          <p className="text-lg text-secondary">{t('about.contact.description')}</p>
        </motion.div>

        <AboutContactInfo />

        <motion.div
          initial={getInitial({ opacity: 0, y: 20 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition(ANIMATION_DELAY_STEP * 2)}
          className="text-center"
        >
          <Button size="lg">
            {t('about.contact.sendMessage')}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
}
