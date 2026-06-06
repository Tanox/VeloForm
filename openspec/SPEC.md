# Veloform 规范概览

> **路径**: `/openspec/SPEC.md`
> **版本**: v3.5.0
> **更新日期**: 2026-06-03

## 概述

本文档是 Veloform 项目规范体系的核心概览，提供技术栈、架构原则、目录结构和核心规范的快速参考。详细内容请访问 [openspec/README.md](./README.md)。

Veloform 是一个本地化（EN/ZH-CN）、高性能的自行车配置器，支持 **公路车**、**山地车** 和 **折叠车** 三类车型的自定义构建模拟。具备 Firebase 后端持久化和静态部署。

- **生产地址**: `https://veloform.app`
- **代码仓库**: `https://github.com/sutchan/Veloform`

---

## 技术栈摘要

| 层级 | 技术 | 版本 |
| :--- | :--- | :--- |
| **框架** | Next.js | 14.1.0 |
| **语言** | React | ^18.2.0 |
| **状态管理** | Zustand | ^4.5.0 |
| **样式** | Tailwind CSS | ^3.4.0 |
| **后端/数据库** | Firebase | ^10.0.0 |
| **动画** | Framer Motion | ^10.16.4 |
| **图标** | Lucide React | ^0.294.0 |
| **部署** | Vercel / EdgeOne Pages | — |

完整技术栈说明见 [架构概览](./architecture/overview.md)

---

## 核心架构原则

1. **App Router 架构** - 使用 Next.js 14 App Router 布局
2. **单向数据流** - 使用 Zustand 实现可预测的状态管理
3. **响应式设计** - 移动优先的响应式布局
4. **组件化架构** - 扁平化的 UI 组件架构
5. **服务层分离** - Firebase 服务与业务逻辑分离
6. **客户端安全** - 客户端专用组件使用 `use client` 指令

详细架构设计见：
- [架构概览](./architecture/overview.md)
- [数据流设计](./architecture/data-flow.md)
- [组件设计规范](./architecture/component-design.md)

---

## 目录结构

```
src/
├── app/                          # Next.js App Router 路由
│   ├── page.tsx                 # 首页/配置器
│   ├── library/
│   │   └── page.tsx             # 配置库页面
│   ├── layout.tsx               # 根布局
│   ├── providers.tsx            # 全局提供者
│   └── globals.css              # 全局样式
│
├── components/                   # UI 组件
│   ├── configurator/            # 配置器相关组件
│   │   ├── BikeTypeSelector.tsx
│   │   ├── BuildList.tsx
│   │   ├── ComponentDetailModal.tsx
│   │   ├── ComponentSelector.tsx
│   │   ├── CostBreakdownChart.tsx
│   │   ├── ComparePanel.tsx
│   │   ├── RecommendedConfigs.tsx
│   │   ├── ShareModal.tsx
│   │   └── SummaryPanel.tsx
│   ├── layout/                  # 布局组件
│   │   └── Navbar.tsx
│   └── ui/                      # 通用 UI 组件
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── ErrorBoundary.tsx
│       ├── Modal.tsx
│       ├── OnboardingGuide.tsx
│       ├── SupportModal.tsx
│       ├── ThemeToggle.tsx
│       └── Toast.tsx
│
├── lib/                         # 核心功能
│   ├── i18n/                   # 国际化
│   │   ├── index.ts
│   │   ├── en.ts
│   │   └── zh-CN.ts
│   ├── data/                   # 模块化数据
│   │   ├── index.ts
│   │   ├── component-details.ts
│   │   └── component-alternatives.ts
│   ├── store.ts                # Zustand 状态管理
│   ├── constants.ts            # 应用常量
│   ├── recommended-configs.ts  # 推荐配置
│   ├── utils.ts                # 工具函数
│   ├── toast.ts               # Toast 通知
│   ├── firebase.ts             # Firebase 配置
│   └── firebase-service.ts     # Firebase 服务
│
└── types/                       # TypeScript 类型
    └── index.ts
```

---

## 数据模型

### 核心实体

- **ConfigComponent** - 自行车组件（车架、传动、轮组等）
- **Configuration** - 用户保存的自行车配置

完整数据模型定义见 [数据模型规范](./api/data-models.md)

---

## API 接口

### Firebase 服务

- `saveConfiguration(config)` - 保存配置到 Firestore
- `getUserConfigurations()` - 获取用户配置列表
- `deleteConfiguration(id)` - 删除配置

完整 API 规范见 [Firestore API 规范](./api/firestore.md)

---

## 开发规范要点

### TypeScript
- 避免 `any`，使用明确类型
- 导出函数必须标注返回类型
- 使用类型推断保持代码简洁

### React / Next.js
- 客户端组件使用 `use client`
- 使用 Server Components 进行静态渲染
- 组件使用 Hooks 管理状态
- 使用 Framer Motion 处理动画

### 国际化 (i18n)
- 使用 `useTranslation()` Hook 获取翻译
- 支持 EN 和 ZH-CN 语言切换
- 翻译文件位于 `src/lib/i18n/`

完整开发规范见：
- [编码规范](./development/coding-standards.md)
- [测试规范](./development/testing.md)

---

## 部署

- **平台**: Vercel / EdgeOne Pages
- **构建命令**: `npm run build`
- **输出目录**: `.next`
- **SPA 配置**: `_redirects` 和 `_headers` 文件用于边缘部署

完整部署指南见 [环境配置](./deployment/environments.md)

---

## UI 组件清单

| 组件 | 说明 | 状态 |
|------|------|------|
| `Navbar` | 顶部导航栏，含语言切换 | ✅ |
| `BikeTypeSelector` | 自行车类型选择器 | ✅ |
| `BuildList` | 配置清单 | ✅ |
| `ComponentSelector` | 组件选择模态框 | ✅ |
| `ComponentDetailModal` | 组件详情模态框 | ✅ |
| `SummaryPanel` | 汇总面板，含保存/重置 | ✅ |
| `RecommendedConfigs` | 推荐配置卡片 | ✅ |
| `ComparePanel` | 配置比较面板 | ✅ |
| `ShareModal` | 分享模态框 | ✅ |
| `CostBreakdownChart` | 成本分解图表 | ✅ |
| `OnboardingGuide` | 新手引导 | ✅ |
| `SupportModal` | 支持/帮助模态框 | ✅ |
| `ErrorBoundary` | 错误边界 | ✅ |
| `ThemeToggle` | 主题切换按钮 | ✅ |
| `Toast` | Toast 通知组件 | ✅ |

---

## 文档导航

### 完整规范体系

| 分类 | 文档 |
|------|------|
| **架构** | [概览](./architecture/overview.md) · [数据流](./architecture/data-flow.md) · [组件设计](./architecture/component-design.md) |
| **API** | [Firestore](./api/firestore.md) · [数据模型](./api/data-models.md) |
| **开发** | [编码规范](./development/coding-standards.md) · [测试](./development/testing.md) |
| **部署** | [环境配置](./deployment/environments.md) |
| **DevOps** | [CI/CD 流程](./devops/ci-cd.md) |
| **性能** | [性能优化](./performance/optimization.md) |
| **安全** | [安全指南](./security/security-guidelines.md) |

### 相关文档

- **[openspec/README.md](./README.md)** - 规范索引入口（推荐从这里开始）
- **[PROJECT_GUIDELINES.md](../PROJECT_GUIDELINES.md)** - 项目开发指南和协作流程
- **[README.md](../README.md)** - 项目概述
- **[CHANGELOG.md](../CHANGELOG.md)** - 版本历史

---

## 版本历史

| 规范版本 | 项目版本 | 更新日期 | 说明 |
|---------|---------|---------|------|
| v3.5.0 | 3.5.0 | 2026-06-03 | 新增页脚组件、深色/浅色主题切换、完整主题系统 |
| v3.4.1 | 3.4.0 | 2026-05-26 | 更新规范文档为 Next.js 项目、添加 i18n 系统、错误边界处理、完整项目重构 |
| v3.4.1 | 3.4.0 | 2026-05-05 | 文档体系标准化：统一所有文档版本号至 v3.4.1、完善 OpenSpec 规范格式、规范化文档结构 |
| v3.3.2 | 3.3.2 | 2026-05-20 | WebGL 检测与降级方案、部署配置修复、版本号统一 |
| v3.3.1 | 3.3.1 | 2026-05-19 | 动态项目 ID、测试文件整理 |
| v3.3.0 | 3.3.0 | 2026-05-11 | 完整架构重构，引入 Feature-Based 分层结构（Core/Features/Shared），修复 UI Bug |
| v3.2.0 | 3.2.0 | 2026-05-01 | 新增组件编辑模态框、路由系统、通知系统、确认对话框服务 |
| v3.1.0 | 3.1.0 | 2026-05-01 | 模块化重构，拆分为多个专业文档 |

---

**最后更新**: 2026-06-03
**版本**: v3.5.0
