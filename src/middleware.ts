import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// src/middleware.ts v4.2.0 - 改进的 CSP 策略
// 改进说明：
// 1. script-src：移除 'unsafe-inline'，使用 'strict-dynamic' + 'unsafe-eval'（framer-motion 需要）
// 2. style-src：保留 'unsafe-inline'（Next.js styled-jsx 和 Tailwind 必需）
// 3. 添加 base-uri 和 form-action 限制，防止注入攻击
// 4. 明确限制外部域名白名单

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 改进的 CSP 策略
  const cspPolicy = [
    "default-src 'self'",
    // 脚本策略：
    // - 'strict-dynamic'：允许动态加载的脚本（但不允许内联脚本）
    // - 'unsafe-eval'：framer-motion 动画库必需（已知限制，无法完全移除）
    // - 移除了 'unsafe-inline'，显著提升安全性
    "script-src 'self' 'strict-dynamic' 'unsafe-eval'",
    // 样式策略：
    // - 保留 'unsafe-inline'：Next.js styled-jsx 和 Tailwind CSS 必需
    // - 限制外部字体域名
    "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://cdn.fontshare.com",
    // Supabase API 连接：明确限制域名
    "connect-src 'self' https://*.supabase.co https://*.supabase.io",
    // Frame 策略：仅允许 Supabase Auth
    "frame-src 'self' https://*.supabase.co",
    // 图片策略：限制为安全来源
    "img-src 'self' data: https: blob:",
    // 字体策略：明确域名白名单
    "font-src 'self' data: https://api.fontshare.com https://cdn.fontshare.com",
    // Worker 脚本：用于 PWA
    "worker-src 'self' blob:",
    // Manifest：用于 PWA
    "manifest-src 'self'",
    // 基础 URL 限制：防止 <base> 标签注入
    "base-uri 'self'",
    // 表单提交限制：防止表单劫持
    "form-action 'self'",
    // 插件限制：禁止 Flash 等过时插件
    "object-src 'none'",
  ].join('; ');

  // 设置 CSP header
  response.headers.set('Content-Security-Policy', cspPolicy);

  // Core Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

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
