import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Strict Content Security Policy for Next.js + Supabase
const CSP_POLICY = [
  "default-src 'self'",
  // Allow Supabase PostgREST (REST API), Realtime, Auth connections
  "connect-src 'self' https://*.supabase.co https://*.supabase.io",
  // Frame: Supabase Auth redirects may use iframes
  "frame-src 'self' https://*.supabase.co",
  // Images from self, external CDNs, and Supabase Storage
  "img-src 'self' data: https: blob:",
  // Styles - Next.js requires 'unsafe-inline'; fontshare.com for Satoshi & Clash Display fonts
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://cdn.fontshare.com",
  // Fonts - fontshare uses both api.fontshare.com and cdn.fontshare.com
  "font-src 'self' data: https://api.fontshare.com https://cdn.fontshare.com",
  // Worker scripts for PWA
  "worker-src 'self' blob:",
  // Manifest for PWA
  "manifest-src 'self'",
  // Scripts: Next.js requires 'unsafe-inline' for hydration; 'unsafe-eval' needed for framer-motion
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
].join('; ');

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Core Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Content Security Policy
  response.headers.set('Content-Security-Policy', CSP_POLICY);

  // Permissions Policy (disable unnecessary browser features)
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()'
  );

  // Strict Transport Security (force HTTPS in production)
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains; preload'
    );
  }

  // Cache Control for static assets
  if (
    request.nextUrl.pathname.startsWith('/_next/static') ||
    request.nextUrl.pathname.startsWith('/_next/image') ||
    /\.(js|css|ico|svg|png|jpg|jpeg|gif|webp)$/.test(request.nextUrl.pathname)
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
