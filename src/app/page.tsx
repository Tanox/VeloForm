'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { BikeTypeSelector } from '@/components/configurator/BikeTypeSelector';
import { BuildList } from '@/components/configurator/BuildList';
import { SummaryPanel } from '@/components/configurator/SummaryPanel';
import { ComponentSelector } from '@/components/configurator/ComponentSelector';
import { RecommendedConfigs } from '@/components/configurator/RecommendedConfigs';
import { Pricing } from '@/components/sections/Pricing';
import { Cta } from '@/components/sections/Cta';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { motion } from 'framer-motion';
import { useCallback } from 'react';
import { useTranslation } from '@/lib/i18n';

export default function Home() {
  const router = useRouter();
  const t = useTranslation();

  const handleNavigate = useCallback(
    (page: string) => {
      if (page === 'home') {
        router.push('/');
      } else if (page === 'library') {
        router.push('/library');
      } else if (page === 'about') {
        router.push('/about');
      } else if (page === 'faq') {
        router.push('/faq');
      }
    },
    [router]
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigate} />
      <Hero onNavigate={handleNavigate} />

      <main id="main-content">
        {/* Core Features */}
        <Features />

        {/* Bike Type Selector */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
              {t('homePage.bikeTypeTitle')}
            </h2>
            <p className="text-muted text-lg">{t('homePage.bikeTypeSubtitle')}</p>
          </div>
          <BikeTypeSelector />
        </motion.section>

        {/* Main Configurator */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                <div className="lg:col-span-2">
                  <BuildList />
                </div>
                <div className="lg:col-span-1">
                  <SummaryPanel />
                </div>
              </div>
            </motion.section>
          </Suspense>
        </ErrorBoundary>

        {/* Recommended Configurations */}
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 h-64" />}>
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-border-light"
          >
            <RecommendedConfigs />
          </motion.section>
        </Suspense>

        {/* Pricing */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24"
        >
          <Pricing />
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24"
        >
          <Cta />
        </motion.section>
      </main>

      <Footer />
      <ComponentSelector />
    </div>
  );
}
