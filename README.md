# Veloform 自行车装车配置器

[English Version](./README_EN.md) | [项目规范](./openspec/README.md) | [原型说明](./openspec/prototype-guide.md)

---

## 项目概述

Veloform 是一款基于 Next.js、Tailwind CSS 并由 **Supabase** 驱动的高级自行车配置器应用。它允许用户浏览和定制不同类别自行车的配置清单，包括公路车 (Road)、山地车 (MTB) 和折叠车 (Fold)。

**生产地址**: [https://veloform.app](https://veloform.app)  
**代码仓库**: [https://github.com/sutchan/Veloform](https://github.com/sutchan/Veloform)

---

## 核心功能

- **Apple 风格设计**: 采用极简主义设计理念，充足留白、清晰视觉层次、大图展示、SF Pro 字体、Apple Blue 主色调
- **双主题支持**: 支持深色/浅色双主题模式，风格统一
- **实时价格与重量计算**: 动态计算并展示整车造价及预计重量
- **配置云同步**: 深度集成 **Supabase** Postgres 数据库与 Row Level Security，安全留存用户的独家配置方案
- **自动同步机制**: 用户登录后自动加载云端配置，实现多设备间数据同步
- **车型分类**: 在公路车、山地车和折叠车间无缝瞬间切换
- **完美响应式**: 贯彻移动端优先范式，但保留毫不妥协的桌面端设计美学体验
- **双语支持**: 内置 EN/ZH-CN 国际化系统，一键切换语言
- **配置库管理**: 保存、加载、分享个人配置方案
- **流畅动画**: 基于 Framer Motion 的微交互动画，提供自然流畅的用户体验
- **性能优化**: 选择性状态订阅，避免不必要的组件重渲染

---

## 技术栈

完整技术栈说明见 [架构概览](./openspec/architecture/overview.md)。

| 技术          | 版本        | 用途                                     |
| ------------- | ----------- | ---------------------------------------- |
| Next.js       | v14.1.0     | App Router 架构，React Server Components |
| React         | v18.2.0     | UI 组件库                                |
| Zustand       | v4.5.0      | 轻量级状态管理                           |
| Tailwind CSS  | v3.4.0      | 样式框架                                 |
| **Supabase**  | **v2.45.0** | **Postgres 数据库 + Row Level Security** |
| Framer Motion | v10.16.4    | 动画效果                                 |
| Lucide React  | v0.294.0    | 图标库                                   |

---

## 目录结构

```
src/
├── app/                          # App Router 路由文件
│   ├── layout.tsx                # 根布局（含 SyncProvider）
│   ├── page.tsx                  # 首页/配置器
│   ├── providers.tsx             # 全局提供者
│   ├── globals.css               # 全局样式
│   └── library/
│       └── page.tsx              # 配置库页面
├── components/                   # UI 组件
│   ├── configurator/             # 配置器组件
│   │   ├── BikeTypeSelector.tsx  # 车型选择器
│   │   ├── BuildList.tsx         # 组件清单
│   │   ├── ComponentDetailModal.tsx  # 组件详情模态框
│   │   ├── ComponentSelector.tsx # 组件选择器
│   │   ├── CostBreakdownChart.tsx    # 成本分解图表
│   │   ├── RecommendedConfigs.tsx    # 推荐配置
│   │   ├── ShareModal.tsx        # 分享模态框
│   │   └── SummaryPanel.tsx      # 汇总面板
│   ├── layout/                   # 布局组件
│   │   └── Navbar.tsx            # 导航栏
│   ├── ui/                       # 通用 UI 组件
│   │   ├── Button.tsx            # 按钮
│   │   ├── Card.tsx              # 卡片
│   │   ├── ErrorBoundary.tsx     # 错误边界
│   │   ├── Modal.tsx             # 模态框
│   │   ├── OnboardingGuide.tsx   # 新手引导
│   │   ├── SupportModal.tsx      # 支持模态框
│   │   ├── ThemeToggle.tsx       # 主题切换
│   │   └── Toast.tsx             # Toast 通知
│   └── SyncProvider.tsx          # 云同步提供者（Auth + Supabase）
├── lib/                          # 工具库
│   ├── auth.ts                   # Supabase 认证服务
│   ├── constants.ts              # 应用常量
│   ├── env.ts                    # 环境变量验证
│   ├── supabase-service.ts      # Supabase 数据服务
│   ├── supabase.ts              # Supabase 客户端配置
│   ├── store.ts                # Zustand 状态管理（含选择性 hooks）
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
    └── index.ts                  # 强化类型定义（含组件规格接口）
```

详细开发规范请参阅 [openspec/PROJECT_GUIDELINES.md](openspec/PROJECT_GUIDELINES.md)。

---

## 快速开始

### 前置要求

- Node.js >= 18.x
- npm 或 pnpm
- Supabase 项目（用于 Postgres 数据库 + Row Level Security）

### 安装步骤

1. **克隆仓库**：

   ```bash
   git clone https://github.com/sutchan/Veloform.git
   cd Veloform
   ```

2. **安装依赖**：

   ```bash
   npm install
   # 或使用 pnpm
   pnpm install
   ```

3. **配置环境变量**：

   ```bash
   cp .env.example .env
   # 编辑 .env 填入 Supabase URL 和 anon key
   ```

4. **启动开发服务器**：

   ```bash
   npm run dev
   ```

5. **访问应用**：
   浏览器打开 `http://localhost:3000`

### Supabase 配置获取

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 创建新项目
3. 在 SQL Editor 中运行 `supabase/migrations/20260619000000_initial_schema.sql`
4. 在 **Authentication** 中启用 Email/Password 和 Google OAuth 登录
5. 在项目设置中获取 Web App 配置
6. 将配置值填入 `.env` 文件

---

## 可用命令

| 命令                    | 说明                        |
| ----------------------- | --------------------------- |
| `npm run dev`           | 启动开发服务器（端口 3000） |
| `npm run build`         | 构建生产版本                |
| `npm run start`         | 启动生产服务器              |
| `npm run lint`          | 运行 ESLint 检查            |
| `npm run test`          | 运行单元测试                |
| `npm run test:coverage` | 运行测试并生成覆盖率报告    |

---

## 项目规范

完整的开发约定、分支与提交规则、测试要求和文档维护指南，请参阅：

- **[openspec/README.md](./openspec/README.md)** - 规范文档索引（推荐从这里开始）
- **[openspec/PROJECT_GUIDELINES.md](./openspec/PROJECT_GUIDELINES.md)** - 项目开发指南
- **[openspec/design/ui-design-system.md](./openspec/design/ui-design-system.md)** - UI 设计系统
- **[openspec/prototype-guide.md](./openspec/prototype-guide.md)** - 原型图说明
- **[openspec/design/design-review.md](./openspec/design/design-review.md)** - 设计审查与优化建议

---

## 部署

本项目支持以下部署平台：

- **Vercel**: 推荐部署平台，零配置自动部署
- **EdgeOne Pages**: 腾讯云边缘部署方案

部署指南见 [环境配置](./openspec/deployment/environments.md)。

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

提交前请确保：

- 所有测试通过 (`npm run test`)
- Lint 检查通过 (`npm run lint`)
- 遵循 [编码规范](./openspec/development/coding-standards.md)

---

## 许可证

MIT License

---

## 版本信息

当前版本：**v4.1.0**  
最后更新：2026-07-10

详细变更记录见 [CHANGELOG.md](./CHANGELOG.md)。
