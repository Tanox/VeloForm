import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Strict Content Security Policy for Next.js + Firebase
const CSP_POLICY = [
  "default-src 'self'",
  // Allow Firebase Web SDK connections
  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.firebaseio.com https://*.googleapis.com https://apis.google.com",
  // Firebase Auth uses these domains
  "frame-src 'self' https://*.firebaseapp.com https://auth.localhost:5555/",
  // Images from self, external CDNs, and Firebase Storage
  "img-src 'self' data: https: blob:",
  // Styles - Next.js requires 'unsafe-inline' for CSS-in-JS
  "style-src 'self' 'unsafe-inline'",
  // Fonts
  "font-src 'self' data:",
  // Connect to Firebase and Google APIs
  "connect-src 'self' https://*.firebaseio.com https://*.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com",
  // Worker scripts for PWA
  "worker-src 'self' blob:",
  // Manifest for PWA
  "manifest-src 'self'",
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
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    );
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
