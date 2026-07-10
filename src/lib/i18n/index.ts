'use client';

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
    support: string;
    login: string;
    logout: string;
    language: string;
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
  };
  recommended: {
    title: string;
    subtitle: string;
    load: string;
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
    faqCategories: {
      configurator: string;
      saveAndShare: string;
      pricing: string;
      technical: string;
    };
    faqItems: {
      configurator: readonly { question: string; answer: string }[];
      saveAndShare: readonly { question: string; answer: string }[];
      pricing: readonly { question: string; answer: string }[];
      technical: readonly { question: string; answer: string }[];
    };
  };
  common: {
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    close: string;
    components: string;
    retry: string;
    backToHome: string;
    loading: string;
  };
  error: {
    title: string;
    unexpectedError: string;
    stackTrace: string;
    homePageTitle: string;
    homePageMessage: string;
    libraryTitle: string;
    libraryMessage: string;
    backToConfigurator: string;
    contactSupport: string;
  };
  notFound: {
    title: string;
    description: string;
    backToHome: string;
    library: string;
  };
  loading: {
    message: string;
  };
  componentDetail: {
    technicalSpecs: string;
    keyFeatures: string;
    selectComponent: string;
    price: string;
    weight: string;
    reviews: string;
  };
  hero: {
    badge: string;
    title: string;
    titlePart1: string;
    titlePart2: string;
    description: string;
    descriptionLine1: string;
    descriptionLine2: string;
    cta: string;
    demo: string;
    trusted: string;
    scrollHint: string;
  };
  features: {
    title: string;
    subtitle: string;
    badge: string;
    items: {
      infinite: { title: string; description: string };
      speed: { title: string; description: string };
      security: { title: string; description: string };
      assets: { title: string; description: string };
      export: { title: string; description: string };
      sync: { title: string; description: string };
    };
  };
  pricing: {
    title: string;
    subtitle: string;
    badge: string;
    monthly: string;
    yearly: string;
    yearlyDiscount: string;
    guarantee: string;
    plans: {
      personal: { name: string; description: string; cta: string; features: readonly string[] };
      pro: {
        name: string;
        description: string;
        cta: string;
        popular: string;
        features: readonly string[];
      };
      enterprise: { name: string; description: string; cta: string; features: readonly string[] };
    };
  };
  cta: {
    badge: string;
    title: string;
    description: string;
    cta: string;
    learnMore: string;
    features: readonly string[];
  };
  footer: {
    description: string;
    categories: { product: string; company: string; resources: string; legal: string };
    links: {
      product: readonly string[];
      company: readonly string[];
      resources: readonly string[];
      legal: readonly string[];
    };
    copyright: string;
  };
  about: {
    brand: {
      title: string;
      description: string;
    };
    stats: {
      activeUsers: { value: string; label: string };
      components: { value: string; label: string };
      satisfaction: { value: string; label: string };
      countries: { value: string; label: string };
    };
    values: {
      title: string;
      loveRiding: { title: string; description: string };
      excellence: { title: string; description: string };
      userFirst: { title: string; description: string };
    };
    contact: {
      title: string;
      description: string;
      email: string;
      phone: string;
      address: string;
      sendMessage: string;
    };
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

// ---------------------------------------------------------------------------
// Store & helpers
// ---------------------------------------------------------------------------

import { create } from 'zustand';
import { useCallback } from 'react';

type Language = keyof typeof translations;

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string | readonly string[];
}

function getNestedValue(obj: unknown, path: string): string | readonly string[] {
  const result = path.split('.').reduce<unknown>((acc, part) => {
    if (typeof acc === 'object' && acc !== null) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);

  if (typeof result === 'string') {
    return result;
  }
  if (Array.isArray(result)) {
    return result;
  }
  return path;
}

export const useI18nStore = create<I18nStore>((set, get) => ({
  language: 'en',
  setLanguage: (lang: Language) => set({ language: lang }),
  t: (key: string, params?: Record<string, string | number>) => {
    const state = get();
    const translation = getNestedValue(translations[state.language], key);

    if (params && typeof translation === 'string') {
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

// Export type for consumers
export type { Translations, Language };
