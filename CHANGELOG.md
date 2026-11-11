# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.4.10] - 2026-11-11

### 修复 / 工程化 / 任务治理

- 任务体系重整：v4.4.8 / v4.4.9 两轮已交付工作（M-01 ~ M-12）归档至 `docs/tasks-done.md`；`docs/tasks.md` 作为唯一任务源重排 R-01 ~ R-10 优先级与状态并记录更新时间戳，本轮 10 项全部交付后再次同步进度。
- 修复 onboarding / delight 组件迁移后的残留相对导入，恢复 `npm run typecheck` 与 `npm run build`。
- 修复 Vitest 扫描 `.tmp/` 临时依赖副本造成的测试门禁假红；明确覆盖率分层统计口径（自研业务逻辑层，排除 UI 适配与 SDK 薄封装），补齐配置版本历史、新手引导、环境变量占位等回归测试，`npm run test:coverage` 恢复达标。
- 收口 docs 内散落的待办/进度表、文档版本/地址/技术栈/语言列表、Firebase 遗留与死链；安全响应头去重并收紧 CSP 图片域；清理 0 引用模块与重复错误页实现。
- 环境变量示例与忽略规则对齐、占位交互收口、首屏非关键区块动态导入；`typecheck` / `lint` / `format:check` / `test:coverage` / `build` 全绿。

## [4.4.9] - 2026-11-10

### 修复 / 安全 / 规范

- 补齐认证入口（登录/注册/登出弹窗与三语词条），修复 RLS 下未登录无法同步的链路断裂。
- 云端同步改为按 `updatedAt` 合并，登出不再清空本地配置；保存增加 in-flight 锁与失败态提示。
- 分享链接补齐消费端（含编码、zod 校验、其它 query/hash 保留、组件类型映射）与独立 hook。
- 修复保存校验误拒小数价格/相对路径图片、环境变量占位符误判、SQL 迁移不可重复执行与重量字段精度丢失。
- 推荐配置总价/重量统一由组件明细派生；边界格式化与 NaN/脏数据兜底加固。
- 安全头去重并补充 `frame-ancestors`；页脚统一展示 `V{version}· build {yymmddhhmm}`，页眉不再显示版本。
- 拆分 `src/app/globals.css` 与 `prototype/prototype.html` 超长源码为 ≤200 行模块；补齐语义化 id。
- 覆盖率统计口径显式化、恢复 Git 预提交钩子、清理无效脚本与过期文档/项目记忆。
- 修复生产构建阻断：`@base-ui/react` 由存在内部导出不一致的 1.6.0 升级至 1.9.0；`postcss.config.mjs` 改为 Next.js 官方插件声明并按样式产物形态只保留 autoprefixer；`tailwind.config.mjs` 改用静态插件导入。
- 样式拆分脚本补齐 `@layer`/`@media` 大块处理与大括号平衡校验，从未拆分的原始样式重新生成自闭合分片，构建期 CSS 解析不再报错。

## [4.4.8] - 2026-11-10

### 修复 / 安全 / 规范

- 修复云端保存异常被吞并恒定提示“保存成功”的静默数据丢失问题：`supabase-service.ts` 保存/删除分支改为向上抛错，由 `config-service.ts` 按错误码提示；`update` 增加受影响行数校验，RLS 拦截（0 行影响）视为失败而非成功。
- 修复分享功能不可用：生成端对 base64 做 `encodeURIComponent`，首页新增 `?config=` 参数消费端并校验载入（此前分享链接无任何消费方，且特殊字符会破坏参数）。
- 修复推荐配置（MTB / Fold）总价硬编码与组件明细求和不符的口径漂移，改为运行时按组件价格求和派生。
- 修复 `Navbar` 语言切换后导航文案不刷新的问题（`navItems` 的 `useMemo` 依赖补齐 `language`）。
- 修复 Supabase 配置校验仅检查 URL 不检查 anon key 的问题，避免 `createClient` 抛错被吞导致云端链路静默降级。
- 修复 SQL 迁移不可顺序执行：`harden_rls_select_policy` 的 `DROP` 目标名称更正为实际策略名，保证全新库部署幂等。
- 加强 `config-history` 快照读取校验，过滤被篡改或旧版本损坏的数据，避免污染 store。
- 保存期间设置 `isSaving` 状态并禁用保存按钮，防止连点/快捷键造成并发写入与重复记录。
- 同步文档与版本：仓库地址更正为 `Tanox/VeloForm`、语言列表更新为 EN/ZH-CN/JA、Next.js 版本更正为 14.2.35；`APP_INFO.version` 与 `package.json` 对齐至 4.4.8。
- 为导航栏、页脚、车型选择器、推荐配置区、分享弹窗等核心组件补充语义化 `id`，便于调试与端到端测试定位。

## [4.4.7] - 2026-10-14

### 文档 / 重构

- 将 `openspec/` 目录全部规范文档（22 个文件，含 SPEC、规范索引、架构/API/开发/部署/安全/性能/设计各子目录）合入 `docs/`，保留原有子目录结构，原 `openspec/` 目录已移除
- 更新所有交叉引用：根 `README.md` / `README_EN.md`、`prototype/README.md`、`docs/tasks.md` / `docs/tasks-done.md` 及文档内部链接统一指向 `docs/`
- 同步更新相关文档头注释路径与版本号至 v4.4.7

## [4.4.6] - 2026-10-14

### 修复 / 安全

- 修复新建配置无法写入 Supabase 的数据丢失 bug：`buildConfigurationFromStore` 对未保存配置改用 `local_` 前缀，与 `supabase-service.isLocalDraft()` 的草稿判定契约一致（原 `config_` 前缀被误判为已存在，导致 insert 永不触发，且错误提示「已保存到云端」）。
- 升级 `next` 14.1.0 → 14.2.35，修复 Next.js 多项 critical 安全公告（SSRF / 授权绕过 / 缓存投毒）。
- `auth.ts` 登录/注册增加邮箱格式与密码最小长度（6 位）的客户端校验，作为服务端校验之外的纵深防御。
- 清理 PWA 残留：`middleware.ts` 移除已无用的 `worker-src 'self' blob:`（next-pwa 已于 v4.4.2 移除）；`openspec/SPEC.md` 同步更新 PWA 描述与版本标签。
- 按全局拆分规则将 `ComponentSelector.tsx`（209 行）与 `SummaryPanel.tsx`（271 行）拆分为更小模块，保持导出契约不变。

## [4.4.5] - 2026-10-14

### 功能 / i18n

- 完成 OpenSpec 派生任务 T-16：新增日语（ja）语言包
  - 新增 `src/lib/i18n/locales/ja/`（22 个 locale 文件）与聚合文件 `src/lib/i18n/ja.ts`，均通过 `satisfies Translations` 编译期键对齐校验
  - 在 `src/lib/i18n/index.ts` 注册 `ja`，支持浏览器语言自动识别与 `<html lang>` 同步
  - 导航栏语言切换扩展为 en / zh-CN / ja 三语循环，`LanguageToggle` 全量变体显示「日本語」
  - `whimsy-copy.ts` 补充日语文案字典，趣味文案随语言切换
  - `i18n.test.ts` 新增 ja 语言运行时校验用例
- 修正 `src/lib/constants/app.ts` 的 `APP_INFO.version` 展示版本漂移（4.4.1 → 4.4.5）

## [4.4.4] - 2026-10-14

### CI / 配置

- 新增 `.github/workflows/ci.yml`：push/PR 至 main、dev 时运行 `lint` / `test` / `build` 回归门禁
- 推进 OpenSpec 派生任务 T-17（性能监控基准）：以 CI 构建期校验作为性能回归门禁，Lighthouse 基准待配置服务端后接入
- 评估 T-18（长列表虚拟化）：当前配置器仅 6 个分类、组件量小，无需虚拟化，预留接口即可

## [4.4.3] - 2026-10-14

### 新增（派生自 OpenSpec design-review P0–P3）

- 配置完成度指示器：`SummaryPanel` 新增进度条，按已自定义分类数反映配置进度
- 全局键盘快捷键：`S` 保存 / `R` 重置 / `1·2·3` 切换车型（`src/lib/hooks/useKeyboardShortcuts.ts`，输入框内不触发）
- 移动端固定摘要条：`SummaryPanel` 在移动端常驻显示实时价格与重量
- Toast 增强：`sonner.tsx` 启用关闭按钮与 `richColors`
- 手势切换车型：`BikeTypeSelector` 支持横向滑动（onPanEnd）切换车型
- 智能推荐：`ComponentSelector` 推荐互补分类并一键跳转选择
- 客户端配置版本历史：`src/lib/config-history.ts` + `VersionHistory` 弹窗，localStorage 快照（上限 10，支持保存/恢复/删除）

### 文档

- 同步 OpenSpec 安全/性能规范与当前技术栈（Supabase / Next.js / React），标注 Firebase/Angular 内容为历史参考
- 新增任务文档 `docs/tasks.md`（进行中）与 `docs/tasks-done.md`（已完成归档）

## [4.4.2] - 2026-08-12

### 修复

- 修复构建阻塞：`src/app/manifest.ts` 缺失，导致 `layout.tsx` 引用的 `/manifest.json` 与 `middleware.ts` CSP 指令 `manifest-src 'self'` 无对应资源，`next build` 失败。新增 Web App Manifest（名称/图标/显示模式）
- 修复 `supabase-service.ts` 保存逻辑误判：原判断 `config.id !== `local_${Date.now()}` `` 因 `Date.now()` 每次调用都变化，新建配置（`config_`前缀）永远无法命中 update 分支，重复保存会插入重复行。改为基于`isLocalDraft()` 前缀判断（`local_` 或空 id 视为草稿走 insert，否则走 update）
- 同步文档版本滞后：`openspec/SPEC.md` 设计哲学版本（v4.2.1→v4.4.2）与末尾更新时间、`README.md` 的 Vitest 版本（v1.6.1→v3.2.0）

### 文档与版本

- 同步项目版本至 **v4.4.2**（package.json、README.md、README_EN.md、openspec/SPEC.md）
- 修正 `vitest.config.ts` 测试池：恢复 `forks` 池（原 threads 池在 Windows + vitest 3 下无法启动，与 v4.2.2 记录一致），并同步 SPEC 版本历史表新增 v4.4.1/v4.4.2 行

## [4.4.1] - 2026-08-09

### 修复

- 修复构建阻塞：`package.json` 与 `globals.css`/`middleware.ts`/`src/lib/constants/app.ts`/`src/lib/storage.ts` 含 UTF-8 BOM，导致 `next build` 的 webpack JSON 解析失败（`SyntaxError: Unexpected token`），移除全部 BOM 头
- 修复构建对外部网络的强依赖：`layout.tsx` 改用 `next/font/google` 在构建时拉取 Fraunces / Hanken Grotesk，离线/CI 环境因无法访问 fonts.gstatic.com 而构建失败。改为由 `globals.css` 的 `--font-display`/`--font-sans` 系统字体栈（SF Pro 等）提供，对齐设计系统规范「无需网络加载，原生支持」要求，构建不再依赖外部字体下载

### 性能

- 优化 `shareable-config.ts` 的 `encodeBase64Utf8`：逐字节字符串拼接改为分块 `String.fromCharCode(...chunk)` 拼接，降低大配置编码开销与栈溢出风险

### 安全

- 为 `BikeTypeSelector`/`BuildListItem` 中渲染静态 SVG 的 `dangerouslySetInnerHTML` 补充信任来源注释（图标均为编译期常量，非用户输入，无 XSS 风险）

### 文档与版本

- 同步项目版本至 **v4.4.1**（package.json、app.ts 运行时常量、middleware/storage/globals.css 文件头、`README.md`、`README_EN.md`、`openspec/SPEC.md`、`openspec/README.md`）
- 修正 `README_EN.md` 版本号滞后（原误标 v4.2.1）

## [4.4.0] - 2026-08-02

### 改进

- 安全加固：`config-service.saveConfiguration` 写入前用 zod `ShareableConfigSchema` 校验数据结构（`bikeType/name/components`），防止被污染状态直接入库
- 安全加固：`middleware.ts` 移除 CSP 中的 `'unsafe-eval'`（framer-motion 10 生产构建为预编译产物，运行时无需 eval），缩小 XSS 危害面
- 测试补齐：
  - 新增 `src/lib/storage.test.ts`：覆盖 SSR 无 window 降级、隐私模式 localStorage 抛错降级、real localStorage、JSON 序列化往返
  - 新增 `src/lib/supabase-service.test.ts`：覆盖保存（insert/update 分支）、客户端不可用降级、加载映射、错误回退空数组、删除按 owner 隔离
- 一致性修复：`Hero` 与 `Features` 动画时长常量统一引用 `lib/animation.ts` 的 `ANIMATION_DURATION`/`ANIMATION_DELAY_STEP`（修复 Hero 硬编码 0.4 与全局 0.3 不一致导致的视觉节奏错位）
- 清理死代码：删除无消费方的 `src/components/ui/tabs.tsx` 并从 `ui/index.ts` 移除导出

### 验证

- `tsc --noEmit` 零错误、`next lint` 零错误（新增测试已通过类型检查）
- 注：本地测试运行环境因残留 vitest 进程占用资源未能完整执行，建议在干净终端运行 `pnpm test` 复核

## [4.3.1] - 2026-08-02

### 修复

- 修复 `CompareTable` 中 `<th scope="row">` 与 `</td>` 标签不匹配导致的 JSX 解析错误（v4.3.0 引入的回归）
- 删除悬空的旧 `src/lib/store.ts` 兼容层单文件（依赖已迁移删除，且无任何引用），消除 tsc 模块解析错误与双 store 遗留
- 修复首页与 library 页 `<main>` 无底部预留空间导致 fixed `ComparePanel` 在移动端遮挡 Footer/CTA 内容，加 `pb-32/40`
- 为 `ComparePanel` 面板加 `max-h-[70vh] overflow-y-auto`，防止对比项多时遮满整屏
- 修复 `Hero` 浮动"配置完成度"卡片在移动端（单列）溢出视口（`-right-6` → `right-2 sm:-right-6` + 最大宽度约束）
- 修复 `ShareModal` 在矮屏无滚动保护，加 `max-h-[90vh] overflow-y-auto`
- 修复 `ComponentDetailImage` 错误/加载态硬编码深色 `bg-zinc-800`，改用主题变量 `bg-muted text-muted-foreground`（浅色主题对比度问题）
- 修复 `BikeTypeSelector` 在 640px 起即三列导致平板竖屏挤压，改为 `md:grid-cols-3`
- 修复 `SummaryPanel` sticky 缺少 z-index 可能与 Navbar 视觉重叠，加 `z-30` 并微调 `top-20`
- 修复 `ComponentSelectorItem` 价格块在极窄屏被长组件名挤压，加 `shrink-0`
- 新增 `SectionSkeleton` 组件，替换首页 Recommended/Pricing/CTA 的空白 `Suspense` fallback，消除白屏突兀感

### 验证

- `tsc --noEmit` 与 `next lint` 零错误，测试套件 93 项全部通过

## [4.3.0] - 2026-08-01

### 改进

- 删除废弃的旧 `src/lib/store/` 兼容层目录，业务代码统一使用 `@/lib/stores`，消除冗余代码
- 修复 `config-ui-store` 空 `partialize` 导致的瞬时 UI 状态持久化问题（刷新后可能卡在 loading 态），改为不持久化瞬时状态
- 修复 `BuildList` 未清理的 `setTimeout` 定时器，避免组件卸载后 `setState` 警告
- 为对比表 `CompareTable` 的 `<th>` 补充 `scope` 属性，提升表格可访问性
- 为 `ComponentSelectorItem` 补充 `onKeyDown`（Enter/Space 选中），修复键盘无法选择组件的无障碍缺陷
- 完善 i18n：为 `ComponentDetailModal`、`CompareTable`、`ComparePanelHeader` 的硬编码中文文案接入翻译 key（技术规格/核心特性/价格/重量/选择此组件/总成本/预估重量/持平/配置对比等）
- 为所有主要容器与对话框补充语义化 `id`，便于调试（app-root、section-bike-type、section-configurator、build-list、summary-panel、compare-panel、component-detail-modal、component-selector-dialog 等）
- 补齐核心模块测试：`config-service`（保存/删除/导出/分享链接，含中文组件名 UTF-8 安全验证）、`SyncProvider`（订阅生命周期与认证变化）、`BuildList`/`SummaryPanel` 有效断言；废弃 `store.test.ts` 迁移为 `config-store.test.ts`
- 统一项目版本号至 **v4.3.0**

### 质量复查

- `tsc --noEmit` 与 `next lint` 零错误
- 测试套件全部通过

## [4.2.2] - 2026-07-30

### Fixed

- 修复测试运行器挂起：vitest 默认 threads 池在 Node 26 下无法启动，改为 forks 池
- 修复 `test`/`test:coverage` 脚本在非交互环境挂起：改为 `vitest run` / `vitest run --coverage`
- 修复 zustand persist 在测试/SSR 环境崩溃：新增安全存储 `src/lib/storage.ts`，localStorage 不可用时退化为内存存储，注入全部 persist 中间件
- 修复测试环境 localStorage 缺失：在 `vitest.setup.ts` 注入内存版 localStorage 垫片
- 统一项目版本号至 **v4.2.2**（store/*.ts、constants/app.ts、globals.css、middleware.ts、package.json、README）

### 质量复查

- 复跑测试套件：84 项测试全部通过（此前因环境挂起未能执行）
- `tsc --noEmit` 与 `next lint` 零错误

## [4.2.1] - 2026-07-28

### 文档与版本

- 统一项目版本号至 **v4.2.1**（package.json、README、openspec/_、prototype/_ 当前版本头与更新日期）
- 同步更新各规范文档的版本 / 更新日期标记至 2026-07-28

### 质量复查（基于 v4.2.0）

- 复核并确认 v4.2.0 全部修复仍然有效：i18n 运行时切换、btoa Unicode 安全、服务层归属校验、RLS 收敛、>200 行文件拆分、84 项测试通过
- 修复 Whimsy / Delight 新特性的 Konami 彩蛋失效 bug（按键序列大小写不匹配）
- 修复上一轮新增回归测试导致的 tsc --noEmit 编译错误（补充 vitest 全局导入）
- 为加载页动画补齐 prefers-reduced-motion 守卫，落实无障碍规范

## [4.2.0] - 2026-07-18

### Fixed

- Fixed compile error blocking production builds
- Fixed i18n runtime language switching bug
- Fixed `btoa` Unicode crash on non-ASCII share payloads

### Security

- Added service-layer ownership checks to guard user-scoped resources
- Scoped RLS SELECT policies to the resource owner

### Performance

- Memoized configurator components to reduce re-render overhead

### Changed

- Modularized all source files exceeding 200 lines
- Persisted and added fallback for i18n locale selection
- Unified project version references to v4.2.0
- Synced README and CHANGELOG documentation

---

## [4.1.0] - 2026-07-10

### Added

- Added error, notFound, and loading translation keys for complete i18n coverage
- Added Home icon to ErrorBoundary back-to-home button for better UX
- Added structured logger for error pages (replaced console.error with uiLogger)

### Fixed

- Fixed TypeScript type errors in test files (BikeType values, ConfigComponent properties, Date types)
- Fixed formatCurrency test expectations to match actual CNY currency formatting behavior
- Fixed tsconfig.json type conflicts with vitest (excluded vitest.config.ts, included vitest.setup.ts)
- Fixed jest-dom matchers not found issue in test environment
- Fixed hardcoded Chinese text in ErrorBoundary component (now uses i18n)
- Fixed hardcoded Chinese text in 404 Not Found page (now uses i18n)
- Fixed hardcoded Chinese text in LoadingScreen component (now uses i18n)
- Fixed hardcoded Chinese text in home page error boundary (now uses i18n)
- Fixed hardcoded Chinese text in library page error boundary (now uses i18n)
- Fixed console.error usage in error pages (now uses structured uiLogger)
- Fixed ErrorBoundary test failures by setting i18n language before each test
- Fixed LoadingScreen test failures by setting i18n language before each test

### Security

- Conducted security audit - confirmed CSP headers, X-Frame-Options, HSTS, and other security headers are properly configured
- Confirmed no XSS vulnerabilities (no dangerouslySetInnerHTML, innerHTML, or eval usage)
- Verified zod input validation is in place for shareable configurations
- Confirmed structured logging system prevents sensitive data leakage

---

## [4.0.0]

### Added

- Added complete i18n system with EN/ZH-CN translations for all pages and components
- Added new FAQ page (`/faq`) with shadcn/ui Accordion component
- Added new About page (`/about`) with brand introduction and statistics
- Added language switch button in Navbar with Globe icon
- Added `useReducedMotion` hook support for accessibility
- Added global animation constants (`ANIMATION_DURATION = 0.3s`) in `lib/animation.ts`
- Added smooth scroll navigation between sections
- Added `sections/` directory with Hero, Features, Pricing, and Cta components
- Added `Footer` component with i18n translations
- Added design system specification documents (v4.0.0)

### Changed

- Upgraded project version to v4.0.0
- Refactored all hardcoded Chinese text to use `useTranslation()` hook
- Unified animation duration to 300ms across all components
- Updated Navbar with language switcher and smooth scroll navigation
- Updated Hero section with i18n and proper animation timing
- Updated Features section with 6 feature cards using i18n
- Updated Pricing section with 3 pricing plans using i18n
- Updated Cta section with i18n translations
- Updated Footer with i18n for all categories and links
- Updated i18n type definitions to support array translations
- Updated Translations interface with hero, features, pricing, cta, footer modules
- Updated design system to minimalist philosophy (neutral colors, unified rounded corners, restrained shadows)

### Fixed

- Fixed animation duration exceeding design specification (>300ms)
- Fixed i18n array type compatibility issues
- Fixed README_EN.md still referencing Firebase (migrated to Supabase)

---

## Previous Changes

### 设计系统规范（v4.0.0）

#### 1. 设计系统规范（v4.0.0）

- ✅ 创建 `/prototype/design-system-spec.md` (v4.0.0)
  - 极简色彩策略：中性灰底 + 单一品牌色
  - 统一圆角系统：12px/16px/20px/24px
  - 克制阴影系统：移除 `shadow-glow`
  - 动画时长 ≤300ms

- ✅ 创建 `/prototype/component-library.md` (v4.0.0)
  - 按钮 variant 命名：`default` → `primary`，`destructive` → `danger`
  - 统一组件规格（尺寸、圆角、阴影）
  - 限制 gradient variant 使用（仅 Hero CTA）

- ✅ 创建 `/prototype/interaction-standards.md` (v4.0.0)
  - 自然交互原则：即时反馈、克制动效
  - 完整的状态规范（Hover/Active/Focus/Loading）
  - 错误处理、空状态设计
  - 无障碍规范（WCAG 2.1 AA）

#### 2. 代码对齐

- ✅ 更新 `src/app/globals.css`
  - CSS 变量符合 v4.0.0 规范
  - 移除 `--shadow-glow`
  - 更新动画时长（≤300ms）
  - 添加间距系统（4px 网格）

- ✅ 更新 `src/components/ui/button.tsx`
  - 添加 `primary` variant（别名 `default`）
  - 添加 `danger` variant（别名 `destructive`）
  - 移除 `shadow-glow` 引用

#### 3. 项目结构优化

- ✅ 创建 `/prototype/README.md` (v4.0.0)
  - 清晰的目录结构说明
  - 设计哲学和快速开始指南

### 技术细节

#### 设计系统

- **色彩**：中性灰底（#FAFAFA）+ 品牌蓝（#0071E3）
- **圆角**：统一使用 12px（button）、16px（card）、20px（modal）、24px（hero）
- **阴影**：克制微妙，`--shadow-sm` 到 `--shadow-lg`
- **动画**：150-300ms，cubic-bezier 缓动

#### 组件更新

- **Button**：支持 `primary` 和 `danger` variant
- **所有组件**：符合新的设计 token

### 构建状态

✅ 构建成功，无错误

```
Route (app)                              Size     First Load JS
┌ ○ /                                    26.1 kB         271 kB
├ ○ /_not-found                          0 B                0 B
└ ○ /library                             3.32 kB         255 kB
```

### 下一步

1. **继续代码对齐**：更新其他组件以符合 v4.0.0 规范
2. **执行审查**：运行 security-best-practices 和 react-best-practices 审查
3. **文档同步**：确保 OpenSpec 规范与原型对齐
4. **Dogfood 测试**：全面测试所有页面功能

---

**版本**: v4.0.0  
**日期**: 2026-07-05  
**状态**: 设计系统升级完成，代码对齐进行中
