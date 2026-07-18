export interface MarketingTranslations {
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
}
