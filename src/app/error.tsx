'use client';

import { useEffect } from 'react';
import { Home } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { uiLogger } from '@/lib/logger';
import { ErrorPageView } from '@/components/ui/ErrorPageView';

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
    <ErrorPageView
      title={String(t('error.homePageTitle'))}
      message={String(t('error.homePageMessage'))}
      digest={error.digest}
      retryLabel={String(t('common.retry'))}
      backLabel={String(t('common.backToHome'))}
      backIcon={Home}
      onReset={reset}
      contactSupport={String(t('error.contactSupport'))}
    />
  );
}
