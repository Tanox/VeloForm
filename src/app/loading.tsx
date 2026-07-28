'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bike } from 'lucide-react';
import { useWhimsy, useWhimsyPhrases } from '@/lib/whimsy-copy';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';

/**
 * Route-level loading screen — the bike is being assembled, with a rotating
 * playful status line so the wait feels like progress, not a stall.
 */
export default function HomeLoading() {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      {/* Bike being built */}
      <div className="relative mb-8">
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Bike className="w-16 h-16 text-primary" aria-hidden="true" />
        </motion.div>
        <span
          className="absolute -right-1 -top-1 text-2xl"
          style={{ animation: reduceMotion ? 'none' : 'velo-bob 1.6s ease-in-out infinite' }}
          aria-hidden="true"
        >
          ✨
        </span>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-2">{w('loading.title')}</h2>

      {/* Rotating status line */}
      <div className="h-6 relative flex items-center justify-center">
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

      {/* Indeterminate shimmer progress */}
      <div className="mt-7 w-56 h-1.5 bg-surface-tertiary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-orange-400 rounded-full"
          style={{ width: '45%' }}
          initial={{ x: reduceMotion ? '0%' : '-100%' }}
          animate={reduceMotion ? { x: '0%' } : { x: '260%' }}
          transition={reduceMotion ? undefined : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <span className="sr-only" aria-live="polite">
        {w('loading.title')} — {phrases[idx]}
      </span>
    </div>
  );
}
