# Veloform 已完成任务归档

> **派生来源**：`docs/design/design-review.md`（P0–P3 优化建议）+ OpenSpec 规范对齐 + 2026-11-08 全面代码审查 + 2026-11-11 门禁基线
> **归档时间**：2026-11-11 14:34:00
> **本次更新时间戳**：2026-11-11T14:34:00+08:00
> **建档时间戳**：2026-11-11T13:55:32+08:00
> **当前版本**：v4.4.10
> **对应任务清单**：[`tasks.md`](./tasks.md)

## 已完成任务

### 本轮完成（v4.4.10 · 完成并归档于 2026-11-11 14:34:00）

> 来源：`tasks.md` 的 R-01 ~ R-10 剩余任务清单（2026-11-11 13:55:32 建档），全部交付后移入本归档。

| ID   | 任务                                                                | 优先级 | 完成版本 | 完成时间   | 交付物                                                                                                    |
| :--- | :------------------------------------------------------------------ | :----- | :------- | :--------- | :-------------------------------------------------------------------------------------------------------- |
| R-01 | 修复 onboarding / delight 组件迁移残留引用，恢复 typecheck 与 build | P0     | v4.4.10  | 2026-11-11 | `OnboardingGuide.tsx`、`OnboardingStepContent.tsx` 改用 `@/components/ui/*`                               |
| R-02 | 任务源治理：docs 内散落待办 / 进度表标注历史快照                    | P1     | v4.4.10  | 2026-11-11 | `docs/design/design-review.md`、`docs/architecture/MIGRATION.md`、`docs/tasks.md`                         |
| R-03 | 文档一致性：版本 / 地址 / 技术栈 / 语言列表 / 死链 / Firebase 残留  | P1     | v4.4.10  | 2026-11-11 | `README.md`、`README_EN.md`、`docs/SPEC.md`、`docs/README.md`、`prototype/`                               |
| R-04 | 环境配置与忽略规则对齐                                              | P1     | v4.4.10  | 2026-11-11 | `.env.example`、`src/lib/env.ts`、`.gitignore`                                                            |
| R-05 | 安全响应头双轨去重与 CSP 图片域收紧                                 | P1     | v4.4.10  | 2026-11-11 | `src/middleware.ts`、`vercel.json`                                                                        |
| R-06 | 死代码清理与重复实现收口                                            | P1     | v4.4.10  | 2026-11-11 | 移除大写版 `ErrorBoundary` / `ui/index.ts` / `lib/lazy.tsx` / `useToastStore`，合并为 `ErrorPageView.tsx` |
| R-07 | 占位交互收口（Live Chat / 导航 / 缩略图）                           | P2     | v4.4.10  | 2026-11-11 | `SupportModal.tsx`、`app/page.tsx` 导航、`app/library/page.tsx` 缩略图                                    |
| R-08 | 测试与门禁补齐                                                      | P1     | v4.4.10  | 2026-11-11 | `vitest.config.ts`（排除 `.tmp/**` + 分层覆盖率口径）、6 个新增测试文件、`.eslintrc.json`                 |
| R-09 | 首屏低风险代码分割                                                  | P1     | v4.4.10  | 2026-11-11 | `src/app/page.tsx` 以 `next/dynamic` 拆分非首屏区块                                                       |
| R-10 | 版本与变更记录同步                                                  | P2     | v4.4.10  | 2026-11-11 | `package.json` / lock / `APP_INFO` / `CHANGELOG.md` / README 双版 / SPEC / prototype / tasks 文档         |

### 本轮归档（v4.4.8–v4.4.9 · 完成于 2026-11-10 · 归档于 2026-11-11 13:55:32）

> 来源：`tasks.md` 的「维护轮次记录」（v4.4.8 / v4.4.9 两轮已完成工作），按主题归并后移入本归档。

| ID   | 任务                                                                                                 | 优先级 | 完成版本 | 完成时间   | 交付物                                                                                               |
| :--- | :--------------------------------------------------------------------------------------------------- | :----- | :------- | :--------- | :--------------------------------------------------------------------------------------------------- |
| M-01 | 云端保存静默数据丢失修复（异常上抛、错误码提示、update 0 行判定失败）                                | P0     | v4.4.8   | 2026-11-10 | `src/lib/supabase-service.ts`、`src/lib/config-service.ts`                                           |
| M-02 | 分享链路生成端修复（`encodeURIComponent` + 首页 `?config=` 消费端）                                  | P0     | v4.4.8   | 2026-11-10 | `src/lib/shareable-config.ts`、`src/app/page.tsx`                                                    |
| M-03 | 数据口径与 i18n 修复（推荐配置总价派生、Navbar 语言切换刷新）                                        | P1     | v4.4.8   | 2026-11-10 | `src/lib/recommended-configs.ts`、`src/components/layout/Navbar.tsx`                                 |
| M-04 | 部署与安全配置修复（Supabase anon key 校验、SQL 加固迁移幂等）                                       | P0     | v4.4.8   | 2026-11-10 | `src/lib/supabase.ts`、`supabase/migrations/20260718000000_harden_rls_select_policy.sql`             |
| M-05 | 鲁棒性加固（config-history 快照校验、保存 in-flight 锁与按钮禁用）                                   | P1     | v4.4.8   | 2026-11-10 | `src/lib/config-history.ts`、`src/lib/config-service.ts`                                             |
| M-06 | 文档/版本/可访问性同步（仓库地址、三语、Next 14.2.35、`APP_INFO.version`、锁文件重建、语义化 id）    | P2     | v4.4.8   | 2026-11-10 | `README.md`、`README_EN.md`、`docs/SPEC.md`、`package-lock.json`、核心组件                           |
| M-07 | 认证入口与云端同步（AuthModal + 三语词条、按 `updatedAt` 合并、登出不清空、失败态与本地降级）        | P0     | v4.4.9   | 2026-11-10 | `src/components/auth/`、`src/components/layout/SyncProvider.tsx`                                     |
| M-08 | 分享链路闭环（编码、独立 hook、zod 校验、query/hash 保留、popstate 重放）                            | P0     | v4.4.9   | 2026-11-10 | `src/lib/hooks/use-shared-config.ts` 及相关测试                                                      |
| M-09 | SQL/环境/推荐配置精度修复（迁移可重复执行、numeric(10,2)、占位符误判、小数与相对路径校验、重量派生） | P0     | v4.4.9   | 2026-11-10 | `supabase/migrations/20261110000000_numeric_precision_and_constraints.sql`、`src/lib/env.ts`         |
| M-10 | 安全头与版本展示（去重 + `frame-ancestors`、页脚唯一 `V{version}· build {yymmddhhmm}`）              | P1     | v4.4.9   | 2026-11-10 | `src/middleware.ts`、`next.config.mjs`、`src/lib/version.ts`、`Footer.tsx`                           |
| M-11 | 超长源码拆分与语义化 id（`globals.css` 33 分片、`prototype.html` 拆分、应用/原型容器 id）            | P1     | v4.4.9   | 2026-11-10 | `src/app/globals.css`、`scripts/split-styles.mjs`、`scripts/split-prototype.mjs`、`prototype/`       |
| M-12 | 门禁与工程化（覆盖率统计口径、Git 预提交钩子恢复、无效脚本清理、生产构建阻断修复、全量门禁通过）     | P1     | v4.4.9   | 2026-11-10 | `vitest.config.ts`、`.husky/pre-commit`、`postcss.config.mjs`、`tailwind.config.mjs`、`package.json` |

### 历史完成（v4.4.3–v4.4.5 · 2026-10-14）

| ID   | 任务                                               | 优先级 | 完成版本       | 完成时间   | 交付物                                                                                                                   |
| :--- | :------------------------------------------------- | :----- | :------------- | :--------- | :----------------------------------------------------------------------------------------------------------------------- |
| T-07 | 配置完成度指示器（汇总面板进度条）                 | P1     | v4.4.3         | 2026-10-14 | `SummaryPanel` 新增进度条，按已自定义分类数计算完成度                                                                    |
| T-08 | 全局键盘快捷键（S 保存 / R 重置 / 1·2·3 切换车型） | P0     | v4.4.3         | 2026-10-14 | `src/lib/hooks/useKeyboardShortcuts.ts` + 首页挂载，输入框内不触发                                                       |
| T-09 | 移动端固定摘要条                                   | P3     | v4.4.3         | 2026-10-14 | `SummaryPanel` 移动端常驻显示实时价格/重量                                                                               |
| T-10 | Toast 增强（关闭按钮 + 剩余时间进度）              | P1     | v4.4.3         | 2026-10-14 | `sonner.tsx` 启用 `closeButton` / `richColors`                                                                           |
| T-11 | 手势横向滑动切换车型                               | P2     | v4.4.3         | 2026-10-14 | `BikeTypeSelector` 接入 `onPanEnd` 滑动手势                                                                              |
| T-12 | 智能推荐（搭配建议）                               | P2     | v4.4.3         | 2026-10-14 | `ComponentSelector` 推荐互补分类并一键跳转选择                                                                           |
| T-13 | OpenSpec 文档技术栈对齐                            | meta   | v4.4.3         | 2026-10-14 | `security/security-guidelines.md`、`performance/optimization.md` 标注 Firebase/Angular 为历史内容，对齐 Supabase/Next.js |
| T-14 | 客户端配置版本历史                                 | P2     | v4.4.3         | 2026-10-14 | `src/lib/config-history.ts` + `VersionHistory` 弹窗，localStorage 快照（上限 10）                                        |
| T-15 | 配置对比视图                                       | P3     | 既有           | —          | 既有 `ComparePanel` / `CompareTable` 已满足并排对比                                                                      |
| T-17 | 性能监控基准（CI 回归门禁）                        | P3     | v4.4.4         | 2026-10-14 | 新增 `.github/workflows/ci.yml`（lint/test/build），Lighthouse 基准：评估结论见 tasks.md「后续专项评估」                 |
| T-18 | 长组件列表虚拟化                                   | P3     | v4.4.4（评估） | 2026-10-14 | 评估结论：当前仅 6 分类、组件量小，无需虚拟化，评估否决（结论见 tasks.md）                                               |
| T-16 | i18n 扩展新语言（日语 ja）                         | P3     | v4.4.5         | 2026-10-14 | 新增 `locales/ja/`（22 文件）+ `ja.ts` + `index.ts` 注册 + 三语切换 UI + whimsy 日语文案，i18n 扩展至三语                |

### 历史已完成（早于 v4.4.3）

| ID   | 任务                                  | 优先级 | 完成版本      | 完成时间                |
| :--- | :------------------------------------ | :----- | :------------ | :---------------------- |
| T-01 | 骨架屏加载状态                        | P1     | v4.3.1        | 2026-08-02              |
| T-02 | 键盘导航与焦点管理                    | P0     | v4.3.0        | 2026-08-01              |
| T-03 | 关键 ARIA 标签补全                    | P0     | v4.3.0        | 2026-08-01              |
| T-04 | 配置完成度浮动卡片（Hero）            | P1     | v4.3.1        | 2026-08-02              |
| T-05 | 安全加固（CSP / Zod 校验 / RLS 收敛） | P0     | v4.4.0–v4.4.2 | 2026-08-02 ~ 2026-08-12 |
| T-06 | i18n 双语（EN/ZH-CN）全覆盖           | P3     | v4.1.0        | 2026-07-10              |

## 进度统计

- 已完成归档：40 项（T-01 ~ T-18 共 18 项 + M-01 ~ M-12 共 12 项 + R-01 ~ R-10 共 10 项）
- 进行中 / 待办：0 项（`tasks.md` 已于 2026-11-11 14:34:00 最终复核并收口，状态快照显示全部完成）
- 完成率：100%；后续专项（V-01 ~ V-03）已评估，不计入待办
