import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { NextRequest } from 'next/server';

const { headerStore } = vi.hoisted(() => ({ headerStore: new Map<string, string>() }));

vi.mock('next/server', () => ({
  NextResponse: {
    next: () => ({
      headers: {
        set: (key: string, value: string) => headerStore.set(key, value),
      },
    }),
  },
}));

import { middleware, config } from './middleware';

function asRequest(pathname: string): NextRequest {
  return { nextUrl: { pathname } } as unknown as NextRequest;
}

describe('middleware 安全响应头', () => {
  beforeEach(() => headerStore.clear());

  it('页面请求返回核心安全头与严格 CSP 指令', () => {
    middleware(asRequest('/'));
    expect(headerStore.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headerStore.get('X-Frame-Options')).toBe('DENY');
    expect(headerStore.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(headerStore.get('Permissions-Policy')).toContain('camera=()');

    const csp = headerStore.get('Content-Security-Policy') ?? '';
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain('upgrade-insecure-requests');
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("base-uri 'self'");
  });

  it('图片来源使用域名白名单，不使用 https: 通配', () => {
    middleware(asRequest('/'));
    const csp = headerStore.get('Content-Security-Policy') ?? '';
    expect(csp).toContain('https://images.unsplash.com');
    expect(csp).toContain('https://*.supabase.co');
    expect(csp).not.toContain('https: blob:');
  });

  it('静态资源带长期缓存，普通页面不设置缓存头', () => {
    middleware(asRequest('/_next/static/chunk.js'));
    expect(headerStore.get('Cache-Control')).toContain('immutable');

    headerStore.clear();
    middleware(asRequest('/library'));
    expect(headerStore.get('Cache-Control')).toBeUndefined();
  });

  it('matcher 排除 api 与 _next 静态资源', () => {
    expect(config.matcher[0]).toContain('api');
    expect(config.matcher[0]).toContain('_next/static');
  });
});
