# UI 设计系统

> **路径**: `/openspec/design/ui-design-system.md`  
> **版本**: v4.2.0  
> **更新日期**: 2026-07-10  
> **设计风格**: 极简主义 · Apple 风格 · 国际顶尖水准

---

## 概述

本文档定义 Veloform 项目的 UI 设计系统，包括颜色、字体、间距、组件库等设计规范。设计系统确保应用界面的一致性、可访问性和可扩展性，采用 Apple 设计风格的极简主义原则。

本设计系统与 `src/components/ui/` 中的 shadcn/ui 组件库完全对齐，所有组件均基于 CSS 变量和 Tailwind CSS 配置实现。

---

## 设计原则

### 1. 极简主义 (Minimalism)

- 去除不必要的装饰元素
- 聚焦核心功能展示
- 充足的留白创造呼吸感
- 简洁的视觉层次

### 2. 浅色优先 (Light First)

- 浅色主题作为默认体验
- 干净清爽的视觉效果
- 通过微妙的阴影和层次区分内容

### 3. 微交互 (Micro-interactions)

- 悬停反馈提供即时响应
- 平滑的状态过渡动画
- 自然的物理动效

### 4. 一致性 (Consistency)

- 统一的圆角规范
- 一致的间距系统
- 标准化的颜色语义

### 5. 可访问性 (Accessibility)

- WCAG 2.1 AA 级色彩对比度
- 完整的键盘导航支持
- ARIA 属性标注
- 尊重 `prefers-reduced-motion`

---

## 颜色系统

### 主色调 - Apple Blue

Veloform 采用苹果风格的蓝色作为品牌主色，象征科技、信任与创新。

#### CSS 变量定义

```css
:root {
  --primary: #0071e3;
  --primary-hover: #0066cc;
  --primary-light: #e8f0fe;
  --primary-foreground: #ffffff;
}
```

**使用场景**：

- 主要按钮背景
- 激活状态指示
- 链接和交互元素
- 进度条和加载状态

### 中性色系统

Veloform 采用 CSS 变量系统实现深色/浅色主题切换，使用 Tailwind CSS 的 `darkMode: 'class'` 配置。

#### 浅色主题 (Light Theme)

```css
:root {
  --background: #fafafa;
  --foreground: #1d1d1f;
  --surface: #ffffff;
  --surface-secondary: #f5f5f7;
  --surface-tertiary: #ebebeb;
  --border: #e5e5ea;
  --border-light: #f0f0f0;
  --muted: #6e6e73;
  --secondary: #86868b;
  --accent: #34c759;
}
```

#### 深色主题 (Dark Theme)

```css
.dark {
  --background: #000000;
  --foreground: #ffffff;
  --surface: #1a1a1a;
  --surface-secondary: #2c2c2e;
  --surface-tertiary: #3a3a3c;
  --border: #38383a;
  --border-light: #2c2c2e;
  --muted: #a1a1a6;
  --secondary: #86868b;
  --accent: #30d158;
}
```

### 功能色

```css
:root {
  --success: #34c759;
  --warning: #ff9500;
  --error: #ff3b30;
  --info: #0071e3;
}
```

### 品牌渐变（限制使用）

> **使用场景**：仅用于 Hero CTA 按钮、特殊行动号召  
> **禁止场景**：卡片背景、导航栏、页脚

```css
.gradient-brand {
  background: linear-gradient(135deg, #0071e3 0%, #34c759 50%, #af52de 100%);
  background-size: 200% 200%;
}
```

---

## 字体系统

### 字体家族

Veloform 使用 **Satoshi** 字体族（类 SF Pro 风格），确保最佳的渲染效果和性能。

```css
/* 正文字体 */
.font-sans {
  font-family:
    'Satoshi',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'PingFang SC',
    'Microsoft YaHei',
    sans-serif;
}

/* 标题字体 */
.font-display {
  font-family:
    'Clash Display',
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

| Token  | 字号 | 行高 | 字重 | 用途                 |
| ------ | ---- | ---- | ---- | -------------------- |
| `xs`   | 12px | 16px | 400  | 辅助说明、标签       |
| `sm`   | 14px | 20px | 400  | 次要正文、卡片描述   |
| `base` | 16px | 24px | 400  | 正文、段落文字       |
| `lg`   | 18px | 28px | 500  | 小标题、区块标题     |
| `xl`   | 20px | 32px | 600  | 中标题、卡片标题     |
| `2xl`  | 24px | 36px | 600  | 大标题、Section 标题 |
| `3xl`  | 30px | 44px | 700  | 页面标题             |
| `4xl`  | 36px | 52px | 700  | 超大标题             |
| `5xl`  | 48px | 68px | 700  | Hero 标题            |

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

| 组件类型  | Padding                    | 示例         |
| --------- | -------------------------- | ------------ |
| 按钮 (sm) | `px-3 py-2 min-h-[40px]`   | 小按钮       |
| 按钮 (md) | `px-5 py-2.5 min-h-[44px]` | 默认按钮     |
| 按钮 (lg) | `px-6 py-3 min-h-[48px]`   | 大按钮       |
| 卡片      | `p-5`                      | 内容卡片     |
| 模态框    | `p-4`                      | 模态框内容区 |
| 输入框    | `px-2.5 py-1`              | 表单输入     |

---

## 圆角系统

### 圆角 Token

| Token  | 值     | 用途     | 示例                   |
| ------ | ------ | -------- | ---------------------- |
| `sm`   | 8px    | 小圆角   | 输入框、标签           |
| `md`   | 12px   | 基础圆角 | 按钮、卡片             |
| `lg`   | 16px   | 中圆角   | 大卡片、Modal          |
| `xl`   | 20px   | 大圆角   | Hero 区块、特色卡片    |
| `2xl`  | 24px   | 超大圆角 | 特殊区块               |
| `full` | 9999px | 圆形     | 头像、Badge、Pill 按钮 |

### 使用规范

| 元素       | 圆角                | 说明          |
| ---------- | ------------------- | ------------- |
| 按钮       | `rounded-xl` (12px) | 胶囊形状      |
| 小图标容器 | `rounded-xl` (12px) | 12px          |
| 卡片       | `rounded-xl` (12px) | 16px 视觉效果 |
| 模态框     | `rounded-xl` (12px) | 16px 视觉效果 |
| 头像       | `rounded-full`      | 圆形          |
| 标签/徽章  | `rounded-full`      | 胶囊形状      |
| Hero 图片  | `rounded-2xl`       | 24px          |

---

## 阴影系统

### 阴影 Token

| Token | 浅色模式                       | 深色模式                      | 用途                    |
| ----- | ------------------------------ | ----------------------------- | ----------------------- |
| `sm`  | `0 1px 3px rgba(0,0,0,0.06)`   | `0 1px 3px rgba(0,0,0,0.3)`   | 轻微浮起（卡片 Hover）  |
| `md`  | `0 4px 12px rgba(0,0,0,0.08)`  | `0 4px 12px rgba(0,0,0,0.4)`  | 基础阴影（卡片、Modal） |
| `lg`  | `0 8px 24px rgba(0,0,0,0.1)`   | `0 8px 24px rgba(0,0,0,0.5)`  | 中等阴影（悬浮卡片）    |
| `xl`  | `0 16px 48px rgba(0,0,0,0.12)` | `0 16px 48px rgba(0,0,0,0.6)` | 大阴影（Hero 区块）     |

### 使用原则

1. **克制使用** - 仅在需要建立层级时使用阴影
2. **Hover 状态** - 使用 `--shadow-sm` 到 `--shadow` 的过渡
3. **避免彩色阴影** - 不使用 `shadow-glow` 等彩色阴影
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
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)`    | 弹性动画（轻微） |

### 动画时长

| Token    | 时长  | 用途                        |
| -------- | ----- | --------------------------- |
| `fast`   | 150ms | 微交互（悬停、焦点）        |
| `normal` | 200ms | 常规动画（展开、收起）      |
| `slow`   | 300ms | 大型动画（页面过渡、Modal） |

### 预设动画

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Reduced Motion 支持

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
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

---

## 组件库规范

### 基础组件 (L1)

以下组件已在 `src/components/ui/` 中实现：

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

| 组件             | 文件                  | 状态                |
| ---------------- | --------------------- | ------------------- |
| Modal            | `Modal.tsx`           | ✅ 基于 Dialog 封装 |
| Loading Screen   | `LoadingScreen.tsx`   | ✅                  |
| Async Boundary   | `AsyncBoundary.tsx`   | ✅                  |
| Theme Toggle     | `ThemeToggle.tsx`     | ✅                  |
| Onboarding Guide | `OnboardingGuide.tsx` | ✅                  |
| Support Modal    | `SupportModal.tsx`    | ✅                  |

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

---

## 响应式断点

### 断点定义

| Token | 宽度   | 布局策略             |
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
| 640px - 768px  | 双列 | 展开导航 | 2 列     |
| 768px - 1024px | 三列 | 完整导航 | 2-3 列   |
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
- 使用 `.touch-target` 类确保合规

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
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'system-ui', 'sans-serif'],
      },
      colors: {
        // 通过 CSS 变量引用
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        // ...
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        full: '9999px',
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

- [组件库规范](../architecture/component-design.md)
- [交互标准](../../prototype/interaction-standards.md)
- [设计审查与优化建议](./design-review.md)
- [编码规范](../development/coding-standards.md)
- [原型指南](../../prototype/README.md)

---

## 版本历史

| 版本       | 日期       | 变更内容                                                                             |
| ---------- | ---------- | ------------------------------------------------------------------------------------ |
| **v4.2.0** | 2026-07-10 | 与 shadcn/ui 组件库完全对齐、更新组件清单、同步 CSS 变量规范、完善可访问性和动画系统 |
| **v4.0.0** | 2026-07-05 | 极简主义重构、色彩克制、统一圆角、微妙阴影                                           |
| v3.8.0     | 2026-06-17 | 设计系统全面升级：引入 gradient 渐变色、Shimmer 动画效果、完善组件库规范文档         |
| v3.5.0     | 2026-06-03 | 架构重构：store 拆分模块化、Zod 配置验证、Firebase 安全规则                          |
| v2.1.0     | 2026-06-08 | 参考 Apple 设计风格全面优化                                                          |
| v2.0.0     | 2026-06-04 | 全面更新为 Apple 设计风格                                                            |
| v1.0.0     | 2026-06-01 | 初始版本                                                                             |

---

**文档路径**: `/openspec/design/ui-design-system.md`  
**最后更新**: 2026-07-10  
**版本**: v4.2.0
