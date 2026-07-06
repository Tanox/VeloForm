'use client';

import { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation, useTranslationsObject, useLanguage } from '@/lib/i18n';

const planStyles = [
  { popular: false, gradient: 'from-slate-600 to-slate-700' },
  { popular: true, gradient: 'from-primary to-accent' },
  { popular: false, gradient: 'from-purple-600 to-pink-600' },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const t = useTranslation();
  const tr = useTranslationsObject();
  const language = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const transitionDuration = shouldReduceMotion ? 0 : undefined;
  const plans = tr.pricing.plans.map((plan, index) => ({
    ...plan,
    ...planStyles[index],
  }));

  // Tab 键盘导航
  const monthlyTabRef = useRef<HTMLButtonElement>(null);
  const yearlyTabRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const targetTab = isYearly ? monthlyTabRef.current : yearlyTabRef.current;
        targetTab?.focus();
        setIsYearly(!isYearly);
      }
    },
    [isYearly]
  );

  // 使用 Intl.NumberFormat 格式化货币
  const formatPrice = useCallback(
    (price: number) => {
      const locale = language === 'zh-CN' ? 'zh-CN' : 'en-US';
      const currency = language === 'zh-CN' ? 'CNY' : 'USD';
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    },
    [language]
  );

  return (
    <section aria-labelledby="pricing-title" className="py-24 sm:py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: transitionDuration ?? 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">
            {t('pricing.badge')}
          </span>
          <h2
            id="pricing-title"
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight"
          >
            {t('pricing.title')}
            <span className="text-gradient-brand">{t('pricing.titleAccent')}</span>
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto mb-10">{t('pricing.subtitle')}</p>

          {/* 切换器 */}
          <div
            className="inline-flex items-center gap-4 p-1.5 bg-surface-secondary/80 backdrop-blur-sm rounded-full border border-border-light"
            role="tablist"
            aria-label={t('pricing.tabListAria')}
          >
            <button
              ref={monthlyTabRef}
              role="tab"
              aria-selected={!isYearly}
              tabIndex={!isYearly ? 0 : -1}
              onClick={() => setIsYearly(false)}
              onKeyDown={handleKeyDown}
              className={`relative min-w-[72px] min-h-[40px] px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                !isYearly
                  ? 'bg-gradient-brand text-white shadow-lg shadow-primary/30'
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              ref={yearlyTabRef}
              role="tab"
              aria-selected={isYearly}
              tabIndex={isYearly ? 0 : -1}
              onClick={() => setIsYearly(true)}
              onKeyDown={handleKeyDown}
              className={`relative min-w-[72px] min-h-[40px] px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isYearly
                  ? 'bg-gradient-brand text-white shadow-lg shadow-primary/30'
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              {t('pricing.yearly')}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${isYearly ? 'bg-white/20' : 'bg-accent/10 text-accent'}`}
              >
                {t('pricing.savePercent')}
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" role="list">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              role="listitem"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: transitionDuration ?? 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.1,
              }}
              whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.3 } }}
              className={`relative rounded-3xl p-8 transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:outline-none ${
                plan.popular
                  ? 'bg-gradient-to-br from-primary to-accent text-white shadow-2xl shadow-primary/30'
                  : 'bg-surface-secondary/80 backdrop-blur-sm border border-border-light hover:border-primary/30'
              }`}
              aria-label={`${plan.name}方案`}
            >
              {/* 流行方案装饰 */}
              {plan.popular && (
                <>
                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : index * 0.1 + 0.3,
                      duration: transitionDuration ?? undefined,
                      type: shouldReduceMotion ? 'tween' : 'spring',
                      stiffness: 200,
                    }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-primary rounded-full shadow-lg">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="text-xs font-bold">{t('pricing.popular')}</span>
                    </div>
                  </motion.div>
                </>
              )}

              {/* 卡片顶部渐变条 */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient} ${
                  plan.popular
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100 transition-opacity'
                }`}
              />

              <div className={`mb-6 ${plan.popular ? 'text-white/90' : 'text-secondary'}`}>
                <div className="flex items-center gap-3 mb-2">
                  {plan.popular && (
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}
                    >
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <h3
                    className={`text-xl font-bold ${plan.popular ? 'text-white' : 'text-foreground'}`}
                  >
                    {plan.name}
                  </h3>
                </div>
                <p className="text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-foreground'}`}
                  >
                    {formatPrice(isYearly ? plan.yearlyPrice : plan.monthlyPrice)}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-secondary'}`}>
                    {isYearly ? t('pricing.perYear') : t('pricing.perMonthShort')}
                  </span>
                </div>
                {isYearly && (
                  <p className={`text-xs mt-1 ${plan.popular ? 'text-white/60' : 'text-muted'}`}>
                    {t('pricing.perMonth', { price: Math.round(plan.yearlyPrice / 12) })}
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8" role="list">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3" role="listitem">
                    <div
                      className={`w-5 h-5 rounded-full ${plan.popular ? 'bg-white/20' : 'bg-accent/10'} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      aria-hidden="true"
                    >
                      <Check
                        className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-accent'}`}
                        aria-hidden="true"
                      />
                    </div>
                    <span
                      className={`text-sm ${plan.popular ? 'text-white/80' : 'text-secondary'}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full min-h-[48px] rounded-xl"
                variant={plan.popular ? 'secondary' : 'default'}
                size="lg"
                aria-label={`${plan.name}方案 - ${plan.cta}`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* 底部保障 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: transitionDuration ?? 0.5, delay: shouldReduceMotion ? 0 : 0.5 }}
          className="text-center text-sm text-muted mt-12"
        >
          {t('pricing.guarantee')}
        </motion.p>
      </div>
    </section>
  );
}
