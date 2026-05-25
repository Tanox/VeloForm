import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Veloform Configurator',
  description: 'Advanced bicycle configurator for Road, MTB, and Fold bikes',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background gradient-mesh noise-bg">
        {children}
      </body>
    </html>
  );
}
