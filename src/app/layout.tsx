import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/Toast';
import { SyncProvider } from '@/components/SyncProvider';

// Validate environment variables in development mode
if (process.env.NODE_ENV === 'development') {
  import('@/lib/env').catch((error) => {
    console.warn('Environment validation warning:', error);
  });
}

export const metadata: Metadata = {
  title: 'Veloform Configurator — Build Your Dream Bike',
  description: 'Advanced bicycle configurator for Road, MTB, and Fold bikes. Customize components, estimate costs, and save builds.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <SyncProvider>
            {children}
          </SyncProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}