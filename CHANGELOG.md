# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
