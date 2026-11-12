# Veloform 项目开发指南

> **路径**: `/docs/PROJECT_GUIDELINES.md`
> **版本**: v4.4.11
> **更新日期**: 2026-07-28

## 概述

本文档定义 Veloform 项目的协作流程、开发工作流和团队规范。技术架构和详细编码规范请参阅 [规范文档](./README.md)。

---

## 快速开始

### 本地开发环境设置

1. **克隆仓库**：

   ```bash
   git clone https://github.com/Tanox/VeloForm.git
   cd Veloform
   ```

2. **安装依赖**：

   ```bash
   npm install
   ```

3. **配置环境变量**：

   ```bash
   cp .env.example .env
   # 编辑 .env 填入 Supabase 配置（见 .env.example）
   ```

4. **启动开发服务器**：

   ```bash
   npm run dev
   ```

5. **访问应用**：
   - 浏览器打开 `http://localhost:3000`

### 常用命令

| 命令                    | 说明                                 |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | 本地开发服务器（端口 3000）          |
| `npm run build`         | 生产构建                             |
| `npm run build:tmp`     | 生产构建（输出到 `.tmp/next/build`） |
| `npm run clean:tmp`     | 清空 `.tmp/` 临时目录                |
| `npm run test`          | 执行单元测试                         |
| `npm run lint`          | ESLint 代码检查                      |
| `npm run watch`         | 开发模式构建并监听                   |
| `npm run serve:ssr:app` | 运行 SSR 服务                        |

---

## 开发工作流

### 分支策略

**主分支**：

- `main` - 稳定版本，所有部署来自此分支

**功能分支命名**：

```
feature/<描述>     - 新功能开发
fix/<描述>         - Bug 修复
docs/<描述>        - 文档更新
hotfix/<描述>      - 紧急修复
refactor/<描述>    - 代码重构
```

**示例**：

- `feature/add-suspension-selector`
- `fix/supabase-auth-error-handling`
- `docs/update-api-specification`

### 提交流程

1. **从 main 创建分支**：

   ```bash
   git checkout main
   git pull origin main
   git checkout -b feature/my-new-feature
   ```

2. **开发与提交**：

   ```bash
   # 编写代码...
   git add .
   git commit -m "feat(components): add suspension selector"
   ```

3. **推送到远程**：

   ```bash
   git push origin feature/my-new-feature
   ```

4. **创建 Pull Request**

### 提交信息规范

采用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

```
<type>(<scope>): <简短描述>

[可选的详细描述]

[可选的 footer]
```

**Type 类型**：

- `feat` - 新功能
- `fix` - Bug 修复
- `docs` - 文档更新
- `style` - 代码格式（不影响逻辑）
- `refactor` - 重构
- `test` - 测试相关
- `chore` - 构建/配置等杂项

**示例**：

```
feat(components): add MTB suspension selector

- Add SuspensionCategory enum
- Update component-selector modal
- Filter components by bikeType

Closes #123
```

---

## 协作规范

### Pull Request 流程

**创建 PR 前检查**：

- [ ] 所有测试通过 (`npm run test`)
- [ ] Lint 检查通过 (`npm run lint`)
- [ ] 构建成功 (`npm run build`)
- [ ] 更新了相关文档
- [ ] 提交信息符合规范

**PR 描述模板**：

```markdown
## 变更摘要

简要描述本次变更的目的和内容

## 测试方式

1. 步骤一
2. 步骤二
3. 预期结果

## 关联 Issue

Closes #123

## 截图（如适用）

[添加截图]
```

**审核要求**：

- 至少一位团队成员审核通过
- 所有评论已解决
- CI 检查全部通过

### 代码审查要点

Reviewer 应关注：

1. **功能正确性**：是否实现了需求
2. **代码质量**：是否符合编码规范
3. **测试覆盖**：是否有足够的测试
4. **性能影响**：是否引入性能问题
5. **安全性**：是否有安全漏洞
6. **可维护性**：代码是否清晰易懂

---

## 文档体系

Veloform 采用分层文档体系：

### 规范文档 (docs/)

详细的技术规范和开发指南：

- **[docs/README.md](./README.md)** - 规范索引入口
- **架构规范** - 架构设计、数据流、组件设计
- **API 规范** - Firestore 接口、数据模型
- **开发规范** - 编码标准、测试规范
- **部署规范** - 环境配置、部署流程

### 项目文档 (根目录)

面向用户和贡献者的高层文档：

- **[README.md](../README.md)** / **[README_EN.md](../README_EN.md)** - 项目概述
- **[PROJECT_GUIDELINES.md](./PROJECT_GUIDELINES.md)** - 本开发指南
- **[CHANGELOG.md](./CHANGELOG.md)** - 版本变更历史
- **[CHANGELOG.md](../CHANGELOG.md)** - 改进记录

### 何时更新文档

| 变更类型     | 需更新的文档                    |
| ------------ | ------------------------------- |
| 新功能       | CHANGELOG.md, 相关 API 文档     |
| Bug 修复     | CHANGELOG.md                    |
| 架构调整     | 架构规范文档                    |
| API 变更     | API 规范文档                    |
| 部署流程变化 | 部署规范文档                    |
| 规范调整     | PROJECT_GUIDELINES.md, 开发规范 |

---

## 编码规范快速参考

详细的编码规范请参阅 [docs/development/coding-standards.md](./development/coding-standards.md)。以下是核心要点：

### TypeScript

- 避免使用 `any`，使用明确类型
- 导出函数和类必须标注返回类型
- 使用泛型增强类型安全

### React / Next.js

- 使用函数组件
- 优先使用 Zustand 进行状态管理
- 合理使用 Hooks（useState, useEffect, useCallback, useMemo）

### 样式

- 使用 Tailwind CSS 实用类
- 移动优先响应式设计
- 支持暗色模式

### 测试

- 新功能必须配套单元测试
- 测试覆盖率目标：≥80%
- 测试文件命名：`*.spec.ts`

详细规范见 [开发规范](./development/coding-standards.md)

---

## 测试要求

**基本要求**：

- 新功能必须配套单元测试
- Bug 修复应补充回归测试
- 测试文件与被测文件同目录

**覆盖率目标**：

- 语句覆盖率: ≥ 80%
- 分支覆盖率: ≥ 75%
- 函数覆盖率: ≥ 85%

**运行测试**：

```bash
npm run test           # 运行测试
npm run test -- --coverage  # 生成覆盖率报告
```

详细测试规范见 [测试规范](./development/testing.md)

---

## 临时文件与产物目录规范

> 目的：仓库根目录保持整洁，临时文件与构建产物统一收敛到固定子目录，避免根目录堆积
> `.next-*` 一类变体目录（历史上曾残留 12 个变体目录、约 1.5GB）。

### 目录约定

| 目录                                       | 用途                                                   | 是否入库           |
| ------------------------------------------ | ------------------------------------------------------ | ------------------ |
| `.tmp/`                                    | **唯一临时目录**：一次性脚本、日志、探针、临时构建产物 | 否（`.gitignore`） |
| `.tmp/next/build/`                         | 临时构建输出（`npm run build:tmp`）                    | 否                 |
| `.next/`                                   | 平台约定构建目录（Vercel / Cloudflare 依赖）           | 否                 |
| `scripts/`                                 | 正式工具脚本（须入库）                                 | 是                 |
| `coverage/`、`coverage-check/`、`reports/` | 覆盖率与报告产物                                       | 否                 |

### 强制规则

1. **禁止在仓库根目录创建临时文件**：`.tmp-*`、`_tmp_*`、`*.log`、`*.out`、`*.txt` 等一律不得落在根目录。
2. **临时构建目录固定为 `.tmp/next/build`**：Next.js 按 `distDir` 精确匹配 `tsconfig.json` 的
   `include` 片段，目录改名会导致 `tsconfig.json` 被自动改写并堆积历史路径，因此路径必须固定。
3. **`NEXT_DIST_DIR` 只能指向 `.tmp/` 下的路径**：`next.config.mjs` 会校验，越界直接抛错，
   从机制上杜绝根目录再次出现 `.next-*` 变体目录。
4. **旧构建目录用「重命名归档」代替删除**：归档至 `.tmp/next/stale-<时间戳>`，避免触发 IDE 批量删除护栏。
5. **会话结束前清理**：`npm run clean:tmp` 清空 `.tmp/`（保留目录本身）。
6. **门禁必须忽略临时目录**：ESLint（`ignorePatterns`）、Prettier（`.prettierignore`）、
   Vitest（`exclude`）、TypeScript（`exclude`）均已配置忽略 `.tmp/`，避免临时脚本造成门禁假红。

### 命令

```bash
npm run build:tmp    # 构建到 .tmp/next/build（不污染根目录）
npm run clean:tmp    # 清空 .tmp/ 临时目录
```

---

## 环境配置

### 环境变量管理

**重要**：所有私密配置不应提交到仓库。

1. **复制模板**：

   ```bash
   cp .env.example .env
   ```

2. **填写配置**：
   编辑 `.env` 文件，填入 Supabase 配置（见 `.env.example`）

3. **Git 忽略**：
   `.gitignore` 已配置忽略 `.env*` 文件

### Supabase 配置获取

1. 访问 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择项目 > Project Settings
3. 在 "Your apps" 中找到 Web App 配置
4. 复制对应值到 `.env` 文件

---

## 常见问题

### Q: 如何调试 SSR 问题？

A: Three.js 和 DOM 操作需要平台检查：

```typescript
if (isPlatformBrowser(this.platformId)) {
  // Browser-only code
}
```

### Q: 如何处理 Supabase 认证错误？

A: 参考 [数据模型规范](./api/data-models.md) 中的验证策略，以及 `supabase/migrations/` 中的 RLS 策略。

### Q: Bundle Size 超出预算怎么办？

A:

1. 检查是否有未使用的导入
2. 使用懒加载路由
3. 优化图片资源（使用 WebP）

---

## 相关资源

- **[规范索引](./README.md)** - 完整技术文档
- **[项目 README](../README.md)** - 项目概述
- **[变更日志](../CHANGELOG.md)** - 版本历史

---

**文档路径**: `/docs/PROJECT_GUIDELINES.md`  
**最后更新**: 2026-05-05  
**版本**: v4.4.11
