'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
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
      
      <main className="pt-20 lg:pt-24 pb-24 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="animate-slide-up"
              >
                <BuildList />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                style={{ animationDelay: '0.1s' }}
                className="animate-slide-up"
              >
                <RecommendedConfigs />
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <SummaryPanel />
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="space-y-6 mt-6"
              >
                <div className="card p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                        <path d="M12 9v2m0 4h.01" />
                        <path d="M5 21h14a2 2 0 0 0 1.84-2.75l-3.54-6.91a2 2 0 0 0-.31-1.76l-3.54-3.54a2 2 0 0 0-1.76-.31L6.75 3.16A2 2 0 0 0 4 5v14a2 2 0 0 0 2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Pro Tip</h3>
                      <p className="text-sm text-muted">Upgrade to carbon wheels for a 15% weight reduction and significantly better ride quality.</p>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold text-foreground mb-4">Build Stats</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted">Value Index</span>
                        <span className="text-foreground font-medium">8.7/10</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-500" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted">Weight Score</span>
                        <span className="text-foreground font-medium">9.2/10</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted">Component Balance</span>
                        <span className="text-foreground font-medium">7.9/10</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all duration-500" style={{ width: '79%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ComponentSelector />
      <OnboardingGuide />
      <ComparePanel />
    </div>
  );
}
