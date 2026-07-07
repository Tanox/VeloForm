# Veloform 页面完善实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将项目完善到生产就绪状态，包括国际化、动画规范优化、导航功能完善和缺失页面创建。

**Architecture:** 采用特性驱动方式，依次完成国际化、动画优化、导航完善和页面创建。使用 Zustand 管理语言状态，Framer Motion 实现统一动画规范。

**Tech Stack:** Next.js 14, Framer Motion, Zustand, shadcn/ui, Tailwind CSS

---

## 文件结构

| 文件                                   | 职责                  |
| -------------------------------------- | --------------------- |
| `src/lib/i18n/index.ts`                | i18n 类型定义和 Store |
| `src/lib/i18n/zh-CN.ts`                | 中文翻译文件          |
| `src/lib/i18n/en.ts`                   | 英文翻译文件          |
| `src/lib/animation.ts`                 | 全局动画配置常量      |
| `src/components/sections/Hero.tsx`     | Hero 组件             |
| `src/components/sections/Features.tsx` | Features 组件         |
| `src/components/sections/Pricing.tsx`  | Pricing 组件          |
| `src/components/sections/Cta.tsx`      | Cta 组件              |
| `src/components/layout/Navbar.tsx`     | Navbar 组件           |
| `src/components/layout/Footer.tsx`     | Footer 组件           |
| `src/app/page.tsx`                     | 首页                  |
| `src/app/faq/page.tsx`                 | FAQ 页面（新建）      |
| `src/app/about/page.tsx`               | About 页面（新建）    |

---

### Task 1: 扩展 i18n 类型定义

**Files:**

- Modify: `src/lib/i18n/index.ts:14-134`

- [ ] **Step 1: 更新 Translations 接口**

```ts
interface Translations {
  app: { name: string; tagline: string };
  nav: {
    home: string;
    library: string;
    support: string;
    login: string;
    logout: string;
    language: string;
  };
  configurator: { /* ... existing ... */ };
  bikeTypes: { /* ... existing ... */ };
  categories: { /* ... existing ... */ };
  library: { /* ... existing ... */ };
  recommended: { /* ... existing ... */ };
  compare: { /* ... existing ... */ };
  share: { /* ... existing ... */ };
  onboarding: { /* ... existing ... */ };
  support: { /* ... existing ... */ };
  common: { /* ... existing ... */ };
  componentDetail: { /* ... existing ... */ };
  hero: {
    badge: string;
    title: string;
    description: string;
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
      personal: { name: string; description: string; cta: string; features: string[] };
      pro: { name: string; description: string; cta: string; popular: string; features: string[] };
      enterprise: { name: string; description: string; cta: string; features: string[] };
    };
  };
  cta: {
    badge: string;
    title: string;
    description: string;
    cta: string;
    learnMore: string;
    features: string[];
  };
  footer: {
    description: string;
    categories: { product: string; company: string; resources: string; legal: string };
    links: {
      product: string[];
      company: string[];
      resources: string[];
      legal: string[];
    };
    copyright: string;
  };
}
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/i18n/index.ts
git commit -m "feat(i18n): extend Translations interface with hero, features, pricing, cta, footer"
```

---

### Task 2: 更新中文翻译文件

**Files:**

- Modify: `src/lib/i18n/zh-CN.ts`

- [ ] **Step 1: 添加新翻译键**

```ts
hero: {
  badge: '全新版本现已发布',
  title: '打造你的梦想自行车',
  description: '选择车型，自定义组件，创建专属于你的完美座驾。每一个细节都由你掌控。',
  cta: '开始配置',
  demo: '观看演示视频',
  trusted: '受到全球顶尖品牌信赖',
  scrollHint: '向下滚动',
},
features: {
  title: '为骑行而生',
  subtitle: '强大的功能，简洁的操作，让你的自行车配置变得轻松而愉悦',
  badge: '核心功能',
  items: {
    infinite: { title: '无限配置', description: '丰富的组件选择，从车架到配件，打造专属于你的完美座驾' },
    speed: { title: '极速响应', description: '毫秒级响应速度，流畅的操作体验，创作无延迟' },
    security: { title: '安全保障', description: '端到端加密，自动云端备份，配置安全无忧' },
    assets: { title: '丰富素材', description: '海量优质组件资源，一键使用，激发无限灵感' },
    export: { title: '数据导出', description: '一键导出配置清单，分享你的完美配置方案' },
    sync: { title: '云端同步', description: '多设备无缝同步，随时随地继续配置' },
  },
},
pricing: {
  title: '选择适合你的方案',
  subtitle: '灵活的定价策略，满足不同规模用户的需求',
  badge: '定价方案',
  monthly: '月付',
  yearly: '年付',
  yearlyDiscount: '省20%',
  guarantee: '所有方案均包含 14 天全额退款保障，如有任何不满意，无需任何理由即可申请退款',
  plans: {
    personal: {
      name: '个人版',
      description: '适合独立骑行爱好者',
      cta: '免费开始',
      features: ['无限项目', '5GB 存储空间', '基础组件库', '社区模板库', '标准支持'],
    },
    pro: {
      name: '专业版',
      description: '适合专业骑手和小团队',
      cta: '立即升级',
      popular: '最受欢迎',
      features: ['无限项目', '100GB 存储空间', '高级组件库', '专属模板库', '优先支持', '团队协作功能', '配置导出'],
    },
    enterprise: {
      name: '企业版',
      description: '适合车队和企业',
      cta: '联系销售',
      features: ['无限项目', '无限存储空间', '全套组件库', '定制模板库', '24/7 专属支持', '高级团队协作', '私有化部署', 'SLA 保障'],
    },
  },
},
cta: {
  badge: '免费试用，无需信用卡',
  title: '准备好开始配置你的梦想之车了吗？',
  description: '加入超过 100,000 名骑行爱好者的行列',
  cta: '免费开始',
  learnMore: '了解更多',
  features: ['无需信用卡', '随时取消', '终身免费版'],
},
footer: {
  description: '为骑行爱好者打造的专业自行车配置平台，让每一辆车都独一无二。',
  categories: {
    product: '产品',
    company: '公司',
    resources: '资源',
    legal: '法律',
  },
  links: {
    product: ['功能', '定价', '更新日志', '路线图'],
    company: ['关于我们', '博客', '招聘', '联系我们'],
    resources: ['文档', 'API 参考', '社区', '帮助中心'],
    legal: ['隐私政策', '服务条款', '安全说明', 'Cookie 设置'],
  },
  copyright: '© 2024 Veloform. All rights reserved.',
},
nav: {
  home: '首页',
  library: '配置库',
  support: '支持',
  login: '登录',
  logout: '登出',
  language: '语言',
},
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/i18n/zh-CN.ts
git commit -m "feat(i18n): add zh-CN translations for hero, features, pricing, cta, footer"
```

---

### Task 3: 更新英文翻译文件

**Files:**

- Modify: `src/lib/i18n/en.ts`

- [ ] **Step 1: 添加新翻译键**

```ts
hero: {
  badge: 'New Version Available',
  title: 'Build Your Dream Bike',
  description: 'Choose your bike type, customize components, and create your perfect ride. Every detail is under your control.',
  cta: 'Start Building',
  demo: 'Watch Demo Video',
  trusted: 'Trusted by top brands worldwide',
  scrollHint: 'Scroll down',
},
features: {
  title: 'Built for Cycling',
  subtitle: 'Powerful features, simple operation, making bike configuration easy and enjoyable',
  badge: 'Core Features',
  items: {
    infinite: { title: 'Infinite Configurations', description: 'Rich component selection, from frame to accessories, build your perfect ride' },
    speed: { title: 'Lightning Fast', description: 'Millisecond response, smooth experience, no delays in creation' },
    security: { title: 'Secure & Safe', description: 'End-to-end encryption, automatic cloud backup, worry-free configuration' },
    assets: { title: 'Rich Resources', description: 'Massive quality component library, one-click use, inspire endless creativity' },
    export: { title: 'Data Export', description: 'One-click export configuration list, share your perfect build' },
    sync: { title: 'Cloud Sync', description: 'Seamless sync across devices, configure anywhere anytime' },
  },
},
pricing: {
  title: 'Choose Your Plan',
  subtitle: 'Flexible pricing to meet the needs of users at any scale',
  badge: 'Pricing Plans',
  monthly: 'Monthly',
  yearly: 'Yearly',
  yearlyDiscount: 'Save 20%',
  guarantee: 'All plans include a 14-day full refund guarantee. If you are not satisfied for any reason, you can apply for a refund without any reason.',
  plans: {
    personal: {
      name: 'Personal',
      description: 'For individual cycling enthusiasts',
      cta: 'Start Free',
      features: ['Unlimited projects', '5GB storage', 'Basic component library', 'Community templates', 'Standard support'],
    },
    pro: {
      name: 'Pro',
      description: 'For professional riders and small teams',
      cta: 'Upgrade Now',
      popular: 'Most Popular',
      features: ['Unlimited projects', '100GB storage', 'Premium component library', 'Exclusive templates', 'Priority support', 'Team collaboration', 'Configuration export'],
    },
    enterprise: {
      name: 'Enterprise',
      description: 'For teams and enterprises',
      cta: 'Contact Sales',
      features: ['Unlimited projects', 'Unlimited storage', 'Full component library', 'Custom templates', '24/7 dedicated support', 'Advanced team collaboration', 'Private deployment', 'SLA guarantee'],
    },
  },
},
cta: {
  badge: 'Free trial, no credit card required',
  title: 'Ready to start building your dream bike?',
  description: 'Join over 100,000 cycling enthusiasts',
  cta: 'Get Started',
  learnMore: 'Learn More',
  features: ['No credit card', 'Cancel anytime', 'Free forever tier'],
},
footer: {
  description: 'A professional bike configuration platform for cycling enthusiasts, making every bike unique.',
  categories: {
    product: 'Product',
    company: 'Company',
    resources: 'Resources',
    legal: 'Legal',
  },
  links: {
    product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    company: ['About Us', 'Blog', 'Careers', 'Contact'],
    resources: ['Documentation', 'API Reference', 'Community', 'Help Center'],
    legal: ['Privacy Policy', 'Terms of Service', 'Security', 'Cookie Settings'],
  },
  copyright: '© 2024 Veloform. All rights reserved.',
},
nav: {
  home: 'Home',
  library: 'Library',
  support: 'Support',
  login: 'Login',
  logout: 'Logout',
  language: 'Language',
},
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/i18n/en.ts
git commit -m "feat(i18n): add en translations for hero, features, pricing, cta, footer"
```

---

### Task 4: 创建全局动画配置

**Files:**

- Create: `src/lib/animation.ts`

- [ ] **Step 1: 创建动画配置文件**

```ts
export const ANIMATION_DURATION = 0.3;
export const ANIMATION_DELAY_STEP = 0.1;
export const ANIMATION_EASING = [0.4, 0, 0.2, 1] as const;

export function getDelay(index: number, step: number = ANIMATION_DELAY_STEP): number {
  return index * step;
}
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/lib/animation.ts
git commit -m "feat(animation): create global animation configuration constants"
```

---

### Task 5: Hero 组件国际化和动画优化

**Files:**

- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: 修改 Hero 组件**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Play, Sparkles, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-grid opacity-20" aria-hidden="true" />
      <div
        className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-primary/5 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px]" aria-hidden="true">
        <motion.div
          animate={!shouldReduceMotion ? { scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full bg-gradient-radial from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl"
        />
      </div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px]" aria-hidden="true">
        <motion.div
          animate={!shouldReduceMotion ? { scale: [1.2, 1, 1.2], opacity: [0.2, 0.35, 0.2] } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/25"
            style={{ left: `${15 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={!shouldReduceMotion ? { y: [-20, 20, -20], opacity: [0.15, 0.4, 0.15] } : {}}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={
            !shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: ANIMATION_DURATION }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-10 group hover:border-primary/40 transition-colors"
        >
          <motion.div
            animate={!shouldReduceMotion ? { rotate: 360 } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          >
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-sm font-medium text-primary">{t('hero.badge')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.95] mb-8 tracking-tight"
        >
          <span className="text-gradient-brand">{t('hero.title').split(' ')[0]}</span>
          <br />
          <span className="text-foreground">{t('hero.title').split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 2 }}
          className="text-lg sm:text-xl text-secondary max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.div
            whileHover={!shouldReduceMotion ? { scale: 1.02, y: -2 } : {}}
            whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
          >
            <Button
              variant="gradient"
              size="lg"
              className="px-8 py-4 rounded-2xl font-semibold min-h-[56px]"
              onClick={() => onNavigate('configurator')}
              aria-label={t('hero.cta')}
            >
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              {t('hero.cta')}
            </Button>
          </motion.div>

          <Button
            variant="outline"
            size="lg"
            className="border-border-light bg-surface-secondary/50 backdrop-blur-sm hover:bg-surface-tertiary min-h-[56px]"
            aria-label={t('hero.demo')}
          >
            <Play className="w-5 h-5 mr-2" aria-hidden="true" />
            {t('hero.demo')}
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={
            !shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: ANIMATION_DURATION * 1.5, delay: ANIMATION_DELAY_STEP * 4 }}
          className="relative mx-auto max-w-5xl w-full"
        >
          <div
            className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-3xl blur-xl opacity-50"
            aria-hidden="true"
          />
          <div className="relative rounded-2xl overflow-hidden border border-border-light shadow-2xl">
            <div
              className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none"
              aria-hidden="true"
            />
            <div className="aspect-[16/9] bg-surface relative">
              <Image
                src="https://neeko-copilot.bytedance.net/api/text_to_image?prompt=modern%20bicycle%20configurator%20software%20interface%20on%20iMac%20screen%20minimalist%20clean%20UI%20apple%20style%20dark%20theme&image_size=landscape_16_9"
                alt="Veloform Interface Preview"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-cover"
              />
            </div>
            <div
              className="absolute top-0 left-0 right-0 h-10 bg-surface-secondary/80 backdrop-blur-sm flex items-center px-4 gap-2 z-20"
              aria-hidden="true"
            >
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="flex-1 mx-4 h-5 rounded bg-surface-tertiary/50 max-w-xs" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={!shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 6 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <span className="text-sm text-muted uppercase tracking-widest">{t('hero.trusted')}</span>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {['Specialized', 'Shimano', 'Zipp', 'Bontrager', 'SRAM'].map((company, index) => (
              <motion.span
                key={company}
                initial={{ opacity: 0, y: 10 }}
                animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{
                  duration: ANIMATION_DURATION,
                  delay: ANIMATION_DELAY_STEP * 7 + index * 0.05,
                }}
                className="text-sm sm:text-base font-semibold text-muted/60 hover:text-foreground transition-colors cursor-default"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 10 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={!shouldReduceMotion ? { y: [0, 8, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted uppercase tracking-widest">
            {t('hero.scrollHint')}
          </span>
          <ChevronDown className="w-5 h-5 text-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat(hero): add i18n support and animation optimization"
```

---

### Task 6: Features 组件国际化和动画优化

**Files:**

- Modify: `src/components/sections/Features.tsx`

- [ ] **Step 1: 修改 Features 组件**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Layers, Zap, Shield, Palette, Code, Cloud, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';

const featureIcons = {
  infinite: Layers,
  speed: Zap,
  security: Shield,
  assets: Palette,
  export: Code,
  sync: Cloud,
};
const featureGradients = {
  infinite: 'from-blue-500 to-cyan-400',
  speed: 'from-amber-500 to-orange-400',
  security: 'from-emerald-500 to-teal-400',
  assets: 'from-purple-500 to-pink-400',
  export: 'from-red-500 to-rose-400',
  sync: 'from-indigo-500 to-blue-400',
};

export function Features() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const featureKeys = Object.keys(featureIcons) as (keyof typeof featureIcons)[];

  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_DURATION }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={!shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            {t('features.badge')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight">
            {t('features.title')}
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">{t('features.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
          {featureKeys.map((key, index) => {
            const Icon = featureIcons[key];
            const gradient = featureGradients[key];
            const item = t(`features.items.${key}.title`);
            const description = t(`features.items.${key}.description`);

            return (
              <motion.div
                key={key}
                role="listitem"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={
                  !shouldReduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                viewport={{ once: true }}
                transition={{ duration: ANIMATION_DURATION, delay: index * ANIMATION_DELAY_STEP }}
                whileHover={
                  !shouldReduceMotion ? { y: -8, transition: { duration: ANIMATION_DURATION } } : {}
                }
                tabIndex={0}
                className="group relative bg-surface-secondary/80 backdrop-blur-sm rounded-2xl p-7 sm:p-8 border border-border-light hover:border-primary/30 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 cursor-pointer overflow-hidden outline-none"
                aria-label={item}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  aria-hidden="true"
                />
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  aria-hidden="true"
                />

                <motion.div
                  className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                  whileHover={
                    !shouldReduceMotion
                      ? { rotate: [0, -5, 5, 0], transition: { duration: ANIMATION_DURATION } }
                      : {}
                  }
                  aria-hidden="true"
                >
                  <Icon className="w-7 h-7 text-white" />
                </motion.div>

                <div className="relative">
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item}
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">{description}</p>
                </div>

                <motion.div
                  className="absolute bottom-7 right-7 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  initial={{ x: -10 }}
                  whileHover={!shouldReduceMotion ? { x: 0 } : { x: 0 }}
                  aria-hidden="true"
                >
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center`}
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Features.tsx
git commit -m "feat(features): add i18n support and animation optimization"
```

---

### Task 7: Pricing 组件国际化和动画优化

**Files:**

- Modify: `src/components/sections/Pricing.tsx`

- [ ] **Step 1: 修改 Pricing 组件**

```tsx
'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';

const planKeys = ['personal', 'pro', 'enterprise'] as const;
const planGradients = {
  personal: 'from-slate-600 to-slate-700',
  pro: 'from-primary to-accent',
  enterprise: 'from-purple-600 to-pink-600',
};
const monthlyPrices = { personal: 29, pro: 79, enterprise: 199 };
const yearlyPrices = { personal: 299, pro: 799, enterprise: 1999 };

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_DURATION }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-medium text-primary mb-4">
            {t('pricing.badge')}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto mb-10">{t('pricing.subtitle')}</p>

          <div
            className="inline-flex items-center gap-4 p-1.5 bg-surface-secondary/80 backdrop-blur-sm rounded-full border border-border-light"
            role="tablist"
            aria-label="Billing cycle"
          >
            <button
              role="tab"
              aria-selected={!isYearly}
              onClick={() => setIsYearly(false)}
              className={`relative min-w-[72px] min-h-[40px] px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                !isYearly
                  ? 'bg-gradient-brand text-white shadow-lg shadow-primary/30'
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              {t('pricing.monthly')}
            </button>
            <button
              role="tab"
              aria-selected={isYearly}
              onClick={() => setIsYearly(true)}
              className={`relative min-w-[72px] min-h-[40px] px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                isYearly
                  ? 'bg-gradient-brand text-white shadow-lg shadow-primary/30'
                  : 'text-secondary hover:text-foreground'
              }`}
            >
              {t('pricing.yearly')}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${isYearly ? 'bg-white/20' : 'bg-accent/10 text-accent'}`}
              >
                {t('pricing.yearlyDiscount')}
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8" role="list">
          {planKeys.map((key, index) => {
            const plan = t(`pricing.plans.${key}`);
            const gradient = planGradients[key];
            const price = isYearly ? yearlyPrices[key] : monthlyPrices[key];
            const isPopular = key === 'pro';

            return (
              <motion.div
                key={key}
                role="listitem"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={
                  !shouldReduceMotion
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 1, y: 0, scale: 1 }
                }
                viewport={{ once: true }}
                transition={{ duration: ANIMATION_DURATION, delay: index * ANIMATION_DELAY_STEP }}
                whileHover={
                  !shouldReduceMotion ? { y: -8, transition: { duration: ANIMATION_DURATION } } : {}
                }
                className={`relative rounded-3xl p-8 transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:outline-none ${
                  isPopular
                    ? 'bg-gradient-to-br from-primary to-accent text-white shadow-2xl shadow-primary/30'
                    : 'bg-surface-secondary/80 backdrop-blur-sm border border-border-light hover:border-primary/30'
                }`}
                aria-label={`${plan.name} plan`}
              >
                {isPopular && (
                  <>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <motion.div
                      initial={{ scale: 0, rotate: -10 }}
                      animate={
                        !shouldReduceMotion ? { scale: 1, rotate: 0 } : { scale: 1, rotate: 0 }
                      }
                      transition={{
                        delay: index * ANIMATION_DELAY_STEP + 0.3,
                        type: 'spring',
                        stiffness: 200,
                      }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                    >
                      <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-primary rounded-full shadow-lg">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span className="text-xs font-bold">{plan.popular}</span>
                      </div>
                    </motion.div>
                  </>
                )}

                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} ${isPopular ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}
                />

                <div className={`mb-6 ${isPopular ? 'text-white/90' : 'text-secondary'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    {isPopular && (
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}
                      >
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <h3
                      className={`text-xl font-bold ${isPopular ? 'text-white' : 'text-foreground'}`}
                    >
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-sm">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-5xl font-bold ${isPopular ? 'text-white' : 'text-foreground'}`}
                    >
                      ¥{price}
                    </span>
                    <span className={`text-sm ${isPopular ? 'text-white/60' : 'text-secondary'}`}>
                      /{isYearly ? t('pricing.yearly') : t('pricing.monthly')}
                    </span>
                  </div>
                  {isYearly && (
                    <p className={`text-xs mt-1 ${isPopular ? 'text-white/60' : 'text-muted'}`}>
                      {t('pricing.monthly')} {t('pricing.yearly')} ¥{Math.round(price / 12)}
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8" role="list">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3" role="listitem">
                      <div
                        className={`w-5 h-5 rounded-full ${isPopular ? 'bg-white/20' : 'bg-accent/10'} flex items-center justify-center flex-shrink-0 mt-0.5`}
                        aria-hidden="true"
                      >
                        <Check
                          className={`w-3 h-3 ${isPopular ? 'text-white' : 'text-accent'}`}
                          aria-hidden="true"
                        />
                      </div>
                      <span className={`text-sm ${isPopular ? 'text-white/80' : 'text-secondary'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full min-h-[48px] rounded-xl"
                  variant={isPopular ? 'secondary' : 'default'}
                  size="lg"
                  aria-label={`${plan.name} - ${plan.cta}`}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={!shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: ANIMATION_DELAY_STEP * 5 }}
          className="text-center text-sm text-muted mt-12"
        >
          {t('pricing.guarantee')}
        </motion.p>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Pricing.tsx
git commit -m "feat(pricing): add i18n support and animation optimization"
```

---

### Task 8: Cta 组件国际化和动画优化

**Files:**

- Modify: `src/components/sections/Cta.tsx`

- [ ] **Step 1: 修改 Cta 组件**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';

export function Cta() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="cta" className="py-24 sm:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-grid opacity-10" aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={!shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: ANIMATION_DURATION }}
          className="relative overflow-hidden rounded-3xl"
        >
          <div
            className="absolute -inset-px bg-gradient-to-r from-primary/30 via-transparent to-accent/30 rounded-3xl"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-brand opacity-95" aria-hidden="true" />

          <div className="absolute top-0 right-0 w-[500px] h-[500px]" aria-hidden="true">
            <motion.div
              animate={!shouldReduceMotion ? { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] } : {}}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-white/10 rounded-full blur-3xl"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px]" aria-hidden="true">
            <motion.div
              animate={
                !shouldReduceMotion ? { scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] } : {}
              }
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full bg-accent/30 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10 text-center py-16 sm:py-20 px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION_DELAY_STEP }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm mb-8"
            >
              <Sparkles className="w-4 h-4 text-white/80" aria-hidden="true" />
              <span className="text-sm font-medium text-white/90">{t('cta.badge')}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight"
            >
              {t('cta.title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 3 }}
              className="text-lg text-white/80 max-w-xl mx-auto mb-10"
            >
              {t('cta.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                whileHover={!shouldReduceMotion ? { scale: 1.02, y: -2 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 py-4 rounded-2xl font-semibold text-primary bg-white min-h-[56px] hover:bg-white/90 hover:text-primary shadow-lg shadow-black/10"
                  aria-label={t('cta.cta')}
                >
                  {t('cta.cta')}
                  <ArrowRight
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </Button>
              </motion.div>

              <Button
                variant="ghost"
                size="lg"
                className="text-white hover:bg-white/10 border border-white/20 min-h-[56px] rounded-2xl"
                aria-label={t('cta.learnMore')}
              >
                {t('cta.learnMore')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={!shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: ANIMATION_DELAY_STEP * 6 }}
              className="mt-12 flex items-center justify-center gap-8 text-white/60 text-sm"
            >
              {t('cta.features').map((feature) => (
                <span key={feature} className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  {feature}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Cta.tsx
git commit -m "feat(cta): add i18n support and animation optimization"
```

---

### Task 9: Footer 组件国际化

**Files:**

- Modify: `src/components/layout/Footer.tsx`

- [ ] **Step 1: 修改 Footer 组件**

```tsx
'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Youtube, Bike, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  const t = useTranslation();
  const footerLinks = {
    product: t('footer.links.product'),
    company: t('footer.links.company'),
    resources: t('footer.links.resources'),
    legal: t('footer.links.legal'),
  };
  const categories = t('footer.categories');

  return (
    <footer className="bg-surface-secondary/50 border-t border-border-light relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
                    <Bike className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-display font-bold text-foreground">Veloform</span>
                </div>
                <p className="text-sm text-secondary mb-6 max-w-[280px] leading-relaxed">
                  {t('footer.description')}
                </p>

                <div className="flex items-center gap-2" role="list">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      role="listitem"
                      className="relative min-w-[44px] min-h-[44px] rounded-xl bg-surface-tertiary/50 hover:bg-primary/10 border border-border-light hover:border-primary/30 flex items-center justify-center text-secondary hover:text-primary transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                      aria-label={social.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                    >
                      <social.icon className="w-4 h-4" aria-hidden="true" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.nav
                key={category}
                aria-label={categories[category as keyof typeof categories]}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: categoryIndex * 0.05 }}
              >
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {categories[category as keyof typeof categories]}
                </h3>
                <ul className="space-y-3" role="list">
                  {links.map((link) => (
                    <li key={link} role="listitem">
                      <motion.a
                        href="#"
                        className="group inline-flex items-center gap-1 text-sm text-secondary hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-2 min-h-[32px]"
                        whileHover={{ x: 2 }}
                      >
                        {link}
                        <ArrowUpRight
                          className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all"
                          aria-hidden="true"
                        />
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </div>
        </div>

        <div className="py-6 border-t border-border-light">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-sm text-secondary">{t('footer.copyright')}</p>
            </div>

            <div className="flex items-center gap-6" role="list">
              {t('footer.links.legal').map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  role="listitem"
                  className="text-sm text-secondary hover:text-foreground transition-colors focus-visible:outline-none focus-visible:underline focus-visible:decoration-primary focus-visible:underline-offset-2 min-h-[32px] inline-flex items-center"
                  whileHover={{ y: -1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat(footer): add i18n support"
```

---

### Task 10: Navbar 组件完善（语言切换 + 导航功能）

**Files:**

- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: 修改 Navbar 组件**

```tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, User, Moon, Sun, Bike, HelpCircle, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { OnboardingGuide } from '@/components/ui/OnboardingGuide';
import { SupportModal } from '@/components/ui/SupportModal';
import { useTranslation, useLanguage, useSetLanguage } from '@/lib/i18n';
import { ANIMATION_DURATION } from '@/lib/animation';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslation();
  const currentLang = useLanguage();
  const setLang = useSetLanguage();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isMobileMenuOpen) return;
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    },
    [isMobileMenuOpen]
  );

  useEffect(() => {
    if (isMobileMenuOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: t('nav.home'), href: 'home' },
    { label: t('nav.library'), href: 'library' },
    { label: t('nav.support'), href: 'support', isSupport: true },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    setLang(currentLang === 'zh-CN' ? 'en' : 'zh-CN');
  };

  const handleNavigate = (href: string) => {
    if (href === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href === 'library') {
      window.location.href = '/library';
    } else {
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={!shouldReduceMotion ? { y: 0 } : { y: 0 }}
        transition={{ duration: ANIMATION_DURATION, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-background/80 backdrop-blur-2xl border-b border-border-light shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            <motion.button
              onClick={() => handleNavigate('home')}
              className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl px-2 py-1 min-h-[44px]"
              whileHover={!shouldReduceMotion ? { scale: 1.02 } : {}}
              whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
              aria-label="Go to home"
            >
              <div
                className="relative w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300"
                aria-hidden="true"
              >
                <Bike className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-foreground hidden sm:block">
                Veloform
              </span>
            </motion.button>

            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  onClick={() => {
                    if (item.isSupport) {
                      setIsSupportOpen(true);
                    } else {
                      handleNavigate(item.href);
                    }
                  }}
                  className={cn(
                    'relative px-5 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px] min-w-[44px]',
                    'text-secondary hover:text-foreground',
                    'hover:bg-surface-tertiary/50',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
                  )}
                  initial={{ opacity: 0, y: -10 }}
                  animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!shouldReduceMotion ? { y: -2 } : {}}
                  whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
                  aria-label={item.label}
                >
                  {item.isSupport ? (
                    <span className="flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      {item.label}
                    </span>
                  ) : (
                    item.label
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={toggleLanguage}
                className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-surface-tertiary/50 transition-colors text-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Switch to ${currentLang === 'zh-CN' ? 'English' : '中文'}`}
                whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
              >
                <Globe className="w-5 h-5" aria-hidden="true" />
              </motion.button>

              {mounted && (
                <motion.button
                  onClick={toggleTheme}
                  className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-surface-tertiary/50 transition-colors text-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                  whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
                >
                  <motion.div
                    key={theme}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={
                      !shouldReduceMotion ? { rotate: 0, opacity: 1 } : { rotate: 0, opacity: 1 }
                    }
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    aria-hidden="true"
                  >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </motion.div>
                </motion.button>
              )}

              <motion.button
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-surface-tertiary/50 hover:bg-surface-tertiary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="User settings"
                whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
              >
                <User className="w-5 h-5 text-secondary" aria-hidden="true" />
              </motion.button>

              <motion.button
                ref={menuButtonRef}
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-surface-tertiary/50 transition-colors"
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
              >
                <Menu className="w-5 h-5 text-foreground" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      <OnboardingGuide />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={!shouldReduceMotion ? { opacity: 1 } : { opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
              role="presentation"
            />
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={!shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: ANIMATION_DURATION, ease: [0.4, 0, 0.2, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-50 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              onKeyDown={handleMenuKeyDown}
            >
              <div className="flex items-center justify-between p-6 border-b border-border-light">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center">
                    <Bike className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-display font-bold text-foreground">Veloform</span>
                </div>
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-surface-tertiary transition-colors"
                  aria-label="Close menu"
                  whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
                  whileTap={!shouldReduceMotion ? { scale: 0.95 } : {}}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-6 space-y-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => {
                      if (item.isSupport) {
                        setIsSupportOpen(true);
                      } else {
                        handleNavigate(item.href);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-4 px-5 py-4 min-h-[56px] rounded-2xl text-left hover:bg-surface-tertiary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    initial={{ opacity: 0, x: 20 }}
                    animate={!shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-foreground font-medium text-lg">{item.label}</span>
                    <motion.div
                      className="ml-auto"
                      animate={{ x: 0 }}
                      whileHover={!shouldReduceMotion ? { x: 4 } : {}}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M7.5 5L12.5 10L7.5 15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </motion.button>
                ))}

                <div className="h-px bg-border-light my-6" />

                <motion.button
                  onClick={toggleLanguage}
                  className="w-full flex items-center gap-4 px-5 py-4 min-h-[56px] rounded-2xl hover:bg-surface-tertiary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={!shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-tertiary/50 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="text-left">
                    <span className="text-foreground font-medium text-lg block">
                      {currentLang === 'zh-CN' ? 'English' : '中文'}
                    </span>
                    <span className="text-sm text-muted">{t('nav.language')}</span>
                  </div>
                </motion.button>

                {mounted && (
                  <motion.button
                    onClick={toggleTheme}
                    className="w-full flex items-center gap-4 px-5 py-4 min-h-[56px] rounded-2xl hover:bg-surface-tertiary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    initial={{ opacity: 0, x: 20 }}
                    animate={!shouldReduceMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface-tertiary/50 flex items-center justify-center">
                      {theme === 'dark' ? (
                        <Sun className="w-5 h-5 text-foreground" />
                      ) : (
                        <Moon className="w-5 h-5 text-foreground" />
                      )}
                    </div>
                    <div className="text-left">
                      <span className="text-foreground font-medium text-lg block">
                        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      </span>
                      <span className="text-sm text-muted">Toggle theme</span>
                    </div>
                  </motion.button>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border-light">
                <p className="text-sm text-muted text-center">Veloform v3.7.0</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar.tsx
git commit -m "feat(navbar): add language switch and smooth scroll navigation"
```

---

### Task 11: 创建 FAQ 页面

**Files:**

- Create: `src/app/faq/page.tsx`

- [ ] **Step 1: 创建 FAQ 页面**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqCategories = [
  {
    id: 'configurator',
    title: '配置器相关',
    questions: [
      {
        question: '如何选择合适的组件？',
        answer:
          '我们的配置器提供了详细的组件信息，包括技术规格、重量和价格。您可以根据自己的需求和预算进行选择。同时，我们还提供了推荐配置方案，帮助您快速开始。',
      },
      {
        question: '可以自定义哪些组件？',
        answer:
          '您可以自定义车架、传动系统、轮组、避震、车把组件和轮胎等核心部件。每个组件都有多种选择，满足不同骑行场景的需求。',
      },
      {
        question: '如何查看组件的详细信息？',
        answer:
          '点击任意组件卡片即可查看详细信息，包括技术规格、关键特性、价格和重量。我们还提供了用户评价和评分，帮助您做出更明智的选择。',
      },
    ],
  },
  {
    id: 'save-share',
    title: '保存和分享',
    questions: [
      {
        question: '如何保存我的配置？',
        answer:
          '点击摘要面板中的"保存配置"按钮。登录后，您的配置将保存到您的配置库中，方便以后访问和修改。未登录时，配置仅保存在本地浏览器中。',
      },
      {
        question: '可以分享我的配置吗？',
        answer:
          '可以！点击"分享配置"按钮生成分享链接或将您的配置导出为 JSON 文件。您可以将链接发送给朋友，或在社交媒体上分享。',
      },
      {
        question: '如何比较不同配置？',
        answer:
          '前往您的配置库页面，使用比较按钮选择配置，比较面板将出现在屏幕底部。您可以同时比较最多3个配置，轻松找出最佳方案。',
      },
    ],
  },
  {
    id: 'pricing',
    title: '定价和订阅',
    questions: [
      {
        question: '免费版有哪些限制？',
        answer:
          '免费版包含无限项目、5GB存储空间和基础组件库。您可以创建和保存配置，但高级功能如团队协作和专属模板需要升级到专业版或企业版。',
      },
      {
        question: '如何升级我的订阅？',
        answer:
          '点击导航栏中的"定价"链接，选择您想要的方案，然后点击"立即升级"按钮。升级后，您将立即获得所有高级功能。',
      },
      {
        question: '是否支持退款？',
        answer:
          '是的，所有方案均包含14天全额退款保障。如果您对服务不满意，可以在14天内申请全额退款，无需任何理由。',
      },
    ],
  },
  {
    id: 'support',
    title: '技术支持',
    questions: [
      {
        question: '如何联系客服？',
        answer:
          '点击页面右上角的"支持"按钮，填写联系表单即可发送消息。我们的客服团队会在24小时内回复您的问题。专业版和企业版用户享有优先支持服务。',
      },
      {
        question: '遇到技术问题怎么办？',
        answer:
          '请先查看我们的帮助中心文档，那里有详细的使用指南和常见问题解答。如果问题仍未解决，请联系我们的技术支持团队。',
      },
      {
        question: '支持哪些浏览器？',
        answer:
          '我们支持所有现代浏览器，包括 Chrome、Safari、Firefox 和 Edge。建议使用最新版本的浏览器以获得最佳体验。',
      },
    ],
  },
];

export default function FAQPage() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight"
        >
          {t('support.faq')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 2 }}
          className="text-lg text-secondary max-w-2xl mb-12"
        >
          这里汇集了用户最常问的问题。如果您没有找到答案，请随时联系我们的支持团队。
        </motion.p>

        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{
                duration: ANIMATION_DURATION,
                delay: ANIMATION_DELAY_STEP * 3 + categoryIndex * ANIMATION_DELAY_STEP,
              }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4">{category.title}</h2>
              <Accordion type="single" collapsible className="space-y-3">
                {category.questions.map((question, questionIndex) => (
                  <AccordionItem
                    key={`${category.id}-${questionIndex}`}
                    value={`${category.id}-${questionIndex}`}
                    className="bg-surface-secondary/50 rounded-xl border border-border-light px-6 data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="text-left font-medium hover:text-primary hover:no-underline py-5">
                      {question.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-secondary pb-5 leading-relaxed">
                      {question.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/app/faq/page.tsx
git commit -m "feat: create FAQ page"
```

---

### Task 12: 创建 About 页面

**Files:**

- Create: `src/app/about/page.tsx`

- [ ] **Step 1: 创建 About 页面**

```tsx
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { ANIMATION_DURATION, ANIMATION_DELAY_STEP } from '@/lib/animation';
import { Bike, Award, Users, Globe, Heart, Target } from 'lucide-react';

const stats = [
  { icon: Users, value: '100,000+', label: '活跃用户' },
  { icon: Bike, value: '500+', label: '组件选项' },
  { icon: Award, value: '98%', label: '用户满意度' },
  { icon: Globe, value: '150+', label: '支持国家' },
];

const values = [
  {
    icon: Heart,
    title: '热爱骑行',
    description: '我们是一群热爱骑行的人，深知一辆完美配置的自行车对骑行体验的重要性。',
  },
  {
    icon: Target,
    title: '追求卓越',
    description: '我们不断优化产品，确保每一个细节都达到最高标准，让用户享受到最好的配置体验。',
  },
  {
    icon: Users,
    title: '用户至上',
    description: '用户的需求是我们的核心驱动力，我们倾听每一条反馈，持续改进产品。',
  },
];

export default function AboutPage() {
  const t = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={!shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-brand mb-8"
          >
            <Bike className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground mb-6 tracking-tight">
            {t('footer.categories.company')}
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">{t('footer.description')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{
                  duration: ANIMATION_DURATION,
                  delay: ANIMATION_DELAY_STEP * 3 + index * ANIMATION_DELAY_STEP,
                }}
                className="text-center p-6 bg-surface-secondary/50 rounded-2xl border border-border-light"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-secondary">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-foreground mb-12 text-center">
            我们的理念
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    delay: ANIMATION_DELAY_STEP * 5 + index * ANIMATION_DELAY_STEP,
                  }}
                  className="text-center p-8 bg-surface-secondary/50 rounded-2xl border border-border-light hover:border-primary/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-brand flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{value.title}</h3>
                  <p className="text-secondary leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={!shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_DURATION, delay: ANIMATION_DELAY_STEP * 6 }}
          className="text-center p-12 bg-gradient-brand rounded-3xl"
        >
          <h2 className="text-3xl font-display font-bold text-white mb-4">联系我们</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            有任何问题或建议？我们很乐意听取您的意见。请通过以下方式联系我们。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:contact@veloform.com"
              className="px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-white/90 transition-colors"
            >
              发送邮件
            </a>
            <a
              href="#"
              className="px-8 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors border border-white/20"
            >
              {t('nav.support')}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 2: 编译检查**

Run: `npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: create About page"
```

---

## 自审查

**1. Spec 覆盖:**

- ✅ 国际化完善（首页组件）- Tasks 1-9
- ✅ 动画规范优化（全局）- Tasks 4-8
- ✅ 导航功能完善 - Task 10
- ✅ 缺失页面创建 - Tasks 11-12

**2. 占位符扫描:**

- ✅ 无 TBD/TODO
- ✅ 无"添加适当的错误处理"等模糊描述
- ✅ 所有步骤包含完整代码

**3. 类型一致性:**

- ✅ 翻译键在所有任务中保持一致
- ✅ 动画常量在所有组件中使用一致
- ✅ 组件接口保持一致

---

## 执行选项

**Plan complete and saved to `docs/superpowers/plans/2026-07-07-page-perfection-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
