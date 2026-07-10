import type { Metadata, Viewport } from 'next';
import { Fraunces, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SyncProvider } from '@/components/SyncProvider';
import { ClientErrorBoundary } from '@/components/ClientErrorBoundary';
import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
});

// Validate environment variables in development mode
if (process.env.NODE_ENV === 'development') {
  import('@/lib/env').catch((error) => {
    logger.warn('Environment validation warning:', error);
  });
}

export const metadata: Metadata = {
  title: 'Veloform — Build Your Dream Bike',
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
    { media: '(prefers-color-scheme: light)', color: '#fefdfb' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0d0a' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(fraunces.variable, hankenGrotesk.variable)}>
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
