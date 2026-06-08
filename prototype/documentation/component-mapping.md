# Veloform 组件映射表

> **路径**: `/prototype/documentation/component-mapping.md`  
> **版本**: v1.0.0  
> **日期**: 2026-06-06

---

## 概述

本文档展示原型组件和实际项目组件之间的映射关系，以及组件的实现状态。

---

## 核心配置组件

| 原型组件 | 实际组件 | 文件路径 | 状态 |
|----------|----------|----------|------|
| 车型选择器 | BikeTypeSelector | `src/components/configurator/BikeTypeSelector.tsx` | ✅ 已实现 |
| 配置清单 | BuildList | `src/components/configurator/BuildList.tsx` | ✅ 已实现 |
| 组件选择器 | ComponentSelector | `src/components/configurator/ComponentSelector.tsx` | ✅ 已实现 |
| 组件详情 | ComponentDetailModal | `src/components/configurator/ComponentDetailModal.tsx` | ✅ 已实现 |
| 汇总面板 | SummaryPanel | `src/components/configurator/SummaryPanel.tsx` | ✅ 已实现 |
| 成本图表 | CostBreakdownChart | `src/components/configurator/CostBreakdownChart.tsx` | ✅ 已实现 |
| 推荐配置 | RecommendedConfigs | `src/components/configurator/RecommendedConfigs.tsx` | ✅ 已实现 |
| 配置比较 | ComparePanel | `src/components/configurator/ComparePanel.tsx` | ✅ 已实现 |
| 分享模态框 | ShareModal | `src/components/configurator/ShareModal.tsx` | ✅ 已实现 |

---

## 布局组件

| 原型组件 | 实际组件 | 文件路径 | 状态 |
|----------|----------|----------|------|
| 导航栏 | Navbar | `src/components/layout/Navbar.tsx` | ✅ 已实现 |
| 页脚 | Footer | `src/components/layout/Footer.tsx` | ✅ 已实现 |

---

## 通用 UI 组件

| 原型组件 | 实际组件 | 文件路径 | 状态 |
|----------|----------|----------|------|
| 按钮 | Button | `src/components/ui/Button.tsx` | ✅ 已实现 |
| 卡片 | Card | `src/components/ui/Card.tsx` | ✅ 已实现 |
| 模态框 | Modal | `src/components/ui/Modal.tsx` | ✅ 已实现 |
| Toast通知 | Toast | `src/components/ui/Toast.tsx` | ✅ 已实现 |
| 主题切换 | ThemeToggle | `src/components/ui/ThemeToggle.tsx` | ✅ 已实现 |
| 新手引导 | OnboardingGuide | `src/components/ui/OnboardingGuide.tsx` | ✅ 已实现 |
| 支持模态框 | SupportModal | `src/components/ui/SupportModal.tsx` | ✅ 已实现 |
| 错误边界 | ErrorBoundary | `src/components/ui/ErrorBoundary.tsx` | ✅ 已实现 |

---

## 页面组件

| 页面 | 路径 | 状态 |
|------|------|------|
| 首页/配置器 | `src/app/page.tsx` | ✅ 已实现 |
| 配置库 | `src/app/library/page.tsx` | ✅ 已实现 |

---

## 业务逻辑层

| 模块 | 文件路径 | 状态 |
|------|----------|------|
| 状态管理 | `src/lib/store.ts` | ✅ 已实现 |
| 常量定义 | `src/lib/constants.ts` | ✅ 已实现 |
| 工具函数 | `src/lib/utils.ts` | ✅ 已实现 |
| 数据模块 | `src/lib/data/index.ts` | ✅ 已实现 |
| 国际化 | `src/lib/i18n/index.ts` | ✅ 已实现 |
| Firebase服务 | `src/lib/firebase-service.ts` | ✅ 已实现 |
| Toast通知 | `src/lib/toast.ts` | ✅ 已实现 |
| 推荐配置 | `src/lib/recommended-configs.ts` | ✅ 已实现 |

---

## 类型定义

| 模块 | 文件路径 | 状态 |
|------|----------|------|
| 应用类型 | `src/types/index.ts` | ✅ 已实现 |

---

## 布局和样式

| 文件 | 路径 | 状态 |
|------|------|------|
| 根布局 | `src/app/layout.tsx` | ✅ 已实现 |
| 全局样式 | `src/app/globals.css` | ✅ 已实现 |
| 提供者 | `src/app/providers.tsx` | ✅ 已实现 |
| Tailwind配置 | `tailwind.config.ts` | ✅ 已实现 |

---

## 测试文件

| 测试 | 路径 | 状态 |
|------|------|------|
| BuildList测试 | `src/components/configurator/BuildList.test.tsx` | ✅ 已实现 |
| SummaryPanel测试 | `src/components/configurator/SummaryPanel.test.tsx` | ✅ 已实现 |
| store测试 | `src/lib/store.test.ts` | ✅ 已实现 |
| utils测试 | `src/lib/utils.test.ts` | ✅ 已实现 |
| constants测试 | `src/lib/constants.test.ts` | ✅ 已实现 |
| env测试 | `src/lib/env.test.ts` | ✅ 已实现 |
| auth测试 | `src/lib/auth.test.ts` | ✅ 已实现 |
| firebase-service测试 | `src/lib/firebase-service.test.tsx` | ✅ 已实现 |

---

## 原型特性实现状态

### 已实现特性

| 特性 | 说明 |
|------|------|
| 三种车型配置 | Road、MTB、Fold |
| 组件选择和替换 | 完整的选择器 |
| 实时价格计算 | 自动更新总价 |
| 重量追踪 | 显示总重量 |
| 配置保存 | 本地存储和Firebase |
| 配置重置 | 一键重置 |
| 推荐配置 | 预设配置推荐 |
| 配置分享 | 分享功能 |
| 主题切换 | 深色/浅色主题 |
| 国际化 | 中英文双语 |

### 增强特性（超越原型）

| 特性 | 说明 |
|------|------|
| Firebase集成 | 云端数据持久化 |
| 用户认证 | 登录/注册功能 |
| 配置库 | 保存和管理多个配置 |
| 页脚组件 | 完整的页脚 |
| 视觉效果 | 渐变网格、玻璃态等 |
| 完整的测试覆盖 | 单元测试和集成测试 |

---

## 文件清单

### 源文件

```
src/
├── app/
│   ├── page.tsx                    # 首页/配置器
│   ├── library/
│   │   └── page.tsx               # 配置库页面
│   ├── layout.tsx                 # 根布局
│   ├── providers.tsx              # 提供者
│   └── globals.css                # 全局样式
├── components/
│   ├── configurator/
│   │   ├── BikeTypeSelector.tsx   # 车型选择器
│   │   ├── BuildList.tsx          # 配置清单
│   │   ├── ComponentSelector.tsx  # 组件选择器
│   │   ├── ComponentDetailModal.tsx # 组件详情
│   │   ├── SummaryPanel.tsx       # 汇总面板
│   │   ├── CostBreakdownChart.tsx # 成本图表
│   │   ├── RecommendedConfigs.tsx # 推荐配置
│   │   ├── ComparePanel.tsx       # 配置比较
│   │   └── ShareModal.tsx         # 分享模态框
│   ├── layout/
│   │   ├── Navbar.tsx             # 导航栏
│   │   └── Footer.tsx             # 页脚
│   └── ui/
│       ├── Button.tsx             # 按钮
│       ├── Card.tsx               # 卡片
│       ├── Modal.tsx              # 模态框
│       ├── Toast.tsx              # Toast通知
│       ├── ThemeToggle.tsx        # 主题切换
│       ├── OnboardingGuide.tsx    # 新手引导
│       ├── SupportModal.tsx       # 支持模态框
│       └── ErrorBoundary.tsx      # 错误边界
├── lib/
│   ├── store.ts                   # 状态管理
│   ├── constants.ts               # 常量
│   ├── utils.ts                   # 工具函数
│   ├── toast.ts                   # Toast通知
│   ├── firebase.ts                # Firebase配置
│   ├── firebase-service.ts        # Firebase服务
│   ├── recommended-configs.ts     # 推荐配置
│   ├── i18n/
│   │   ├── index.ts               # i18n主文件
│   │   ├── en.ts                  # 英文翻译
│   │   └── zh-CN.ts              # 中文翻译
│   └── data/
│       ├── index.ts               # 数据入口
│       ├── component-details.ts   # 组件详情
│       └── component-alternatives.ts # 组件替代
└── types/
    └── index.ts                   # 类型定义
```

### 配置和测试

```
项目根目录/
├── package.json                   # 项目配置
├── tailwind.config.ts             # Tailwind配置
├── postcss.config.mjs             # PostCSS配置
├── next.config.mjs                # Next.js配置
├── tsconfig.json                  # TypeScript配置
├── .eslintrc.json                 # ESLint配置
├── vitest.config.ts               # Vitest配置
├── vitest.setup.ts                # Vitest设置
└── public/                        # 静态资源
```

---

## 相关文档

- [设计系统摘要](./design-system-summary.md)
- [UI/UX 优化建议](../design/ui-recommendations.md)
- [原型说明](../../openspec/prototype-guide.md)
- [项目规范](../../openspec/SPEC.md)

---

**文档路径**: `/prototype/documentation/component-mapping.md`  
**最后更新**: 2026-06-06  
**版本**: v1.0.0
