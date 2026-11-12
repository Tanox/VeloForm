# Veloform 仓库协作约定

> **版本**：v4.4.11
> **适用范围**：所有参与 Veloform 开发的 AI 助手与人类贡献者
> **详细规范**：[docs/PROJECT_GUIDELINES.md](./docs/PROJECT_GUIDELINES.md)

## 1. 临时文件与产物目录（强制）

- **唯一临时目录是 `.tmp/`**（仓库根）。一次性脚本、探针、日志、中间结果、临时构建产物一律写入其中，
  **禁止在仓库根目录创建 `.tmp-*` / `_tmp_*` / `*.log` / `*.out` / `*.txt` 等散落文件**。
- **临时构建目录固定为 `.tmp/next/build`**（`npm run build:tmp`）。
  Next.js 按 `distDir` 精确匹配 `tsconfig.json` 的 `include` 片段，目录改名会导致 `tsconfig.json`
  被自动追加历史路径（历史上已堆积 3 条变体路径），因此**路径必须固定**。
- **`NEXT_DIST_DIR` 只允许指向 `.tmp/` 下的路径**，`next.config.mjs` 会校验并在越界时直接抛错；
  `.next/` 是平台约定目录（Vercel / Cloudflare 依赖），保持默认不变，**不再新增 `.next-*` 变体目录**。
- 旧构建目录用「重命名归档」代替删除（归档到 `.tmp/next/stale-<时间戳>`），避免触发 IDE 批量删除护栏。
- 正式工具脚本放 `scripts/`（须入库）；覆盖率与报告产物写入 `coverage/`、`coverage-check/`、`reports/`。
- 会话结束前执行 `npm run clean:tmp` 清空 `.tmp/`（保留目录本身）。

## 2. 门禁忽略项（临时目录不得污染门禁）

| 工具       | 配置位置           | 忽略内容                                                                   |
| ---------- | ------------------ | -------------------------------------------------------------------------- |
| ESLint     | `.eslintrc.json`   | `ignorePatterns`：`.next*/`、`.tmp/**`、`coverage/**`、`coverage-check/**` |
| Prettier   | `.prettierignore`  | `.tmp`、`.next-*`                                                          |
| Vitest     | `vitest.config.ts` | `exclude`：`.tmp/**`、`**/.tmp/**`                                         |
| TypeScript | `tsconfig.json`    | `exclude`：`.tmp`                                                          |

新增会落盘的脚本时，务必同步以上忽略项，避免门禁假红。

## 3. 版本与文档同步

- 版本单一来源是 `package.json`，构建期注入页脚 `V{version}· build {yymmddhhmm}`（10 位时间戳）。
- **每次修改至少 bump 一次 patch**，并同步版本展示位：`package.json` / `package-lock.json` /
  `README.md` / `README_EN.md` / `docs/SPEC.md` / `docs/README.md` / `docs/PROJECT_GUIDELINES.md` /
  `docs/tasks.md` / `docs/tasks-done.md` / `prototype/README.md` / `src/lib/constants/app.ts` /
  `CHANGELOG.md`。
- **只有被改动的文件**更新 `// 文件路径: xxx vX.Y.Z` 头注释，禁止全仓批量刷写；
  历史 CHANGELOG 中的旧版本号不得改写。
- 唯一任务单源是 `docs/tasks.md`，已完成任务归档至 `docs/tasks-done.md`。

## 4. 提交与协作

- 提交信息采用 Conventional Commits：`<type>(<scope>): <简短描述>`，scope 与描述使用中文。
- 会话间隙可能有其他并行会话改动同一仓库：写文档或提交前必须重新 `git status` + `git log`
  - 实查 `package.json` 版本号，不得依赖历史快照。
- 本机 `npm install` / `npm ci` 会触发 IDE Safe-Delete 批量删除护栏（`node_modules` ≥500 文件），
  被中断会留下残缺依赖并伪装成代码缺陷；**不要反复重试或改写等效删除**，构建验证优先交由 CI。
