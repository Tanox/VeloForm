# Veloform 可访问性指南

> **路径**: `/prototype/design/accessibility-guidelines.md`  
> **版本**: v1.0.0  
> **日期**: 2026-06-06

---

## 概述

本文档定义 Veloform 项目的可访问性规范，确保应用对所有用户都可用，包括使用辅助技术的用户。

**目标标准**: WCAG 2.1 AA

---

## 色彩对比度

### 最小对比度要求

| 文本类型 | 对比度要求 | 规范 |
|----------|------------|------|
| 正常文本 (≥ 14px) | 4.5:1 | WCAG AA |
| 大文本 (≥ 18px/粗体 14px) | 3:1 | WCAG AA |
| 图标/图形 | 3:1 | WCAG AA |

### 颜色测试工具

```tsx
// 检查对比度的工具函数
function checkContrast(color1: string, color2: string): number {
  // 实现对比度检查逻辑
  // 返回对比度比例
}

// 使用示例
const contrast = checkContrast('#ffffff', '#14b8a6');
console.log(`对比度: ${contrast}:1`); // 应该 ≥ 4.5
```

### 不要仅依赖颜色传达信息

```tsx
// ❌ 仅用颜色表示状态
<span className="text-red-500">错误</span>

// ✅ 同时使用颜色和图标/文本
<div className="flex items-center gap-2">
  <AlertCircle className="w-4 h-4 text-red-500" />
  <span>错误信息</span>
</div>

// ✅ 使用 aria-label 增强
<button 
  aria-label="删除（红色）"
  className="text-red-500"
>
  <Trash2 className="w-4 h-4" />
</button>
```

---

## 键盘导航

### 焦点管理

```tsx
// 模态框焦点陷阱
function useModalFocus(isOpen: boolean, closeModal: () => void) {
  const modalRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 保存打开前的焦点
      prevFocusRef.current = document.activeElement as HTMLElement;
      // 聚焦模态框第一个元素
      focusRef.current?.focus();
    } else {
      // 恢复焦点
      prevFocusRef.current?.focus();
    }
  }, [isOpen]);

  // 处理 Tab 键循环
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements) {
          const first = focusableElements[0] as HTMLElement;
          const last = focusableElements[focusableElements.length - 1] as HTMLElement;

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    },
    [closeModal]
  );

  return { modalRef, focusRef, handleKeyDown };
}
```

### 焦点样式

```tsx
// 自定义焦点样式（不要禁用 outline）
.focusable-element {
  /* Tailwind 内置 focus-ring */
  @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background;
}

// 按钮示例
<button className="focusable-element">
  点击我
</button>
```

### 跳过链接

```tsx
// 页面顶部的跳过导航链接
<a 
  href="#main-content" 
  className="
    sr-only focus:not-sr-only 
    focus:fixed focus:top-4 focus:left-4 
    focus:z-50 focus:bg-primary focus:text-white 
    focus:px-4 focus:py-2 focus:rounded-lg
  "
>
  跳转到主要内容
</a>

<main id="main-content">
  主要内容
</main>
```

---

## ARIA 属性

### 角色和属性

```tsx
// 模态框
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <h2 id="modal-title">标题</h2>
  <p id="modal-description">描述</p>
</div>

// 标签页
<div role="tablist" aria-label="选择车型">
  <button 
    role="tab"
    aria-selected={isActive}
    aria-controls={`panel-${type}`}
    id={`tab-${type}`}
  >
    {type}
  </button>
</div>

<div 
  role="tabpanel"
  id={`panel-${type}`}
  aria-labelledby={`tab-${type}`}
  hidden={!isActive}
>
  内容
</div>

// 进度指示器
<div role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
  75%
</div>

// 列表
<div role="list" aria-label="自行车配置组件">
  {components.map((component) => (
    <div key={component.id} role="listitem">
      {component.name}
    </div>
  ))}
</div>
```

### 状态通知

```tsx
// Toast 通知
<div 
  role="alert" 
  aria-live="polite" 
  aria-atomic="true"
  className="fixed top-4 right-4"
>
  {message}
</div>

// 实时更新
<div aria-live="assertive" aria-atomic="true" className="sr-only">
  {statusMessage}
</div>
```

---

## 语义化 HTML

### 使用正确的元素

```tsx
// ❌ 不要用 div 做按钮
<div onClick={handleClick}>点击我</div>

// ✅ 使用语义化元素
<button onClick={handleClick}>点击我</button>

// ❌ 不要用 span 做标题
<span className="text-xl font-bold">标题</span>

// ✅ 使用正确的标题层级
<h2 className="text-xl font-bold">标题</h2>

// 页面结构
<header>
  <nav>导航</nav>
</header>
<main>
  <article>主要内容</article>
  <aside>侧边栏</aside>
</main>
<footer>页脚</footer>
```

### 表单可访问性

```tsx
// ✅ 正确的表单结构
<form>
  <div className="space-y-2">
    <label htmlFor="config-name" className="block text-sm font-medium">
      配置名称
    </label>
    <input
      id="config-name"
      type="text"
      required
      aria-required="true"
      aria-describedby="name-hint name-error"
      className="w-full px-3 py-2 border rounded-lg"
    />
    <p id="name-hint" className="text-sm text-muted">
      输入一个描述性的名称
    </p>
    {error && (
      <p id="name-error" className="text-sm text-red-500" role="alert">
        {error}
      </p>
    )}
  </div>
  
  <button type="submit" className="mt-4">
    保存
  </button>
</form>
```

---

## 屏幕阅读器支持

### 隐藏但可访问的文本

```tsx
// 仅屏幕阅读器可见
<span className="sr-only">
  这是仅屏幕阅读器能读取的文本
</span>

// 图标按钮
<button aria-label="删除配置">
  <Trash2 className="w-4 h-4" />
  <span className="sr-only">删除</span>
</button>
```

### 语言设置

```tsx
// html 标签设置语言
<html lang="zh-CN">
  内容
</html>

// 语言切换
<button 
  onClick={() => setLanguage('en')}
  aria-label="切换到英文"
>
  English
</button>
```

---

## 键盘快捷键

### 快捷键提示

```tsx
// 显示快捷键提示
<div className="hidden md:block text-sm text-muted">
  <kbd className="px-2 py-1 bg-surface border rounded text-xs">
    ⌘S
  </kbd>
  保存
</div>
```

### 快捷键实现

```tsx
// 全局快捷键 Hook
function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 避免在输入框中触发
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      switch (e.key.toLowerCase()) {
        case 's':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            saveConfig();
          }
          break;
        case 'r':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            resetConfig();
          }
          break;
        case '1':
        case '2':
        case '3':
          const types = ['road', 'mtb', 'fold'];
          setBikeType(types[parseInt(e.key) - 1]);
          break;
        case '?':
          toggleHelp();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [saveConfig, resetConfig, setBikeType, toggleHelp]);
}
```

---

## 触摸和手势

### 触摸目标大小

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
<div className="py-3">
  内容
</div>
```

### 可选的手势操作

```tsx
// 提供手势作为可选操作，始终保留按钮作为备选
<div>
  <div onSwipeLeft={nextItem} onSwipeRight={prevItem}>
    内容
  </div>
  <div className="flex gap-2">
    <button onClick={prevItem}>上一个</button>
    <button onClick={nextItem}>下一个</button>
  </div>
</div>
```

---

## 减少动画偏好

### 检查用户偏好

```tsx
// 检查是否偏好减少动画
const prefersReducedMotion = typeof window !== 'undefined' && 
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 条件性应用动画
const variants = prefersReducedMotion ? {
  // 简化版本，无动画
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
} : {
  // 完整动画
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 300 }
  }
};
```

---

## 测试检查清单

### 自动化测试

- [ ] 运行 axe-core 自动化测试
- [ ] 运行 ESLint jsx-a11y 规则
- [ ] 运行 Lighthouse 可访问性审计

### 手动测试

- [ ] 使用 Tab 键导航所有交互元素
- [ ] 使用 Shift+Tab 反向导航
- [ ] 使用 Enter 和 Space 激活元素
- [ ] 使用屏幕阅读器测试 (NVDA, VoiceOver, JAWS)
- [ ] 在只有键盘的情况下完成所有任务
- [ ] 测试高对比度模式
- [ ] 测试 200% 缩放
- [ ] 测试减少动画偏好

### 颜色测试

- [ ] 所有文本对比度 ≥ 4.5:1
- [ ] 大文本对比度 ≥ 3:1
- [ ] 颜色不是传达信息的唯一方式

---

## 相关文档

- [UI 设计系统](../../openspec/design/ui-design-system.md)
- [UI/UX 优化建议](./ui-recommendations.md)
- [响应式设计指南](./responsive-guidelines.md)

---

## 资源

- [WCAG 2.1 指南](https://www.w3.org/TR/WCAG21/)
- [A11Y Project](https://www.a11yproject.com/)
- [Web.dev - 可访问性](https://web.dev/accessibility/)

---

**文档路径**: `/prototype/design/accessibility-guidelines.md`  
**最后更新**: 2026-06-06  
**版本**: v1.0.0
