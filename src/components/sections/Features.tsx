'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Zap, Shield, Palette, Code, Cloud, ArrowRight } from 'lucide-react';
import { useTranslation, useLanguage, translations } from '@/lib/i18n';

const featureConfig = [
  {
    icon: Layers,
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Zap,
    gradient: 'from-amber-500 to-orange-400',
  },
  {
    icon: Shield,
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    icon: Palette,
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    icon: Code,
    gradient: 'from-red-500 to-rose-400',
  },
  {
    icon: Cloud,
    gradient: 'from-indigo-500 to-blue-400',
  },
];

export function Features() {
  const t = useTranslation();
  const language = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const transitionDuration = shouldReduceMotion ? 0 : undefined;
  const items = translations[language].features.items;

  const features = featureConfig.map((config, index) => ({
    ...config,
    title: items[index]?.title || '',
    description: items[index]?.description || '',
  }));

  return (
    <section aria-labelledby="features-title" className="py-24 sm:py-32 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: transitionDuration ?? 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: transitionDuration ?? 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            {t('features.badge')}
          </motion.span>
          <h2
            id="features-title"
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight"
          >
            {t('features.title')}
            <span className="text-gradient-brand">{t('features.titleAccent')}</span>
            {t('features.titleSuffix')}
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">{t('features.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              role="listitem"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: transitionDuration ?? 0.5,
                delay: shouldReduceMotion ? 0 : index * 0.1,
              }}
              whileHover={shouldReduceMotion ? {} : { y: -8, transition: { duration: 0.3 } }}
              tabIndex={0}
              className="group relative bg-surface-secondary/80 backdrop-blur-sm rounded-2xl p-7 sm:p-8 border border-border-light hover:border-primary/30 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 cursor-pointer overflow-hidden outline-none"
              aria-label={feature.title}
            >
              {/* 悬停渐变背景 */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
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
                transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                aria-hidden="true"
              >
                <feature.icon className="w-7 h-7 text-white" />
              </motion.div>

              <div className="relative">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">{feature.description}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
