# UI 设计系统

> **路径**: `/openspec/design/ui-design-system.md`  
> **版本**: v4.0.0  
> **更新日期**: 2026-07-06

## 概述

本文档定义 Veloform 项目的 UI 设计系统，包括颜色、字体、间距、组件库等设计规范。设计系统确保应用界面的一致性、可访问性和可扩展性，采用 Apple 设计风格的极简主义原则。

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

---

## 颜色系统

### 主色调 - Apple Blue

Veloform 采用苹果风格的蓝色作为品牌主色，象征科技、信任与创新。

```css
/* 主色调完整色阶 */
--primary-50: #f0f7ff;
--primary-100: #e0ebff;
--primary-500: #0071e3; /* 主色基准 - Apple 风格蓝色 */
--primary-600: #0077ed; /* 悬停状态 */
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
  --background: #ffffff; /* 页面主背景 */
  --foreground: #1d1d1f; /* 主文本色 - Apple 深色文本 */
  --surface: #fafafa; /* 卡片/表面背景 */
  --surface-tertiary: #f5f5f7; /* 第三级表面色 */
  --border: #d2d2d7; /* 默认边框 */
  --border-light: rgba(0, 0, 0, 0.06); /* 浅色边框 */
  --muted: #6e6e73; /* 弱化文本 */
  --secondary: #86868b; /* 次要文本 */
  --accent: #34c759; /* 强调色 - Apple 绿色 */
}
```

#### 深色主题 (Dark Theme)

```css
.dark {
  --background: #000000; /* 页面主背景 - 纯黑 */
  --foreground: #ffffff; /* 主文本色 - 纯白 */
  --surface: #1d1d1f; /* 卡片/表面背景 */
  --surface-tertiary: #272729; /* 第三级表面色 */
  --border: #3a3a3c; /* 默认边框 */
  --border-light: rgba(255, 255, 255, 0.06); /* 浅色边框 */
  --muted: #6e6e73; /* 弱化文本 */
  --secondary: #86868b; /* 次要文本 */
  --accent: #30d158; /* 强调色 - Apple 深色绿色 */
}
```

### 功能色

```css
/* 成功 - 绿色 */
--success: #34c759;

/* 警告 - 橙色 */
--warning: #ff9500;

/* 错误 - 红色 */
--error: #ff3b30;

/* 信息 - 蓝色 */
--info: #0071e3;
```

### Tailwind CSS 配置

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro Text', 'system-ui', 'sans-serif'],
        display: ['SF Pro Display', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#000000',
          light: '#ffffff',
        },
        foreground: {
          DEFAULT: '#1d1d1f',
          dark: '#ffffff',
          light: '#1d1d1f',
        },
        primary: {
          50: '#f0f7ff',
          100: '#e0ebff',
          500: '#0071e3',
          600: '#0077ed',
          DEFAULT: '#0071e3',
        },
        surface: {
          DEFAULT: '#fafafa',
          dark: '#1d1d1f',
          light: '#fafafa',
        },
        border: {
          DEFAULT: '#d2d2d7',
          dark: '#3a3a3c',
          light: '#d2d2d7',
        },
        muted: '#6e6e73',
        secondary: '#86868b',
        accent: {
          DEFAULT: '#34c759',
          dark: '#30d158',
          light: '#34c759',
        },
        success: '#34c759',
        warning: '#ff9500',
        error: '#ff3b30',
        info: '#0071e3',
      },
    },
  },
};
```

---

## 字体系统

### 字体家族

```css
/* 标题字体 - Clash Display */
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

/* 正文字体 - Satoshi */
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

/* 等宽字体 - 代码显示 */
.font-mono {
  font-family: 'SF Mono', 'JetBrains Mono', monospace;
}
```

### 字体加载

使用 Variable Font 格式优化加载性能：

```css
/* Satoshi Variable Font */
@font-face {
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 400 900;
  font-display: swap;
  src: url('/fonts/Satoshi-Variable.woff2') format('woff2');
}

/* Clash Display Variable Font */
@font-face {
  font-family: 'Clash Display';
  font-style: normal;
  font-weight: 200 700;
  font-display: swap;
  src: url('/fonts/ClashDisplay-Variable.woff2') format('woff2');
}
```

**注意**：Tailwind CSS 配置中保留了 `SF Pro Text` 和 `SF Pro Display` 作为 fallback 字体名称，确保兼容性。实际项目使用 Satoshi 和 Clash Display 作为主字体。

### 字体权重

| 权重     | 值  | 用途             |
| -------- | --- | ---------------- |
| Regular  | 400 | 正文内容         |
| Medium   | 500 | 按钮、标签、表单 |
| SemiBold | 600 | 小标题、强调文本 |
| Bold     | 700 | 主标题、关键数据 |

### 字号层级

基于 Major Third 比例尺：

```css
.text-xs {
  font-size: 0.75rem;
} /* 12px */
.text-sm {
  font-size: 0.875rem;
} /* 14px */
.text-base {
  font-size: 1rem;
} /* 16px - 正文基准 */
.text-lg {
  font-size: 1.125rem;
} /* 18px */
.text-xl {
  font-size: 1.25rem;
} /* 20px */
.text-2xl {
  font-size: 1.5rem;
} /* 24px */
.text-3xl {
  font-size: 1.875rem;
} /* 30px */
.text-4xl {
  font-size: 2.25rem;
} /* 36px */
.text-5xl {
  font-size: 3rem;
} /* 48px */
.text-6xl {
  font-size: 3.75rem;
} /* 60px */
.text-7xl {
  font-size: 4.5rem;
} /* 72px */
.text-8xl {
  font-size: 5.5rem;
} /* 88px - Hero 大标题 */
```

### 行高

```css
.leading-normal {
  line-height: 1.47;
} /* 正文默认 - Apple 风格 */
```

---

## 间距系统

### 基础单位

基于 4px 网格系统（Tailwind 默认）：

```css
space-1  = 0.25rem  /* 4px */
space-2  = 0.5rem   /* 8px */
space-3  = 0.75rem  /* 12px */
space-4  = 1rem     /* 16px */
space-5  = 1.25rem  /* 20px */
space-6  = 1.5rem   /* 24px */
space-8  = 2rem     /* 32px */
space-10 = 2.5rem   /* 40px */
space-12 = 3rem     /* 48px */
space-16 = 4rem     /* 64px */
space-20 = 5rem     /* 80px */
space-24 = 6rem     /* 96px */
```

### 组件内边距规范

| 组件类型  | Padding                    | 示例         |
| --------- | -------------------------- | ------------ |
| 按钮 (sm) | `px-4 py-2 min-h-[40px]`   | 小按钮       |
| 按钮 (md) | `px-6 py-2.5 min-h-[44px]` | 默认按钮     |
| 按钮 (lg) | `px-8 py-3.5 min-h-[52px]` | 大按钮       |
| 卡片      | `p-6`                      | 内容卡片     |
| 模态框    | `p-6`                      | 模态框内容区 |
| 输入框    | `px-3 py-2`                | 表单输入     |

---

## 圆角系统

```css
.rounded-none {
  border-radius: 0;
}
.rounded-sm {
  border-radius: 0.25rem;
} /* 4px */
.rounded-md {
  border-radius: 0.375rem;
} /* 6px */
.rounded-lg {
  border-radius: 0.5rem;
} /* 8px */
.rounded-xl {
  border-radius: 0.75rem;
} /* 12px */
.rounded-2xl {
  border-radius: 1rem;
} /* 16px - 卡片 */
.rounded-3xl {
  border-radius: 1.5rem;
} /* 24px - 大卡片/Hero 图片 */
.rounded-full {
  border-radius: 9999px;
} /* 完全圆角 - 按钮 */
```

**使用规范**：

| 元素       | 圆角           | 说明     |
| ---------- | -------------- | -------- |
| 按钮       | `rounded-full` | 胶囊形状 |
| 小图标容器 | `rounded-xl`   | 12px     |
| 卡片       | `rounded-2xl`  | 16px     |
| 模态框     | `rounded-2xl`  | 16px     |
| 头像       | `rounded-full` | 圆形     |
| 标签/徽章  | `rounded-full` | 胶囊形状 |
| Hero 图片  | `rounded-3xl`  | 24px     |

---

## 阴影系统

```css
/* Apple 风格柔和阴影 */
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-soft: 0 2px 10px rgba(0, 0, 0, 0.08);
--shadow-hero: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
```

**使用场景**：

| 元素         | 阴影                             | 说明       |
| ------------ | -------------------------------- | ---------- |
| 卡片（默认） | `shadow-sm`                      | 轻微浮起感 |
| 卡片（悬停） | `shadow-md`                      | 悬停时加深 |
| Hero 图片    | `shadow-2xl` + `shadow-black/10` | 明显层级   |
| 下拉菜单     | `shadow-lg`                      | 明显层级   |
| 模态框       | `shadow-2xl`                     | 最高层级   |

---

## 动画系统

### 动画时长规范

所有动画时长不超过 **400ms**，确保流畅且快速的交互体验：

| 时长类型 | 值    | 使用场景           |
| -------- | ----- | ------------------ |
| Fast     | 150ms | 悬停、点击反馈     |
| Normal   | 300ms | 页面过渡、模态框   |
| Slow     | 400ms | 复杂动画、入场效果 |

### CSS 变量定义

```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms; /* 仅用于特殊装饰动画 */

  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-emphasized: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 预设动画

```typescript
animation: {
  "fade-in": "fadeIn 0.3s ease-out",
  "fade-in-up": "fadeInUp 0.8s ease-out",
  "slide-up": "slideUp 0.4s ease-out",
  "slide-in-right": "slideInRight 0.4s ease-out",
  "scale-in": "scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  "bounce-in": "bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  "shimmer": "shimmer 2s linear infinite",
  "gradient-move": "gradientMove 3s linear infinite",
  pulse: "pulse 1s ease-in-out infinite",
  "pulse-slow": "pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  float: "float 6s ease-in-out infinite",
},
keyframes: {
  fadeIn: {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  fadeInUp: {
    "0%": { opacity: "0", transform: "translateY(30px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
  slideUp: {
    "0%": { opacity: "0", transform: "translateY(10px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
  slideInRight: {
    "0%": { opacity: "0", transform: "translateX(40px)" },
    "100%": { opacity: "1", transform: "translateX(0)" },
  },
  scaleIn: {
    "0%": { opacity: "0", transform: "scale(0.95)" },
    "100%": { opacity: "1", transform: "scale(1)" },
  },
  bounceIn: {
    "0%": { opacity: "0", transform: "scale(0.3)" },
    "50%": { transform: "scale(1.05)" },
    "100%": { opacity: "1", transform: "scale(1)" },
  },
  shimmer: {
    "0%": { backgroundPosition: "-200% 0" },
    "100%": { backgroundPosition: "200% 0" },
  },
  gradientMove: {
    "0%": { backgroundPosition: "0% 50%" },
    "100%": { backgroundPosition: "200% 50%" },
  },
},
```

### Framer Motion 配置

```typescript
const transition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1],
};

const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};
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
    scroll-behavior: auto !important;
  }
}
```

---

## 组件库规范

### 通用组件类

```css
/* 玻璃态卡片 */
.glass-card {
  @apply bg-surface/80 backdrop-blur-xl border border-border-light;
}

/* 标准卡片 */
.card {
  @apply bg-surface rounded-2xl transition-all duration-200;
}

/* 组件选择项 */
.component-item {
  @apply flex items-center gap-4 p-4 bg-background rounded-xl cursor-pointer transition-all duration-200 hover:bg-surface-tertiary;
}

/* 标签 */
.tag {
  @apply px-3 py-1 rounded-full text-xs font-medium;
}

.tag-primary {
  @apply bg-primary/10 text-primary;
}

.tag-secondary {
  @apply bg-accent/10 text-accent;
}
```

### 按钮 (Button)

#### 变体

```tsx
<Button variant="primary">主要操作</Button>
<Button variant="secondary">次要操作</Button>
<Button variant="accent">强调操作</Button>
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">轻量操作</Button>
<Button variant="danger">危险操作</Button>
```

#### 尺寸

```tsx
<Button size="sm">小按钮</Button>     // px-4 py-2 min-h-[40px]
<Button size="md">默认按钮</Button>   // px-6 py-2.5 min-h-[44px]
<Button size="lg">大按钮</Button>     // px-8 py-3.5 min-h-[52px]
<Button size="icon">图标按钮</Button> // p-2.5 min-w-[44px] min-h-[44px]
```

**样式特征**：

- 圆角：`rounded-full`（胶囊形状）
- 字体：`font-medium`
- 动画：悬停缩放 `scale: 1.01`，点击缩放 `scale: 0.98`
- 过渡：`duration-150`
- 焦点：`focus:ring-2 focus:ring-primary/50`

### 卡片 (Card)

```tsx
<Card variant="default" hoverable>
  <CardHeader>标题</CardHeader>
  <CardBody>内容</CardBody>
  <CardFooter>操作区</CardFooter>
</Card>
```

#### 变体

```tsx
<Card variant="default">默认卡片</Card>
<Card variant="elevated">高阴影卡片</Card>
<Card variant="outlined">轮廓卡片</Card>
```

**样式特征**：

- 圆角：`rounded-2xl`
- 内边距：`p-6`
- 动画：悬停时 `y: -4`

### 模态框 (Modal)

```tsx
<Modal isOpen={isOpen} onClose={onClose} title="标题" size="md">
  模态框内容
</Modal>
```

**样式特征**：

- 遮罩：`fixed inset-0 bg-black/50 backdrop-blur-sm`
- 内容：`bg-background rounded-2xl shadow-2xl`
- 动画：`scaleIn` + `fadeIn`

---

## 布局规范

### 网格系统

```css
.grid-cols-1    /* 单列（移动）*/
.grid-cols-2    /* 双列（平板）*/
.grid-cols-3    /* 三列（桌面）*/
.grid-cols-4    /* 四列（大桌面）*/
```

### 响应式断点

```css
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
```

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

## 相关文档

- [原型图说明](../prototype-guide.md)
- [设计审查与优化建议](./design-review.md)
- [组件设计规范](../architecture/component-design.md)
- [编码规范](../development/coding-standards.md)

---

## 版本历史

| 版本       | 日期       | 变更内容                                                                                                                            |
| ---------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **v4.0.0** | 2026-07-06 | 重大更新：字体系统升级为 Satoshi/Clash Display、新增动画时长规范（≤400ms）、同步实际代码实现、完善 Reduced Motion 支持              |
| **v3.8.0** | 2026-06-17 | 设计系统全面升级：引入 gradient 渐变色、Shimmer 动画效果、完善组件库规范文档、新增交互标准文档、同步 prototype 与 openspec 设计规范 |
| **v3.5.0** | 2026-06-03 | 架构重构：store 拆分模块化、Zod 配置验证、Firebase 安全规则、多语言 i18n 类型安全                                                   |
| **v2.1.0** | 2026-06-08 | 参考 Apple 设计风格全面优化：更新 Hero 组件大图展示、Features 卡片布局、Pricing 定价卡片、Cta 行动号召、Navbar 和 Footer 导航组件   |
| v2.0.0     | 2026-06-04 | 全面更新为 Apple 设计风格：主色调改为 #0071e3，字体改为 SF Pro，优化圆角和阴影系统                                                  |
| v1.3.0     | 2026-06-04 | 更新 Button、Card、Footer 组件文档                                                                                                  |
| v1.2.0     | 2026-06-04 | 更新主题系统实现细节                                                                                                                |
| v1.0.0     | 2026-06-01 | 初始版本                                                                                                                            |

---

**文档路径**: `/openspec/design/ui-design-system.md`  
**最后更新**: 2026-07-06  
**版本**: v4.0.0
