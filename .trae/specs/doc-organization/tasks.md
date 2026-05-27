# 文档整理任务清单

## Phase 1: 文档审计与现状分析

- [ ] 任务 1.1: 审计现有文档结构
  - 列出 `openspec/` 目录下所有文档
  - 识别过时文档（引用 Angular 的内容）
  - 识别重复文档
  - 识别冲突信息

- [ ] 任务 1.2: 审计 README 和 CHANGELOG
  - 检查 README.md 与 README_EN.md 一致性
  - 检查 CHANGELOG.md 是否完整
  - 识别版本号不一致问题

## Phase 2: 核心文档更新

- [ ] 任务 2.1: 更新 openspec/architecture/overview.md
  - 重写为 Next.js App Router 架构规范
  - 更新技术栈表格（Next.js 14.1.0, React 18.2.0, Zustand 4.5.0 等）
  - 更新目录结构（App Router 结构）
  - 更新核心架构原则

- [ ] 任务 2.2: 创建 Zustand 状态管理规范
  - 文档位置: `openspec/architecture/state-management.md`
  - 说明 store.ts 的设计模式
  - 记录 actions 和 selectors 的使用规范
  - 提供 Firebase 服务集成说明

- [ ] 任务 2.3: 创建 React 组件设计模式规范
  - 文档位置: `openspec/architecture/component-patterns.md`
  - 说明组件分类（configurator/layout/ui）
  - 定义命名规范
  - 说明动画集成（Framer Motion）

## Phase 3: API 与开发规范更新

- [ ] 任务 3.1: 更新 openspec/api/firestore.md
  - 更新 Firebase 服务接口说明
  - 同步 firebase-service.ts 的实际 API
  - 添加错误处理规范
  - 添加本地存储降级策略说明

- [ ] 任务 3.2: 更新 openspec/development/coding-standards.md
  - 更新 TypeScript 规范（移除 Angular 特有规则）
  - 添加 React/Next.js 编码规范
  - 更新 Git 工作流说明
  - 添加 Tailwind CSS 规范

- [ ] 任务 3.3: 更新 openspec/development/testing.md
  - 替换 Angular 测试规范为 Next.js 测试方案
  - 说明 Jest/Testing Library 配置
  - 定义覆盖率要求

## Phase 4: 文档索引与导航

- [ ] 任务 4.1: 重写 openspec/README.md
  - 更新文档索引结构
  - 更新快速导航指南
  - 更新检查清单
  - 同步版本信息

- [ ] 任务 4.2: 更新根目录 README.md
  - 同步技术栈信息
  - 更新目录结构说明
  - 补充 Next.js 特有命令（npm run dev/build/start）
  - 添加 openspec 链接

- [ ] 任务 4.3: 更新根目录 README_EN.md
  - 保持与中文 README 一致的内容
  - 更新技术栈英文描述

## Phase 5: 文档元数据统一

- [ ] 任务 5.1: 统一所有文档版本号
  - 所有文档版本标记为 v3.4.0
  - 更新最后修改日期

- [ ] 任务 5.2: 创建 ARCHITECTURE_MIGRATION.md
  - 记录 Angular 到 Next.js 的迁移决策
  - 归档重要的架构变更原因
  - 保存于 `openspec/architecture/MIGRATION.md`

## Phase 6: 代码文档增强

- [ ] 任务 6.1: 为 store.ts 添加 JSDoc 注释
  - 文档化所有 state properties
  - 文档化所有 actions
  - 说明 Firebase 集成逻辑

- [ ] 任务 6.2: 为 firebase-service.ts 添加文档
  - 完整的函数文档注释
  - 错误处理说明
  - 使用示例

## Task Dependencies

- 任务 2.1 依赖任务 1.1
- 任务 2.2 和 2.3 依赖任务 2.1
- 任务 3.1 依赖任务 2.2
- 任务 4.1 依赖任务 2.x 和 3.x
- 任务 5.1 依赖所有 Phase 2-4 任务
- 任务 6.1 和 6.2 可以在 Phase 2-3 期间并行执行
