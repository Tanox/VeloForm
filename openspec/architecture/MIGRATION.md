# Angular 到 Next.js 迁移决策记录

**版本**: v3.4.0  
**日期**: 2026-05-26  
**状态**: 已完成

---

## 1. 迁移概述

### 1.1 迁移原因

本项目从 Angular 迁移到 Next.js，主要基于以下考量：

- **性能优化**：Next.js 的服务端渲染（SSR）和静态站点生成（SSG）能力能够显著提升首屏加载速度和 SEO 效果
- **开发效率**：Next.js 简化了路由配置和页面开发流程，减少了样板代码
- **生态系统**：Next.js 与 React 生态系统的深度集成，便于使用现代化的库和工具
- **团队技能**：团队成员对 React 技术栈更为熟悉，减少学习曲线
- **部署简化**：Vercel 等平台对 Next.js 的原生支持，简化了 CI/CD 流程

### 1.2 迁移目标

- 保持现有功能完整性
- 提升应用性能和可维护性
- 优化开发体验和部署流程
- 逐步迁移，避免大规模重写风险

---

## 2. 主要变更

### 2.1 框架变更

| 维度 | Angular | Next.js |
|------|---------|---------|
| 核心语言 | TypeScript + HTML 模板 | React + JSX |
| 路由系统 | Angular Router（模块化） | App Router / Pages Router |
| 依赖注入 | 内置 DI 容器 | React Context / Hooks |
| 表单处理 | Reactive Forms / Template-driven | React Hook Form |
| HTTP 请求 | HttpClient | Fetch API / SWR / TanStack Query |
| 路由守卫 | Guards | Middleware |

### 2.2 架构变更

**Angular 架构模式**：
- 模块化架构（NgModule）
- 组件化开发
- 服务层（Service）
- 依赖注入容器

**Next.js 架构模式**：
- App Router 路由系统
- Server Components / Client Components
- API Routes / Route Handlers
- React Server Actions

### 2.3 状态管理变更

| 场景 | Angular 方案 | Next.js 方案 |
|------|-------------|--------------|
| 组件状态 | Component State | useState Hook |
| 共享状态 | Service + RxJS | Context API / Zustand / Redux Toolkit |
| 服务端状态 | HttpClient + Observable | TanStack Query / SWR |
| 表单状态 | FormGroup | React Hook Form |
| 全局状态 | NgRx（如使用） | Zustand / Redux Toolkit |

### 2.4 样式方案变更

- **Angular**：SCSS + Angular Material / Bootstrap
- **Next.js**：Tailwind CSS / CSS Modules / Styled Components

---

## 3. 技术决策记录

### 3.1 路由系统选择

**决策**：采用 App Router（App Router）而非 Pages Router

**理由**：
- 更好的服务端组件支持
- 更直观的文件约定式路由
- Layouts 和 Templates 提供更灵活的布局控制
- 逐步增强的数据获取能力

**影响范围**：全量迁移

### 3.2 状态管理方案

**决策**：采用 Zustand 作为主要状态管理库

**理由**：
- 轻量级，API 简洁
- 不需要 Provider 嵌套
- 良好的 TypeScript 支持
- 性能优异，支持 middleware

**备选方案**：Redux Toolkit（适合大型复杂应用）

### 3.3 服务端状态管理

**决策**：采用 TanStack Query

**理由**：
- 自动缓存和重新获取
- 内置分页和无限滚动支持
- 乐观更新机制
- 优秀的开发工具支持

### 3.4 样式方案

**决策**：采用 Tailwind CSS

**理由**：
- 原子化 CSS，减小 bundle 体积
- 开发时快速迭代
- 内置暗色模式支持
- 与 Next.js App Router 兼容良好

**备选方案**：CSS Modules + Tailwind（组件级样式隔离）

### 3.5 表单处理

**决策**：采用 React Hook Form + Zod

**理由**：
- 性能优异，非受控表单
- 简洁的 API 设计
- Zod 提供运行时验证
- 与 TypeScript 类型推断完美结合

---

## 4. 迁移时间线

### 4.1 第一阶段：基础设施搭建（已完成）

- [x] Next.js 项目初始化
- [x] TypeScript 配置
- [x] Tailwind CSS 配置
- [x] ESLint 和 Prettier 配置
- [x] 目录结构规划

### 4.2 第二阶段：核心功能迁移（进行中）

- [x] 路由系统迁移
- [ ] 页面组件迁移
- [ ] 状态管理迁移
- [ ] 表单系统迁移

### 4.3 第三阶段：功能完善（待开始）

- [ ] 组件库迁移
- [ ] 样式迁移
- [ ] 第三方依赖适配

### 4.4 第四阶段：测试与部署（待开始）

- [ ] 单元测试迁移
- [ ] E2E 测试配置
- [ ] 性能测试
- [ ] 生产环境部署

---

## 5. 相关资源

### 5.1 官方文档

- [Next.js 官方文档](https://nextjs.org/docs)
- [React 官方文档](https://react.dev)
- [App Router 指南](https://nextjs.org/docs/app)

### 5.2 迁移指南

- [Next.js 迁移指南](https://nextjs.org/docs/pages/building-your-application/upgrading)
- [从 Angular 迁移到 React](https://www.example.com/angular-to-react)

### 5.3 相关文档

- [架构规范](../architecture/ARCHITECTURE.md)
- [项目规范](../STANDARDS.md)
- [开发指南](../guides/DEVELOPMENT.md)

### 5.4 内部资源

- 迁移进度跟踪：[GitHub Project](https://github.com/example/project/projects/1)
- 问题追踪：[GitHub Issues](https://github.com/example/project/issues)

---

## 附录

### A. 术语对照表

| Angular 术语 | Next.js/React 术语 |
|-------------|-------------------|
| Component | Component |
| Directive | Higher-Order Component / Hook |
| Pipe | Utility Function |
| Module | - |
| Service | Hook / Context / External Library |
| Guard | Middleware |
| Interceptor | Middleware / Fetch Wrapper |
| Observable | Promise / use hook |
| Route | Page / Route |
| @Input/@Output | Props |

### B. 命令对照表

| 操作 | Angular CLI | Next.js |
|------|-------------|---------|
| 新建项目 | `ng new` | `npx create-next-app` |
| 生成组件 | `ng generate component` | 手动创建 |
| 生成服务 | `ng generate service` | 手动创建 |
| 开发服务器 | `ng serve` | `npm run dev` |
| 构建 | `ng build` | `npm run build` |
| 测试 | `ng test` | `npm run test` |

---

**维护人**：架构团队  
**审核人**：技术负责人  
**最后更新**：2026-05-26
