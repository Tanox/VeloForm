'use client';

import Link from 'next/link';
import { Bike, Home } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { useWhimsy } from '@/lib/whimsy-copy';

/**
 * 404 — the bike took a wrong turn. Playful copy + a gently wobbling bike so a
 * dead-end still feels on-brand and human.
 */
export default function NotFound() {
  const t = useTranslation();
  const w = useWhimsy();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Graphic */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl" />
          <div className="relative flex items-center justify-center">
            <div className="text-[120px] sm:text-[160px] font-display font-bold leading-none tracking-tighter">
              <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                4
              </span>
              <span className="text-foreground/20">0</span>
              <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                4
              </span>
            </div>
          </div>
          {/* Decorative bike icon that wobbles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Bike className="w-16 h-16 text-primary/30 velo-wobble" aria-hidden="true" />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {w('notFound.eyebrow')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            {w('notFound.title')}
          </h1>
          <p className="text-muted text-sm sm:text-base">{w('notFound.hint')}</p>
        </div>

        {/* Action */}
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="btn-shine inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-orange-400 text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            {t('notFound.backToHome')}
          </Link>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface-secondary/80 border border-border-light text-foreground font-medium hover:bg-surface-tertiary/50 transition-colors"
          >
            <Bike className="w-4 h-4" aria-hidden="true" />
            {t('notFound.library')}
          </Link>
        </div>
      </div>
    </div>
  );
}
