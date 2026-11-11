// 文件路径: src/lib/env.placeholder.test.ts v4.4.9
import { describe, it, expect } from 'vitest';
import { isEnvPlaceholder, validateEnv } from './env';

describe('环境变量占位符校验', () => {
  it('识别 .env.example 的占位值', () => {
    expect(isEnvPlaceholder('YOUR_SUPABASE_URL')).toBe(true);
    expect(isEnvPlaceholder('YOUR_SUPABASE_ANON_KEY')).toBe(true);
    expect(isEnvPlaceholder('  ')).toBe(true);
    expect(isEnvPlaceholder(undefined)).toBe(true);
    expect(isEnvPlaceholder('https://example.supabase.co')).toBe(false);
  });

  it('占位值未替换时 validateEnv 报缺失', () => {
    const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const originalKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    try {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'YOUR_SUPABASE_URL';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
      const result = validateEnv();
      expect(result.ok).toBe(false);
      expect(result.missing).toContain('NEXT_PUBLIC_SUPABASE_URL');
    } finally {
      if (originalUrl === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      else process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
      if (originalKey === undefined) delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      else process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalKey;
    }
  });
});
