# Veloform 响应式设计指南

> **路径**: `/prototype/design/responsive-guidelines.md`  
> **版本**: v1.0.0  
> **日期**: 2026-06-06

---

## 概述

本文档定义 Veloform 项目的响应式设计规范，确保在各种设备上都能提供优秀的用户体验。

## 断点系统

### Tailwind CSS 断点

| 断点 | 宽度范围 | 设备类型 | 主要布局 |
|------|----------|----------|----------|
| `sm` | ≥ 640px | 小平板 | 单列 → 双列过渡 |
| `md` | ≥ 768px | 平板 | 双列布局 |
| `lg` | ≥ 1024px | 桌面 | 三列布局 |
| `xl` | ≥ 1280px | 大桌面 | 完整功能展示 |
| `2xl` | ≥ 1536px | 超大桌面 | 宽屏优化 |

### 移动优先策略

```tsx
// 移动优先的组件实现
<Component 
  className="
    text-sm          // 基础（移动）
    md:text-base     // 平板
    lg:text-lg       // 桌面
  " 
/>
```

---

## 布局规范

### 移动端（< 768px）

#### 布局结构

```
┌─────────────────────┐
│   固定顶部导航栏     │ ← sticky, z-40
├─────────────────────┤
│                     │
│    主要内容区域     │
│                     │
│   - 车型选择器      │
│   - BuildList       │
│   - ...             │
│                     │
├─────────────────────┤
│   固定底部操作栏     │ ← glass card, z-40
└─────────────────────┘
```

#### 具体规范

```tsx
// 页面容器
<div className="px-4 sm:px-6 lg:px-8 py-6">
  内容
</div>

// 卡片间距
<div className="space-y-4 md:space-y-6">
  卡片
</div>

// 网格布局
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  项目
</div>
```

### 平板端（768px - 1023px）

#### 布局结构

```
┌─────────────────────────────┐
│       顶部导航栏            │
├───────────────┬─────────────┤
│               │             │
│   主内容区    │  汇总面板   │
│   (70%)       │   (30%)     │
│               │             │
└───────────────┴─────────────┘
```

### 桌面端（≥ 1024px）

#### 布局结构

```
┌─────────────────────────────────────────┐
│           顶部导航栏                      │
├──────────────┬──────────────┬────────────┤
│              │              │            │
│   左侧栏     │  主内容区    │  右侧栏    │
│   (20%)      │   (50%)      │   (30%)    │
│              │              │            │
└──────────────┴──────────────┴────────────┘
```

---

## 组件响应式规范

### Button 组件

```tsx
// 按钮尺寸响应式
<Button 
  className="
    px-3 py-1.5 text-sm    // 移动端
    md:px-4 md:py-2         // 平板
    lg:px-6 lg:py-3         // 桌面
  " 
/>

// 按钮排列
<div className="flex flex-col sm:flex-row gap-3">
  <Button className="w-full sm:w-auto">按钮</Button>
</div>
```

### Card 组件

```tsx
// 卡片内边距
<Card className="
  p-4          // 移动端
  md:p-5       // 平板
  lg:p-6       // 桌面
">
  内容
</Card>
```

### Modal 组件

```tsx
// 模态框尺寸
<Modal className="
  w-[90vw]            // 移动端
  md:w-[500px]        // 平板
  lg:w-[600px]        // 桌面
  max-h-[85vh]        // 所有设备
">
  内容
</Modal>
```

---

## 触摸交互优化

### 触摸目标尺寸

```tsx
// 所有交互元素 ≥ 44x44px
<button className="
  min-h-[44px] 
  min-w-[44px] 
  flex items-center justify-center
">
  <Icon />
</button>

// 列表项
<div className="
  py-3         // 足够的垂直间距
  touch-none   // 禁用文本选择
  select-none
">
  列表项
</div>
```

### 手势支持

```tsx
// 使用 react-use-gesture 实现手势
import { useSwipeable } from 'react-swipeable';

function SwipeableComponent() {
  const handlers = useSwipeable({
    onSwipedLeft: () => nextBikeType(),
    onSwipedRight: () => prevBikeType(),
    trackMouse: true,
  });
  
  return <div {...handlers}>内容</div>;
}
```

### 触觉反馈

```tsx
// 轻触反馈
const hapticLight = () => {
  if (navigator.vibrate) {
    navigator.vibrate(10);
  }
};

// 中等强度反馈
const hapticMedium = () => {
  if (navigator.vibrate) {
    navigator.vibrate([10, 50, 10]);
  }
};

// 成功反馈
const hapticSuccess = () => {
  if (navigator.vibrate) {
    navigator.vibrate([10, 50, 10, 50, 20]);
  }
};
```

---

## 排版响应式规范

### 字体层级

```tsx
// H1 标题
<h1 className="
  text-2xl sm:text-3xl 
  md:text-4xl lg:text-5xl
  font-display font-bold tracking-tight
">
  标题
</h1>

// H2 标题
<h2 className="
  text-xl sm:text-2xl
  md:text-3xl
  font-display font-semibold
">
  子标题
</h2>

// 正文
<p className="
  text-sm sm:text-base
  leading-relaxed
">
  正文内容
</p>
```

### 间距响应式

```tsx
// 段落间距
<p className="
  mb-2 sm:mb-3 md:mb-4
">
  段落
</p>

// 区块间距
<section className="
  mb-6 sm:mb-8 md:mb-10
">
  区块
</section>
```

---

## 响应式动画优化

### 移动端性能优化

```tsx
// 移动端减少复杂动画
const isMobile = useMediaQuery('(max-width: 768px)');

const variants = isMobile ? {
  // 简化版本
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} : {
  // 桌面版复杂动画
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300 }
  }
};
```

### 渐进式动画加载

```tsx
// 基于设备能力的动画策略
const canAnimate = () => {
  if (typeof window === 'undefined') return false;
  
  // 检查减少动画偏好
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  
  if (prefersReducedMotion) return false;
  
  return true;
};
```

---

## 测试检查清单

### 各设备测试

- [ ] iPhone SE (375x667)
- [ ] iPhone 14 Pro (393x852)
- [ ] iPad Mini (768x1024)
- [ ] iPad Pro (1024x1366)
- [ ] 笔记本 (1366x768)
- [ ] 桌面 (1920x1080)
- [ ] 宽屏 (2560x1440)

### 功能测试

- [ ] 所有交互元素可访问
- [ ] 键盘导航完整
- [ ] 触摸操作流畅
- [ ] 响应式布局无溢出
- [ ] 字体层级清晰
- [ ] 图片加载正确
- [ ] 模态框适配各屏幕

### 性能测试

- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] 移动端动画 60fps

---

## 相关文档

- [UI 设计系统](../../openspec/design/ui-design-system.md)
- [UI/UX 优化建议](./ui-recommendations.md)
- [可访问性指南](./accessibility-guidelines.md)

---

**文档路径**: `/prototype/design/responsive-guidelines.md`  
**最后更新**: 2026-06-06  
**版本**: v1.0.0
