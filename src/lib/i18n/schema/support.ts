export interface SupportTranslations {
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
}
