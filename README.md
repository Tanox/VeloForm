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
│   └── ...
├── components/                   # UI 组件
│   ├── configurator/             # 配置器组件
│   ├── layout/                   # 布局组件
│   └── ui/                      # 通用 UI 组件
├── lib/                          # 工具库
│   ├── store/                    # Zustand 状态管理
│   ├── firebase-service/         # Firebase 服务
│   ├── utils/                    # 工具函数
│   ├── constants/                # 常量定义
│   └── mock-data/                # 模拟数据
├── types/                        # TypeScript 类型定义
└── ...
```

详细开发规范请参阅 [openspec/PROJECT_GUIDELINES.md](openspec/PROJECT_GUIDELINES.md)。

## 本地开发指南

确保已设置你的 Firebase 运行时环境变量（参考 `.env.example`），然后执行：

```bash
npm install
npm run dev
```

## 版本信息

当前运行版本 **v3.4.0**.
