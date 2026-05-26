# 项目文档整理规范

## Why

当前项目文档存在以下问题：
1. `openspec/` 目录下的架构文档仍引用 Angular 技术栈，但项目已迁移至 Next.js
2. 文档版本信息不一致，部分文档标记为 v3.3.x，部分为 v3.4.0
3. README 与规范文档之间存在信息重复和冲突
4. 缺少 Next.js App Router 架构的规范文档
5. Firebase 服务相关文档未更新以反映新的服务实现方式

## What Changes

### 文档审计与清理
- 审计现有所有文档，识别过时、重复或冲突的内容
- 清理 `openspec/` 中引用 Angular 的文档，替换为 Next.js 架构规范
- 删除或归档 `angular-backup/` 目录中过时的 Angular 代码相关文档

### 文档结构重组
- 创建统一的文档索引页面，整合所有规范入口
- 更新 `openspec/architecture/overview.md` 为 Next.js App Router 架构规范
- 新增 `openspec/architecture/state-management.md` - Zustand 状态管理规范
- 新增 `openspec/architecture/component-patterns.md` - React 组件设计模式规范

### 技术栈文档更新
- 更新所有文档中的技术栈描述（Angular → Next.js）
- 更新目录结构说明（Angular 特性结构 → App Router 结构）
- 更新 API 文档以反映新的 Firebase 服务实现

### 文档元数据统一
- 统一所有文档版本号为 v3.4.0
- 统一文档最后更新时间格式
- 更新 README.md 以反映当前 Next.js 技术栈

## Impact

### 受影响的规范
- `openspec/architecture/*` - 全部架构文档需要更新
- `openspec/development/*` - 开发规范需要适配 Next.js 工作流
- `openspec/api/*` - API 文档需要更新 Firebase 服务接口
- `openspec/README.md` - 规范索引需要更新导航链接

### 受影响的代码文件
- `src/app/layout.tsx` - 可能需要添加文档注释
- `src/lib/store.ts` - Zustand store 需要添加 JSDoc
- `src/lib/firebase-service.ts` - Firebase 服务需要完整文档注释

## ADDED Requirements

### Requirement: 文档索引页面
系统应提供清晰的文档导航入口，包含所有规范文档的链接和简要说明。

#### Scenario: 开发者访问文档索引
- **WHEN** 开发者访问 `openspec/README.md`
- **THEN** 应看到按分类组织的文档索引，包含架构、开发、部署等分类
- **AND** 每个分类下应包含具体文档链接和适用场景说明

### Requirement: 技术栈一致性
所有文档中的技术栈描述应与 `package.json` 中的实际依赖版本保持一致。

#### Scenario: 文档与技术栈同步
- **WHEN** 项目升级了依赖版本（如 Next.js 14.1.0 → 14.2.0）
- **THEN** 应同步更新 `README.md`、`openspec/architecture/overview.md` 等文档中的版本号

## MODIFIED Requirements

### Requirement: README.md 内容更新
现有 README.md 需要更新以反映 Next.js 技术栈。

**原内容**：
- 引用 Angular 架构
- 缺少 Zustand、Framer Motion 等关键依赖说明
- 目录结构描述与实际不符

**更新后**：
- 明确说明 Next.js App Router 架构
- 列出所有技术栈依赖及版本
- 提供准确的项目目录结构

## REMOVED Requirements

### Requirement: Angular 相关架构文档
**Reason**: 项目已完全迁移至 Next.js，Angular 相关架构文档不再适用  
**Migration**: 归档至 `angular-backup/openspec/` 或创建 `ARCHITECTURE_MIGRATION.md` 记录迁移决策

### Requirement: 旧版 Feature-Based 分层结构
**Reason**: Next.js App Router 使用页面路由结构，而非 Angular Feature 模块  
**Migration**: 更新为 App Router 路由结构说明
