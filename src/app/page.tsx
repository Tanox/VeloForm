'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BikeTypeSelector } from '@/components/configurator/BikeTypeSelector';
import { BuildList } from '@/components/configurator/BuildList';
import { SummaryPanel } from '@/components/configurator/SummaryPanel';
import { ComponentSelector } from '@/components/configurator/ComponentSelector';
import { RecommendedConfigs } from '@/components/configurator/RecommendedConfigs';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function Home() {
  const handleNavigate = (page: string) => {
    console.log('Navigate to:', page);
  };

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigate} />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center py-12 sm:py-16 md:py-20 lg:py-24"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-primary/10 rounded-full mb-8"
            >
              <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-primary tracking-wide">
                全新设计体验
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display text-apple-title text-foreground mb-6"
            >
              打造你的<span className="text-gradient-primary">梦想自行车</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-muted max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              选择车型，自定义组件，创建专属于你的完美座驾。每一个细节都由你掌控。
            </motion.p>
          </div>
        </motion.section>

        {/* Bike Type Selector */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-display text-apple-title text-foreground mb-3">
              选择你的车型
            </h2>
            <p className="text-muted text-lg">
              我们为您提供公路车、山地车和折叠车三种选择
            </p>
          </div>
          <BikeTypeSelector />
        </motion.section>

        {/* Main Configurator */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.4, 0, 0.2, 1] }}
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

        {/* Recommended Configurations */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-border-light"
        >
          <RecommendedConfigs />
        </motion.section>
      </main>
      
      <Footer />
      <ComponentSelector />
    </div>
  );
}