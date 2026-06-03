'use client';

import { Navbar } from '@/components/layout/Navbar';
import { BuildList } from '@/components/configurator/BuildList';
import { SummaryPanel } from '@/components/configurator/SummaryPanel';
import { ComponentSelector } from '@/components/configurator/ComponentSelector';
import { RecommendedConfigs } from '@/components/configurator/RecommendedConfigs';
import { BikeTypeSelector } from '@/components/configurator/BikeTypeSelector';
import { ComparePanel } from '@/components/configurator/ComparePanel';
import { OnboardingGuide } from '@/components/ui/OnboardingGuide';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

export default function Home() {
  const t = useTranslation();

  return (
    <div className="min-h-screen noise-bg">
      <div className="gradient-mesh" />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground mb-2">
                {t('home.title')}
              </h1>
              <p className="text-muted text-base sm:text-lg max-w-2xl">
                {t('home.description')}
              </p>
            </div>
            <div className="sm:hidden w-full">
              <BikeTypeSelector />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="xl:col-span-2"
          >
            <div className="space-y-6 lg:space-y-8">
              <BuildList />
              <RecommendedConfigs />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="xl:col-span-1"
          >
            <div className="hidden sm:block sticky top-24 space-y-6">
              <SummaryPanel />
            </div>
            <div className="sm:hidden space-y-6">
              <SummaryPanel />
            </div>
          </motion.div>
        </div>
      </main>
      
      <ComponentSelector />
      <OnboardingGuide />
      <ComparePanel />
    </div>
  );
}
