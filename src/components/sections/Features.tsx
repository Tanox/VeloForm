'use client';

import { motion } from 'framer-motion';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';
import { Layers, Zap, Shield, Palette, Code, Cloud, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const ANIMATION_DURATION = 0.3;
const ANIMATION_DELAY_STEP = 0.1;

const features = [
  {
    icon: Layers,
    translationKey: 'features.items.infinite',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Zap,
    translationKey: 'features.items.speed',
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    icon: Shield,
    translationKey: 'features.items.security',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Palette,
    translationKey: 'features.items.assets',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    icon: Code,
    translationKey: 'features.items.export',
    gradient: 'from-red-500 to-rose-400',
  },
  {
    icon: Cloud,
    translationKey: 'features.items.sync',
    gradient: 'from-indigo-500 to-blue-400',
  },
];

export function Features() {
  const t = useTranslation();
  const shouldReduceMotion = useClientReducedMotion();

  const getTransition = (delay: number = 0) => ({
    duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
    delay: shouldReduceMotion ? 0 : delay,
  });

  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition()}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={getTransition(ANIMATION_DELAY_STEP)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            {t('features.badge')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight">
            {t('features.title')}
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">{t('features.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
          {features.map((feature, index) => {
            const title = t(`${feature.translationKey}.title`);
            const description = t(`${feature.translationKey}.description`);

            return (
              <motion.div
                key={feature.translationKey}
                role="listitem"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={getTransition(index * ANIMATION_DELAY_STEP)}
                whileHover={
                  shouldReduceMotion ? {} : { y: -8, transition: { duration: ANIMATION_DURATION } }
                }
                tabIndex={0}
                className="group relative bg-surface-secondary/80 backdrop-blur-sm rounded-2xl p-7 sm:p-8 border border-border-light hover:border-primary/30 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 cursor-pointer overflow-hidden outline-none"
                aria-label={title as string}
              >
                {/* 悬停渐变背景 */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  aria-hidden="true"
                />

                {/* 顶部装饰线 */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  aria-hidden="true"
                />

                <motion.div
                  className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  whileHover={shouldReduceMotion ? {} : { rotate: [0, -5, 5, 0] }}
                  transition={getTransition()}
                  aria-hidden="true"
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>

                <div className="relative">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">{description}</p>
                </div>

                {/* 悬停箭头 */}
                <motion.div
                  className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                  aria-hidden="true"
                >
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
