# UI 设计系统

> **路径**: `/openspec/design/ui-design-system.md`  
> **版本**: v1.0.0  
> **更新日期**: 2026-06-01

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
:root {
  /* 主色调 */
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
}
```

**使用场景**：
- 主要按钮背景
- 激活状态指示
- 链接和交互元素
- 进度条和加载状态

### 中性色 - 锌色系 (Zinc)

```css
:root {
  /* 背景色 */
  --background: #09090b;       /* 页面主背景 */
  --surface: #18181b;          /* 卡片/表面背景 */
  --surface-hover: #27272a;    /* 悬停状态 */
  --surface-active: #3f3f46;   /* 激活状态 */
  
  /* 边框 */
  --border: #27272a;           /* 默认边框 */
  --border-light: #3f3f46;     /* 浅色边框 */
  
  /* 文本 */
  --text-primary: #fafafa;     /* 主文本 */
  --text-secondary: #a1a1aa;   /* 次要文本 */
  --text-muted: #71717a;       /* 弱化文本 */
  --text-disabled: #52525b;    /* 禁用文本 */
}
```

### 功能色

```css
:root {
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
}
```

### 强调色 - 琥珀色 (Amber)

```css
:root {
  --accent: #f59e0b;
  --accent-light: #fbbf24;
  --accent-dark: #d97706;
}
```

**使用场景**：
- 价格高亮显示
- 重要提示标记
- 特殊功能入口

### Tailwind CSS 映射

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
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
        },
        background: '#09090b',
        surface: '#18181b',
        border: '#27272a',
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

### 关键帧动画

```css
/* 淡入 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 淡入上浮 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 缩放进入 */
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

/* 滑动进入（从右）*/
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 脉冲 */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 旋转 */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
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

### 按钮 (Button)

#### 变体

```tsx
// Primary - 主要操作
<Button variant="primary">保存配置</Button>

// Secondary - 次要操作
<Button variant="secondary">取消</Button>

// Ghost - 轻量操作
<Button variant="ghost">查看更多</Button>

// Danger - 危险操作
<Button variant="danger">删除</Button>
```

#### 尺寸

```tsx
<Button size="sm">小按钮</Button>   // px-3 py-1.5 text-sm
<Button size="md">默认按钮</Button> // px-4 py-2 text-base
<Button size="lg">大按钮</Button>   // px-6 py-3 text-lg
```

#### 状态

```tsx
<Button disabled>禁用</Button>
<Button loading>加载中...</Button>
<Button icon={<SaveIcon />}>带图标</Button>
```

### 卡片 (Card)

```tsx
<Card>
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

**样式特征**：
- 背景：`bg-surface`
- 边框：`border border-border`
- 圆角：`rounded-xl`
- 内边距：`p-4` 或 `p-6`
- 悬停：`hover:shadow-lg hover:-translate-y-0.5`

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

### 主题切换实现

```tsx
'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="切换主题"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
```

### 亮色主题变量

```css
[data-theme='light'] {
  --background: #ffffff;
  --surface: #f4f4f5;
  --border: #e4e4e7;
  --text-primary: #18181b;
  --text-secondary: #52525b;
  --text-muted: #71717a;
}
```

---

## 相关文档

- [原型图说明](../../prototype-guide.md)
- [组件设计规范](../architecture/component-design.md)
- [编码规范](../development/coding-standards.md)

---

**文档路径**: `/openspec/design/ui-design-system.md`  
**最后更新**: 2026-06-01  
**版本**: v1.0.0
