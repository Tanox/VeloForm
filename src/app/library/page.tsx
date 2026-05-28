'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useConfigStore } from '@/lib/store';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { FolderOpen, Trash2, GitCompare } from 'lucide-react';
import Link from 'next/link';
import { ComparePanel } from '@/components/configurator/ComparePanel';

export default function LibraryPage() {
  const t = useTranslation();
  const myConfigs = useConfigStore((state) => state.myConfigs);
  const loadConfiguration = useConfigStore((state) => state.loadConfiguration);
  const deleteConfiguration = useConfigStore((state) => state.deleteConfiguration);
  const toggleCompare = useConfigStore((state) => state.toggleCompare);
  const comparingConfigIds = useConfigStore((state) => state.comparingConfigIds);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-6 sm:pb-8">
        <div className="mb-6 sm:mb-8">
          <Link href="/">
              <Button variant="ghost" size="sm">
                ← {t('library.backToConfigurator')}
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-3 sm:mt-4">
              {t('library.title')}
            </h1>
            <p className="text-sm sm:text-base text-muted mt-2">{t('library.subtitle')}</p>
        </div>

        {myConfigs.length === 0 ? (
          <Card className="text-center py-12 sm:py-16">
            <div className="text-muted text-base sm:text-lg mb-4">{t('library.noConfigs')}</div>
            <Link href="/">
              <Button>{t('library.startBuilding')}</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {myConfigs.map((config, index) => (
              <motion.div
                key={config.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {config.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted">{config.bikeType}</p>
                    </div>
                    
                    <div className="flex justify-between text-xs sm:text-sm">
                        <div>
                          <p className="text-muted">{t('library.cost')}</p>
                          <p className="font-semibold text-primary">
                            {formatCurrency(config.totalCost)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted">{t('library.weight')}</p>
                          <p className="font-semibold text-accent">
                            {formatWeight(config.estimatedWeight)}
                          </p>
                        </div>
                      </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        size="sm"
                        onClick={() => loadConfiguration(config)}
                      >
                        <FolderOpen className="w-4 h-4 mr-2" />
                        {t('library.load')}
                      </Button>
                      <Button
                        variant={comparingConfigIds.includes(config.id || '') ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => config.id && toggleCompare(config.id)}
                      >
                        <GitCompare className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => config.id && deleteConfiguration(config.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
