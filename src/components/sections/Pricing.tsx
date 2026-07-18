'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';
import { PlanCard, PricingPlan } from './PlanCard';

const plans: PricingPlan[] = [
  {
    translationKey: 'pricing.plans.personal',
    monthlyPrice: 29,
    yearlyPrice: 299,
    popular: false,
  },
  {
    translationKey: 'pricing.plans.pro',
    monthlyPrice: 79,
    yearlyPrice: 799,
    popular: true,
  },
  {
    translationKey: 'pricing.plans.enterprise',
    monthlyPrice: 199,
    yearlyPrice: 1999,
    popular: false,
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const t = useTranslation();
  const shouldReduceMotion = useClientReducedMotion();

  const getTransition = (delay: number = 0) => ({
    duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
    delay: shouldReduceMotion ? 0 : delay,
  });

  return (
    <section id="pricing" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition()}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-surface-secondary/80 backdrop-blur-sm text-foreground-secondary text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t('pricing.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {t('pricing.subtitle')}
          </p>

          <div
            className="inline-flex items-center gap-1 p-1 bg-surface-secondary border border-border-light rounded-full"
            role="tablist"
            aria-label="计费周期切换"
          >
            <button
              role="tab"
              aria-selected={!isYearly}
              onClick={() => setIsYearly(false)}
              className={`relative min-w-[72px] px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                !isYearly
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              role="tab"
              aria-selected={isYearly}
              onClick={() => setIsYearly(true)}
              className={`relative min-w-[72px] px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isYearly
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {t('pricing.yearly')}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  isYearly
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {t('pricing.yearlyDiscount')}
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" role="list">
          {plans.map((plan, index) => (
            <PlanCard
              key={plan.translationKey}
              plan={plan}
              index={index}
              isYearly={isYearly}
              t={t}
              getTransition={getTransition}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={getTransition(3 * ANIMATION_DELAY_STEP)}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          {t('pricing.guarantee')}
        </motion.p>
      </div>
    </section>
  );
}
