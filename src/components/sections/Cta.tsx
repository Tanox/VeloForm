'use client';

import { motion } from 'framer-motion';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';

export function Cta() {
  const t = useTranslation();
  const shouldReduceMotion = useClientReducedMotion();

  const getTransition = (delay: number = 0) => ({
    duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
    delay: shouldReduceMotion ? 0 : delay,
  });

  return (
    <section id="cta" className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition()}
          className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="text-center py-16 sm:py-20 px-6 sm:px-12">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={getTransition(ANIMATION_DELAY_STEP)}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-surface-secondary/80 text-foreground-secondary mb-8"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm font-medium">{t('cta.badge')}</span>
            </motion.div>

            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={getTransition(ANIMATION_DELAY_STEP * 2)}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-card-foreground mb-6 tracking-tight"
            >
              {t('cta.title')}
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={getTransition(ANIMATION_DELAY_STEP * 3)}
              className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
            >
              {t('cta.description')}
            </motion.p>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={getTransition(ANIMATION_DELAY_STEP * 4)}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="px-8 min-h-[56px] font-semibold"
                aria-label={t('cta.cta') as string}
              >
                {t('cta.cta')}
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="min-h-[56px]"
                aria-label={t('cta.learnMore') as string}
              >
                {t('cta.learnMore')}
              </Button>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
              viewport={{ once: true }}
              transition={getTransition(ANIMATION_DELAY_STEP * 6)}
              className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-muted-foreground text-sm"
            >
              {(t('cta.features') as readonly string[]).map((feature, index) => (
                <span key={index} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary" aria-hidden="true" />
                  {feature}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
