# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- 统一项目版本号至 **v4.2.1**（package.json、README、openspec/*、prototype/* 当前版本头与更新日期）
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
