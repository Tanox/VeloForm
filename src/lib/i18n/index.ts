'use client';

import { create } from 'zustand';
import { translations as enTranslations } from './en';
import { translations as zhCNTranslations } from './zh-CN';

type Language = 'en' | 'zh-CN';

type Translations = Record<string, any>;

const translations: Record<Language, Translations> = {
  en: enTranslations as Translations,
  'zh-CN': zhCNTranslations as Translations,
};

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((acc, part) => acc?.[part], obj) || path;
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
  return useI18nStore((state) => state.t);
}

export function useLanguage() {
  return useI18nStore((state) => state.language);
}

export function useSetLanguage() {
  return useI18nStore((state) => state.setLanguage);
}
