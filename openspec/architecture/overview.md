# Veloform 架构概览 (v4.2.1)

## 项目概述

Veloform 是一个本地化（EN/ZH-CN）、高性能的自行车配置器，专为骑行者设计，支持 **公路车**、**山地车** 和 **折叠车** 三类车型的自定义构建模拟。具备实时价格和重量计算、Supabase 后端持久化，采用工业奢华极简设计风格。

- **生产地址**: `https://veloform.app`
- **代码仓库**: `https://github.com/sutchan/Veloform`

---

## 技术栈

| 层级 | 技术 | 版本 |
| :--- | :--- | :--- |
| **框架** | Next.js (App Router) | ^14.1.0 |
| **UI 库** | React | ^18.2.0 |
| **语言** | TypeScript | ^5 |
| **样式** | Tailwind CSS (Mobile-first) | ^3.4.0 |
| **组件系统** | shadcn/ui (base-nova) + @base-ui/react | ^1.5.0 |
| **状态管理** | Zustand | ^4.5.0 |
| **后端/数据库** | Supabase (PostgreSQL) | ^2.45.0 |
| **动画** | Framer Motion | ^10.16.4 |
| **图标** | Lucide React | ^0.294.0 |
| **通知** | Sonner | ^2.0.7 |
| **代码检查** | ESLint + Prettier | ^8 / ^3.2.0 |
| **测试** | Vitest + Testing Library | ^1.2.0 / ^14.2.0 |
| **部署** | Vercel / EdgeOne Pages | — |
| **PWA** | next-pwa | ^5.6.0 |
| **国际化** | Custom I18n hook (locales/) | — |

---

## 核心架构原则

### 1. React Server Components 与 Client Components

Next.js App Router 默认使用 React Server Components (RSC)，以减少客户端 JavaScript bundle 体积并优化性能。组件根据需求明确标记为客户端或服务端组件。

```typescript
// 客户端组件：需要交互、状态、生命周期
'use client'

import { useState } from 'react'

export function ComponentSelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  // ...
}

// 服务端组件：数据获取、SEO 优化
export default async function ConfiguratorPage() {
  const initialData = await fetchConfigData()
  // ...
}
```

### 2. Zustand 状态管理

使用 Zustand 实现全局状态管理，提供轻量级、类型安全且支持 React Suspense 的状态解决方案。Store 拆分按职责划分（config、auth、ui）。

```
app.tsx (root)
  ├── Zustand Stores
  │     ├── useConfigStore: activeType, components, isSaving, configId
  │     ├── useAuthStore: user, session, isLoading
  │     └── useUIStore: theme, language, onboarding
  │
  ├── Navbar (Client Component)
  │     ├── hooks: useTheme, useLanguage
  │     └── handlers: openLibrary, toggleTheme
  │
  ├── BuildList (Client Component)
  │     ├── props: components, isSaving
  │     └── events: onSync, onEdit
  │
  └── SummaryPanel (Client Component)
        ├── props: name, type, weight, cost
        └── Framer Motion animations (panel transitions)
```

### 3. 服务端数据与 Supabase

Supabase 在客户端通过 `@supabase/supabase-js` 直接调用，支持 Row Level Security (RLS) 策略进行数据访问控制。使用 Next.js 动态导入避免服务端 bundle 膨胀。

```typescript
// lib/config-service.ts
import { supabase } from '@/lib/supabase/client'

export async function saveConfig(config: BikeConfig) {
  const { data, error } = await supabase
    .from('configurations')
    .upsert(config)
    .select()
    .single()

  if (error) throw error
  return data
}
```

### 4. 组件设计原则

- 使用 `use client` 指令明确标识���户端组件
- 服务端组件用于数据获取和布局，减少客户端 JavaScript
- 使用 Zustand hooks 进行状态管理，避免 prop drilling
- 基于 shadcn/ui (base-nova) 和 @base-ui/react 原语构建组件
- 组件文件名使用 `kebab-case`（shadcn 规范），导出使用 `PascalCase`
- 遵循 4px 网格系统和设计 token 规范

---

## 目录结构

```
src/
├── app/                           # Next.js App Router
│   ├── page.tsx                  # 首页/配置器
│   ├── library/
│   │   └── page.tsx             # 配置库页面
│   ├── about/                   # 关于页面
│   ├─�� layout.tsx               # Root Layout
│   ├── providers.tsx            # 全局提供者
│   └── globals.css              # 全局样式 (设计 tokens)
│
├── components/                   # React 组件
│   ├── configurator/            # 配置器业务组件 (L3)
│   │   ├── BikeTypeSelector.tsx
│   │   ├── BuildList.tsx / BuildListItem.tsx
│   │   ├── ComponentDetailModal.tsx + 子组件
│   │   ├── ComponentSelector.tsx / ComponentSelectorItem.tsx
│   │   ├── SummaryPanel.tsx
│   │   ├── CostBreakdownChart.tsx
│   │   ├── RecommendedConfigs.tsx / RecommendedConfigCard.tsx
│   │   ├── ComparePanel.tsx / CompareTable.tsx / CompareActions.tsx
│   │   └── ShareModal.tsx
│   │
│   ├── layout/                  # 布局组件 (L2)
│   │   ├── Navbar.tsx / NavbarMobileMenu.tsx / NavbarNavLinks.tsx
│   │   ├── Footer.tsx
│   │   └── LanguageToggle.tsx
│   │
│   ├── sections/                # 页面 Section (L4)
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx / PlanCard.tsx
│   │   └── Cta.tsx
│   │
│   └── ui/                      # shadcn/ui 基础组件 (L1, 30+)
│       ├── button.tsx, card.tsx, input.tsx, dialog.tsx
│       ├── accordion, alert, alert-dialog, avatar, badge
│       ├── checkbox, dropdown-menu/, label, popover, progress
│       ├── radio-group, scroll-area, select/, separator, sheet
│       ├── skeleton, slider, sonner, switch, tabs, textarea, tooltip
│       ├── error-boundary.tsx, ErrorBoundary.tsx, AsyncBoundary.tsx
│       ├── LoadingScreen.tsx, Modal.tsx, ThemeToggle.tsx
│       ├── OnboardingGuide.tsx, SupportModal.tsx, DelightToast.tsx
│       └── DelightLayer.tsx
│
├── lib/                          # 核心功能
│   ├── i18n/                   # 国际化 (locales/en/, locales/zh-CN/)
│   ├── data/                   # 模块化数据 (component-details/)
│   ├── constants/              # 应用常量 (app.ts, defaults.ts)
│   ├── stores/                 # Zustand stores (config.ts, auth.ts, ui.ts)
│   ├── hooks/                  # 自定义 Hooks
│   ├── services/               # 服务层 (supabase/)
│   ├── auth.ts                 # 认证服务
│   ├── config-service.ts       # 配置 CRUD (Supabase)
│   ├── env.ts                  # 环境变量
│   ├── animation.ts            # 动画工具
│   └── utils.ts                # 工具函数 (cn, 格式化等)
│
├── types/                       # TypeScript 类型定义
│   └── index.ts
│
└── styles/                      # 额外样式
```

---

## 架构分层

### Core Layer (核心层)

- **Stores**: Zustand 状态管理（配置状态、认证状态、UI 状态）
- **Supabase Service**: 数据库操作、认证、RLS 策略
- **Types**: 全局 TypeScript 类型定义和接口
- **Constants**: 应用级常量
- **Design Tokens**: CSS 变量定义的设计系统 token

### Features Layer (功能层)

- **Configurator**: 自行车配置器核心功能（选择、构建、比较、分享）
- **Layout**: 导航栏、页脚等布局组件
- **Sections**: 首页 Herod、Features、Pricing、CTA
- **Library**: 配置方案库功能

### Shared Layer (共享层)

- shadcn/ui 基础组件（button, card, dialog, form elements 等）
- 通用工具函数（cn, 格式化）
- 自定义 Hooks（useReducedMotion, useTranslation）
- 错误边界和加载状态组件

### App Router Layer (路由层)

- **App Router**: Next.js App Router 路由���织
- **Server Components**: 服务端组件用于数据获取和 SEO
- **Client Components**: 客户端组件用于交互和状态管理

---

## 关键设计决策

### 为什么选择 Next.js App Router？

- **React Server Components**: 减少客户端 JavaScript，提升首屏加载性能
- **Streaming**: 支持 React Suspense，实现渐进式 UI 加载
- **Layouts**: 嵌套布局系统简化共享 UI 实现
- **Server Actions**: 简化数据提交和 mutations

### 为什么使用 Zustand 而非 Redux/MobX？

- **轻量级**: 无需 Provider wrapper，减少 boilerplate
- **性能**: 自动订阅优化，避免不必要的重渲染
- **TypeScript**: 优秀的类型推断支持
- **中间件**: 灵活的中间件系统支持持久化、日志等

### 为什么选择 shadcn/ui + @base-ui/react？

- **shadcn/ui**: 复制到源码的组件，完全控制样式和行为，base-nova 风格贴合工业奢华设计
- **@base-ui/react**: 无障碍原语组件，提供 ARIA、键盘导航、焦点管理
- **Tailwind CSS**: 原子化 CSS，设计 token 直接映射为 Tailwind 类名
- **可定制**: 通过 CSS 变量全局切换主题和样式

### 为什么选择 Framer Motion？

- **声明式动画**: 使用 React 的声明式方式定义动画
- **性能优化**: 自动处理动画性能，减少不必要的重渲染
- **克制使用**: 仅用于关键微交互（页面过渡、卡片 hover、列表入场）

### ��户端/服务端组件划分策略

- **服务端组件**: 数据获取页面、布局组件、静态内容
- **客户端组件**: 交互组件、状态依赖组件、动画组件

---

## 相关文档

- [数据流设计](./data-flow.md)
- [组件设计规范](./component-design.md)
- [组件模式](./component-patterns.md)
- [状态管理](./state-management.md)
- [数据模型](../api/data-models.md)
- [开发规范](../development/coding-standards.md)
- [UI 设计系统](../design/ui-design-system.md)

---

**最后更新**: 2026-07-29
**版本**: v4.2.1
