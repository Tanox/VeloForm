'use client';

import { ThemeProvider } from 'next-themes';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useEffect, useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ErrorBoundary>
        {mounted ? children : <div className="min-h-screen" />}
      </ErrorBoundary>
    </ThemeProvider>
  );
}
