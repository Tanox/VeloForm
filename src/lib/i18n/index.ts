'use client';

/**
 * Type-safe i18n system with compile-time translation key validation.
 * Each language file must satisfy the Translations interface structure.
 */

import type { Translations } from './types';

// ---------------------------------------------------------------------------
// Language files — import with satisfies to catch missing keys at compile time
// ---------------------------------------------------------------------------

import { translations as enTranslations } from './en';
import { translations as zhCNTranslations } from './zh-CN';

const translations: Record<string, Translations> = {
  en: enTranslations satisfies Translations,
  'zh-CN': zhCNTranslations satisfies Translations,
};

// ---------------------------------------------------------------------------
// Store & helpers
// ---------------------------------------------------------------------------

import { create } from 'zustand';
import type { StateCreator } from 'zustand';
import { useCallback } from 'react';

type Language = keyof typeof translations;

const STORAGE_KEY = 'veloform-language';

/**
 * Resolve the initial language: stored preference > browser locale > default 'en'.
 * SSR-safe (falls back to 'en' when there is no window).
 */
function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'zh-CN') return stored;
    const navLang = window.navigator?.language?.toLowerCase() ?? '';
    if (navLang.startsWith('zh')) return 'zh-CN';
  } catch {
    /* localStorage may be unavailable (private mode) — ignore */
  }
  return 'en';
}

/** Keep the <html lang> attribute in sync with the active language. */
function syncDocumentLanguage(lang: Language): void {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang === 'zh-CN' ? 'zh-CN' : 'en';
  }
}

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string | readonly string[];
}

function getNestedValue(
  obj: unknown,
  path: string
): string | readonly string[] | undefined {
  const result = path.split('.').reduce<unknown>((acc, part) => {
    if (typeof acc === 'object' && acc !== null) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);

  if (typeof result === 'string') return result;
  if (Array.isArray(result)) return result;
  return undefined;
}

const i18nStoreCreator: StateCreator<I18nStore> = (set, get) => ({
  language: getInitialLanguage(),
  setLanguage: (lang: Language) => {
    set({ language: lang });
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* ignore storage errors */
      }
    }
    syncDocumentLanguage(lang);
  },
  t: (key: string, params?: Record<string, string | number>) => {
    const state = get();
    let translation = getNestedValue(translations[state.language], key);

    // Fallback to English for any key missing in the active locale
    if (translation === undefined && state.language !== 'en') {
      translation = getNestedValue(translations.en, key);
    }
    if (translation === undefined) return key;

    if (params && typeof translation === 'string') {
      return Object.entries(params).reduce(
        (str, [paramKey, value]) => str.replace(`{${paramKey}}`, String(value)),
        translation
      );
    }

    return translation;
  },
});

export const useI18nStore = create<I18nStore>()(i18nStoreCreator);

// Ensure <html lang> reflects the initial language on first client load
if (typeof window !== 'undefined') {
  syncDocumentLanguage(useI18nStore.getState().language);
}

/**
 * Returns a translation function. Subscribes to the active language so that
 * every consumer re-renders when the language changes. Previously the stable
 * `t` reference meant switches did not propagate to subscribed components.
 */
export function useTranslation() {
  const language = useI18nStore((state) => state.language);
  const t = useI18nStore((state) => state.t);
  return useCallback(
    (key: string, params?: Record<string, string | number>) => {
      return t(key, params);
    },
    [t]
  );
}

export function useLanguage() {
  return useI18nStore((state) => state.language);
}

export function useSetLanguage() {
  return useI18nStore((state) => state.setLanguage);
}

// Export type for consumers
export type { Translations, Language };

export type TranslationFunction = (
  key: string,
  params?: Record<string, string | number>
) => string | readonly string[];
