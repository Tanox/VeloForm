'use client';

import { Suspense, useState, useCallback } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useMyConfigs, useComparingConfigIds, useCompareStore, useConfigStore } from '@/lib/stores';
import { formatCurrency, formatWeight } from '@/lib/utils';
import { useTranslation } from '@/lib/i18n';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike, FolderOpen, Trash2, GitCompare, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { ComparePanel } from '@/components/configurator/ComparePanel';
import { deleteConfiguration as deleteConfigService } from '@/lib/config-service';
import { toast } from '@/lib/toast';

function LibraryContent() {
  const t = useTranslation();
  const myConfigs = useMyConfigs();
  const loadConfiguration = useConfigStore((s) => s.loadConfiguration);
  const toggleCompare = useCompareStore((s) => s.toggleCompare);
  const comparingConfigIds = useComparingConfigIds();
  const setMyConfigs = useCompareStore((s) => s.setMyConfigs);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = useCallback((configId: string) => {
    setDeletingId(configId);
    setDeleteDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingId) return;

    const configToDelete = myConfigs.find((c) => c.id === deletingId);
    if (!configToDelete) {
      setDeleteDialogOpen(false);
      setDeletingId(null);
      return;
    }

    const previousConfigs = [...myConfigs];
    setMyConfigs(myConfigs.filter((c) => c.id !== deletingId));

    setIsDeleting(true);

    try {
      await deleteConfigService(deletingId);
      toast('success', t('library.deleteSuccess'));
    } catch (error) {
      setMyConfigs(previousConfigs);
      toast('error', t('library.deleteError'));
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setDeletingId(null);
    }
  }, [deletingId, myConfigs, setMyConfigs, t]);

  const handleCancelDelete = useCallback(
    (open: boolean) => {
      if (!isDeleting && !open) {
        setDeleteDialogOpen(false);
        setDeletingId(null);
      }
    },
    [isDeleting]
  );

  return (
    <>
      {myConfigs.length === 0 ? (
        <Card className="text-center py-12 sm:py-20">
          <div className="flex flex-col items-center">
            <div className="mb-6 p-4 rounded-full bg-primary/10">
              <Bike className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-display font-semibold text-foreground mb-2">
              {t('library.noConfigs')}
            </h3>
            <p className="text-sm text-muted mb-6 max-w-xs mx-auto">{t('library.subtitle')}</p>
            <Link href="/">
              <Button>
                <FolderOpen className="w-4 h-4 mr-2" />
                {t('library.startBuilding')}
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {myConfigs.map((config, index) => (
              <motion.div
                key={config.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card className="h-full">
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {config.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted">
                        {t('library.bikeType')}: {config.bikeType}
                      </p>
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
                        variant={comparingConfigIds.includes(config.id || '') ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => config.id && toggleCompare(config.id)}
                      >
                        <GitCompare className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => config.id && handleDeleteClick(config.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={handleCancelDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="size-5 text-destructive" />
            </div>
            <AlertDialogTitle className="text-center">
              {t('library.deleteConfirmTitle')}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              {t('library.deleteConfirmDescription')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{t('common.cancel')}</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleConfirmDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {t('common.delete')}...
                </>
              ) : (
                t('common.delete')
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function LibrarySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4 sm:p-5 space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex justify-between">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-9 w-full" />
        </Card>
      ))}
    </div>
  );
}

export default function LibraryPage() {
  const t = useTranslation();

  return (
    <div className="min-h-screen">
      <Navbar onNavigate={() => {}} />

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

        <Suspense fallback={<LibrarySkeleton />}>
          <LibraryContent />
        </Suspense>
      </main>

      <ComparePanel />
    </div>
  );
}
