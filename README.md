# Veloform 自行车装车配置器

[English Version](./README_EN.md)

Veloform 是一款基于 Next.js、Tailwind CSS 并由 Firebase 驱动的高级自行车配置器应用。它允许用户浏览和定制不同类别自行车的配置清单，包括公路车 (Road)、山地车 (MTB) 和折叠车 (Fold)。

## 功能特点

- **极简深色 UI**: 采用现代风格的暗色主题，深度依赖平滑的过渡效果与清晰的排版设计。
- **实时价格与重量计算**: 动态计算并展示整车造价及预计重量。
- **配置云同步**: 深度集成 Firebase Firestore，安全留存用户的独家配置方案。
- **车型分类**: 在公路车、山地车和折叠车间无缝瞬间切换。
- **完美响应式**: 贯彻移动端优先范式，但保留毫不妥协的桌面端设计美学体验。

## 技术栈

本项目技术栈如下：

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | v14.1.0 | App Router 架构，React Server Components |
| React | v18.2.0 | UI 组件库 |
| Zustand | v4.5.0 | 轻量级状态管理 |
| Tailwind CSS | v3.4.0 | 样式框架 |
| Firebase | v10.0.0 | Firestore 数据库与 Auth 身份验证 |
| Framer Motion | v10.16.4 | 动画效果 |
| Lucide React | v0.294.0 | 图标库 |

## 目录结构

```
src/
├── app/                          # App Router 路由文件
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   ├── globals.css
│   └── library/
│       └── page.tsx
├── components/                   # UI 组件
│   ├── configurator/             # 配置器组件
│   │   ├── BikeTypeSelector.tsx
│   │   ├── BuildList.tsx
│   │   ├── ComponentDetailModal.tsx
│   │   ├── ComponentSelector.tsx
│   │   ├── CostBreakdownChart.tsx
│   │   ├── RecommendedConfigs.tsx
│   │   ├── ShareModal.tsx
│   │   └── SummaryPanel.tsx
│   ├── layout/                   # 布局组件
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
├── lib/                          # 工具库
│   ├── constants.ts              # 应用常量
│   ├── firebase-service.ts       # Firebase 服务
│   ├── firebase.ts               # Firebase 配置
│   ├── store.ts                  # Zustand 状态管理
│   ├── utils.ts                  # 工具函数
│   ├── toast.ts                  # Toast 通知
│   ├── recommended-configs.ts    # 推荐配置
│   ├── data/                     # 模块化数据
│   │   ├── index.ts
│   │   ├── component-details.ts
│   │   └── component-alternatives.ts
│   └── i18n/                     # 国际化
│       ├── index.ts
│       ├── en.ts
│       └── zh-CN.ts
└── types/                        # TypeScript 类型定义
    └── index.ts
```

详细开发规范请参阅 [openspec/PROJECT_GUIDELINES.md](openspec/PROJECT_GUIDELINES.md)。

## 本地开发指南

确保已设置你的 Firebase 运行时环境变量（参考 `.env.example`），然后执行：

```bash
npm install
npm run dev
```

## 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run start` | 启动生产服务器 |
| `npm run lint` | 运行 ESLint 检查 |
| `npm run test` | 运行单元测试 |
| `npm run test:coverage` | 运行测试并生成覆盖率报告 |

## 项目规范

有关开发约定、分支与提交规则、测试要求和文档维护，请参阅 `openspec/PROJECT_GUIDELINES.md`。

## 版本信息

当前运行版本 **v3.4.1**。