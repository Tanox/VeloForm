# UI 设计系统

> **路径**: `/openspec/design/ui-design-system.md`
> **版本**: v5.0.0
> **更新日期**: 2026-07-10
> **设计风格**: 极简主义 · 克制精准 · 国际水准

---

## 概述

本文档定义 Veloform 项目的 UI 设计系统，包括颜色、字体、间距、组件库等设计规范。设计系统确保应用界面的一致性、可访问性和可扩展性，采用极简主义设计原则。

本设计系统与 `src/components/ui/` 中的 shadcn/ui 组件库完全对齐，所有组件均基于 CSS 变量和 Tailwind CSS 配置实现。

---

## 设计原则

### 1. 极简主义 (Minimalism)

- 去除不必要的装饰元素
- 聚焦核心功能展示
- 充足的留白创造呼吸感
- 简洁的视觉层次

### 2. 克制精准 (Restraint & Precision)

- 每一个像素都有目的
- 4px 网格系统确保一致性
- 单一强调色，避免视觉噪音
- 微妙的阴影和层次区分

### 3. 微交互 (Micro-interactions)

- 悬停反馈提供即时响应
- 平滑的状态过渡动画（150-300ms）
- 自然的物理动效
- 尊重 `prefers-reduced-motion`

### 4. 一致性 (Consistency)

- 统一的圆角规范
- 一致的间距系统
- 标准化的颜色语义
- 可预测的交互模式

### 5. 可访问性 (Accessibility)

- WCAG 2.1 AA 级色彩对比度
- 完整的键盘导航支持
- ARIA 属性标注
- 语义化 HTML 结构

---

## 颜色系统

### 设计理念

**极简色彩策略**：中性灰底 + 单一品牌色 + 语义状态色

- 避免过多色彩干扰
- 使用深浅灰度建立视觉层级
- 单一品牌色（蓝色）用于关键行动
- 语义色（绿/橙/红）仅在必要时使用

### shadcn/ui 核心变量

所有核心色值使用 HSL 格式，与 shadcn/ui base-nova 风格完全对齐。

#### 浅色主题 (Light Theme)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 6% 10%;
  --card: 0 0% 100%;
  --card-foreground: 240 6% 10%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 6% 10%;
  --primary: 224 76% 48%;
  --primary-foreground: 0 0% 100%;
  --secondary: 240 5% 96%;
  --secondary-foreground: 240 6% 10%;
  --muted: 240 5% 96%;
  --muted-foreground: 240 4% 46%;
  --accent: 240 5% 96%;
  --accent-foreground: 240 6% 10%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 0 0% 100%;
  --border: 240 6% 90%;
  --input: 240 6% 90%;
  --ring: 224 76% 48%;
  --radius: 0.75rem;
}
```

#### 深色主题 (Dark Theme)

```css
.dark {
  --background: 240 6% 7%;
  --foreground: 0 0% 98%;
  --card: 240 5% 10%;
  --card-foreground: 0 0% 98%;
  --popover: 240 5% 10%;
  --popover-foreground: 0 0% 98%;
  --primary: 224 76% 56%;
  --primary-foreground: 240 6% 10%;
  --secondary: 240 4% 16%;
  --secondary-foreground: 0 0% 98%;
  --muted: 240 4% 16%;
  --muted-foreground: 240 5% 65%;
  --accent: 240 4% 16%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 72% 51%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 4% 20%;
  --input: 240 4% 20%;
  --ring: 224 76% 56%;
}
```

### 语义扩展色

| Token       | 浅色值    | 深色值    | 语义 | 使用场景             |
| ----------- | --------- | --------- | ---- | -------------------- |
| `--success` | `#34c759` | `#30d158` | 成功 | 成功提示、已保存状态 |
| `--warning` | `#ff9500` | `#ff9f0a` | 警告 | 警告提示、即将到期   |
| `--error`   | `#ff3b30` | `#ff453a` | 错误 | 错误提示、表单验证   |
| `--info`    | `#0071e3` | `#2997ff` | 信息 | 信息提示、帮助       |

### 表面色层级

| Token                 | 浅色值    | 深色值    | 语义     | 使用场景           |
| --------------------- | --------- | --------- | -------- | ------------------ |
| `--surface`           | `#ffffff` | `#1a1a1a` | 表面     | 卡片容器、分组背景 |
| `--surface-secondary` | `#f5f5f7` | `#2c2c2e` | 次级表面 | 输入框背景、悬停   |
| `--surface-tertiary`  | `#ebebeb` | `#3a3a3c` | 三级表面 | 选中状态、标签     |

---

## 字体系统

### 字体家族

使用系统字体栈，确保最佳性能和原生体验：

```css
.font-sans {
  font-family:
    'Inter',
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
}
```

### 字体权重

| 权重     | 值  | 用途             |
| -------- | --- | ---------------- |
| Regular  | 400 | 正文内容         |
| Medium   | 500 | 按钮、标签、表单 |
| SemiBold | 600 | 小标题、强调文本 |
| Bold     | 700 | 主标题、关键数据 |

### 字号层级

遵循 Tailwind CSS 标准字号：

| Token  | 字号 | 行高 | 字重 | 用途                 |
| ------ | ---- | ---- | ---- | -------------------- |
| `xs`   | 12px | 16px | 400  | 辅助说明、标签       |
| `sm`   | 14px | 20px | 400  | 次要正文、卡片描述   |
| `base` | 16px | 24px | 400  | 正文、段落文字       |
| `lg`   | 18px | 28px | 500  | 小标题、区块标题     |
| `xl`   | 20px | 28px | 600  | 中标题、卡片标题     |
| `2xl`  | 24px | 32px | 600  | 大标题、Section 标题 |
| `3xl`  | 30px | 36px | 700  | 页面标题             |
| `4xl`  | 36px | 40px | 700  | 超大标题             |
| `5xl`  | 48px | 1    | 700  | Hero 标题            |

---

## 间距系统

### 4px 网格系统

所有间距必须是 **4px 的倍数**，确保视觉的一致性和节奏感。

| Token | 值   | 用途                          |
| ----- | ---- | ----------------------------- |
| `1`   | 4px  | 最小间距、图标与文字间距      |
| `2`   | 8px  | 小间距、紧凑布局              |
| `3`   | 12px | 中间距、相关元素间距          |
| `4`   | 16px | 基础间距、卡片内边距          |
| `5`   | 20px | 中等间距、组件间距            |
| `6`   | 24px | 大间距、Section 内边距        |
| `8`   | 32px | 超大间距、区块间距            |
| `10`  | 40px | 巨大间距、页面区块间距        |
| `12`  | 48px | 最大间距、Hero 区块间距       |
| `16`  | 64px | 页面级间距、主要 Section 间距 |

### 组件内边距规范

| 组件类型  | Padding         | 示例     |
| --------- | --------------- | -------- |
| 按钮 (sm) | `h-8 px-3`      | 小按钮   |
| 按钮 (md) | `h-9 px-4 py-2` | 默认按钮 |
| 按钮 (lg) | `h-10 px-8`     | 大按钮   |
| 卡片      | `p-6`           | 内容卡片 |
| 输入框    | `h-9 px-3 py-1` | 表单输入 |

---

## 圆角系统

### 圆角 Token

| Token  | 值     | 用途   | 示例                   |
| ------ | ------ | ------ | ---------------------- |
| `sm`   | 4px    | 小圆角 | 标签、徽章             |
| `md`   | 6px    | 中圆角 | 输入框、小按钮         |
| `lg`   | 12px   | 大圆角 | 按钮、卡片、Modal      |
| `full` | 9999px | 圆形   | 头像、Badge、Pill 按钮 |

---

## 阴影系统

### 设计理念

**克制使用阴影**：仅在需要建立层级时使用，避免视觉噪音。

### 阴影 Token

| Token | 浅色模式                                                 | 深色模式                            | 用途              |
| ----- | -------------------------------------------------------- | ----------------------------------- | ----------------- |
| `sm`  | `0 1px 2px rgba(0,0,0,0.04)`                             | `0 1px 2px rgba(0,0,0,0.3)`         | 轻微浮起          |
| `md`  | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | `0 1px 3px rgba(0,0,0,0.35)`        | 基础阴影（按钮）  |
| `lg`  | `0 4px 6px -1px rgba(0,0,0,0.06)`                        | `0 4px 6px -1px rgba(0,0,0,0.4)`    | 中等阴影（卡片）  |
| `xl`  | `0 10px 15px -3px rgba(0,0,0,0.06)`                      | `0 10px 15px -3px rgba(0,0,0,0.45)` | 大阴影（悬浮）    |
| `2xl` | `0 20px 25px -5px rgba(0,0,0,0.06)`                      | `0 20px 25px -5px rgba(0,0,0,0.5)`  | 超大阴影（Modal） |

### 使用原则

1. **克制使用** - 仅在需要建立层级时使用阴影
2. **Hover 状态** - 使用 sm → md 的过渡
3. **避免彩色阴影** - 不使用发光、彩色阴影
4. **性能考虑** - 使用 `box-shadow` 而非 `filter: drop-shadow()`

---

## 动画系统

### 设计理念

**克制动效策略**：自然、即时、不干扰

- 动画时长 ≤ 300ms
- 使用 cubic-bezier 缓动曲线
- 尊重 `prefers-reduced-motion` 用户设置
- 避免布局偏移（Layout Shift）

### 缓动曲线

| Token         | 曲线                                   | 用途             |
| ------------- | -------------------------------------- | ---------------- |
| `ease-out`    | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 退出动画（默认） |
| `ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)`       | 进出动画         |

### 动画时长

| Token    | 时长  | 用途                        |
| -------- | ----- | --------------------------- |
| `fast`   | 150ms | 微交互（悬停、焦点）        |
| `normal` | 200ms | 常规动画（展开、收起）      |
| `slow`   | 300ms | 大型动画（页面过渡、Modal） |

### Reduced Motion 支持

全局启用，无需单独处理：

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 图标系统

### 图标库

Veloform 使用 **Lucide React** 作为图标库。

- 1000+ 精美 SVG 图标
- 统一的 24x24 viewBox
- 支持自定义尺寸和颜色
- Tree-shakeable（仅打包使用的图标）

### 图标尺寸

| Token | 尺寸 | 用途             |
| ----- | ---- | ---------------- |
| `xs`  | 16px | 紧凑布局、列表项 |
| `sm`  | 20px | 按钮内图标、表单 |
| `md`  | 24px | 默认尺寸、导航   |
| `lg`  | 32px | 特色区块、空状态 |

### 使用规范

- 图标使用 `data-icon` 属性标记位置（`inline-start` / `inline-end`）
- 图标大小由组件控制，不手动添加 sizing classes
- 图标颜色继承当前文字颜色

---

## 组件库规范

### 基础组件 (L1)

以下组件已在 `src/components/ui/` 中实现，基于 shadcn/ui base-nova 风格：

| 组件           | 文件                 | 状态 |
| -------------- | -------------------- | ---- |
| Button         | `button.tsx`         | ✅   |
| Card           | `card.tsx`           | ✅   |
| Input          | `input.tsx`          | ✅   |
| Textarea       | `textarea.tsx`       | ✅   |
| Label          | `label.tsx`          | ✅   |
| Checkbox       | `checkbox.tsx`       | ✅   |
| Radio Group    | `radio-group.tsx`    | ✅   |
| Switch         | `switch.tsx`         | ✅   |
| Slider         | `slider.tsx`         | ✅   |
| Select         | `select.tsx`         | ✅   |
| Badge          | `badge.tsx`          | ✅   |
| Avatar         | `avatar.tsx`         | ✅   |
| Progress       | `progress.tsx`       | ✅   |
| Skeleton       | `skeleton.tsx`       | ✅   |
| Separator      | `separator.tsx`      | ✅   |
| Alert          | `alert.tsx`          | ✅   |
| Tooltip        | `tooltip.tsx`        | ✅   |
| Popover        | `popover.tsx`        | ✅   |
| Dropdown Menu  | `dropdown-menu.tsx`  | ✅   |
| Dialog         | `dialog.tsx`         | ✅   |
| Alert Dialog   | `alert-dialog.tsx`   | ✅   |
| Sheet          | `sheet.tsx`          | ✅   |
| Tabs           | `tabs.tsx`           | ✅   |
| Accordion      | `accordion.tsx`      | ✅   |
| Scroll Area    | `scroll-area.tsx`    | ✅   |
| Sonner (Toast) | `sonner.tsx`         | ✅   |
| Error Boundary | `error-boundary.tsx` | ✅   |

### 复合组件 (L2)

| 组件             | 文件                  | 状态 |
| ---------------- | --------------------- | ---- |
| Loading Screen   | `LoadingScreen.tsx`   | ✅   |
| Async Boundary   | `AsyncBoundary.tsx`   | ✅   |
| Theme Toggle     | `ThemeToggle.tsx`     | ✅   |
| Onboarding Guide | `OnboardingGuide.tsx` | ✅   |
| Support Modal    | `SupportModal.tsx`    | ✅   |

### 业务组件 (L3)

| 组件                 | 目录            | 状态 |
| -------------------- | --------------- | ---- |
| BikeTypeSelector     | `configurator/` | ✅   |
| BuildList            | `configurator/` | ✅   |
| ComponentSelector    | `configurator/` | ✅   |
| ComponentDetailModal | `configurator/` | ✅   |
| SummaryPanel         | `configurator/` | ✅   |
| CostBreakdownChart   | `configurator/` | ✅   |
| ComparePanel         | `configurator/` | ✅   |
| RecommendedConfigs   | `configurator/` | ✅   |
| ShareModal           | `configurator/` | ✅   |

### 页面 Section (L4)

| 组件     | 目录        | 状态 |
| -------- | ----------- | ---- |
| Hero     | `sections/` | ✅   |
| Features | `sections/` | ✅   |
| Pricing  | `sections/` | ✅   |
| Cta      | `sections/` | ✅   |
| Navbar   | `layout/`   | ✅   |
| Footer   | `layout/`   | ✅   |

---

## 响应式断点

### 断点定义

| Token | 宽度   | 设备类型             |
| ----- | ------ | -------------------- |
| `sm`  | 640px  | 移动端横屏、大屏手机 |
| `md`  | 768px  | 平板竖屏             |
| `lg`  | 1024px | 平板横屏、小屏桌面   |
| `xl`  | 1280px | 桌面                 |
| `2xl` | 1536px | 大屏桌面             |

### 响应式策略

| 断点           | 布局 | 导航     | 卡片网格 |
| -------------- | ---- | -------- | -------- |
| < 640px        | 单列 | 汉堡菜单 | 1 列     |
| 640px - 768px  | 双列 | 汉堡菜单 | 2 列     |
| 768px - 1024px | 三列 | 展开导航 | 2-3 列   |
| > 1024px       | 四列 | 完整导航 | 3-4 列   |

---

## 可访问性 (A11y)

### 色彩对比度

遵循 WCAG 2.1 AA 标准：

| 组合            | 对比度  | 等级 |
| --------------- | ------- | ---- |
| 主文本 / 背景   | ≥ 7:1   | AAA  |
| 次要文本 / 背景 | ≥ 4.5:1 | AA   |
| 主色 / 背景     | ≥ 4.5:1 | AA   |

### 触控目标

所有可交互元素必须满足最小触控目标：

- 最小尺寸：`44px × 44px`
- 按钮最小高度：`h-9` (36px) + 点击区域扩展

### 键盘导航

- 所有交互元素可通过 Tab 键访问
- 焦点状态清晰可见（ring-2 ring-ring）
- 支持 Esc 关闭 Modal/Sheet
- 支持方向键在菜单中导航

---

## 实施指南

### Tailwind CSS 配置

设计系统通过 `tailwind.config.ts` 配置，与 CSS 变量完全集成：

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        // ...
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
};
```

### shadcn/ui 组件库

所有 UI 组件基于 shadcn/ui + @base-ui/react 实现，配置见 `components.json`：

```json
{
  "style": "base-nova",
  "base": "base",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui"
  }
}
```

---

## 相关文档

- [组件设计规范](../architecture/component-design.md)
- [组件模式](../architecture/component-patterns.md)
- [交互标准](../../prototype/interaction-standards.md)
- [编码规范](../development/coding-standards.md)
- [测试规范](../development/testing.md)

---

## 版本历史

| 版本       | 日期       | 变更内容                                                                          |
| ---------- | ---------- | --------------------------------------------------------------------------------- |
| **v5.0.0** | 2026-07-10 | 极简主义重构、与 shadcn/ui base-nova 完全对齐、移除过度装饰、系统字体栈、克制阴影 |
| v4.2.0     | 2026-07-10 | 与 shadcn/ui 组件库完全对齐、更新组件清单                                         |
| v4.0.0     | 2026-07-05 | 极简主义重构、色彩克制、统一圆角                                                  |
| v3.8.0     | 2026-06-17 | 设计系统全面升级                                                                  |
| v2.0.0     | 2026-06-04 | Apple 设计风格                                                                    |
| v1.0.0     | 2026-06-01 | 初始版本                                                                          |

---

**文档路径**: `/openspec/design/ui-design-system.md`
**最后更新**: 2026-07-10
**版本**: v5.0.0
