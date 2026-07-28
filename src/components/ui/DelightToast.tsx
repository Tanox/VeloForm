'use client';

/**
 * DelightToast — listens for the global `veloform:celebrate` CustomEvent and
 * pops a springy, confetti-backed celebration card. Any component can fire a
 * delightful moment without prop-drilling:
 *
 *   window.dispatchEvent(new CustomEvent('veloform:celebrate', {
 *     detail: { title: '组装完成 🎉', message: '...', icon: '🎉' }
 *   }));
 */

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientReducedMotion } from '@/lib/hooks/use-client-reduced-motion';

interface CelebrateDetail {
  title: string;
  message?: string;
  icon?: string;
}

interface ToastItem extends CelebrateDetail {
  id: number;
}

const CONFETTI_COLORS = [
  'hsl(var(--primary))',
  'hsl(145 50% 55%)',
  'hsl(38 92% 55%)',
  'hsl(220 80% 62%)',
  'hsl(300 70% 66%)',
  'hsl(190 75% 55%)',
];

function ConfettiBurst() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.18,
        duration: 0.9 + Math.random() * 0.8,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        rot: Math.random() * 360,
        dx: (Math.random() - 0.5) * 80,
        size: 6 + Math.random() * 6,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="velo-confetti"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.42,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            ['--dx' as string]: `${p.dx}px`,
            ['--rot' as string]: `${p.rot}deg`,
          }}
        />
      ))}
    </div>
  );
}

export function DelightToast() {
  const reduceMotion = useClientReducedMotion();
  const [items, setItems] = useState<ToastItem[]>([]);

  useEffect(() => {
    let idCounter = 0;
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<CelebrateDetail>).detail;
      if (!detail || !detail.title) return;
      const id = ++idCounter;
      setItems((prev) => [...prev, { ...detail, id }]);
      window.setTimeout(() => {
        setItems((prev) => prev.filter((it) => it.id !== id));
      }, 3800);
    };
    window.addEventListener('veloform:celebrate', handler);
    return () => window.removeEventListener('veloform:celebrate', handler);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-3 px-4"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence>
        {items.map((it) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, y: -24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="pointer-events-auto relative overflow-hidden rounded-2xl border border-primary/20 bg-card/95 px-5 py-4 shadow-2xl backdrop-blur-xl"
            role="status"
          >
            {!reduceMotion && <ConfettiBurst />}
            <div className="relative flex items-center gap-3">
              <span className="text-2xl leading-none" aria-hidden="true">
                {it.icon ?? '🎉'}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{it.title}</p>
                {it.message && (
                  <p className="mt-0.5 text-xs text-muted-foreground">{it.message}</p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
