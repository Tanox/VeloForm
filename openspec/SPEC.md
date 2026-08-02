# Veloform 规范概览

> **路径**: `/openspec/SPEC.md`  
> **版本**: v4.2.1  
> **更新日期**: 2026-07-29

## 概述

本文档是 Veloform 项目规范体系的核心概览，提供技术栈、架构原则、目录结构和核心规范的快速参考。详细内容请访问 [openspec/README.md](./README.md)。

Veloform 是一个本地化（EN/ZH-CN）、高性能的自行车配置器，支持 **公路车**、**山地车** 和 **折叠车** 三类车型的自定义构建模拟。具备 Supabase 后端持久化和静态部署能力。

- **生产地址**: `https://veloform.app`
- **代码仓库**: `https://github.com/sutchan/Veloform`

---

## 技术栈摘要

| 层级 | 技术 | 版本 |
| :--- | :--- | :--- |
| **框架** | Next.js (App Router) | 14.1.0 |
| **语言** | React + TypeScript | ^18.2.0 / ^5 |
| **状态管理** | Zustand | ^4.5.0 |
| **样式** | Tailwind CSS + shadcn/ui (base-nova) | ^3.4.0 |
| **组件库** | @base-ui/react + shadcn/ui | ^1.5.0 |
| **后端/数据库** | Supabase | ^2.45.0 |
| **动画** | Framer Motion | ^10.16.4 |
| **图标** | Lucide React | ^0.294.0 |
| **通知** | Sonner | ^2.0.7 |
| **部署** | Vercel / EdgeOne Pages | — |

完整技术栈说明见 [架构概览](./architecture/overview.md)

---

## 核心架构原则

1. **App Router 架构** - 使用 Next.js 14 App Router 布局
2. **单向数据流** - 使用 Zustand 实现可预测的状态管理
3. **响应式设计** - 移动优先的响应式布局
4. **组件化架构** - 基于 shadcn/ui + @base-ui/react 的组件体系
5. **服务层分离** - Supabase 服务与业务逻辑分离
6. **客户端安全** - 客户端专用组件使用 `use client` 指令
7. **设计系统** - 工业奢华极简风格，烧锡色品牌色，完整 token 系统

详细架构设计见：
- [架构概览](./architecture/overview.md)
- [数据流设计](./architecture/data-flow.md)
- [组件设计规范](./architecture/component-design.md)
- [状态管理](./architecture/state-management.md)

---

## 目录结构

```
src/
├── app/                          # Next.js App Router 路由
│   ├── page.tsx                 # 首页/配置器
│   ├── library/
│   │   └── page.tsx             # 配置库页面
│   ├── about/                   # 关于页面
│   ├── layout.tsx               # 根布局
│   ├── providers.tsx            # 全局提供者
│   └── globals.css              # 全局样式
│
├── components/                   # UI 组件
│   ├── configurator/            # 配置器业务组件
│   │   ├── BikeTypeSelector.tsx
│   │   ├── BuildList.tsx / BuildListItem.tsx
│   │   ├── ComponentDetailModal.tsx
│   │   ├── ComponentSelector.tsx / ComponentSelectorItem.tsx
│   │   ├── CostBreakdownChart.tsx
│   │   ├── ComparePanel.tsx / CompareTable.tsx / CompareActions.tsx
│   │   ├── RecommendedConfigs.tsx / RecommendedConfigCard.tsx
│   │   ├── ShareModal.tsx
│   │   └── SummaryPanel.tsx
│   ├── layout/                  # 布局组件
│   │   ├── Navbar.tsx / NavbarMobileMenu.tsx / NavbarNavLinks.tsx
│   │   ├─��� Footer.tsx
│   │   └── LanguageToggle.tsx
│   ├── sections/                # 页面 Section
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx / PlanCard.tsx
│   │   └── Cta.tsx
│   └── ui/                      # shadcn/ui 基础组件 (30+)
│       ├── button.tsx, card.tsx, input.tsx, dialog.tsx
│       ├── accordion, alert, alert-dialog, avatar, badge
│       ├── checkbox, dropdown-menu, label, popover, progress
│       ├── radio-group, scroll-area, select, separator, sheet
│       ├── skeleton, slider, sonner, switch, tabs, textarea, tooltip
│       ├── error-boundary.tsx, ErrorBoundary.tsx, AsyncBoundary.tsx
│       ├── LoadingScreen.tsx, Modal.tsx, ThemeToggle.tsx
│       ├── OnboardingGuide.tsx, SupportModal.tsx, DelightToast.tsx
│       └── DelightLayer.tsx
│
├── lib/                         # 核心功能
│   ├── i18n/                   # 国际化 (含 locales/ 目录)
│   ├── data/                   # 模块化数据 (component-details/)
│   ├── constants/              # 应用常量
│   ├── stores/                 # Zustand stores (config, auth, ui)
│   ├── hooks/                  # 自定义 Hooks
│   ├── auth.ts                 # 认证服务
│   ├── config-service.ts       # 配置服务 (Supabase)
│   ├── env.ts                  # 环境变量
│   ├── animation.ts            # 动画工具
│   └── utils.ts                # 工具函数
│
├── types/                       # TypeScript 类型
│   └── index.ts
│
└── styles/                      # 额外样式
```

---

## 数据模型

### 核心实体

- **BikeComponent** - 自行车组件（车架、传动、轮组等），含分类、价格、重量、规格
- **Configuration** - 用户保存的自行车构建配置，含组件列表、总价、总重量
- **User** - 用户账户，关联配置和偏好

完整数据模型定义见 [数据模型规范](./api/data-models.md)

---

## API 接口

### Supabase 服务

- `saveConfig(config)` - 保存配置到 Supabase
- `getUserConfigs()` - 获取用户配置列表
- `deleteConfig(id)` - 删除配置
- `getComponents(bikeType)` - 获取组件数据

完整规范见 [数据模型](./api/data-models.md)

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
- 使用 Framer Motion 处理动画（克制使用）
- 使用 @base-ui/react 作为无障碍组件原语

### 国际化 (i18n)
- 使用 `useTranslation()` Hook 获取翻译
- 支持 EN 和 ZH-CN 语言切换
- 翻译文件位于 `src/lib/i18n/locales/`

### 样式
- 使用 shadcn/ui (base-nova) 组件库
- 遵循 4px 网格间距��统
- 使用 CSS 变量（HSL 格式）定义设计 tokens
- 深色模式默认，支持浅色模式切换

完整开发规范见：
- [编码规范](./development/coding-standards.md)
- [测试规范](./development/testing.md)
- [组件模式](./architecture/component-patterns.md)

---

## 部署

- **平台**: Vercel / EdgeOne Pages
- **构建命令**: `npm run build`
- **输出目录**: `.next`
- **运行时**: Node.js
- **PWA**: 支持 offline（next-pwa）

完整部署指南见 [环境配置](./deployment/environments.md)

---

## UI 组件清单

### shadcn/ui 基础组件 (L1)

| 组件 | 文件 | 说明 |
|------|------|------|
| Button | `button.tsx` | 6 种 variant + 4 种 size |
| Card | `card.tsx` | CardHeader/Title/Description/Content/Footer/Action |
| Input | `input.tsx` | 文本输入框 |
| Dialog | `dialog.tsx` | 模态对话框 |
| AlertDialog | `alert-dialog.tsx` | 确认对话框 |
| Select | `select/` | 下拉选择（Root/Trigger/Content/Item/Scroll） |
| DropdownMenu | `dropdown-menu/` | 下拉菜单（Root/Content/Item/Sub/Checkbox/Radio） |
| Tabs | `tabs.tsx` | 标签页切换 |
| Accordion | `accordion.tsx` | 手风琴折叠 |
| Sheet | `sheet.tsx` | 侧边抽屉 |
| Popover | `popover.tsx` | 弹出层 |
| Tooltip | `tooltip.tsx` | 工具提示 |
| Badge | `badge.tsx` | 徽章/标签 |
| Avatar | `avatar.tsx` | 头像 |
| Progress | `progress.tsx` | 进度条 |
| Skeleton | `skeleton.tsx` | 骨架屏 |
| Slider | `slider.tsx` | 滑块 |
| Switch | `switch.tsx` | 开关 |
| Checkbox | `checkbox.tsx` | 复选框 |
| RadioGroup | `radio-group.tsx` | 单选组 |
| Label | `label.tsx` | 表单标签 |
| Textarea | `textarea.tsx` | 多行文本 |
| Separator | `separator.tsx` | 分隔线 |
| ScrollArea | `scroll-area.tsx` | 滚动区域 |
| Alert | `alert.tsx` | 警告提示 |
| Sonner | `sonner.tsx` | Toast 通知 |

### 业务组件 (L3)

| 组件 | 目录 | 说明 | 状态 |
|------|------|------|------|
| BikeTypeSelector | `configurator/` | 自行车类型选择 | ✅ |
| BuildList | `configurator/` | 配置清单 | ✅ |
| ComponentSelector | `configurator/` | 组件选择器 | ✅ |
| ComponentDetailModal | `configurator/` | 组件详情模态框 | ✅ |
| SummaryPanel | `configurator/` | 汇总面板 | ✅ |
| ComparePanel | `configurator/` | 配置比较 | ✅ |
| RecommendedConfigs | `configurator/` | 推荐配置 | ✅ |
| ShareModal | `configurator/` | 分享模态框 | ✅ |
| CostBreakdownChart | `configurator/` | 成本分解图表 | ✅ |

### 布局 & 页面 Section (L2/L4)

| 组件 | 目录 | 说明 | 状态 |
|------|------|------|------|
| Navbar | `layout/` | 顶部导航（含移动端菜单） | ✅ |
| Footer | `layout/` | 页脚 | ✅ |
| LanguageToggle | `layout/` | 语言切换 | ✅ |
| Hero | `sections/` | 首页主视觉 | ✅ |
| Features | `sections/` | 特性展示 | ✅ |
| Pricing | `sections/` | 定价展示 | ✅ |
| Cta | `sections/` | 行动号召 | ✅ |

### 工具组件

| 组件 | 目录 | 说明 | 状态 |
|------|------|------|------|
| ErrorBoundary | `ui/` | 错误边界 | ✅ |
| AsyncBoundary | `ui/` | 异步加载边界 | ✅ |
| LoadingScreen | `ui/` | 全屏加载 | ✅ |
| Modal | `ui/` | 通用模态框 | ✅ |
| ThemeToggle | `ui/` | 主题切换 | ✅ |
| OnboardingGuide | `ui/` | 新手引导 | ✅ |
| SupportModal | `ui/` | 帮助/支持 | ✅ |
| DelightToast | `ui/` | 品牌 Toast | ✅ |
| DelightLayer | `ui/` | 微交互层 | ✅ |

---

## 设计系统

Veloform v4.2.1 采用**工业奢华**设计哲学：

- **色彩**: 深色默认，烧锡色(Burnt Sienna `hsl(16 78% 56%)`)单一品牌色
- **字体**: SF Pro 系统字体族
- **间距**: 4px 网格系统
- **圆角**: 8px-24px 层级
- **动效**: 150-300ms 克制动效，尊重 prefers-reduced-motion

详见：
- [prototype/design-system-spec.md](../prototype/design-system-spec.md)
- [openspec/design/ui-design-system.md](./design/ui-design-system.md)
- [设计审查与优化建议](./design/design-review.md)

---

## 文档导航

### 完整规范��系

| 分类 | 文档 |
|------|------|
| **架构** | [概览](./architecture/overview.md) · [数据流](./architecture/data-flow.md) · [组件设计](./architecture/component-design.md) · [组件模式](./architecture/component-patterns.md) · [状态管理](./architecture/state-management.md) |
| **API** | [数据模型](./api/data-models.md) |
| **设计** | [UI设计系统](./design/ui-design-system.md) · [设计审查](./design/design-review.md) |
| **开发** | [编码规范](./development/coding-standards.md) · [测试](./development/testing.md) |
| **部署** | [环境配置](./deployment/environments.md) · [CI/CD](./development/ci-cd.md) |
| **性能** | [性能优化](./performance/optimization.md) |
| **安全** | [安全指南](./security/security-guidelines.md) |

### 相关文档

- **[openspec/README.md](./README.md)** - 规范索引入口
- **[prototype/README.md](../prototype/README.md)** - 原型设计参考
- **[README.md](../README.md)** - 项目概述
- **[CHANGELOG.md](../CHANGELOG.md)** - 版本历史

---

## 版本历史

| 规范版本 | 项目版本 | 更新日期 | 说明 |
|---------|---------|---------|------|
| v4.3.0 | 4.3.0 | 2026-08-01 | 删除废弃 store 兼容层、修复持久化与定时器、i18n 补全、容器语义化 id、测试补齐 |
| v4.2.2 | 4.2.2 | 2026-07-30 | 测试运行器修复、persist 持久化鲁棒性、版本号统一至 v4.2.2 |
| v4.2.1 | 4.2.1 | 2026-07-28 | 工业奢华设计系统完善、DelightLayer微交互、@base-ui/react集成 |
| v4.2.0 | 4.2.0 | 2026-07-17 | 工业奢华风格、烧锡色品牌、SF Pro字体、深浅双模式 |
| v4.1.0 | 4.1.0 | 2026-07-10 | 极简主义重构、色彩克制、统一圆角、shadcn/ui完全对齐 |
| v4.0.0 | 4.0.0 | 2026-07-05 | 极简主义初始版本、代码对齐、文档统一 |
| v3.8.0 | 3.8.0 | 2026-06-17 | 原型对齐、Supabase迁移、品牌渐变Button |
| v3.7.0 | 3.7.0 | 2026-06-14 | 交互标准完善、空状态设计、错误处理 |
| v3.6.1 | 3.6.0 | 2026-06-04 | 组件文档对齐代码、版本号统一、完善Button/Card/Footer |
| v3.6.0 | 3.6.0 | 2026-06-04 | 完善规范文档体系、shadcn/ui集成、视觉效果规范 |
| v3.5.0 | 3.5.0 | 2026-06-03 | 新增页脚组件、深色/浅色主题切换、完整主题系统 |
| v3.4.1 | 3.4.0 | 2026-05-26 | 迁移至Next.js、添加i18n、错误边界、项目重构 |
| v3.3.0 | 3.3.0 | 2026-05-11 | Feature-Based分层架构、修复UI Bug |
| v3.2.0 | 3.2.0 | 2026-05-01 | 组件编辑模态框、路由系统、通知系统 |

---

**最后更新**: 2026-07-29  
**版本**: v4.2.1
