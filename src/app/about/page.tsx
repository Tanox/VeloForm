'use client';

import { motion } from 'framer-motion';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';
import {
  Bike,
  Award,
  Users,
  Globe,
  Heart,
  Target,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';
import { uiLogger } from '@/lib/logger';

export default function AboutPage() {
  const t = useTranslation();
  const shouldReduceMotion = useClientReducedMotion();

  const handleNavigate = (page: string) => {
    uiLogger.debug('Navigate to:', page);
  };

  const getInitial = (props: Record<string, number>) =>
    shouldReduceMotion ? { opacity: 1, y: 0, ...props } : props;

  const getTransition = (delay: number = 0) => ({
    duration: shouldReduceMotion ? 0 : ANIMATION_DURATION,
    delay: shouldReduceMotion ? 0 : delay,
  });

  const stats = [
    { icon: Users, key: 'activeUsers', label: 'about.stats.activeUsers' },
    { icon: Bike, key: 'components', label: 'about.stats.components' },
    { icon: Award, key: 'satisfaction', label: 'about.stats.satisfaction' },
    { icon: Globe, key: 'countries', label: 'about.stats.countries' },
  ];

  const values = [
    { icon: Heart, key: 'loveRiding', label: 'about.values.loveRiding' },
    { icon: Target, key: 'excellence', label: 'about.values.excellence' },
    { icon: Users, key: 'userFirst', label: 'about.values.userFirst' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigate} />

      <main>
        {/* Brand Introduction Section */}
        <motion.section
          initial={getInitial({ opacity: 0, y: 30 })}
          animate={{ opacity: 1, y: 0 }}
          transition={getTransition(0)}
          className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
        >
          <div
            className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px]" aria-hidden="true">
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: [1, 1.1, 1],
                      opacity: [0.15, 0.25, 0.15],
                    }
              }
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h1
              initial={getInitial({ opacity: 0, y: 20 })}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(ANIMATION_DELAY_STEP)}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-8"
            >
              {t('about.brand.title')}
            </motion.h1>
            <motion.p
              initial={getInitial({ opacity: 0, y: 20 })}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition(ANIMATION_DELAY_STEP * 2)}
              className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto leading-relaxed"
            >
              {t('about.brand.description')}
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={getInitial({ opacity: 0, y: 40 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition(0)}
          className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-secondary/50"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.key}
                  initial={getInitial({ opacity: 0, y: 20 })}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={getTransition(index * ANIMATION_DELAY_STEP)}
                  className="text-center p-6 rounded-2xl bg-surface border border-border-light hover:border-primary/30 transition-colors"
                >
                  <stat.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <div className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-2">
                    {t(`${stat.label}.value`)}
                  </div>
                  <div className="text-sm text-muted">{t(`${stat.label}.label`)}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={getInitial({ opacity: 0, y: 40 })}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={getTransition(0)}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={getInitial({ opacity: 0, y: 20 })}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={getTransition(0)}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-4">
                {t('about.values.title')}
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.key}
                  initial={getInitial({ opacity: 0, y: 20 })}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={getTransition(index * ANIMATION_DELAY_STEP)}
                  className="p-8 rounded-2xl bg-surface border border-border-light hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                    {t(`${value.label}.title`)}
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {t(`${value.label}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
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

            <motion.div
              initial={getInitial({ opacity: 0, y: 20 })}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={getTransition(ANIMATION_DELAY_STEP)}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
            >
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border-light">
                <Mail className="w-6 h-6 text-primary" />
                <a
                  href={`mailto:${t('about.contact.email')}`}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {t('about.contact.email')}
                </a>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border-light">
                <Phone className="w-6 h-6 text-primary" />
                <span className="text-foreground">{t('about.contact.phone')}</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border-light">
                <MapPin className="w-6 h-6 text-primary" />
                <span className="text-foreground">{t('about.contact.address')}</span>
              </div>
            </motion.div>

            <motion.div
              initial={getInitial({ opacity: 0, y: 20 })}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={getTransition(ANIMATION_DELAY_STEP * 2)}
              className="text-center"
            >
              <Button variant="gradient" size="lg" className="rounded-2xl">
                {t('about.contact.sendMessage')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
