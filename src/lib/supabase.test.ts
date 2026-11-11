// 文件路径: src/lib/supabase.test.ts v4.4.10
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { createClient } = vi.hoisted(() => ({
  createClient: vi.fn(() => ({ marker: 'mock-client' })),
}));

vi.mock('@supabase/supabase-js', () => ({ createClient }));

import { isSupabaseConfigured, getSupabaseClient, resetSupabaseClient } from './supabase';

describe('Supabase 配置与客户端', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    resetSupabaseClient();
    createClient.mockClear();
  });

  it('缺少变量或使用示例占位值时判定未配置', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', '');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '');
    expect(isSupabaseConfigured()).toBe(false);
    expect(getSupabaseClient()).toBeNull();

    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'YOUR_SUPABASE_URL');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'YOUR_SUPABASE_ANON_KEY');
    expect(isSupabaseConfigured()).toBe(false);
  });

  it('只有 URL 而缺少 anon key 时不视为已配置', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://demo.supabase.co');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', '');
    expect(isSupabaseConfigured()).toBe(false);
  });

  it('配置完整时创建客户端并复用单例', () => {
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'https://demo.supabase.co');
    vi.stubEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'anon-key');
    expect(isSupabaseConfigured()).toBe(true);

    const first = getSupabaseClient();
    const second = getSupabaseClient();
    expect(first).toBe(second);
    expect(first).toEqual({ marker: 'mock-client' });
    expect(createClient).toHaveBeenCalledTimes(1);
  });
});
