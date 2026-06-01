// src/lib/i18n/index.ts v0.1.1
'use client';

import { create } from 'zustand';
import { useCallback } from 'react';
import { translations as enTranslations } from './en';
import { translations as zhCNTranslations } from './zh-CN';

type Language = 'en' | 'zh-CN';

interface TranslationObject { [key: string]: TranslationValue; }

type TranslationValue = string | TranslationObject;

type Translations = Record<string, TranslationValue>;

const translations: Record<Language, Translations> = {
  en: enTranslations as unknown as Translations,
  'zh-CN': zhCNTranslations as unknown as Translations,
};

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

function getNestedValue(obj: TranslationValue, path: string): string {
  const result = path.split('.').reduce((acc: TranslationValue | undefined, part) => {
    if (typeof acc === 'object' && acc !== null) {
      return acc[part];
    }
    return undefined;
  }, obj);
  
  return typeof result === 'string' ? result : path;
}

export const useI18nStore = create<I18nStore>((set, get) => ({
  language: 'en',
  setLanguage: (lang: Language) => set({ language: lang }),
  t: (key: string, params?: Record<string, string | number>) => {
    const state = get();
    const translation = getNestedValue(translations[state.language], key);
    
    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, value]) => str.replace(`{${paramKey}}`, String(value)),
        translation
      );
    }
    
    return translation;
  },
}));

export function useTranslation() {
  const t = useI18nStore((state) => state.t);
  return useCallback((key: string, params?: Record<string, string | number>) => {
    return t(key, params);
  }, [t]);
}

export function useLanguage() {
  return useI18nStore((state) => state.language);
}

export function useSetLanguage() {
  return useI18nStore((state) => state.setLanguage);
}
