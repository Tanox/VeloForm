# 代码审查与全面优化实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 对 Veloform 项目进行全面代码审查和优化，修复类型错误、测试问题、安全漏洞，对齐 openspec 规范和 prototype 原型，拆分大文件，完善国际化，更新文档和版本号。

**Architecture:** 采用分阶段执行策略，从基础修复（类型、测试）开始，逐步深入到架构优化、安全审查、规范对齐和文档更新。每个阶段都有明确的验证标准。

**Tech Stack:** Next.js 14.1.0, React 18, TypeScript 5, Zustand 4.5, Tailwind CSS 3.4, Supabase, Vitest, ESLint

---

## 阶段一：基础修复 - TypeScript 类型与测试问题

### Task 1: 修复测试环境类型配置

**Files:**

- Modify: `src/components/ui/ErrorBoundary.test.tsx`
- Modify: `src/components/ui/LoadingScreen.test.tsx`
- Modify: `src/components/ui/Skeleton.test.tsx`
- Verify: `vitest.setup.ts`

**问题：**

- `beforeAll` / `afterAll` 未找到
- `toBeInTheDocument` / `toHaveClass` 等 jest-dom 断言不存在

- [ ] **Step 1: 检查 vitest.setup.ts 配置**

检查当前 `vitest.setup.ts` 是否正确导入了 `@testing-library/jest-dom`：

```typescript
// vitest.setup.ts
import '@testing-library/jest-dom';
```

如果缺失或不完整，添加正确的导入。

- [ ] **Step 2: 修复 ErrorBoundary.test.tsx**

修复 `beforeAll` / `afterAll` 的导入问题（应该从 vitest 导入）。

添加：

```typescript
import { beforeAll, afterAll, describe, it, expect } from 'vitest';
```

- [ ] **Step 3: 运行类型检查验证**

运行：`npx tsc --noEmit`
预期：测试文件相关的类型错误减少。

---

### Task 2: 修复 store 测试文件的类型错误

**Files:**

- Modify: `src/lib/stores/config-store.test.ts`
- Modify: `src/lib/stores/compare-store.test.ts`

**问题：**

- BikeType 类型不匹配：使用了 "Mountain", "Gravel", "E-Bike"，但实际类型是 'Road' | 'MTB' | 'Fold'
- Date 类型错误：使用了 number 而不是 Date
- ConfigComponent 缺少 bikeType 属性

- [ ] **Step 1: 修复 config-store.test.ts 类型错误**

将所有错误的 bikeType 值更正为有效的 BikeType：

- "Mountain" → "MTB"
- "Gravel" → "Road" （或删除无效测试）
- "E-Bike" → "Fold" （或删除无效测试）

为所有 ConfigComponent 对象添加 `bikeType` 属性。

将 `createdAt` 从 number 改为 `new Date(timestamp)`。

- [ ] **Step 2: 修复 compare-store.test.ts 类型错误**

同样修正 bikeType 和 Date 类型问题。

- [ ] **Step 3: 运行类型检查验证**

运行：`npx tsc --noEmit`
预期：store 测试文件不再有类型错误。

---

### Task 3: 修复 formatCurrency 测试失败

**Files:**

- Modify: `src/lib/utils.test.ts`
- Review: `src/lib/utils.ts`

**问题：**

- 测试期望 `$1,000.00`，实际得到 `¥1,000`
- 环境的 Intl.NumberFormat 使用了中文本地化

- [ ] **Step 1: 检查 formatCurrency 实现**

读取 `src/lib/utils.ts` 中的 `formatCurrency` 函数实现。

- [ ] **Step 2: 修复测试或实现**

方案：在 `formatCurrency` 函数中明确指定 `en-US` 本地化和 `USD` 货币，确保跨环境一致性。

```typescript
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
```

- [ ] **Step 3: 运行测试验证**

运行：`npm run test -- --run src/lib/utils.test.ts`
预期：所有 4 个 formatCurrency 测试通过。

---

## 阶段二：安全漏洞检查与修复

### Task 4: 安全代码审查

**Files:**

- Review: `src/lib/auth.ts`
- Review: `src/lib/supabase-service.ts`
- Review: `src/lib/env.ts`
- Review: `src/middleware.ts`

**检查项：**

- 环境变量验证和安全处理
- 认证令牌安全
- XSS 防护
- 输入验证
- 敏感数据泄露

- [ ] **Step 1: 使用 security-best-practices 技能进行审查**

调用安全审查技能，对项目进行全面安全评估。

- [ ] **Step 2: 修复发现的安全问题**

根据审查结果修复安全漏洞，包括但不限于：

- 确保环境变量在服务端正确验证
- 添加输入验证（使用 zod）
- 确保没有敏感数据记录到日志
- 检查 CSRF 防护

- [ ] **Step 3: 运行测试验证**

运行：`npm run test -- --run`
预期：所有测试仍然通过。

---

## 阶段三：国际化检查与完善

### Task 5: 国际化全覆盖检查

**Files:**

- Review: `src/lib/i18n/en.ts`
- Review: `src/lib/i18n/zh-CN.ts`
- Review: 所有使用硬编码文本的组件

- [ ] **Step 1: 检查两个语言文件的键是否一致**

对比 en.ts 和 zh-CN.ts 的翻译键，确保完全匹配。

- [ ] **Step 2: 扫描组件中的硬编码文本**

使用 grep 搜索常见的硬编码中文/英文文本，确保都使用了 `useTranslation()`。

搜索模式：

- 中文硬编码文本
- 未使用 t() 函数的用户可见文本

- [ ] **Step 3: 补充缺失的翻译**

为所有缺失翻译的文本添加翻译。

- [ ] **Step 4: 验证语言切换功能**

检查 Navbar 中的语言切换按钮是否正常工作。

---

## 阶段四：大文件拆分

### Task 6: 拆分 Navbar.tsx (424 行)

**Files:**

- Modify: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/NavLinks.tsx`
- Create: `src/components/layout/LanguageSwitcher.tsx`
- Create: `src/components/layout/UserMenu.tsx`

**拆分策略：**

- 导航链接部分 → NavLinks.tsx
- 语言切换部分 → LanguageSwitcher.tsx
- 用户菜单/登录按钮 → UserMenu.tsx

- [ ] **Step 1: 提取 LanguageSwitcher 组件**

将语言切换相关的逻辑和 UI 提取为独立组件。

- [ ] **Step 2: 提取 NavLinks 组件**

将导航链接部分提取为独立组件。

- [ ] **Step 3: 提取 UserMenu 组件**

将用户登录/登出菜单提取为独立组件。

- [ ] **Step 4: 重构 Navbar 使用子组件**

Navbar 变为组合这些子组件的容器组件。

- [ ] **Step 5: 验证类型检查和 lint**

运行：`npm run lint` 和 `npx tsc --noEmit`
预期：无错误。

---

### Task 7: 拆分 store.ts (309 行)

**Files:**

- Review: `src/lib/store.ts`
- Review: `src/lib/stores/` 目录

**说明：** 项目已经有 `src/lib/stores/` 目录，包含多个 store 文件。检查 `src/lib/store.ts` 是否为遗留文件，可以删除或重构。

- [ ] **Step 1: 检查 store.ts 的内容和用途**

读取 `src/lib/store.ts` 了解其功能。

- [ ] **Step 2: 检查是否与 stores/ 目录功能重复**

对比 `store.ts` 和 `stores/` 目录下的文件。

- [ ] **Step 3: 重构或删除冗余文件**

如果功能重复，删除冗余的 `store.ts`，更新所有导入引用。

- [ ] **Step 4: 验证类型检查**

运行：`npx tsc --noEmit`
预期：无错误。

---

### Task 8: 拆分 ComponentSelector.tsx (285 行)

**Files:**

- Modify: `src/components/configurator/ComponentSelector.tsx`
- Create: `src/components/configurator/CategoryTabs.tsx`
- Create: `src/components/configurator/ComponentList.tsx`
- Create: `src/components/configurator/ComponentCard.tsx`

**拆分策略：**

- 分类标签栏 → CategoryTabs.tsx
- 组件列表 → ComponentList.tsx
- 单个组件卡片 → ComponentCard.tsx

- [ ] **Step 1: 提取 ComponentCard 组件**

- [ ] **Step 2: 提取 CategoryTabs 组件**

- [ ] **Step 3: 提取 ComponentList 组件**

- [ ] **Step 4: 重构 ComponentSelector**

- [ ] **Step 5: 验证类型检查和 lint**

---

### Task 9: 拆分其他大文件

**Files:**

- `src/components/sections/Hero.tsx` (263 行) - 可拆分为 HeroTitle, HeroStats, HeroCTA
- `src/components/configurator/SummaryPanel.tsx` (257 行)
- `src/components/configurator/ComparePanel.tsx` (257 行)
- `src/components/configurator/ComponentDetailModal.tsx` (251 行)
- `src/components/sections/Pricing.tsx` (248 行) - 可拆分为 PricingCard
- `src/app/about/page.tsx` (247 行) - 可拆分为多个 section 组件
- `src/components/configurator/BuildList.tsx` (238 行)
- `src/components/ui/OnboardingGuide.tsx` (230 行)
- `src/components/configurator/CostBreakdownChart.tsx` (207 行)
- `src/lib/constants.ts` (203 行) - 可按类别拆分
- `src/lib/data/component-details.ts` (349 行) - 数据文件，按车型拆分

**说明：** 仅对有明确拆分价值的业务组件进行拆分。shadcn/ui 组件（如 dropdown-menu.tsx, select.tsx）和翻译文件不拆分。

- [ ] **Step 1: 拆分 constants.ts**

按类别拆分为多个常量文件：

- `bike-constants.ts` - 自行车相关常量
- `ui-constants.ts` - UI 相关常量
- `index.ts` - 重新导出

- [ ] **Step 2: 拆分 component-details.ts**

按车型或类别拆分为多个数据文件。

- [ ] **Step 3: 拆分 Hero.tsx**

提取子组件：HeroTitle, HeroCTA, HeroStats。

- [ ] **Step 4: 拆分 Pricing.tsx**

提取 PricingCard 组件。

- [ ] **Step 5: 验证类型检查和 lint**

---

## 阶段五：规范对齐

### Task 10: 对齐 openspec 编码规范

**检查项：**

- 导出函数是否有返回类型标注
- 是否滥用 any 类型
- Server/Client 组件边界是否清晰
- Hooks 使用是否规范
- 错误处理是否统一

- [ ] **Step 1: 检查 any 类型使用**

搜索代码库中的 `any` 使用，评估是否可以替换为具体类型。

- [ ] **Step 2: 检查导出函数返回类型**

检查导出函数是否都标注了返回类型。

- [ ] **Step 3: 修复发现的规范问题**

---

### Task 11: 对齐 prototype 设计规范

**检查项：**

- 颜色系统是否符合设计规范
- 圆角/间距/阴影是否统一
- 动画时长是否 ≤300ms
- 组件命名是否一致

- [ ] **Step 1: 审查 globals.css 中的设计 token**

对比原型规范和实际 CSS 变量。

- [ ] **Step 2: 检查组件样式一致性**

检查 Button、Card 等基础组件是否符合设计规范。

- [ ] **Step 3: 检查动画时长**

确保所有动画时长不超过 300ms。

- [ ] **Step 4: 修复发现的不一致问题**

---

## 阶段六：文档更新与版本号统一

### Task 12: 更新 README 文档

**Files:**

- Modify: `README.md`
- Modify: `README_EN.md`

- [ ] **Step 1: 同步当前功能列表**

确保 README 中的功能列表与实际代码一致。

- [ ] **Step 2: 更新使用说明**

确保安装和使用说明准确。

- [ ] **Step 3: 更新技术栈信息**

确保技术栈版本号正确。

---

### Task 13: 统一版本号

**Files:**

- `package.json`
- `openspec/SPEC.md`
- `openspec/README.md`
- `openspec/PROJECT_GUIDELINES.md`
- `CHANGELOG.md`
- `README.md`

- [ ] **Step 1: 检查所有文档的版本号**

列出所有包含版本号的文件，确认当前版本。

- [ ] **Step 2: 统一更新版本号**

将所有版本号统一为最新版本号（v4.0.0 或更高）。

- [ ] **Step 3: 更新 CHANGELOG**

添加本次优化的变更记录。

---

## 阶段七：最终验证

### Task 14: 全面验证

- [ ] **Step 1: 运行完整的类型检查**

运行：`npx tsc --noEmit`
预期：无类型错误。

- [ ] **Step 2: 运行完整的 lint 检查**

运行：`npm run lint`
预期：无 lint 警告或错误。

- [ ] **Step 3: 运行所有测试**

运行：`npm run test -- --run`
预期：所有测试通过。

- [ ] **Step 4: 运行生产构建**

运行：`npm run build`
预期：构建成功。

---

**计划完成日期**: 2026-07-10
**版本**: v1.0.0
