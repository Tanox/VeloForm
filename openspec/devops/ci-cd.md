# Veloform CI/CD 流程规范 (v3.4.0)

## 概述

本文档定义了 Veloform 项目的持续集成和持续部署流程，包括分支策略、自动化测试、部署流程和监控告警等方面。

---

## 1. 分支策略

### 1.1 Git Flow 工作流

采用简化版 Git Flow 工作流：

```
main (生产分支)
  │
  └── develop (开发分支)
        │
        ├── feature/xxx (功能分支)
        ├── fix/xxx (修复分支)
        └── hotfix/xxx (热修复分支)
```

### 1.2 分支命名规范

| 分支类型 | 命名格式 | 示例 |
|----------|----------|------|
| 功能分支 | `feature/<feature-name>` | `feature/component-selector` |
| 修复分支 | `fix/<issue-description>` | `fix/login-error` |
| 热修复分支 | `hotfix/<issue-description>` | `hotfix/critical-bug` |
| 发布分支 | `release/<version>` | `release/v3.2.0` |
| 实验分支 | `experiment/<idea>` | `experiment/new-ui` |

### 1.3 PR 审查流程

#### 提交 PR 前检查
- [ ] 通过 ESLint 检查 (`npm run lint`)
- [ ] 通过所有测试 (`npm run test`)
- [ ] 测试覆盖率达标 (≥80%)
- [ ] 更新相关文档

#### PR 审查要求
- 至少 1 位开发者审查通过
- 审查者必须运行测试确认无回归
- 重大变更需要架构师批准

---

## 2. 自动化测试

### 2.1 测试层级

| 层级 | 类型 | 覆盖率要求 | 运行时机 |
|------|------|------------|----------|
| 单元测试 | 组件、服务 | ≥80% | CI 每次提交 |
| 集成测试 | 组件交互、API | ≥60% | PR 合并前 |
| E2E 测试 | 端到端流程 | 关键路径覆盖 | 发布前 |

### 2.2 测试框架配置

#### Vitest 配置示例
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import angular from '@angular/vite';

export default defineConfig({
  plugins: [angular()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      thresholds: {
        global: {
          lines: 80,
          branches: 70,
          functions: 80,
          statements: 80
        }
      }
    }
  }
});
```

### 2.3 测试脚本

```json
// package.json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test"
  }
}
```

---

## 3. 部署流程

### 3.1 环境定义

| 环境 | 用途 | 部署方式 | 域名 |
|------|------|----------|------|
| 开发 | 本地开发 | 手动启动 | `localhost:4200` |
| 预览 | PR 预览 | Vercel 自动部署 | `*.vercel.app` |
| 预发布 | 生产前验证 | 手动触发 | `staging.veloform.app` |
| 生产 | 正式环境 | 手动触发 | `veloform.app` |

### 3.2 部署步骤

#### 生产部署检查清单

| 检查项 | 说明 |
|--------|------|
| 代码审查 | PR 已通过审查 |
| 测试通过 | 所有测试通过 |
| 文档更新 | 相关文档已更新 |
| 版本更新 | 版本号已递增 |
| 变更日志 | CHANGELOG.md 已更新 |

#### Vercel 部署配置

```json
// vercel.json
{
  "framework": "angular",
  "buildCommand": "npm run build",
  "outputDirectory": "dist/app/browser",
  "installCommand": "npm install",
  "env": {
    "NODE_ENV": "production",
    "FIREBASE_API_KEY": "@firebase-api-key",
    "GEMINI_API_KEY": "@gemini-api-key"
  }
}
```

### 3.3 蓝绿部署策略

对于重大变更，使用蓝绿部署：
1. 部署新版本到绿色环境
2. 验证绿色环境正常运行
3. 切换流量到绿色环境
4. 保留蓝色环境一段时间作为回滚备用

---

## 4. 监控与告警

### 4.1 监控指标

| 类别 | 指标 | 告警阈值 |
|------|------|----------|
| 性能 | LCP > 2.5s | P75 > 3s |
| 错误 | 错误率 | > 1% |
| 可用性 | 正常运行时间 | < 99.9% |
| 资源 | 内存使用 | > 80% |

### 4.2 监控工具

- **Vercel Analytics**: 流量和性能监控
- **Firebase Crashlytics**: 错误追踪
- **Google Analytics**: 用户行为分析

### 4.3 告警配置

#### 告警级别

| 级别 | 触发条件 | 通知方式 |
|------|----------|----------|
| P0 | 服务宕机 | 即时通知（Slack + 邮件） |
| P1 | 错误率 > 5% | 15 分钟内通知 |
| P2 | 性能下降 50% | 1 小时内通知 |
| P3 | 版本发布完成 | 每日汇总 |

---

## 5. 发布流程

### 5.1 版本号规范

遵循 Semantic Versioning (SemVer)：
- **主版本号 (MAJOR)**: 不兼容的 API 变更
- **次版本号 (MINOR)**: 向后兼容的功能新增
- **修订号 (PATCH)**: 向后兼容的问题修复

### 5.2 发布步骤

1. 更新版本号（`metadata.json`、文件头注释）
2. 更新 `CHANGELOG.md`
3. 创建发布分支 `release/vX.Y.Z`
4. 运行完整测试套件
5. 部署到预发布环境验证
6. 部署到生产环境
7. 创建 GitHub Release

---

## 6. CI/CD 最佳实践清单

| 类别 | 最佳实践 |
|------|----------|
| **分支** | 使用规范的分支命名 |
| **测试** | 测试通过才能合并 |
| **部署** | 自动化部署，减少人工干预 |
| **监控** | 设置合理的告警阈值 |
| **回滚** | 保留回滚能力 |

---

**最后更新**: 2026-05-05  
**版本**: v3.4.0