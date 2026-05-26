'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useConfigStore } from '@/lib/store';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FolderOpen, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function LibraryPage() {
  const myConfigs = useConfigStore((state) => state.myConfigs);
  const loadConfiguration = useConfigStore((state) => state.loadConfiguration);
  const deleteConfiguration = useConfigStore((state) => state.deleteConfiguration);

  return (
    <div className="min-h-screen">
      <Navbar />
      
<<<<<<< HEAD
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-8">
=======
      <main className="max-w-7xl mx-auto px-4 py-8">
>>>>>>> origin/main
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← Back to Configurator
            </Button>
          </Link>
          <h1 className="text-3xl font-display font-bold text-foreground mt-4">
            Your Build Library
          </h1>
          <p className="text-muted mt-2">Saved configurations from Veloform</p>
        </div>

        {myConfigs.length === 0 ? (
          <Card className="text-center py-16">
            <div className="text-muted text-lg mb-4">No saved configurations yet</div>
            <Link href="/">
              <Button>Start Building</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myConfigs.map((config, index) => (
              <motion.div
                key={config.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {config.name}
                      </h3>
                      <p className="text-sm text-muted">{config.bikeType}</p>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-muted">Cost</p>
                        <p className="font-semibold text-primary">
                          {formatCurrency(config.totalCost)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted">Weight</p>
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
                        Load
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
