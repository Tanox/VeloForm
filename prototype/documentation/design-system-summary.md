# Veloform 设计系统摘要

> **路径**: `/prototype/documentation/design-system-summary.md`  
> **版本**: v1.0.0  
> **日期**: 2026-06-06

---

## 概述

本文档是 Veloform 设计系统的快速参考摘要，提供核心设计规范的概览。

完整设计系统文档请参考：[openspec/design/ui-design-system.md](../../openspec/design/ui-design-system.md)

---

## 颜色系统

### 主色调 - Teal

| 色阶 | 色值 | 使用场景 |
|------|------|----------|
| 50 | #f0fdfa | 背景、悬停状态 |
| 100 | #ccfbf1 | 次要背景 |
| 200 | #99f6e4 | 边框、线条 |
| 300 | #5eead4 | 次要按钮 |
| 400 | #2dd4bf | 链接、图标 |
| 500 | #14b8a6 | **主色调**、主按钮 |
| 600 | #0d9488 | 悬停状态 |
| 700 | #0f766e | 激活状态 |
| 800 | #115e59 | 深色背景 |
| 900 | #134e4a | 极深背景 |

### 主题变量

```css
/* 浅色主题 */
:root {
  --background: #fafafa;
  --foreground: #09090b;
  --surface: #ffffff;
  --border: #e4e4e7;
  --muted: #71717a;
  --color-primary: #2563eb;
  --color-accent: #d97706;
}

/* 深色主题 */
.dark {
  --background: #09090b;
  --foreground: #fafafa;
  --surface: #18181b;
  --border: #27272a;
  --muted: #71717a;
  --color-primary: #3b82f6;
  --color-accent: #f59e0b;
}
```

### 功能色

| 用途 | 色值 |
|------|------|
| 成功 | #22c55e |
| 警告 | #eab308 |
| 错误 | #ef4444 |
| 信息 | #3b82f6 |

---

## 字体系统

### 字体家族

```css
/* 标题字体 */
.font-display {
  font-family: 'Space Grotesk', sans-serif;
}

/* 正文字体 */
.font-body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* 等宽字体 */
.font-mono {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### 字体层级

| 层级 | 字号 | 字重 | 使用场景 |
|------|------|------|----------|
| H1 | 2.25rem (36px) | 700 Bold | 页面标题 |
| H2 | 1.875rem (30px) | 600 Semibold | 主要章节 |
| H3 | 1.5rem (24px) | 600 Semibold | 次要章节 |
| H4 | 1.25rem (20px) | 600 Semibold | 小组标题 |
| Body | 1rem (16px) | 400 Regular | 正文内容 |
| Small | 0.875rem (14px) | 400 Regular | 辅助文本 |
| X-Small | 0.75rem (12px) | 400 Regular | 标签、说明 |

---

## 间距系统

| 类名 | 值 | 使用场景 |
|------|----|----------|
| space-1 | 0.25rem (4px) | 微小间距 |
| space-2 | 0.5rem (8px) | 小组件间距 |
| space-3 | 0.75rem (12px) | 元素内间距 |
| space-4 | 1rem (16px) | 标准间距 |
| space-5 | 1.25rem (20px) | 内容间距 |
| space-6 | 1.5rem (24px) | 区块间距 |
| space-8 | 2rem (32px) | 大区块间距 |
| space-10 | 2.5rem (40px) | 页面间距 |
| space-12 | 3rem (48px) | 大页面间距 |

---

## 圆角系统

| 类名 | 值 | 使用场景 |
|------|----|----------|
| rounded-sm | 0.375rem (6px) | 小组件 |
| rounded-md | 0.5rem (8px) | 默认组件 |
| rounded-lg | 0.75rem (12px) | 卡片 |
| rounded-xl | 1rem (16px) | 大卡片 |
| rounded-2xl | 1.5rem (24px) | 模态框 |
| rounded-full | 9999px | 按钮、徽章 |

---

## 阴影系统

| 类名 | 说明 |
|------|------|
| shadow-sm | 轻微阴影 |
| shadow-md | 标准阴影 |
| shadow-lg | 大阴影 |
| shadow-xl | 特大阴影 |
| shadow-2xl | 超大阴影 |

---

## 组件规范

### Button

```tsx
// 变体
<Button variant="primary">主要</Button>
<Button variant="secondary">次要</Button>
<Button variant="outline">轮廓</Button>
<Button variant="ghost">幽灵</Button>
<Button variant="danger">危险</Button>

// 尺寸
<Button size="sm">小</Button>
<Button size="md">中</Button>
<Button size="lg">大</Button>
<Button size="icon">图标</Button>
```

### Card

```tsx
<Card variant="default" padding="md">
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述</CardDescription>
  </CardHeader>
  <CardContent>
    内容
  </CardContent>
  <CardFooter>
    操作
  </CardFooter>
</Card>
```

### Modal

```tsx
<Modal isOpen={isOpen} onClose={onClose}>
  <ModalHeader>
    <ModalTitle>标题</ModalTitle>
  </ModalHeader>
  <ModalBody>
    内容
  </ModalBody>
  <ModalFooter>
    操作
  </ModalFooter>
</Modal>
```

---

## 响应式断点

| 断点 | 宽度 | 设备 |
|------|------|------|
| sm | 640px | 小平板 |
| md | 768px | 平板 |
| lg | 1024px | 桌面 |
| xl | 1280px | 大桌面 |
| 2xl | 1536px | 超大桌面 |

---

## 通用组件类

### 玻璃态卡片

```css
.glass-card {
  @apply bg-surface/60 backdrop-blur-xl border border-border/50;
}
```

### 标准卡片

```css
.card {
  @apply bg-surface border border-border rounded-xl transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5;
}
```

### 渐变文字

```css
.text-gradient {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-accent;
}
```

### 发光阴影

```css
.shadow-glow {
  @apply shadow-lg shadow-primary/20;
}
```

---

## 背景效果

### 渐变网格背景

```css
.gradient-mesh {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: 0.4;
  background-image: 
    radial-gradient(at 20% 30%, rgba(20, 184, 166, 0.08) 0px, transparent 50%),
    radial-gradient(at 80% 70%, rgba(245, 158, 11, 0.06) 0px, transparent 50%),
    radial-gradient(at 50% 50%, rgba(20, 184, 166, 0.04) 0px, transparent 70%);
  pointer-events: none;
}
```

---

## 可访问性

### 对比度要求

- 文本/背景：≥ 4.5:1 (WCAG AA)
- 大文本：≥ 3:1
- 图标/图形：≥ 3:1

### 触摸目标

- 最小：44x44px
- 推荐：48x48px

---

## 相关文档

- [完整设计系统](../../openspec/design/ui-design-system.md)
- [UI/UX 优化建议](../design/ui-recommendations.md)
- [组件映射表](./component-mapping.md)

---

**文档路径**: `/prototype/documentation/design-system-summary.md`  
**最后更新**: 2026-06-06  
**版本**: v1.0.0
