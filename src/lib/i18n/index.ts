/**
 * Type-safe i18n system with compile-time translation key validation.
 * Each language file must satisfy the Translations interface structure.
 */

// ---------------------------------------------------------------------------
// Schema definition (single source of truth)
// ---------------------------------------------------------------------------

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Translations {
  app: {
    name: string;
    tagline: string;
  };
  nav: {
    home: string;
    library: string;
    about: string;
    faq: string;
    support: string;
    login: string;
    logout: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trustedBy: string;
    scrollHint: string;
  };
  features: {
    badge: string;
    title: string;
    titleAccent: string;
    titleSuffix: string;
    subtitle: string;
    items: ReadonlyArray<{
      title: string;
      description: string;
    }>;
  };
  pricing: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    monthly: string;
    yearly: string;
    savePercent: string;
    perMonth: string;
    popular: string;
    guarantee: string;
    plans: ReadonlyArray<{
      name: string;
      description: string;
      monthlyPrice: number;
      yearlyPrice: number;
      cta: string;
      features: readonly string[];
    }>;
  };
  cta: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    noCreditCard: string;
    cancelAnytime: string;
    freeForever: string;
  };
  about: {
    title: string;
    subtitle: string;
    missionTitle: string;
    missionText: string;
    storyTitle: string;
    storyText: string;
    valuesTitle: string;
    values: ReadonlyArray<{
      title: string;
      description: string;
    }>;
    teamTitle: string;
    backToHome: string;
  };
  faq: {
    title: string;
    subtitle: string;
    backToHome: string;
    items: ReadonlyArray<{
      question: string;
      answer: string;
    }>;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    signupTitle: string;
    signupSubtitle: string;
    email: string;
    password: string;
    confirmPassword: string;
    login: string;
    signup: string;
    loggingIn: string;
    signingUp: string;
    noAccount: string;
    hasAccount: string;
    forgotPassword: string;
    orContinueWith: string;
    continueWithGoogle: string;
    agreeTerms: string;
    termsOfService: string;
    privacyPolicy: string;
    backToHome: string;
  };
  configurator: {
    buildList: string;
    selectComponent: string;
    saveBuild: string;
    saving: string;
    reset: string;
    currentBuild: string;
    totalCost: string;
    estimatedWeight: string;
    emptyState: {
      title: string;
      description: string;
      cta: string;
    };
    loginToSave: string;
    loginToSaveHint: string;
  };
  bikeTypes: {
    road: string;
    mtb: string;
    fold: string;
  };
  categories: {
    frame: string;
    drivetrain: string;
    wheelset: string;
    suspension: string;
    cockpit: string;
    tires: string;
  };
  library: {
    title: string;
    subtitle: string;
    noConfigs: string;
    startBuilding: string;
    load: string;
    cost: string;
    weight: string;
    backToConfigurator: string;
    bikeType: string;
    deleteConfirmTitle: string;
    deleteConfirmDescription: string;
    deleteSuccess: string;
    deleteError: string;
  };
  recommended: {
    title: string;
    subtitle: string;
    load: string;
  };
  homePage: {
    bikeTypeTitle: string;
    bikeTypeSubtitle: string;
  };
  compare: {
    title: string;
    configs: string;
    component: string;
    load: string;
    close: string;
    selectToCompare: string;
    maxThree: string;
  };
  share: {
    title: string;
    link: string;
    copyLink: string;
    exportJSON: string;
    copied: string;
    copyFailed: string;
    exported: string;
    hint: string;
  };
  onboarding: {
    step1: { title: string; description: string; tip: string };
    step2: { title: string; description: string; tip: string };
    step3: { title: string; description: string; tip: string };
    step4: { title: string; description: string; tip: string };
    next: string;
    back: string;
    skip: string;
    getStarted: string;
  };
  support: {
    title: string;
    contactForm: string;
    name: string;
    email: string;
    message: string;
    send: string;
    submitted: string;
    thankYou: string;
    faq: string;
    faq1: string;
    faq1Answer: string;
    faq2: string;
    faq2Answer: string;
    faq3: string;
    faq3Answer: string;
  };
  common: {
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    components: string;
    themeLight: string;
    themeDark: string;
    toggleTheme: string;
  };
  componentDetail: {
    technicalSpecs: string;
    keyFeatures: string;
    selectComponent: string;
    price: string;
    weight: string;
    reviews: string;
  };
}

// ---------------------------------------------------------------------------
// Language files — import with satisfies to catch missing keys at compile time
// ---------------------------------------------------------------------------

import { translations as enTranslations } from './en';
import { translations as zhCNTranslations } from './zh-CN';

const translations: Record<string, Translations> = {
  en: enTranslations satisfies Translations,
  'zh-CN': zhCNTranslations satisfies Translations,
};

export { translations };

// ---------------------------------------------------------------------------
// Store & helpers
// ---------------------------------------------------------------------------

import { create } from 'zustand';
import { useCallback } from 'react';

type Language = keyof typeof translations;

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

function getNestedValue(obj: unknown, path: string): string {
  const result = path.split('.').reduce<unknown>((acc, part) => {
    if (typeof acc === 'object' && acc !== null) {
      return (acc as Record<string, unknown>)[part];
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

export function useTranslationsObject(): Translations {
  const language = useI18nStore((state) => state.language);
  return translations[language];
}

// Export type for consumers
export type { Translations, Language };
