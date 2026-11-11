# Veloform 任务清单（进行中 / 待办）

> **派生来源**：`docs/design/design-review.md`（P0–P3 优化建议）+ OpenSpec 规范对齐 + 全仓待办盘点
> **最后更新**：2026-11-11 13:55:32
> **本次更新戳**：2026-11-11 13:55:32（建档 / 归档 / 优先级与状态重排）
> **当前版本**：v4.4.9
> **说明**：本清单由 OpenSpec 派生，已完成的任务已归档至 [`tasks-done.md`](./tasks-done.md)；本文件是项目**唯一任务来源**。

## 优先级约定

| 优先级 | 含义                            |
| :----- | :------------------------------ |
| P0     | 核心体验 / 阻断门禁，应立即处理 |
| P1     | 高优先级，显著提升质量与安全性  |
| P2     | 中优先级，工程化与一致性        |
| P3     | 低优先级，长期优化              |

## 进行中 / 待办任务

> **状态快照时间**：2026-11-11 13:55:32；`状态` 取值：待办 / 进行中 / 已完成 / 已评估（不实施）。

| ID   | 任务                                                           | 优先级 | 状态 | 更新于           | 说明 / 验收标准                                                                                                                                                                                          |
| :--- | :------------------------------------------------------------- | :----- | :--- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| R-01 | 修复 onboarding 迁移残留引用导致的 typecheck 阻断              | P0     | 待办 | 2026-11-11 13:55 | `src/components/onboarding/OnboardingGuide.tsx:5`、`OnboardingStepContent.tsx:5` 指向不存在的 `./dialog` / `./button`；`npm run typecheck` 需 0 错误                                                     |
| R-02 | 任务源治理：收口 docs 内散落的待办 / 进度表                    | P0     | 待办 | 2026-11-11 13:55 | `design/design-review.md`、`architecture/MIGRATION.md`、`development/ci-cd.md`、`development/testing.md`、`ci.yml` 注释、PR 模板等；标注已交付 / 评估否决 / 示例 / 外部依赖，任务记录只保留在本文件      |
| R-03 | 文档一致性：版本、地址、技术栈、语言列表、死链与 Firebase 残留 | P1     | 待办 | 2026-11-11 13:55 | `PROJECT_GUIDELINES.md`、`README*`、`docs/SPEC.md`、`deployment/environments.md`、`prototype-guide.md`；过期版本头与 `./LICENSE` 等死链一并处理                                                          |
| R-04 | 环境配置与忽略规则：清理遗留变量、修正 `scripts/` 误忽略       | P1     | 待办 | 2026-11-11 13:55 | 本地 `.env` 残留 Firebase/Gemini 且缺 Supabase 变量；`.gitignore:39` 忽略整个正式脚本目录；生产环境缺失变量需可见告警                                                                                    |
| R-05 | 安全响应头双轨去重与 CSP 图片域收紧                            | P1     | 待办 | 2026-11-11 13:55 | `vercel.json` 与 `src/middleware.ts` 重复设置 nosniff / X-Frame-Options / Referrer-Policy / Cache-Control；`img-src https:` 通配收敛；`unsafe-inline` 因 Next 14 无 nonce 保留并注明后续随大版本升级处理 |
| R-06 | 死代码清理与重复实现收口                                       | P1     | 待办 | 2026-11-11 13:55 | 删除 0 引用模块（`lib/lazy.tsx`、`components/ui/index.ts`、大写 `ErrorBoundary.tsx`、`useToastStore`、`SUPABASE_TABLES`）；两个错误页抽公共组件；localStorage 统一走 `storage.ts`                        |
| R-07 | 占位交互收口（Live Chat / onNavigate / 缩略图）                | P1     | 待办 | 2026-11-11 13:55 | `SupportModal.tsx:91` 空 `onClick`、`app/library/page.tsx:26` 空 `onNavigate`、`ComponentDetailThumbnailList` 占位块；改为禁用态 / 明确提示 / 真实渲染，禁止「点了没反应」                               |
| R-08 | 测试与门禁补齐                                                 | P1     | 待办 | 2026-11-11 13:55 | 补 middleware / 快捷键 hook 测试；`coverage.all` 口径显式化；修复 `format:check` 基线（当前 11 文件不达标）并纳入 CI；ESLint 补 `no-console` 等基础规则                                                  |
| R-09 | 首屏低风险代码分割                                             | P2     | 待办 | 2026-11-11 13:55 | 首页非首屏区块（Pricing / Cta / RecommendedConfigs）改 `next/dynamic` 动态导入，保持 Suspense 与交互契约，`npm run build` 通过                                                                           |
| R-10 | 版本与变更记录同步                                             | P2     | 待办 | 2026-11-11 13:55 | 本轮改动后 bump 至 v4.4.10，同步 `package.json` / lock / `APP_INFO` / README / SPEC / CHANGELOG / 被改动文件头注释                                                                                       |

## 状态说明（2026-11-11 13:55:32 基线）

- 任务来源：① `tasks.md` 维护轮次记录中已交付但尚未归档的 v4.4.8 / v4.4.9 两轮工作（已移入 `tasks-done.md`，M-01 ~ M-12）；② 全仓文档与源码待办盘点；③ 本轮门禁实测。
- 门禁基线：`npm run check` 在 `typecheck` 阶段失败（R-01）；`npm run format:check` 有 11 个文件不达标（R-08）；`node_modules` 与 `package-lock.json` 已就绪且与 `package.json` 一致（`next 14.2.35`）。
- 外部依赖 / 专项评估（**已评估，不列入待办**）：Lighthouse CI 与 `@lhci/cli`、E2E Playwright、Sentry / GA4 / Web Vitals / Uptime 监控、Codecov、Google OAuth、Supabase 生产密钥、Next 16 + React 19 大版本迁移均需外部服务或独立专项排期；其现状与决策统一记录于本文件「后续专项评估」章节，不占用本轮待办口径，也不宣称已实施。

## 后续专项评估（已评估 · 2026-11-11 13:55:32）

| 事项                                                    | 结论                                                                                                                          | 依据                               |
| :------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| Lighthouse CI（T-17 后续）                              | 保持 CI lint/typecheck/test/build 作为回归门禁；Lighthouse 需 Chrome runner 与基准服务端，另立专项                            | `ci.yml:82-85`、`CHANGELOG.md:72`  |
| E2E（Playwright）                                       | 当前 30 个 Vitest 用例覆盖核心逻辑，E2E 需浏览器矩阵与稳定环境，另立专项                                                      | `development/testing.md:456`       |
| 观测性（Sentry / GA4 / Web Vitals / 健康检查 / Uptime） | 文档为规划示例，需外部账号与密钥，不实施                                                                                      | `development/ci-cd.md:96-642`      |
| Next 16 + React 19 升级                                 | 当前 14.2.35 已对齐 lock 与 eslint-config-next；大版本迁移涉及 App Router / React 19 / `next lint` 变更，需独立回归，另立专项 | `package.json`、`.nvmrc`、`ci.yml` |
| T-18 长列表虚拟化                                       | 评估否决：仅 6 分类、组件量小，无需虚拟化                                                                                     | `tasks-done.md`                    |

## 维护轮次记录

- **2026-11-11 13:55:32（v4.4.9）任务治理轮次**：归档 v4.4.8 / v4.4.9 两轮已交付工作至 `tasks-done.md`（M-01 ~ M-12）；重排剩余任务优先级与状态（R-01 ~ R-10），记录本轮更新戳与门禁基线。
- 历史轮次明细已归档，不在本文件重复维护；最新进度以「进行中 / 待办任务」表与 `tasks-done.md` 进度统计为准。
