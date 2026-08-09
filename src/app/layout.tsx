import type { Metadata, Viewport } from 'next';
import './globals.css';
import './whimsy.css';
import { Providers } from './providers';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SyncProvider } from '@/components/SyncProvider';
import { ClientErrorBoundary } from '@/components/ClientErrorBoundary';
import { DelightLayer } from '@/components/ui/DelightLayer';
import { logger } from '@/lib/logger';

// 字体通过 globals.css 中的 --font-display / --font-sans CSS 变量定义（含系统字体栈 fallback）。
// 不再使用 next/font/google，避免构建时强依赖外部网络下载字体（离线/CI 环境更稳健）。

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <TooltipProvider>
            <ClientErrorBoundary>
              <SyncProvider>{children}</SyncProvider>
            </ClientErrorBoundary>
          </TooltipProvider>
          <DelightLayer />
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
