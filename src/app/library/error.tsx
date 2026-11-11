// 文件路径: src/app/library/error.tsx v4.4.10
'use client';

import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { uiLogger } from '@/lib/logger';
import { ErrorPageView } from '@/components/ui/ErrorPageView';

export default function LibraryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslation();
  useEffect(() => {
    uiLogger.error('Library page error:', error);
  }, [error]);

  return (
    <ErrorPageView
      title={String(t('error.libraryTitle'))}
      message={String(t('error.libraryMessage'))}
      digest={error.digest}
      retryLabel={String(t('common.retry'))}
      backLabel={String(t('error.backToConfigurator'))}
      backIcon={ArrowLeft}
      onReset={reset}
    />
  );
}
