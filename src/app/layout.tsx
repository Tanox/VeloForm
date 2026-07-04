import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SyncProvider } from '@/components/SyncProvider';
import { ClientErrorBoundary } from '@/components/ClientErrorBoundary';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';

// Validate environment variables in development mode
if (process.env.NODE_ENV === 'development') {
  import('@/lib/env').catch((error) => {
    logger.warn('Environment validation warning:', error);
  });
}

export const metadata: Metadata = {
  title: 'Veloform Configurator — Build Your Dream Bike',
  description:
    'Advanced bicycle configurator for Road, MTB, and Fold bikes. Customize components, estimate costs, and save builds.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Veloform',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <body className="min-h-screen bg-background font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-lg"
        >
          跳转到主要内容
        </a>
        <Providers>
          <TooltipProvider>
            <ClientErrorBoundary>
              <SyncProvider>{children}</SyncProvider>
            </ClientErrorBoundary>
          </TooltipProvider>
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
