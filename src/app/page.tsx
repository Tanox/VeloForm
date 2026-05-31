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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 pt-6 pb-8 sm:pt-24">
        <div className="sm:hidden mb-6">
          <BikeTypeSelector />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <BuildList />
            <RecommendedConfigs />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <SummaryPanel />
          </motion.div>
        </div>
      </main>
      
      <ComponentSelector />
      <OnboardingGuide />
      <ComparePanel />
    </div>
  );
}
