export const translations = {
  app: {
    name: 'Veloform',
    tagline: 'Premium Bike Configurator',
  },
  nav: {
    home: 'Home',
    library: 'Library',
    support: 'Support',
    login: 'Login',
    logout: 'Logout',
    language: 'Language',
  },
  configurator: {
    buildList: 'Build List',
    selectComponent: 'Select Component',
    saveBuild: 'Save Build',
    saving: 'Saving...',
    reset: 'Reset',
    currentBuild: 'Current Build',
    totalCost: 'Total Cost',
    estimatedWeight: 'Est. Weight',
    emptyState: {
      title: 'No components selected yet',
      description:
        'Start building your dream ride by selecting components. Each component shows real-time price and weight.',
      cta: 'Select Your First Component',
    },
    loginToSave: 'Log in to save configurations',
    loginToSaveHint:
      'Saved configurations are automatically synced to the cloud so you can continue editing on any device. Without logging in, configurations are only stored locally in your browser.',
  },
  bikeTypes: {
    road: 'Road',
    mtb: 'MTB',
    fold: 'Fold',
  },
  categories: {
    frame: 'Frame',
    drivetrain: 'Drivetrain',
    wheelset: 'Wheelset',
    suspension: 'Suspension',
    cockpit: 'Cockpit',
    tires: 'Tires',
  },
  library: {
    title: 'Your Build Library',
    subtitle: 'Saved configurations from Veloform',
    noConfigs: 'No saved configurations yet',
    startBuilding: 'Start Building',
    load: 'Load',
    cost: 'Cost',
    weight: 'Weight',
    backToConfigurator: 'Back to Configurator',
    bikeType: 'Bike Type',
  },
  recommended: {
    title: 'Recommended Builds',
    subtitle: 'Expert-curated configurations',
    load: 'Load Configuration',
  },
  compare: {
    title: 'Compare Configurations',
    configs: 'configs',
    component: 'Component',
    load: 'Load',
    close: 'Close',
    selectToCompare: 'Select configurations to compare',
    maxThree: 'You can compare up to 3 configurations',
  },
  share: {
    title: 'Share Configuration',
    link: 'Shareable Link',
    copyLink: 'Copy Link',
    exportJSON: 'Export as JSON',
    copied: 'Link copied to clipboard!',
    copyFailed: 'Failed to copy link',
    exported: 'Configuration exported successfully!',
    hint: 'Share your build with friends or save it for later.',
  },
  onboarding: {
    step1: {
      title: 'Choose Your Bike Type',
      description: 'Select from Road, MTB, or Fold bikes to start building your dream ride.',
      tip: 'Each bike type has optimized component recommendations to help you get started quickly.',
    },
    step2: {
      title: 'Customize Components',
      description: 'Click on any component to explore alternatives and find your perfect match.',
      tip: 'We show real-time price and weight changes to help you make informed decisions.',
    },
    step3: {
      title: 'Save Your Build',
      description: 'Save configurations to your library and revisit them anytime.',
      tip: 'Configurations sync to the cloud automatically, accessible from any device.',
    },
    step4: {
      title: 'Compare & Share',
      description: 'Compare different builds and share your configuration with others.',
      tip: 'Compare up to 3 configurations at once to find the best option.',
    },
    next: 'Next',
    back: 'Back',
    skip: 'Skip tour',
    getStarted: 'Get Started',
  },
  support: {
    title: 'Need Help?',
    contactForm: 'Send us a message',
    name: 'Your Name',
    email: 'Your Email',
    message: 'Your Message',
    send: 'Send Message',
    submitted: 'Message Sent!',
    thankYou: 'Thank you for reaching out. We will get back to you shortly.',
    faq: 'Frequently Asked Questions',
    faq1: 'How do I save my configuration?',
    faq1Answer:
      'Click the "Save Build" button in the summary panel. Your configuration will be saved to your library for future access.',
    faq2: 'Can I share my configuration?',
    faq2Answer:
      'Yes! Click the "Share Configuration" button to generate a shareable link or export your configuration as JSON.',
    faq3: 'How do I compare configurations?',
    faq3Answer:
      'Go to your library page, select configurations using the compare button, and a comparison panel will appear at the bottom of the screen.',
    faqCategories: {
      configurator: 'Configurator',
      saveAndShare: 'Save and Share',
      pricing: 'Pricing and Subscription',
      technical: 'Technical Support',
    },
    faqItems: {
      configurator: [
        {
          question: 'How do I start building a bike?',
          answer:
            'Start by selecting your bike type (Road, MTB, or Fold) from the main page. Then click on any component category to explore available options and customize your build.',
        },
        {
          question: 'Can I customize all components?',
          answer:
            'Yes! You can customize every component including frame, drivetrain, wheelset, suspension, cockpit, and tires. Each component has multiple options to choose from.',
        },
        {
          question: 'How do I reset my configuration?',
          answer:
            'Click the "Reset" button in the summary panel to clear all selected components and start fresh. This action cannot be undone.',
        },
      ],
      saveAndShare: [
        {
          question: 'How do I save my configuration?',
          answer:
            'Click the "Save Build" button in the summary panel. If you are logged in, your configuration will be synced to the cloud. If not, it will be saved locally in your browser.',
        },
        {
          question: 'Can I share my configuration with others?',
          answer:
            'Absolutely! Click the "Share Configuration" button to generate a shareable link. Anyone with the link can view and even edit your configuration.',
        },
        {
          question: 'How do I export my configuration?',
          answer:
            'In the share modal, select "Export as JSON" to download your configuration as a JSON file. You can import this file later or share it with others.',
        },
      ],
      pricing: [
        {
          question: 'What is included in the free plan?',
          answer:
            'The free Personal plan includes unlimited projects, 5GB storage, basic component library, community templates, and standard support.',
        },
        {
          question: 'Can I upgrade or downgrade my plan?',
          answer:
            'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and your billing will be adjusted accordingly.',
        },
        {
          question: 'Do you offer annual discounts?',
          answer:
            'Yes! We offer a 20% discount when you subscribe to an annual plan instead of monthly. This discount applies to all paid plans.',
        },
      ],
      technical: [
        {
          question: 'What browsers are supported?',
          answer:
            'We support all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version.',
        },
        {
          question: 'Is my data secure?',
          answer:
            'Yes! All data is encrypted in transit and at rest. We use industry-standard security measures to protect your configurations and personal information.',
        },
        {
          question: 'How do I report a bug?',
          answer:
            'If you encounter any issues, please use the contact form on our support page or email us at support@veloform.com with a detailed description of the problem.',
        },
      ],
    },
  },
  common: {
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    close: 'Close',
    components: 'components',
  },
  componentDetail: {
    technicalSpecs: 'Technical Specifications',
    keyFeatures: 'Key Features',
    selectComponent: 'Select this component',
    price: 'Price',
    weight: 'Weight',
    reviews: 'reviews',
  },
  hero: {
    badge: 'New Version Available',
    title: 'Build Your Dream Bike',
    titlePart1: 'Build',
    titlePart2: 'Your Dream Bike',
    description:
      'Choose your bike type, customize components, and create your perfect ride. Every detail is in your control.',
    descriptionLine1: 'Choose your bike type, customize components, and create your perfect ride.',
    descriptionLine2: 'Every detail is in your control.',
    cta: 'Start Configuring',
    demo: 'Watch Demo Video',
    trusted: 'Trusted by leading brands worldwide',
    scrollHint: 'Scroll Down',
  },
  features: {
    title: 'Built for Riders',
    subtitle:
      'Powerful features with intuitive controls, making bike configuration easy and enjoyable',
    badge: 'Core Features',
    items: {
      infinite: {
        title: 'Infinite Configurations',
        description: 'Rich component selection from frames to accessories, build your perfect ride',
      },
      speed: {
        title: 'Lightning Fast',
        description: 'Millisecond response times, smooth experience, no delays in creation',
      },
      security: {
        title: 'Secure & Reliable',
        description: 'End-to-end encryption, automatic cloud backup, your configurations are safe',
      },
      assets: {
        title: 'Rich Resources',
        description: 'Massive premium component library, one-click access, unleash your creativity',
      },
      export: {
        title: 'Data Export',
        description: 'One-click export of configuration list, share your perfect build',
      },
      sync: {
        title: 'Cloud Sync',
        description: 'Seamless multi-device sync, continue configuring anywhere',
      },
    },
  },
  pricing: {
    title: 'Choose Your Plan',
    subtitle: 'Flexible pricing strategies to meet the needs of users at every scale',
    badge: 'Pricing Plans',
    monthly: 'Monthly',
    yearly: 'Yearly',
    yearlyDiscount: 'Save 20%',
    guarantee:
      'All plans include a 14-day money-back guarantee. If you are not satisfied for any reason, you can request a full refund without any questions.',
    plans: {
      personal: {
        name: 'Personal',
        description: 'Perfect for individual cycling enthusiasts',
        cta: 'Start Free',
        features: [
          'Unlimited Projects',
          '5GB Storage',
          'Basic Component Library',
          'Community Templates',
          'Standard Support',
        ],
      },
      pro: {
        name: 'Pro',
        description: 'For professional riders and small teams',
        cta: 'Upgrade Now',
        popular: 'Most Popular',
        features: [
          'Unlimited Projects',
          '100GB Storage',
          'Premium Component Library',
          'Exclusive Templates',
          'Priority Support',
          'Team Collaboration',
          'Configuration Export',
        ],
      },
      enterprise: {
        name: 'Enterprise',
        description: 'For cycling teams and enterprises',
        cta: 'Contact Sales',
        features: [
          'Unlimited Projects',
          'Unlimited Storage',
          'Full Component Library',
          'Custom Templates',
          '24/7 Dedicated Support',
          'Advanced Team Collaboration',
          'Self-hosted Deployment',
          'SLA Guarantee',
        ],
      },
    },
  },
  cta: {
    badge: 'Free Trial, No Credit Card Required',
    title: 'Ready to Build Your Dream Bike?',
    description: 'Join over 100,000 cycling enthusiasts',
    cta: 'Start Free',
    learnMore: 'Learn More',
    features: ['No Credit Card', 'Cancel Anytime', 'Free Forever Tier'],
  },
  footer: {
    description:
      'Professional bike configuration platform built for cycling enthusiasts, making every bike unique.',
    categories: {
      product: 'Product',
      company: 'Company',
      resources: 'Resources',
      legal: 'Legal',
    },
    links: {
      product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
      company: ['About Us', 'Blog', 'Careers', 'Contact Us'],
      resources: ['Documentation', 'API Reference', 'Community', 'Help Center'],
      legal: ['Privacy Policy', 'Terms of Service', 'Security', 'Cookie Settings'],
    },
    copyright: '© 2024 Veloform. All rights reserved.',
  },
  about: {
    brand: {
      title: 'About Veloform',
      description:
        'Veloform is the premier bike configuration platform designed for cycling enthusiasts worldwide. Our mission is to empower riders to build their dream bikes with confidence, precision, and creativity.',
    },
    stats: {
      activeUsers: { value: '100K+', label: 'Active Users' },
      components: { value: '500+', label: 'Component Options' },
      satisfaction: { value: '98%', label: 'Satisfaction Rate' },
      countries: { value: '120+', label: 'Supported Countries' },
    },
    values: {
      title: 'Our Core Values',
      loveRiding: {
        title: 'Passion for Riding',
        description:
          "We believe in the joy of cycling and strive to enhance every rider's experience through innovative technology.",
      },
      excellence: {
        title: 'Pursuit of Excellence',
        description:
          "We are committed to delivering the highest quality tools and services, constantly pushing the boundaries of what's possible.",
      },
      userFirst: {
        title: 'User-Centric Approach',
        description:
          'Our users are at the heart of everything we do. We listen, iterate, and build with their needs in mind.',
      },
    },
    contact: {
      title: 'Get in Touch',
      description: "Have questions or feedback? We'd love to hear from you.",
      email: 'hello@veloform.com',
      phone: '+1 (800) VELOFORM',
      address: 'San Francisco, California',
      sendMessage: 'Send Message',
    },
  },
} as const;
