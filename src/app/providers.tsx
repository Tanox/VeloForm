'use client';

import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { useI18nInit } from '@/lib/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  // Apply persisted/browser language after hydration (avoids SSR mismatch)
  useI18nInit();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </ThemeProvider>
  );
}
