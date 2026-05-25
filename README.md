# Veloform 自行车装车配置器 v3.4.0

[English Version](./README_EN.md)

Veloform 是一款基于 Angular、Tailwind CSS 并由 Firebase 驱动的高级自行车配置器应用。它允许用户浏览和定制不同类别自行车的配置清单，包括公路车 (Road)、山地车 (MTB) 和折叠车 (Fold)。

## 功能特点

- **极简深色 UI**: 采用现代风格的暗色主题，深度依赖平滑的过渡效果与清晰的排版设计。
- **实时价格与重量计算**: 动态计算并展示整车造价及预计重量。
- **配置云同步**: 深度集成 Firebase Firestore，安全留存用户的独家配置方案。
- **车型分类**: 在公路车、山地车和折叠车间无缝瞬间切换。
- **完美响应式**: 贯彻移动端优先范式，但保留毫不妥协的桌面端设计美学体验。
- **多语言支持**: 支持英语和简体中文无缝切换。
- **3D 实时预览**: 基于 Three.js 的程序化 3D 自行车可视化，支持 WebGL 环境检测与降级方案。

## 架构

本项目架构栈如下：
- **Angular (v21)**: 采用无 Zone.js 的全新响应式 (`signals`) 范式和独立组件。
- **Tailwind CSS (v4)**: 用于全面构建布局结构、文字排版及交互反馈态。
- **Firebase**: 利用 `firebase` npm 包管理 Firestore 数据库与 Auth 身份验证。
- **Three.js**: 程序化 3D 渲染引擎，支持自行车模型的实时可视化。
- **EdgeOne & Vercel**: 预留边缘部署工作流 (UI 端整合呈现)。

## 本地开发指南

确保已设置你的 Firebase 运行时环境变量，然后执行：

```bash
npm install
npm run dev
```

## 项目规范

有关开发约定、分支与提交规则、测试要求和文档维护，请参阅 `PROJECT_GUIDELINES.md` 和 `openspec/` 目录下的完整规范文档。

## 目录结构

- `src/app/`
  - `core/` - 核心功能模块（服务、状态管理、模型、常量）
    - `services/` - Firebase、i18n、通知、组件仓库、配置仓库、自行车渲染服务
    - `stores/` - ConfigStore 状态管理
    - `models/` - TypeScript 类型定义
    - `constants/` - 应用常量配置
  - `features/`
    - `configurator/` - 配置器模块（预览、配置清单、组件选择器）
    - `navbar/` - 导航栏模块
  - `shared/components/` - 共享组件（侧边栏、加载指示器、通知、对话框）
  - `app.ts` & `style.css` - 根组件与全量全局样式体系。

## 版本信息

当前运行版本 **v3.4.0**.

详细版本历史请参阅 [CHANGELOG.md](./CHANGELOG.md)。
