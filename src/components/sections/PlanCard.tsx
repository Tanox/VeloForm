'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type TranslationFunction } from '@/lib/i18n';
import { ANIMATION_DELAY_STEP } from '@/lib/animation';

export interface PricingPlan {
  translationKey: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular: boolean;
}

interface PlanCardProps {
  plan: PricingPlan;
  index: number;
  isYearly: boolean;
  t: TranslationFunction;
  getTransition: (delay?: number) => { duration: number; delay: number };
}

function PlanCardBase({ plan, index, isYearly, t, getTransition }: PlanCardProps) {
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
      className={`relative rounded-xl p-7 transition-all duration-300 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:outline-none ${
        plan.popular
          ? 'bg-card border border-primary/40 shadow-lg ring-1 ring-primary/20'
          : 'bg-card border border-border shadow-sm hover:border-primary/30 hover:shadow-md'
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
          <span className="text-4xl font-bold text-card-foreground tracking-tight">
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
              className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <Check className="w-3 h-3 text-primary" aria-hidden="true" />
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
}

export const PlanCard = memo(PlanCardBase);
