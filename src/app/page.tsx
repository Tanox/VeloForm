'use client';

import { Suspense, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Pricing } from '@/components/sections/Pricing';
import { Cta } from '@/components/sections/Cta';
import { BikeTypeSelector } from '@/components/configurator/BikeTypeSelector';
import { BuildList } from '@/components/configurator/BuildList';
import { SummaryPanel } from '@/components/configurator/SummaryPanel';
import { ComponentSelector } from '@/components/configurator/ComponentSelector';
import { RecommendedConfigs } from '@/components/configurator/RecommendedConfigs';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { SectionSkeleton } from '@/components/ui/SectionSkeleton';
import { motion } from 'framer-motion';
import { uiLogger } from '@/lib/logger';
import { useKeyboardShortcuts } from '@/lib/hooks/useKeyboardShortcuts';
import { parseShareableConfig } from '@/lib/shareable-config';
import { useConfigStore } from '@/lib/stores/config-store';
import { toast } from '@/lib/toast';

export default function Home() {
  const handleNavigate = (page: string) => {
    uiLogger.debug('Navigate to:', page);
  };

  // 全局键盘快捷键：S 保存 / R 重置 / 1·2·3 切换车型
  useKeyboardShortcuts();

  // 解析分享链接 ?config= 参数，加载他人分享的配置
  // URLSearchParams.get 会自动解码 encodeURIComponent 后的 base64，无需手动解码
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const encoded = new URLSearchParams(window.location.search).get('config');
    if (!encoded) return;
    const result = parseShareableConfig(encoded);
    if (!result.valid || !result.data) {
      toast('error', '分享链接无效或已损坏');
      return;
    }
    const { bikeType, name, components } = result.data;
    useConfigStore.getState().loadConfiguration({ bikeType, components, manualConfigName: name });
    toast('success', `已加载分享配置：${name}`);
    // 加载后清理 URL，避免刷新重复加载
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  return (
    <div id="app-root" className="min-h-screen bg-background">
      <Navbar onNavigate={handleNavigate} />
      <Hero onNavigate={handleNavigate} />

      <main id="main-content" className="pb-32 sm:pb-40">
        {/* Core Features */}
        <Features />

        {/* Bike Type Selector */}
        <motion.section
          id="section-bike-type"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-3">
              选择你的车型
            </h2>
            <p className="text-muted text-lg">
              我们为您提供公路车、山地车和折叠车三种选择
            </p>
          </div>
          <BikeTypeSelector />
        </motion.section>

        {/* Main Configurator */}
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen />}>
            <motion.section
              id="section-configurator"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
                <div id="configurator-build-list" className="lg:col-span-2">
                  <BuildList />
                </div>
                <div id="configurator-summary" className="lg:col-span-1">
                  <SummaryPanel />
                </div>
              </div>
            </motion.section>
          </Suspense>
        </ErrorBoundary>

        {/* Recommended Configurations */}
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4"><SectionSkeleton height="h-64" /></div>}>
          <motion.section
            id="section-recommended"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-border-light"
          >
            <RecommendedConfigs />
          </motion.section>
        </Suspense>
        {/* Pricing Section */}
        <Suspense fallback={<SectionSkeleton height="h-96" />}>
          <Pricing />
        </Suspense>

        {/* Final CTA */}
        <Suspense fallback={<SectionSkeleton height="h-64" />}>
          <Cta />
        </Suspense>
      </main>

      <Footer />
      <ComponentSelector />
    </div>
  );
}