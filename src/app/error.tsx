'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/lib/i18n';
import { uiLogger } from '@/lib/logger';

export default function HomeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslation();
  useEffect(() => {
    uiLogger.error('Home page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Error Icon */}
        <div className="relative mx-auto w-20 h-20">
          <div className="absolute inset-0 bg-destructive/10 rounded-full blur-xl" />
          <div className="relative w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-2">
          <h1 className="text-2xl font-display font-bold text-foreground">
            {t('error.homePageTitle')}
          </h1>
          <p className="text-muted text-sm sm:text-base">{t('error.homePageMessage')}</p>
        </div>

        {/* Error Details (Dev only) */}
        {process.env.NODE_ENV === 'development' && error.digest && (
          <div className="bg-surface-secondary/50 rounded-xl p-3">
            <p className="text-xs text-muted font-mono break-all">Error digest: {error.digest}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3">
          <Button variant="default" onClick={reset} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            {t('common.retry')}
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              {t('common.backToHome')}
            </Button>
          </Link>
        </div>

        {/* Support */}
        <p className="text-xs text-muted">{t('error.contactSupport')}</p>
      </div>
    </div>
  );
}
