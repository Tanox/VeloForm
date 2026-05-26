# Veloform 自行车装车配置器

[English Version](./README_EN.md)

Veloform 是一款基于 Next.js、Tailwind CSS 并由 Firebase 驱动的高级自行车配置器应用。它允许用户浏览和定制不同类别自行车的配置清单，包括公路车 (Road)、山地车 (MTB) 和折叠车 (Fold)。

## 功能特点

- **极简深色 UI**: 采用现代风格的暗色主题，深度依赖平滑的过渡效果与清晰的排版设计。
- **实时价格与重量计算**: 动态计算并展示整车造价及预计重量。
- **配置云同步**: 深度集成 Firebase Firestore，安全留存用户的独家配置方案。
- **车型分类**: 在公路车、山地车和折叠车间无缝瞬间切换。
- **完美响应式**: 贯彻移动端优先范式，但保留毫不妥协的桌面端设计美学体验。
- **多语言支持**: 支持英文和中文界面切换。
- **错误容错**: 内置错误边界，提供友好的错误提示。

## 架构

本项目架构栈如下：
- **Next.js (v14.1.0)**: 采用 App Router 架构和 React Server Components。
- **React (v18.2.0)**: UI 组件库，支持客户端交互。
- **Zustand (v4.5.0)**: 轻量级状态管理库。
- **Tailwind CSS (v3.4.0)**: 用于全面构建布局结构、文字排版及交互反馈态。
- **Firebase**: 利用 `firebase` npm 包管理 Firestore 数据库与 Auth 身份验证。
- **Framer Motion**: 平滑的动画效果。
- **Lucide React**: 现代图标库。
- **EdgeOne & Vercel**: 预留边缘部署工作流 (UI 端整合呈现)。

## 本地开发指南

确保已设置你的 Firebase 运行时环境变量（参考 `.env.example`），然后执行：

```bash
npm install
npm run dev
```

### 可用命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm start` - 启动生产服务器
- `npm run lint` - 运行代码检查

## 项目规范

有关开发约定、分支与提交规则、测试要求和文档维护，请参阅 `openspec/PROJECT_GUIDELINES.md` 和 `openspec/SPEC.md`。

## 目录结构

```
.
├── src/
│   ├── app/                      # Next.js App Router 路由文件
│   │   ├── layout.tsx            # 根布局
│   │   ├── page.tsx              # 首页（配置器）
│   │   ├── globals.css           # 全局样式
│   │   └── library/
│   │       └── page.tsx          # 配置库页面
│   ├── components/
│   │   ├── configurator/         # 配置器组件
│   │   ├── layout/               # 布局组件
│   │   └── ui/                   # UI 基础组件
│   ├── lib/
│   │   ├── i18n/                 # 国际化文件
│   │   ├── constants.ts          # 应用常量
│   │   ├── store.ts              # 状态管理
│   │   ├── firebase.ts           # Firebase 初始化
│   │   └── firebase-service.ts   # Firebase 服务
│   └── types/
│       └── index.ts              # 类型定义
├── openspec/                     # 项目规范文档
├── public/                       # 静态资源
├── package.json
└── README.md
```

## 贡献指南

1. Fork 本仓库
2. 创建你的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 版本信息

当前运行版本 **v3.4.0**.

## 许可证

此项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件。

