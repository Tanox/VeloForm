<<<<<<< HEAD
# Veloform 架构概览 (v3.4.0)

## 项目概述

Veloform 是一个本地化（EN/ZH）、高性能的自行车配置器，专为骑行者设计，支持 **公路车**、**山地车** 和 **折叠车** 三类车型的自定义构建模拟。它具备实时 3D 程序化可视化、Firebase 后端持久化和服务端渲染（SSR）以优化 SEO。

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
| **后端/数据库** | Firebase (Firestore, Auth) | ^10.0.0 |
| **3D 渲染** | Three.js (Procedural WebGL) | ^0.184.0 |
| **动画** | Framer Motion | ^10.16.4 |
| **AI 集成** | Google GenAI SDK | ^1.27.0 |
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
  │     ├── state: activeType, components, isSaving, configId, showLibrary, myConfigs, isLoggedIn
  │     ├── actions: setActiveType, addComponent, removeComponent, saveConfig, loadConfig
  │     └── computed: configName, totalCost, baseWeight, totalWeight (via selectors)
  │
  ├── Navbar (Client Component)
  │     ├── hooks: useAuth, useTheme, useLanguage
  │     └── handlers: openLibrary, toggleTheme
  │
  ├── Sidebar (Client Component)
  │     ├── props: activeType
  │     └── events: onTypeSelect
  │
  ├── Preview (Client Component)
  │     ├── props: name, type, weight, cost
  │     └── Three.js scene (renderer, camera, bikeGroup)
  │
  └── BuildList (Client Component)
        ├── props: components, isSaving
        └── events: onSync, onDeploy
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
│   ├── (main)/                    # 主布局路由组
│   │   ├── configurator/
│   │   │   ├── page.tsx          # 配置器页面
│   │   │   └── loading.tsx      # 加载状态
│   │   ├── library/
│   │   │   └── page.tsx         # 方案库页面
│   │   ├── layout.tsx           # 主布局组件
│   │   └── page.tsx             # 首页
│   │
│   ├── api/                      # API Routes (可选)
│   │   └── config/
│   │       └── route.ts
│   │
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # Root Layout
│   └── page.tsx                 # Root Page (重定向)
│
├── components/                   # React 组件
│   ├── configurator/            # 配置器组件
│   │   ├── Preview.tsx          # 3D 预览组件
│   │   ├── BuildList.tsx        # 组件列表
│   │   └── ComponentSelector.tsx
│   │
│   ├── layout/                  # 布局组件
│   │   ├── Navbar.tsx           # 导航栏
│   │   ├── Sidebar.tsx          # 侧边栏
│   │   └── LoadingIndicator.tsx
│   │
│   └── ui/                      # 基础 UI 组件
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       └── Notification.tsx
│
├── lib/                          # 工具库
│   ├── store/                   # Zustand 状态管理
│   │   ├── useConfigStore.ts   # 配置状态
│   │   └── useAuthStore.ts     # 认证状态
│   │
│   ├── firebase-service/       # Firebase 服务
│   │   ├── init.ts             # Firebase 初始化
│   │   ├── auth.ts             # 认证服务
│   │   └── firestore.ts        # Firestore 服务
│   │
│   ├── three/                   # Three.js 工具
│   │   ├── BikeBuilder.ts      # 自行车模型构建器
│   │   ├── SceneManager.ts     # 场景管理器
│   │   └── materials.ts        # 材质配置
│   │
│   ├── utils/                   # 工具函数
│   │   ├── calculations.ts     # 成本/重量计算
│   │   └── validation.ts       # 数据验证
│   │
│   ├── constants/               # 常量定义
│   │   ├── bike.constants.ts   # 车型配置
│   │   └── component.constants.ts
│   │
│   └── mock-data/               # 开发环境 Mock 数据
│       └── mock-components.ts
│
├── types/                        # TypeScript 类型定义
│   ├── bike.ts                  # 自行车相关类型
│   ├── component.ts             # 组件类型
│   ├── config.ts                # 配置类型
│   └── firebase.ts              # Firebase 类型
│
├── hooks/                        # 自定义 React Hooks
│   ├── useBikeConfig.ts
│   ├── useAuth.ts
│   ├── useI18n.ts
│   └── useNotification.ts
│
└── public/                      # 静态资源
    └── models/                  # GLTF 模型（如有）
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

### 为什么选择 Three.js 而非其他 3D 库？

- **轻量级**: 仅需核心功能，bundle size 可控
- **灵活性**: 程序化生成几何体，无需加载外部模型文件
- **成熟生态**: 丰富的示例和社区支持

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
=======
# Veloform 架构概览 (v3.4.0)

## 项目概述

Veloform 是一个本地化（EN/ZH）、高性能的自行车配置器，专为骑行者设计，支持 **公路车**、**山地车** 和 **折叠车** 三类车型的自定义构建模拟。它具备实时 3D 程序化可视化、Firebase 后端持久化和服务器端渲染（SSR）以优化 SEO。

- **生产地址**: `https://veloform.app`
- **代码仓库**: `https://github.com/sutchan/Veloform`

---

## 技术栈

| 层级 | 技术 | 版本 |
| :--- | :--- | :--- |
| **框架** | Angular (Zoneless, Signal-based) | ^21.0.0 |
| **语言** | TypeScript | ~5.9.2 |
| **样式** | Tailwind CSS (Mobile-first) | ^4.1.12 |
| **后端/数据库** | Firebase (Firestore, Auth) | ^12.12.1 |
| **3D 渲染** | Three.js (Procedural WebGL) | ^0.184.0 |
| **SSR 运行时** | Express + Angular SSR | ^5.1.0 / ^21.0.0 |
| **动画** | Motion | ^12.23.24 |
| **AI 集成** | Google GenAI SDK | ^1.27.0 |
| **代码检查** | ESLint + angular-eslint | ^9.39.1 / 21.1.0 |
| **测试** | Vitest | ^4.0.0 |
| **部署** | Vercel (Angular framework preset) | — |
| **国际化** | Custom Signal-based I18n service | — |

---

## 核心架构原则

### 1. 单向数据流

使用 **Angular Signals** 实现单向数据流。根组件 (`app.ts`) 维护活跃配置状态，通过 `input()` / `output()` 装饰器分发给子组件。

```
app.ts (root state)
  ├── signals: activeType, components, isSaving, configId, showLibrary, myConfigs, isLoggedIn
  ├── computed: configName, totalCost, baseWeight, totalWeight
  ├── effects: auth state listener, library auto-refresh
  │
  ├── NavbarComponent
  │     inputs: —
  │     outputs: openLibrary
  │     signals: user, isDark, lang
  │
  ├── SidebarComponent
  │     inputs: activeType
  │     outputs: typeSelected
  │
  ├── PreviewComponent
  │     inputs: name, type, weight, cost
  │     internal: Three.js scene (renderer, camera, bikeGroup)
  │
  └── BuildListComponent
        inputs: components, isSaving
        outputs: sync, deploy
```

### 2. 变更检测策略

所有组件使用 `ChangeDetectionStrategy.OnPush` 以获得最佳性能。Angular 21 的 zoneless 架构消除了 Zone.js 开销，实现亚毫秒级 UI 更新。

### 3. 组件设计原则

- 使用 Angular standalone 组件，保持设计松耦合
- 组件默认使用 `OnPush` 变更检测
- UI 状态尽量采用 `signals`，非必要时不引入 RxJS 作为组件局部状态管理
- `app-` 前缀组件选择器，文件名和类名保持一致并使用 `kebab-case`
- 服务层应使用 dependency injection，不使用全局可变状态

---

## 目录结构

```
src/
├── app/
│   ├── core/                          # 核心功能模块（共享）
│   │   ├── constants/                 # 应用常量
│   │   │   └── app.constants.ts      # 默认组件配置
│   │   ├── models/                   # 数据模型/类型
│   │   │   └── types.ts              # TypeScript 类型定义
│   │   ├── services/                 # 核心服务
│   │   │   ├── firebase.service.ts  # Firebase 初始化和认证
│   │   │   ├── config.repository.ts  # 配置数据访问层
│   │   │   ├── component.repository.ts # 组件数据访问层
│   │   │   ├── notification.service.ts # 通知管理
│   │   │   └── i18n.service.ts      # 国际化服务
│   │   ├── stores/                  # 状态管理
│   │   │   └── config.store.ts      # ConfigStore (Angular Signals)
│   │   └── index.ts                 # Barrel 导出
│   │
│   ├── features/                    # 功能模块
│   │   ├── configurator/            # 配置器模块
│   │   │   ├── components/
│   │   │   │   ├── preview.component.ts
│   │   │   │   ├── build-list.component.ts
│   │   │   │   └── component-selector.component.ts
│   │   │   └── services/
│   │   │       └── config.service.ts
│   │   │
│   │   └── navbar/                 # 导航栏模块
│   │       └── components/
│   │           └── navbar.component.ts
│   │
│   ├── shared/                      # 共享组件
│   │   └── components/
│   │       ├── sidebar.component.ts
│   │       ├── loading-indicator.component.ts
│   │       ├── notification-display.component.ts
│   │       └── confirm-dialog.component.ts
│   │
│   ├── app.ts                       # 根组件
│   ├── app.config.ts               # 浏览器应用配置
│   └── app.routes.ts               # 路由配置
│
├── styles.css                      # 全局样式
└── main.ts                         # 入口文件
```

---

## 架构分层

### Core Layer (核心层)

- **Services**: Firebase、通知、i18n 等核心服务
- **Models**: 全局类型定义和接口
- **Constants**: 应用级常量
- **Stores**: 全局状态管理（使用 Angular Signals）

### Features Layer (功能层)

- **Configurator**: 自行车配置器核心功能
- **Navbar**: 导航栏功能
- **Library**: 方案库功能（预留扩展）

### Shared Layer (共享层)

- 可复用的 UI 组件
- 通用 Pipes
- 工具函数

---

## 关键设计决策

### 为什么选择 Zoneless Angular？

- **性能优势**：消除 Zone.js 补丁开销，减少内存占用
- **简化调试**：无需处理 change detection cycles
- **更好的 tree-shaking**：未使用的代码更容易被移除

### 为什么使用 Signal-based 状态管理？

- **细粒度响应式**：只有依赖的信号变化时才重新计算
- **类型安全**：编译时类型检查
- **组合性**：computed signals 可以轻松组合多个信号

### 为什么选择 Three.js 而非其他 3D 库？

- **轻量级**：仅需核心功能，bundle size 可控
- **灵活性**：程序化生成几何体，无需加载外部模型文件
- **成熟生态**：丰富的示例和社区支持

---

## 相关文档

- [数据流设计](./data-flow.md)
- [组件设计规范](./component-design.md)
- [API 接口规范](../api/firestore.md)
- [开发规范](../development/coding-standards.md)

---

**最后更新**: 2026-05-05
**版本**: v3.4.0
>>>>>>> origin/main
