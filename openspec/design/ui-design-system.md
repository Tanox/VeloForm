# UI 设计系统

> **路径**: `/openspec/design/ui-design-system.md`  
> **版本**: v1.2.0  
> **更新日期**: 2026-06-04

## 概述

本文档定义 Veloform 项目的 UI 设计系统，包括颜色、字体、间距、组件库等设计规范。设计系统确保应用界面的一致性、可访问性和可扩展性。

---

## 设计原则

### 1. 极简主义 (Minimalism)

- 去除不必要的装饰元素
- 聚焦核心功能展示
- 充足的留白创造呼吸感

### 2. 深色优先 (Dark First)

- 深色主题作为默认体验
- 减少眼部疲劳，适合长时间使用
- 通过明暗对比突出内容层次

### 3. 微交互 (Micro-interactions)

- 悬停反馈提供即时响应
- 点击涟漪效果增强触感
- 平滑的状态过渡动画

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

### 主色调 - 青绿色系 (Teal)

Veloform 采用青绿色作为品牌主色，象征速度、科技与自然的融合。

```css
/* 主色调完整色阶 */
--primary-50: #f0fdfa;
--primary-100: #ccfbf1;
--primary-200: #99f6e4;
--primary-300: #5eead4;
--primary-400: #2dd4bf;
--primary-500: #14b8a6;  /* 主色基准 */
--primary-600: #0d9488;
--primary-700: #0f766e;
--primary-800: #115e59;
--primary-900: #134e4a;
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
  /* 背景色 */
  --background: #fafafa;       /* 页面主背景 */
  --foreground: #09090b;       /* 主文本色 */
  --surface: #ffffff;          /* 卡片/表面背景 */
  --border: #e4e4e7;           /* 默认边框 */
  --muted: #a1a1aa;            /* 弱化文本 */
  --color-primary: #2563eb;    /* 主色（浅色主题） */
  --color-secondary: #f4f4f5;  /* 次表面色 */
  --color-accent: #d97706;     /* 强调色 */
}
```

#### 深色主题 (Dark Theme)

```css
.dark {
  /* 背景色 */
  --background: #09090b;       /* 页面主背景 */
  --foreground: #fafafa;       /* 主文本色 */
  --surface: #18181b;          /* 卡片/表面背景 */
  --border: #27272a;           /* 默认边框 */
  --muted: #71717a;            /* 弱化文本 */
  --color-primary: #3b82f6;    /* 主色（深色主题） */
  --color-secondary: #18181b;  /* 次表面色 */
  --color-accent: #f59e0b;     /* 强调色 */
}
```

### 功能色

```css
/* 成功 - 绿色 */
--success: #22c55e;
--success-bg: rgba(34, 197, 94, 0.1);

/* 警告 - 黄色 */
--warning: #eab308;
--warning-bg: rgba(234, 179, 8, 0.1);

/* 错误 - 红色 */
--error: #ef4444;
--error-bg: rgba(239, 68, 68, 0.1);

/* 信息 - 蓝色 */
--info: #3b82f6;
--info-bg: rgba(59, 130, 246, 0.1);
```

### 强调色 - 琥珀色 (Amber)

```css
--accent: #f59e0b;
```

**使用场景**：
- 价格高亮显示
- 重要提示标记
- 特殊功能入口

### Tailwind CSS 配置

```typescript
// tailwind.config.ts
const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          dark: '#09090b',
          light: '#fafafa',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          dark: '#fafafa',
          light: '#09090b',
        },
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          DEFAULT: '#14b8a6',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          dark: '#18181b',
          light: '#ffffff',
        },
        border: {
          DEFAULT: 'var(--border)',
          dark: '#27272a',
          light: '#e4e4e7',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          dark: '#71717a',
          light: '#71717a',
        },
        accent: '#f59e0b',
        success: '#22c55e',
        warning: '#eab308',
        error: '#ef4444',
        info: '#3b82f6',
      },
    },
  },
};
```

---

## 字体系统

### 字体家族

```css
/* 标题字体 - Space Grotesk */
.font-display {
  font-family: 'Space Grotesk', sans-serif;
}

/* 正文字体 - Inter */
.font-body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 等宽字体 - 代码显示 */
.font-mono {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### 字体权重

| 权重 | 值 | 用途 |
|------|-----|------|
| Light | 300 | 辅助说明文字 |
| Regular | 400 | 正文内容 |
| Medium | 500 | 按钮、标签、表单 |
| SemiBold | 600 | 小标题、强调文本 |
| Bold | 700 | 主标题、关键数据 |

### 字号层级

基于 1.25  Major Third 比例尺：

```css
/* 基础层级 */
.text-xs    { font-size: 0.75rem; }    /* 12px */
.text-sm    { font-size: 0.875rem; }   /* 14px */
.text-base  { font-size: 1rem; }       /* 16px - 正文基准 */
.text-lg    { font-size: 1.125rem; }   /* 18px */
.text-xl    { font-size: 1.25rem; }    /* 20px */
.text-2xl   { font-size: 1.5rem; }     /* 24px */
.text-3xl   { font-size: 1.875rem; }   /* 30px */
.text-4xl   { font-size: 2.25rem; }    /* 36px */
.text-5xl   { font-size: 3rem; }       /* 48px */
.text-6xl   { font-size: 3.75rem; }    /* 60px */
```

### 行高

```css
.leading-none   { line-height: 1; }
.leading-tight  { line-height: 1.25; }
.leading-snug   { line-height: 1.375; }
.leading-normal { line-height: 1.5; }   /* 正文默认 */
.leading-relaxed { line-height: 1.625; }
.leading-loose  { line-height: 2; }
```

### 字间距

```css
.tracking-tighter { letter-spacing: -0.05em; }
.tracking-tight   { letter-spacing: -0.025em; }
.tracking-normal  { letter-spacing: 0; }      /* 默认 */
.tracking-wide    { letter-spacing: 0.025em; }
.tracking-wider   { letter-spacing: 0.05em; }
.tracking-widest  { letter-spacing: 0.1em; }
```

---

## 间距系统

### 基础单位

基于 4px 网格系统（Tailwind 默认）：

```css
/* 间距映射表 */
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

| 组件类型 | Padding | 示例 |
|----------|---------|------|
| 按钮 (sm) | `px-3 py-1.5` | 小按钮 |
| 按钮 (md) | `px-4 py-2` | 默认按钮 |
| 按钮 (lg) | `px-6 py-3` | 大按钮 |
| 卡片 | `p-4` 或 `p-6` | 内容卡片 |
| 模态框 | `p-6` | 模态框内容区 |
| 输入框 | `px-3 py-2` | 表单输入 |

### 组件外边距规范

```css
/* 列表项间距 */
.space-y-2 > * + * { margin-top: 0.5rem; }   /* 8px */
.space-y-4 > * + * { margin-top: 1rem; }     /* 16px */
.space-y-6 > * + * { margin-top: 1.5rem; }   /* 24px */

/* 区块间距 */
.section-gap { gap: 2rem; }     /* 32px */
.page-gap { gap: 3rem; }        /* 48px */
```

---

## 圆角系统

```css
.rounded-none   { border-radius: 0; }
.rounded-sm     { border-radius: 0.25rem; }   /* 4px */
.rounded-md     { border-radius: 0.375rem; }  /* 6px - 小组件 */
.rounded-lg     { border-radius: 0.5rem; }    /* 8px - 默认 */
.rounded-xl     { border-radius: 0.75rem; }   /* 12px - 卡片 */
.rounded-2xl    { border-radius: 1rem; }      /* 16px - 大卡片 */
.rounded-3xl    { border-radius: 1.5rem; }    /* 24px - 模态框 */
.rounded-full   { border-radius: 9999px; }    /* 完全圆角 */
```

**使用规范**：

| 元素 | 圆角 | 说明 |
|------|------|------|
| 按钮 | `rounded-full` | 胶囊形状 |
| 小图标容器 | `rounded-md` | 6px |
| 卡片 | `rounded-xl` | 12px |
| 模态框 | `rounded-2xl` | 16px |
| 头像 | `rounded-full` | 圆形 |
| 标签/徽章 | `rounded-full` | 胶囊形状 |

---

## 阴影系统

```css
/* 预设阴影 */
.shadow-xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.shadow-sm {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
              0 1px 2px -1px rgba(0, 0, 0, 0.1);
}
.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -2px rgba(0, 0, 0, 0.1);
}
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -4px rgba(0, 0, 0, 0.1);
}
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 8px 10px -6px rgba(0, 0, 0, 0.1);
}
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

**使用场景**：

| 元素 | 阴影 | 说明 |
|------|------|------|
| 卡片（默认） | `shadow-md` | 轻微浮起感 |
| 卡片（悬停） | `shadow-lg` | 悬停时加深 |
| 下拉菜单 | `shadow-lg` | 明显层级 |
| 模态框遮罩 | `shadow-2xl` | 最高层级 |
| Toast 通知 | `shadow-lg` | 悬浮效果 |

---

## 动画系统

### 预设动画

Veloform 在 Tailwind CSS 配置中预定义了常用动画：

```typescript
// tailwind.config.ts
animation: {
  "fade-in": "fadeIn 0.3s ease-out",
  "slide-up": "slideUp 0.4s ease-out",
  "slide-in-right": "slideInRight 0.4s ease-out",
  pulse: "pulse 1s ease-in-out infinite",
  "pulse-slow": "pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  float: "float 6s ease-in-out infinite",
},
keyframes: {
  fadeIn: {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" },
  },
  slideUp: {
    "0%": { opacity: "0", transform: "translateY(10px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
  slideInRight: {
    "0%": { opacity: "0", transform: "translateX(20px)" },
    "100%": { opacity: "1", transform: "translateX(0)" },
  },
  pulse: {
    "0%, 100%": { opacity: "1" },
    "50%": { opacity: "0.5" },
  },
  "pulse-slow": {
    "0%, 100%": { opacity: "1" },
    "50%": { opacity: "0.7" },
  },
  float: {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-10px)" },
  },
},
```

### 过渡时长

```css
.duration-75   { transition-duration: 75ms; }    /* 快速反馈 */
.duration-100  { transition-duration: 100ms; }   /* 标准快速 */
.duration-150  { transition-duration: 150ms; }   /* 默认 */
.duration-200  { transition-duration: 200ms; }   /* 标准 */
.duration-300  { transition-duration: 300ms; }   /* 慢速 */
.duration-500  { transition-duration: 500ms; }   /* 很慢 */
```

### 缓动函数

```css
/* 标准缓动 */
.ease-linear    { transition-timing-function: linear; }
.ease-in        { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }
.ease-out       { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }
.ease-in-out    { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }  /* 默认 */
```

### Framer Motion 配置

```typescript
// 标准过渡配置
const transition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1],  // ease-in-out
};

// 弹簧动画
const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// 页面转场
const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3,
};
```

---

## 组件库规范

### 通用组件类

Veloform 定义了若干通用组件类，可直接在 CSS 中使用：

```css
/* 玻璃态卡片 */
.glass-card {
  @apply bg-surface/60 backdrop-blur-xl border border-border/50;
}

/* 标准卡片 */
.card {
  @apply bg-surface border border-border rounded-xl transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5;
}

/* 激活状态卡片 */
.card-active {
  @apply border-primary shadow-[0_0_0_1px_var(--tw-shadow-color)] shadow-primary/20;
}

/* 组件选择项 */
.component-item {
  @apply flex items-center gap-4 p-4 bg-surface border border-border rounded-lg cursor-pointer transition-all duration-300 hover:border-primary/30 hover:bg-zinc-100 dark:hover:bg-zinc-800/30;
}

/* 发光按钮效果 */
.btn-glow {
  @apply relative overflow-hidden;
}

.btn-glow::before {
  content: '';
  @apply absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500;
}

.btn-glow:hover::before {
  @apply translate-x-full;
}
```

### 背景效果

```css
/* 渐变网格背景 */
.gradient-mesh {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.4;
  background-image: 
    radial-gradient(at 20% 30%, rgba(59, 130, 246, 0.08) 0px, transparent 50%),
    radial-gradient(at 80% 70%, rgba(245, 158, 11, 0.06) 0px, transparent 50%),
    radial-gradient(at 50% 50%, rgba(59, 130, 246, 0.04) 0px, transparent 70%);
  pointer-events: none;
}

/* 深色主题下的渐变网格 */
.dark .gradient-mesh {
  background-image: 
    radial-gradient(at 20% 30%, rgba(20, 184, 166, 0.08) 0px, transparent 50%),
    radial-gradient(at 80% 70%, rgba(245, 158, 11, 0.06) 0px, transparent 50%),
    radial-gradient(at 50% 50%, rgba(20, 184, 166, 0.04) 0px, transparent 70%);
}

/* 噪点背景 */
.noise-bg {
  position: relative;
  overflow: hidden;
}

.noise-bg::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,...");
  pointer-events: none;
  z-index: -1;
}
```

### 文字效果

```css
/* 渐变文字 */
.text-gradient {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-accent;
}

/* 发光阴影 */
.shadow-glow {
  @apply shadow-lg shadow-primary/20;
}
```

### 工具类

```css
/* 隐藏滚动条 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

### 按钮 (Button)

#### 变体

```tsx
// Primary - 主要操作
<Button variant="primary">保存配置</Button>

// Secondary - 次要操作
<Button variant="secondary">取消</Button>

// Accent - 强调操作
<Button variant="accent">强调</Button>

// Outline - 轮廓按钮
<Button variant="outline">轮廓</Button>

// Ghost - 轻量操作
<Button variant="ghost">查看更多</Button>

// Danger - 危险操作
<Button variant="danger">删除</Button>
```

#### 尺寸

```tsx
<Button size="sm">小按钮</Button>   // px-4 py-2 text-sm min-h-[36px]
<Button size="md">默认按钮</Button> // px-6 py-2.5 text-base min-h-[44px]
<Button size="lg">大按钮</Button>   // px-8 py-3.5 text-lg min-h-[52px]
<Button size="icon">图标按钮</Button> // p-2.5 min-w-[44px] min-h-[44px]
```

#### 状态

```tsx
<Button disabled>禁用</Button>
<Button isLoading>加载中...</Button>
<Button leftIcon={<SaveIcon />}>带左侧图标</Button>
<Button rightIcon={<ArrowRight />}>带右侧图标</Button>
```

**样式特征**：
- 圆角：`rounded-full`（胶囊形状）
- 字体：`font-semibold`
- 动画：悬停缩放 `scale: 1.02`，点击缩放 `scale: 0.96`
- 过渡：`duration-300`
- 焦点：`focus:ring-2 focus:ring-primary/50 focus:ring-offset-2`

### 卡片 (Card)

```tsx
<Card variant="default" hover={true} padding="md">
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述文字</CardDescription>
  </CardHeader>
  <CardContent>
    <p>卡片内容</p>
  </CardContent>
  <CardFooter>
    <Button>操作</Button>
  </CardFooter>
</Card>
```

#### 变体

```tsx
// Default - 默认卡片
<Card variant="default">默认卡片</Card>

// Stat - 统计卡片
<Card variant="stat">统计卡片</Card>

// Component - 组件卡片
<Card variant="component">组件卡片</Card>

// Glass - 玻璃态卡片
<Card variant="glass">玻璃态卡片</Card>
```

#### 内边距

```tsx
<Card padding="none">无内边距</Card>
<Card padding="sm">小内边距</Card>  // p-4
<Card padding="md">中内边距</Card>  // p-5
<Card padding="lg">大内边距</Card>  // p-6
```

**样式特征**：
- 圆角：`rounded-2xl`
- 动画：悬停 `scale: 1.02, y: -2`
- 过渡：`duration-300`
- 阴影：悬停时 `hover:shadow-xl hover:shadow-primary/5`

### 模态框 (Modal)

```tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalHeader>
    <ModalTitle>标题</ModalTitle>
    <ModalClose onClick={onClose} />
  </ModalHeader>
  <ModalBody>
    <p>模态框内容</p>
  </ModalBody>
  <ModalFooter>
    <Button variant="secondary" onClick={onClose}>取消</Button>
    <Button onClick={onConfirm}>确认</Button>
  </ModalFooter>
</Modal>
```

**样式特征**：
- 遮罩：`fixed inset-0 bg-black/50 backdrop-blur-sm`
- 内容：`bg-surface rounded-2xl shadow-2xl`
- 最大宽度：`max-w-lg` (桌面), `w-[90vw]` (移动)
- 动画：`scaleIn` + `fadeIn`

### 输入框 (Input)

```tsx
<Input
  label="配置名称"
  placeholder="输入名称..."
  value={name}
  onChange={handleChange}
  error={errorMessage}
/>
```

**样式特征**：
- 背景：`bg-background`
- 边框：`border border-border`
- 圆角：`rounded-lg`
- 内边距：`px-3 py-2`
- 焦点：`focus:ring-2 focus:ring-primary/20 focus:border-primary`
- 错误：`border-error focus:ring-error/20`

### Toast 通知

```typescript
// 使用方式
showToast('配置已保存', 'success');
showToast('保存失败', 'error');
showToast('加载中...', 'info');
```

**样式特征**：
- 位置：`fixed top-4 right-4`
- 宽度：`w-80`
- 背景：`bg-surface`
- 边框：根据类型着色
- 动画：`slideInRight`
- 自动消失：3 秒

### 徽章 (Badge)

```tsx
<Badge variant="default">默认</Badge>
<Badge variant="success">成功</Badge>
<Badge variant="warning">警告</Badge>
<Badge variant="error">错误</Badge>
```

**样式特征**：
- 背景：半透明功能色
- 文字：对应功能色
- 圆角：`rounded-full`
- 内边距：`px-2 py-0.5`
- 字体：`text-xs font-medium`

---

## 布局规范

### 网格系统

```css
/* 基础网格 */
.grid-cols-1    /* 单列（移动）*/
.grid-cols-2    /* 双列（平板）*/
.grid-cols-3    /* 三列（桌面）*/
.grid-cols-4    /* 四列（大桌面）*/

/* 间距 */
.gap-4   /* 16px */
.gap-6   /* 24px */
.gap-8   /* 32px */
```

### Flexbox 布局

```css
/* 水平排列 */
.flex items-center gap-4

/* 垂直排列 */
.flex flex-col gap-4

/* 两端对齐 */
.flex justify-between items-center

/* 居中 */
.flex justify-center items-center
```

### 响应式断点

```css
/* Mobile First */
@media (min-width: 640px) { /* sm - 小平板 */ }
@media (min-width: 768px) { /* md - 平板 */ }
@media (min-width: 1024px) { /* lg - 桌面 */ }
@media (min-width: 1280px) { /* xl - 大桌面 */ }
@media (min-width: 1536px) { /* 2xl - 超大桌面 */ }
```

---

## 可访问性 (A11y)

### 色彩对比度

遵循 WCAG 2.1 AA 标准：

| 组合 | 对比度 | 等级 |
|------|--------|------|
| 主文本 / 背景 | 16.5:1 | AAA |
| 次要文本 / 背景 | 7.2:1 | AAA |
| 主色 / 背景 | 8.1:1 | AAA |
| 功能色 / 背景 | ≥ 4.5:1 | AA |

### 键盘导航

```tsx
// 所有交互元素必须支持键盘操作
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  按钮文本
</button>
```

### ARIA 属性

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">标题</h2>
  <p id="modal-description">描述</p>
</div>
```

### 焦点管理

```tsx
// 模态框打开时聚焦到第一个可交互元素
useEffect(() => {
  if (isOpen) {
    firstInputRef.current?.focus();
  }
}, [isOpen]);

// 关闭时恢复焦点
useEffect(() => {
  return () => {
    triggerRef.current?.focus();
  };
}, []);
```

---

## 暗色/亮色主题

### 主题系统概述

Veloform 使用 Tailwind CSS 的 `darkMode: 'class'` 策略，配合 CSS 变量实现完整的主题切换功能。

### 全局样式配置

```css
@layer base {
  /* 浅色主题（默认） */
  :root {
    --background: #fafafa;
    --foreground: #09090b;
    --surface: #ffffff;
    --border: #e4e4e7;
    --muted: #71717a;
  }

  /* 深色主题 */
  .dark {
    --background: #09090b;
    --foreground: #fafafa;
    --surface: #18181b;
    --border: #27272a;
    --muted: #71717a;
  }

  /* 基础样式 */
  * {
    @apply border-border;
    box-sizing: border-box;
  }

  body {
    @apply bg-background text-foreground font-sans min-h-screen antialiased;
    margin: 0;
    padding: 0;
  }
}
```

### 主题切换组件实现

```tsx
'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="切换主题"
      className="p-2 rounded-full hover:bg-surface transition-colors"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
```

### 响应式主题类使用

```tsx
// 使用 Tailwind 响应式类
<div className="bg-surface border border-border dark:bg-zinc-900 dark:border-zinc-700">
  内容
</div>

// 使用自定义组件类
<div className="component-item">
  组件项
</div>
```

### 深色主题下的特定样式

```css
/* 在 globals.css 中定义的深色主题特定样式 */
.dark .gradient-mesh {
  background-image: 
    radial-gradient(at 20% 30%, rgba(20, 184, 166, 0.08) 0px, transparent 50%),
    radial-gradient(at 80% 70%, rgba(245, 158, 11, 0.06) 0px, transparent 50%),
    radial-gradient(at 50% 50%, rgba(20, 184, 166, 0.04) 0px, transparent 70%);
}

/* 使用 Tailwind dark: 前缀 */
.component-item {
  @apply hover:bg-zinc-100 dark:hover:bg-zinc-800/30;
}
```

### 页脚组件 (Footer)

页脚组件包含品牌信息、导航链接、社交链接和版本号显示，适配深色/浅色主题：

```tsx
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border py-6 sm:py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* 品牌标识 */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary via-primary to-accent rounded-xl sm:rounded-2xl flex items-center justify-center">
              <span className="text-sm sm:text-lg font-bold text-white">V</span>
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-sm sm:text-base">
                {APP_CONSTANTS.APP_INFO.name}
              </p>
              <p className="text-xs text-muted hidden sm:block">
                {APP_CONSTANTS.APP_INFO.tagline}
              </p>
            </div>
          </div>

          {/* 导航链接 */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="https://github.com/sutchan/Veloform" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
            </Link>
            <span className="text-sm text-muted">|</span>
            <Link href="#">About</Link>
            <Link href="#">Support</Link>
            <Link href="#">Privacy</Link>
          </div>

          {/* 版权信息 */}
          <p className="text-xs sm:text-sm text-muted flex items-center gap-1">
            © {currentYear} {APP_CONSTANTS.APP_INFO.name}. Built with{' '}
            <Heart className="w-3 h-3 text-primary inline" />.
            <span className="hidden sm:inline ml-2">v{APP_CONSTANTS.APP_INFO.version}</span>
          </p>
        </div>

        {/* 版本号 */}
        <div className="mt-4 pt-4 border-t border-border/50 text-center">
          <p className="text-xs text-muted">
            Version {APP_CONSTANTS.APP_INFO.version}
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**样式特征**：
- 背景：`bg-surface`
- 边框：`border-t border-border`
- 间距：`py-6 sm:py-8`
- 动画：链接悬停 `hover:text-foreground transition-colors`
- 响应式：移动端单列，桌面端三列布局

---

## 相关文档

- [原型图说明](../prototype-guide.md)
- [设计审查与优化建议](./design-review.md)
- [组件设计规范](../architecture/component-design.md)
- [编码规范](../development/coding-standards.md)

---

## 版本历史

| 版本 | 日期 | 变更内容 |
|------|------|---------|
| v1.3.0 | 2026-06-04 | 更新 Button、Card、Footer 组件文档与实际代码完全对齐，完善样式特征描述 |
| v1.2.0 | 2026-06-04 | 更新主题系统实现细节，新增通用组件类、背景效果、文字效果规范，补充页脚组件文档 |
| v1.0.0 | 2026-06-01 | 初始版本，建立完整 UI 设计系统规范 |

---

**文档路径**: `/openspec/design/ui-design-system.md`  
**最后更新**: 2026-06-04  
**版本**: v1.3.0
