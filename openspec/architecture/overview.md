# Veloform 架构概览 (v3.4.0)

## 项目概述

Veloform 是一个本地化（EN/ZH）、高性能的自行车配置器，专为骑行者设计，支持 **公路车**、**山地车** 和 **折叠车** 三类车型的自定义构建模拟。它具备实时价格和重量计算、Firebase 后端持久化。

- **生产地址**: `https://veloform.app`
- **代码仓库**: `https://github.com/sutchan/Veloform`

---

## 技术栈

| 层级 | 技术 | 版本 |
| :--- | :--- | :--- |
| **框架** | Next.js (App Router) | ^14.1.0 |
| **UI 库** | React | ^18.2.0 |
| **语言** | TypeScript | ~5.3.0 |
| **样式** | Tailwind CSS (Mobile-first) | ^3.4.0 |
| **状态管理** | Zustand | ^4.5.0 |
| **后端/数据库** | Firebase (Firestore) | ^10.0.0 |
| **动画** | Framer Motion | ^10.16.4 |
| **代码检查** | ESLint + Prettier | ^9.39.1 / ^3.16.0 |
| **测试** | Vitest | ^4.0.0 |
| **部署** | Vercel | — |
| **国际化** | Custom I18n hook | — |

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

使用 Zustand 实现全局状态管理，提供轻量级、类型安全且支持 React Suspense 的状态解决方案。

```
app.tsx (root)
  ├── Zustand Store: useConfigStore
  │     ├── state: activeType, components, isSaving, configId, showLibrary, myConfigs
  │     ├── actions: setActiveType, addComponent, removeComponent, saveConfig, loadConfig
  │     └── computed: configName, totalCost, baseWeight, totalWeight (via selectors)
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

### 3. 动态导入与 Firebase

Firebase SDK 仅在客户端加载，使用 Next.js 动态导入避免服务端 bundle 膨胀：

```typescript
// lib/firebase-service.ts
import { initializeApp, getApps } from '@/lib/firebase/init'

let firebaseApp: FirebaseApp | null = null

export async function getFirebaseApp() {
  if (typeof window === 'undefined') {
    throw new Error('Firebase can only be used on the client side')
  }

  if (!firebaseApp && getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig)
  }

  return firebaseApp
}

// 使用方式
const FirebaseAuth = dynamic(
  () => import('@/components/auth/FirebaseAuth').then(mod => mod.FirebaseAuth),
  { ssr: false, loading: () => <AuthSkeleton /> }
)
```

### 4. 组件设计原则

- 使用 `use client` 指令明确标识客户端组件
- 服务端组件用于数据获取和布局，减少客户端 JavaScript
- 使用 Zustand hooks (`useStore`) 进行状态管理，避免 prop drilling
- 组件文件名使用 `kebab-case`，导出组件使用 `PascalCase`
- 自定义 hooks 封装可复用逻辑 (`useBikeConfig`, `useAuth`, `useI18n`)

---

## 目录结构

```
src/
├── app/                           # Next.js App Router
│   ├── page.tsx                  # 首页/配置器
│   ├── library/
│   │   └── page.tsx             # 配置库页面
│   ├── layout.tsx               # Root Layout
│   ├── providers.tsx             # 全局提供者
│   ├── globals.css              # 全局样式
│   └── middleware.ts            # 中间件
│
├── components/                   # React 组件
│   ├── configurator/            # 配置器组件
│   │   ├── BikeTypeSelector.tsx
│   │   ├── BuildList.tsx
│   │   ├── ComponentSelector.tsx
│   │   ├── ComponentDetailModal.tsx
│   │   ├── SummaryPanel.tsx
│   │   ├── CostBreakdownChart.tsx
│   │   ├── RecommendedConfigs.tsx
│   │   ├── ComparePanel.tsx
│   │   └── ShareModal.tsx
│   │
│   ├── layout/                  # 布局组件
│   │   └── Navbar.tsx
│   │
│   └── ui/                      # 基础 UI 组件
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       ├── Toast.tsx
│       ├── ErrorBoundary.tsx
│       ├── ThemeToggle.tsx
│       ├── OnboardingGuide.tsx
│       └── SupportModal.tsx
│
├── lib/                          # 工具库
│   ├── i18n/                   # 国际化
│   │   ├── index.ts
│   │   ├── en.ts
│   │   └── zh-CN.ts
│   │
│   ├── store.ts                # Zustand 状态管理
│   ├── constants.ts            # 应用常量
│   ├── mock-data.ts            # 模拟数据
│   ├── recommended-configs.ts  # 推荐配置
│   ├── utils.ts                # 工具函数
│   ├── toast.ts                # Toast 通知
│   ├── firebase.ts             # Firebase 配置
│   └── firebase-service.ts     # Firebase 服务
│
├── types/                        # TypeScript 类型定义
│   └── index.ts
│
└── public/                      # 静态资源
    ├── _headers                # Vercel 头部配置
    └── _redirects              # Vercel 重定向配置
```

---

## 架构分层

### Core Layer (核心层)

- **Store**: Zustand 状态管理（配置状态、认证状态）
- **Firebase Service**: Firebase 初始化、认证、Firestore 数据访问
- **Three.js Tools**: 3D 渲染引擎封装
- **Types**: 全局 TypeScript 类型定义和接口
- **Constants**: 应用级常量

### Features Layer (功能层)

- **Configurator**: 自行车配置器核心功能
- **Layout**: 导航栏、侧边栏等布局组件
- **Library**: 方案库功能（预留扩展）

### Shared Layer (共享层)

- 可复用的 UI 组件
- 通用工具函数
- 自定义 Hooks

### App Router Layer (路由层)

- **App Router**: Next.js App Router 路由组织
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

### 为什么选择 Framer Motion？

- **声明式动画**: 使用 React 的声明式方式定义动画，无需直接操作 DOM
- **性能优化**: 自动处理动画性能，减少不必要的重渲染
- **丰富的 API**: 提供手势、过渡、布局等多种动画能力
- **易于集成**: 与 React 组件无缝集成，支持 SSR

### 客户端/服务端组件划分策略

- **服务端组件**: 数据获取页面、布局组件、静态内容
- **客户端组件**: 交互组件、状态依赖组件、Three.js 渲染器

---

## 相关文档

- [数据流设计](./data-flow.md)
- [组件设计规范](./component-design.md)
- [API 接口规范](../api/firestore.md)
- [开发规范](../development/coding-standards.md)

---

**最后更新**: 2026-05-26
**版本**: v3.4.0