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
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
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
