import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// src/middleware.ts v4.3.1 - CSP 策略
// 说明：
// 1. script-src 必须保留 'unsafe-inline'：Next.js App Router 在 HTML 中内联 RSC 水合负载
//    （self.__next_f.push(...)）与 webpack 运行时引导脚本，这些脚本无法预计算 hash，
//    且 Next 14.1 不会为其自动注入 nonce。移除 'unsafe-inline' 或改用 'strict-dynamic'
//    会导致全部脚本被 CSP 拦截、客户端无法水合、整站失去交互能力。
//    ⚠️ 注意：当 script-src 中存在 nonce/hash 来源时，浏览器会忽略 'unsafe-inline'，
//       因此本策略【不】添加 nonce，以确保 'unsafe-inline' 对内联脚本生效。
// 2. style-src 保留 'unsafe-inline'（styled-jsx / Tailwind 必需）。
// 3. 'unsafe-eval' 为 framer-motion 动画库运行所需（已知限制）。
// 4. 其余指令（connect / frame / img / font / base-uri / form-action / object）保持严格白名单。

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // CSP 策略
  const cspPolicy = [
    "default-src 'self'",
    // 脚本策略：'self' 允许 /_next/static 外部脚本；'unsafe-inline' 允许 Next RSC 水合内联脚本
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
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
