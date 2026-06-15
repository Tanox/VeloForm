# 组件设计规范

> **路径**: `/openspec/architecture/component-design.md`  
> **版本**: v3.7.0  
> **更新日期**: 2026-06-09

## 概述

本文档定义 Veloform 项目的组件设计原则、命名规范、Props 模式和状态管理策略。Veloform 采用 Next.js App Router 架构，使用 React Server Components 和 Client Components 分离策略。状态管理通过 **Zustand Store** 集中处理。

---

## 组件分类

### 1. 客户端组件 (Client Components)

使用 `use client` 指令标记，负责状态管理、用户交互和客户端特有逻辑。通过 Zustand Store 进行状态管理。

**示例**：`Navbar.tsx` (`components/layout/`)

```typescript
'use client';

import { useState } from 'react';
import { useConfigStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';

export function Navbar() {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const t = useTranslation();
  const activeType = useConfigStore((state) => state.activeType);
  const setActiveType = useConfigStore((state) => state.setActiveType);

  return (
    <nav className="sticky top-0 z-40">
      {/* Navigation content */}
    </nav>
  );
}
```

**职责**：
- 管理本地状态
- 处理用户交互
- 通过 Zustand Store 读取/更新全局状态
- 使用 hooks 处理副作用

### 2. 服务端组件 (Server Components)

默认在服务端渲染，无需 `use client` 指令。在 Next.js App Router 中，所有组件默认为 Server Component，除非显式添加 `'use client'` 指令。

**示例**：`app/page.tsx`

```typescript
// app/page.tsx - 默认为 Server Component
import { Navbar } from '@/components/layout/Navbar';
import { BuildList } from '@/components/configurator/BuildList';

export default function Home() {
  // 可以在此处进行服务端数据获取
  // const initialData = await fetchInitialConfig();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Client Components */}
        <BuildList />
      </main>
    </div>
  );
}
```

**职责**：
- 服务端数据获取（如需）
- 静态内容渲染
- SEO 优化
- 减少客户端 JavaScript bundle 大小

**注意**：由于 Veloform 是纯客户端应用（自行车配置器），大部分页面逻辑都在客户端执行，因此大多数组件都是 Client Components。

---

## 组件命名规范

### 文件命名

- 使用 `PascalCase`：`BuildList.tsx`
- 测试文件与被测文件同目录：`BuildList.test.tsx`
- 组件函数名使用 `PascalCase`：`BuildList`

### 目录结构

```
components/
├── SyncProvider.tsx   # 顶层 Firebase 同步提供者
├── layout/            # 布局组件
│   ├── Navbar.tsx
│   └── Footer.tsx
├── configurator/      # 配置器相关组件
│   ├── BuildList.tsx
│   ├── BikeTypeSelector.tsx
│   └── ...
├── sections/          # 营销/落地页分区组件
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Pricing.tsx
│   └── Cta.tsx
└── ui/                # 通用 UI 组件
    ├── Button.tsx
    ├── Card.tsx
    └── ...
```

---

## Props 规范

### Props 定义

使用 TypeScript interface 定义组件 Props：

```typescript
interface BuildListProps {
  // Required prop
  components: ConfigComponent[];
  
  // Optional prop with default
  isLoading?: boolean;
  
  // Callback function
  onEdit?: (id: string) => void;
}

export function BuildList({ components, isLoading = false, onEdit }: BuildListProps) {
  return (
    <div>
      {isLoading && <LoadingIndicator />}
      {components.map((component) => (
        <div key={component.id} onClick={() => onEdit?.(component.id)}>
          {component.name}
        </div>
      ))}
    </div>
  );
}
```

**最佳实践**：
- 使用 interface 定义 Props 类型
- 为可选 Props 提供合理的默认值
- 使用可选链 `?.` 处理可选回调
- 避免传递复杂对象，优先传递必要的最小数据

### 事件处理

通过回调函数处理组件交互：

```typescript
interface ComponentSelectorProps {
  onSelect: (component: ConfigComponent) => void;
  onClose: () => void;
}

export function ComponentSelector({ onSelect, onClose }: ComponentSelectorProps) {
  const handleSelect = (component: ConfigComponent) => {
    onSelect(component);
    onClose();
  };

  return (
    <div>
      <button onClick={onClose}>Close</button>
      <button onClick={() => handleSelect(selectedComponent)}>
        Select
      </button>
    </div>
  );
}
```

---

## React Hooks 使用指南

### 常用 Hooks

| Hook | 用途 | 示例 |
|------|------|------|
| `useState` | 管理本地状态 | `const [count, setCount] = useState(0)` |
| `useEffect` | 处理副作用 | 数据获取、订阅、DOM 操作 |
| `useCallback` | 缓存回调函数 | 优化子组件重新渲染 |
| `useMemo` | 缓存计算结果 | 复杂计算优化 |
| `useRef` | 访问 DOM 或持久化值 | 获取 DOM 元素引用 |

### useEffect 使用模式

```typescript
import { useEffect, useState } from 'react';

export function Configurator() {
  const [configs, setConfigs] = useState<Configuration[]>([]);
  const isLoggedIn = useConfigStore((state) => state.isLoggedIn);

  // 组件挂载时加载数据
  useEffect(() => {
    if (isLoggedIn) {
      const fetchConfigs = async () => {
        const data = await fetchUserConfigs();
        setConfigs(data);
      };
      fetchConfigs();
    }
  }, [isLoggedIn]); // 依赖变化时重新执行

  return <div>{/* ... */}</div>;
}
```

### 清理副作用

```typescript
useEffect(() => {
  const handleResize = () => {
    // Handle window resize
  };
  
  window.addEventListener('resize', handleResize);
  
  // 清理函数
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

---

## 服务端渲染兼容

### 客户端特有代码处理

使用 `useEffect` 确保只在客户端执行：

```typescript
'use client';

import { useEffect, useState } from 'react';

export function PreviewCanvas() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // 初始化 Three.js 或其他客户端代码
    // const renderer = new THREE.WebGLRenderer();
  }, []);

  if (!isClient) {
    return <div className="aspect-video bg-surface rounded-xl" />;
  }

  return <canvas className="w-full h-full" />;
}
```

### Next.js 特定模式

使用 `use client` 指令标记客户端组件：

```typescript
'use client';

import { motion } from 'framer-motion';

export function AnimatedCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-xl p-4"
    >
      {children}
    </motion.div>
  );
}
```

---

## 可访问性 (A11y)

### 键盘导航

所有交互元素必须支持键盘操作：

```jsx
<button
  onClick={onSelect}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelect();
    }
  }}
  aria-label="Select Road Bike"
>
  Road
</button>
```

### ARIA 属性

```jsx
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Component Selector</h2>
</div>
```

### 焦点管理

```typescript
import { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      ref={modalRef} 
      tabIndex={-1}
      role="dialog" 
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {children}
    </div>
  );
}
```

---

## 组件测试规范

### 测试文件结构

使用 Vitest 和 Testing Library：

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { BuildList } from './BuildList';

describe('BuildList', () => {
  const mockComponents = [
    { id: '1', name: 'Component 1', category: 'Frame', price: 1000, weight: 1000 },
  ];

  it('should render component list', () => {
    render(<BuildList components={mockComponents} />);
    expect(screen.getByText('Component 1')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', () => {
    const onEditMock = vi.fn();
    render(<BuildList components={mockComponents} onEdit={onEditMock} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    expect(onEditMock).toHaveBeenCalledWith('1');
  });
});
```

### 测试覆盖率目标

- **语句覆盖率**: ≥ 80%
- **分支覆盖率**: ≥ 75%
- **函数覆盖率**: ≥ 85%
- **行覆盖率**: ≥ 80%

---

## 样式规范

### Tailwind CSS 使用

优先使用实用类，避免自定义 CSS：

```jsx
// Good
<button className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-all">
  Save
</button>

// Bad - inline styles
<button style={{ padding: '8px 16px', background: 'blue' }}>
  Save
</button>
```

### 响应式设计

使用移动优先断点：

```jsx
<div className="flex flex-col md:flex-row gap-4">
  {/* Mobile: vertical stack */}
  {/* Desktop: horizontal row */}
</div>
```

### 暗色模式支持

使用 Next.js Themes 实现主题切换：

```jsx
'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
}
```

### 动画效果

使用 Framer Motion 实现动画：

```jsx
'use client';

import { motion } from 'framer-motion';

export function FadeInCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-surface rounded-xl p-4"
    >
      {children}
    </motion.div>
  );
}
```

---

## 组件清单

### Configurator 模块组件

| 组件 | 类型 | 路径 | 职责 | 状态来源 |
|------|------|------|------|----------|
| `BuildList` | Client | `components/configurator/` | 组件列表展示和编辑 | `useConfigStore` |
| `BikeTypeSelector` | Client | `components/configurator/` | 车型切换选择器 | `useConfigStore` |
| `ComponentSelector` | Client | `components/configurator/` | 组件选择模态框 | `useConfigStore` |
| `ComponentDetailModal` | Client | `components/configurator/` | 组件详情展示 | Props + `useConfigStore` |
| `RecommendedConfigs` | Client | `components/configurator/` | 推荐配置卡片 | 静态数据 |
| `ComparePanel` | Client | `components/configurator/` | 配置比较面板 | Local state |
| `SummaryPanel` | Client | `components/configurator/` | 汇总面板（价格/重量） | `useConfigStore` |
| `CostBreakdownChart` | Client | `components/configurator/` | 成本分解图表 | `useConfigStore` |
| `ShareModal` | Client | `components/configurator/` | 分享模态框 | Local state |

### Layout 模块组件

| 组件 | 类型 | 路径 | 职责 | 状态来源 |
|------|------|------|------|----------|
| `Navbar` | Client | `components/layout/` | 导航栏（Logo、主题切换、语言切换） | `useConfigStore`, `useAuthStore` |

### UI 模块组件

| 组件 | 类型 | 路径 | 职责 | Props |
|------|------|------|------|--------|
| `Button` | Shared | `components/ui/` | 按钮组件 | `variant`, `size`, `children`, `onClick` |
| `Card` | Shared | `components/ui/` | 卡片容器 | `children`, `className` |
| `Modal` | Client | `components/ui/` | 模态框基础组件 | `isOpen`, `onClose`, `children`, `title` |
| `Toast` | Client | `components/ui/` | Toast 通知容器 | — |
| `ThemeToggle` | Client | `components/ui/` | 主题切换按钮 | — |
| `OnboardingGuide` | Client | `components/ui/` | 新手引导组件 | Local state |
| `SupportModal` | Client | `components/ui/` | 支持/帮助模态框 | `isOpen`, `onClose` |
| `ErrorBoundary` | Shared | `components/ui/` | 错误边界组件 | `children` |

**说明**：
- **Client 组件**：使用 `'use client'` 指令，包含状态管理和交互逻辑
- **Shared 组件**：纯展示组件或工具组件，可用于 Server 和 Client 组件中
- **状态管理**：业务组件通过 Zustand stores (`useConfigStore`, `useAuthStore`) 读取/更新全局状态
- **Props 传递**：部分组件接收 props，但大多数直接从 store 读取状态

---

## 相关文档

- [架构概览](./overview.md)
- [数据流设计](./data-flow.md)
- [状态管理](./state-management.md)
- [开发规范](../development/coding-standards.md)

---

**文档路径**: `/openspec/architecture/component-design.md`  
**最后更新**: 2026-06-09  
**版本**: v3.7.0
