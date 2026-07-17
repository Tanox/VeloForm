'use client';

import { motion } from 'framer-motion';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';
import { Layers, Zap, Shield, Palette, Code, Cloud } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const ANIMATION_DURATION = 0.3;
const ANIMATION_DELAY_STEP = 0.1;

const features = [
  {
    icon: Layers,
    translationKey: 'features.items.infinite',
  },
  {
    icon: Zap,
    translationKey: 'features.items.speed',
  },
  {
    icon: Shield,
    translationKey: 'features.items.security',
  },
  {
    icon: Palette,
    translationKey: 'features.items.assets',
  },
  {
    icon: Code,
    translationKey: 'features.items.export',
  },
  {
    icon: Cloud,
    translationKey: 'features.items.sync',
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
    <section id="features" className="py-24 sm:py-32 relative">
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
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/60 bg-surface-secondary/80 text-foreground-secondary text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {t('features.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
          {features.map((feature, index) => {
            const title = t(`${feature.translationKey}.title`);
            const description = t(`${feature.translationKey}.description`);

            return (
              <motion.div
                key={feature.translationKey}
                role="listitem"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={getTransition(index * ANIMATION_DELAY_STEP)}
                tabIndex={0}
                className="group bg-card rounded-xl p-7 sm:p-8 border border-border hover:border-primary/30 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-all duration-300"
                aria-label={title as string}
              >
                <div
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors"
                  aria-hidden="true"
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
