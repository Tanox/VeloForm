'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';

const plans = [
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
    <section id="pricing" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition()}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-muted-foreground mb-4">
            {t('pricing.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            {t('pricing.subtitle')}
          </p>

          <div
            className="inline-flex items-center gap-1 p-1 bg-muted rounded-full"
            role="tablist"
            aria-label="计费周期切换"
          >
            <button
              role="tab"
              aria-selected={!isYearly}
              onClick={() => setIsYearly(false)}
              className={`relative min-w-[72px] px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
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
              className={`relative min-w-[72px] px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
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
          {plans.map((plan, index) => {
            const planName = t(`${plan.translationKey}.name`);
            const planDescription = t(`${plan.translationKey}.description`);
            const planCta = t(`${plan.translationKey}.cta`);
            const planFeatures = t(`${plan.translationKey}.features`) as readonly string[];
            const popularBadge = plan.popular ? t(`${plan.translationKey}.popular`) : '';

            return (
              <motion.div
                key={plan.translationKey}
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={getTransition(index * ANIMATION_DELAY_STEP)}
                className={`relative rounded-xl p-7 transition-colors duration-200 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:outline-none ${
                  plan.popular
                    ? 'bg-card border-2 border-primary'
                    : 'bg-card border border-border hover:border-foreground/20'
                }`}
                aria-label={`${planName}方案`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{popularBadge}</span>
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">{planName}</h3>
                  <p className="text-sm text-muted-foreground">{planDescription}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-card-foreground">
                      ¥{isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /{isYearly ? t('pricing.yearly') : t('pricing.monthly')}
                    </span>
                  </div>
                  {isYearly && (
                    <p className="text-xs mt-1 text-muted-foreground">
                      每月仅需 ¥{Math.round(plan.yearlyPrice / 12)}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8" role="list">
                  {planFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3" role="listitem">
                      <div
                        className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        <Check className="w-3 h-3 text-foreground" aria-hidden="true" />
                      </div>
                      <span className="text-sm text-card-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full h-11 rounded-lg"
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                  aria-label={`${planName}方案 - ${planCta}`}
                >
                  {planCta}
                </Button>
              </motion.div>
            );
          })}
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
