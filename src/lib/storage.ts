'use client';

/**
 * 文件: src/lib/storage.ts
 * 版本: v4.4.1
 *
 * SSR / 测试环境下安全的 localStorage 访问。
 *
 * zustand 的 persist 中间件默认通过 `() => localStorage` 获取存储，
 * 在以下场景会崩溃：
 *   - 服务端渲染（SSR）时全局 localStorage 不存在
 *   - 测试环境（jsdom）未注入 localStorage
 *   - 浏览器隐私模式禁用存储
 * 本工具在不可用时退化为内存存储，避免 persist 调用 setItem 时抛错。
 */

import { createJSONStorage } from 'zustand/middleware';

/** 内存兜底存储，API 与 Storage 一致，适用于无 localStorage 的环境。 */
const memoryStore = new Map<string, string>();

const inMemoryStorage: Storage = {
  get length(): number {
    return memoryStore.size;
  },
  clear(): void {
    memoryStore.clear();
  },
  getItem(key: string): string | null {
    return memoryStore.has(key) ? (memoryStore.get(key) as string) : null;
  },
  key(index: number): string | null {
    return Array.from(memoryStore.keys())[index] ?? null;
  },
  removeItem(key: string): void {
    memoryStore.delete(key);
  },
  setItem(key: string, value: string): void {
    memoryStore.set(key, String(value));
  },
};

/** 返回浏览器 localStorage，不可用时返回内存存储。 */
export function safeLocalStorage(): Storage {
  if (typeof window === 'undefined') return inMemoryStorage;
  try {
    return window.localStorage;
  } catch {
    return inMemoryStorage;
  }
}

/** 供 zustand persist 直接使用的 JSON 存储。 */
export const safeJSONStorage = createJSONStorage(() => safeLocalStorage());
