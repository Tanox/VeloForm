'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { useWhimsy, useWhimsyPhrases } from '@/lib/whimsy-copy';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';

export default function LibraryLoading() {
  const w = useWhimsy();
  const phrases = useWhimsyPhrases();
  const [idx, setIdx] = useState(0);
  const reduceMotion = useClientReducedMotion();

  useEffect(() => {
    const timer = window.setInterval(
      () => setIdx((p) => (p + 1) % phrases.length),
      1900
    );
    return () => window.clearInterval(timer);
  }, [phrases.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar Skeleton */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-2xl border-b border-border-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-24 h-5 hidden sm:block" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-10 h-10 rounded-xl hidden md:block" />
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-10 h-10 rounded-xl" />
              <Skeleton className="w-10 h-10 rounded-xl md:hidden" />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-6 sm:pb-8">
        {/* Themed loader header */}
        <div className="mb-6 sm:mb-8 flex items-center gap-3">
          <motion.div
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={reduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: 'linear' }}
            className="flex-shrink-0"
          >
            <Bike className="w-7 h-7 text-primary" aria-hidden="true" />
          </motion.div>
          <div className="h-6 relative flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-sm text-muted-foreground"
              >
                {phrases[idx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Config Cards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-4 sm:p-5 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="text-right space-y-1">
                  <Skeleton className="h-3 w-12 ml-auto" />
                  <Skeleton className="h-5 w-20 ml-auto" />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-9 w-9 rounded-lg" />
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
