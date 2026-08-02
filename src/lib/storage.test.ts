import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('safeLocalStorage', () => {
  const originalWindow = globalThis.window;

  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('falls back to in-memory storage when window is undefined (SSR)', () => {
    vi.stubGlobal('window', undefined as unknown as Window & typeof globalThis);
    const { safeLocalStorage } = require('./storage');
    const storage = safeLocalStorage();
    storage.setItem('k', 'v');
    expect(storage.getItem('k')).toBe('v');
    expect(storage.length).toBe(1);
    storage.removeItem('k');
    expect(storage.getItem('k')).toBeNull();
  });

  it('uses real localStorage when available', () => {
    const mem = new Map<string, string>();
    const fakeLocalStorage = {
      get length() {
        return mem.size;
      },
      clear: () => mem.clear(),
      getItem: (k: string) => (mem.has(k) ? mem.get(k)! : null),
      key: (i: number) => Array.from(mem.keys())[i] ?? null,
      removeItem: (k: string) => mem.delete(k),
      setItem: (k: string, v: string) => mem.set(k, String(v)),
    };
    vi.stubGlobal('window', { localStorage: fakeLocalStorage } as unknown as Window & typeof globalThis);
    const { safeLocalStorage } = require('./storage');
    const storage = safeLocalStorage();
    storage.setItem('a', '1');
    expect(storage.getItem('a')).toBe('1');
  });

  it('falls back to in-memory when accessing window.localStorage throws (privacy mode)', () => {
    vi.stubGlobal('window', {
      get localStorage() {
        throw new Error('blocked');
      },
    } as unknown as Window & typeof globalThis);
    const { safeLocalStorage } = require('./storage');
    const storage = safeLocalStorage();
    storage.setItem('x', 'y');
    expect(storage.getItem('x')).toBe('y');
  });

  it('safeJSONStorage persists and restores objects', () => {
    vi.stubGlobal('window', undefined as unknown as Window & typeof globalThis);
    const { safeJSONStorage } = require('./storage');
    safeJSONStorage.setItem('obj', { foo: 'bar', n: 1 } as unknown as string);
    const restored = safeJSONStorage.getItem('obj') as unknown as { foo: string; n: number };
    expect(restored.foo).toBe('bar');
    expect(restored.n).toBe(1);
  });
});
