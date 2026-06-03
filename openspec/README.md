# Veloform 规范文档索引

> **路径**: `/openspec/README.md`
> **版本**: v3.5.0
> **更新日期**: 2026-06-03

## 概述

本文档是 Veloform 项目规范体系的导航入口，提供所有技术规范和开发指南的快速访问。规范文档采用分层结构，涵盖架构、API、开发、部署、安全、性能和设计等核心领域。

**项目版本**: v3.5.0

---

## 文档结构

### 架构规范

| 文档 | 说明 | 适用场景 |
|------|------|----------|
| [架构概览](./architecture/overview.md) | 项目概述、技术栈、核心架构原则、目录结构 | 了解项目整体架构 |
| [数据流设计](./architecture/data-flow.md) | Zustand 状态管理、组件通信、副作用处理、持久化流程 | 理解数据如何在系统中流动 |
| [状态管理](./architecture/state-management.md) | React 状态管理方案、Context、Zustand、Server State | 选择合适的状态管理方案 |
| [组件模式](./architecture/component-patterns.md) | React 组件设计模式、Hooks 最佳实践、性能优化 | 开发可复用组件时参考 |
| [组件设计规范](./architecture/component-design.md) | 组件分类、命名规范、Props 定义、可访问性 | 开发新组件时参考 |
| [ADR 索引](./architecture/adr/) | 架构决策记录索引 | 理解关键架构决策背景 |
| [规范标准化](./规范标准化.md) | 文档格式、版本管理、命名规范和维护流程 | 规范化文档编写 |

### API 规范

| 文档 | 说明 | 适用场景 |
|------|------|----------|
| [Firestore API](./api/firestore.md) | Next.js Firebase SDK 接口、安全规则、错误处理、性能优化 | 调用后端服务时参考 |
| [数据模型](./api/data-models.md) | 实体定义、Schema、验证规则、ER 图 | 理解数据结构时参考 |

### 开发规范

| 文档 | 说明 | 适用场景 |
|------|------|----------|
| [编码规范](./development/coding-standards.md) | TypeScript、React/Next.js、样式、Git 工作流、性能优化 | 编写代码时遵循 |
| [测试规范](./development/testing.md) | 测试策略、框架使用、覆盖率要求、最佳实践 | 编写测试时参考 |
| [国际化规范](./development/i18n-guidelines.md) | i18n 实现、翻译文件结构、语言切换、测试 | 开发多语言功能时参考 |

### 设计规范

| 文档 | 说明 | 适用场景 |
|------|------|----------|
| [UI 设计系统](./design/ui-design-system.md) | 颜色、字体、间距、组件库、动画、可访问性 | UI 开发和设计系统维护 |
| [原型图说明](../prototype-guide.md) | 高拟真原型图功能说明、与实际项目映射关系 | 理解 UI 设计和交互流程 |

### 部署规范

| 文档 | 说明 | 适用场景 |
|------|------|----------|
| [环境配置](./deployment/environments.md) | 部署流程、环境变量、SSR 配置、监控、SEO | 部署应用时参考 |
| [CI/CD 流程](./devops/ci-cd.md) | 分支策略、自动化测试、部署流程、监控告警 | 设置 CI/CD 流水线 |

### 安全规范

| 文档 | 说明 | 适用场景 |
|------|------|----------|
| [安全指南](./security/security-guidelines.md) | 认证授权、数据保护、安全审计、威胁防护 | 确保应用安全 |

### 性能规范

| 文档 | 说明 | 适用场景 |
|------|------|----------|
| [性能优化](./performance/optimization.md) | Bundle 优化、React 性能、3D 渲染优化、监控 | 优化应用性能 |

---

## 快速导航

### 新加入开发者

1. 阅读 [架构概览](./architecture/overview.md) 了解项目整体结构
2. 查看 [编码规范](./development/coding-standards.md) 了解代码风格要求
3. 运行 `npm run dev` 启动本地开发环境
4. 阅读 [PROJECT_GUIDELINES.md](../PROJECT_GUIDELINES.md) 了解协作流程

### 开发新功能

1. 查看 [组件模式](./architecture/component-patterns.md) 了解 React 组件开发模式
2. 参考 [状态管理](./architecture/state-management.md) 选择合适的状态管理方案
3. 如需调用后端，查阅 [Firestore API](./api/firestore.md)
4. 如需多语言支持，参考 [国际化规范](./development/i18n-guidelines.md)
5. 完成后按照 [测试规范](./development/testing.md) 编写测试

### 修复 Bug

1. 定位问题所在的模块（组件/服务/数据模型）
2. 查阅相关规范文档理解预期行为
3. 按照 [测试规范](./development/testing.md) 添加回归测试
4. 提交 PR 时遵循 [编码规范](./development/coding-standards.md) 中的 Git 工作流

### 部署到生产环境

1. 阅读 [环境配置](./deployment/environments.md) 了解部署流程
2. 确保所有测试通过且覆盖率达标
3. 检查 Bundle Size 是否在预算内
4. 按照部署检查清单逐项验证

---

## 规范遵守检查清单

在提交代码前，请确认以下事项：

### 代码质量

- [ ] 遵循 [编码规范](./development/coding-standards.md)
- [ ] 通过 ESLint 检查 (`npm run lint`)
- [ ] 无 `any` 类型滥用
- [ ] 使用 React Hooks 正确管理组件状态
- [ ] Server/Client 组件边界划分清晰

### 测试要求

- [ ] 新功能包含单元测试
- [ ] Bug 修复包含回归测试
- [ ] 测试覆盖率满足阈值要求（≥80%）
- [ ] 所有测试通过 (`npm run test`)

### 文档更新

- [ ] 公共 API 有 JSDoc 注释
- [ ] 复杂逻辑有清晰的注释
- [ ] 更新了相关规范文档（如需要）
- [ ] 多语言文本已添加到翻译文件

### Git 提交

- [ ] 分支命名符合规范 (`feature/`, `fix/`, 等)
- [ ] 提交信息遵循 Conventional Commits
- [ ] PR 描述清晰，包含变更摘要和测试说明

---

## 文档维护

### 更新频率

| 文档类型 | 更新时机 | 审查频率 |
|---------|---------|---------|
| 架构规范 | 重大重构时 | 按需 |
| API 规范 | 接口变更时 | 变更时 |
| 开发规范 | 季度审查 | 每季度 |
| 部署文档 | 部署流程变化时 | 按需 |
| 安全规范 | 安全策略调整时 | 每半年 |
| 国际化规范 | 新增语言或翻译变更时 | 变更时 |

### 贡献流程

如发现文档错误或需要补充：

1. 在 GitHub 上创建 Issue 描述问题
2. 或创建 PR 直接修复文档
3. 遵循现有文档的格式和风格
4. 确保示例代码可以正常运行
5. 更新相关文档的交叉引用

### 版本历史

规范文档的版本与项目主版本号同步：

| 规范版本 | 项目版本 | 更新日期 | 主要变更 |
|---------|---------|---------|---------|
| v3.5.0 | 3.5.0 | 2026-06-03 | 新增页脚组件、深色/浅色主题切换、完整主题系统 |
| v3.5.0 | 3.5.0 | 2026-06-01 | 新增 UI 设计系统文档、完善原型图说明与实际项目映射 |
| v3.4.1 | 3.4.0 | 2026-05-26 | 技术栈迁移至 Next.js：更新文档索引结构、添加 React 组件模式和状态管理规范、更新开发规范为 Next.js 标准 |
| v3.3.0 | 3.3.0 | 2026-05-11 | 完整架构重构，引入 Feature-Based 分层结构（Core/Features/Shared），修复 UI Bug |
| v3.2.0 | 3.2.0 | 2026-05-01 | 新增组件编辑、路由系统、通知系统、确认对话框 |
| v3.1.0 | 3.1.0 | 2026-05-01 | 初始模块化重构 |

详细变更记录见 [CHANGELOG.md](../CHANGELOG.md)

---

## 相关资源

- [项目 README](../README.md) - 项目概述和快速开始
- [英文 README](../README_EN.md) - 英文版项目说明
- [变更日志](../CHANGELOG.md) - 版本历史
- [原型图](../prototype.html) - 高拟真静态设计稿
- [设计审查](../design-review.md) - 设计优化建议

---

**文档路径**: `/openspec/README.md`
**最后更新**: 2026-06-03
**版本**: v3.5.0