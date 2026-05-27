# React 组件设计模式规范

**版本**: v3.4.0  
**日期**: 2026-05-26  
**项目**: Veloform

---

## 1. 概述

本文档定义了 Veloform 项目中 React 组件的设计规范和最佳实践。组件是构建用户界面的基本单元，遵循统一的模式可以提高代码可维护性、可读性和团队协作效率。

Veloform 采用 Next.js App Router 架构，组件设计需要考虑服务端组件（RSC）与客户端组件的边界划分，以及与状态管理、动画库的集成。

## 2. 组件分类

Veloform 的组件按照职责范围分为三个类别：

### 2.1 configurator 组件

业务核心组件，位于 `src/components/configurator/` 目录。

| 组件名 | 文件名 | 职责 |
|--------|--------|------|
| BuildList | `build-list.tsx` | 显示已选配置项列表，支持删除和重新排序 |
| ComponentSelector | `component-selector.tsx` | 组件选择器，提供分类浏览和搜索功能 |
| SummaryPanel | `summary-panel.tsx` | 配置摘要面板，展示总价格和配置概要 |
| BikeTypeSelector | `bike-type-selector.tsx` | 车型选择器，支持不同车型的配置切换 |

### 2.2 layout 组件

布局组件，位于 `src/components/layout/` 目录。

| 组件名 | 文件名 | 职责 |
|--------|--------|------|
| Navbar | `navbar.tsx` | 顶部导航栏，包含 Logo、菜单和用户操作入口 |

### 2.3 ui 组件

基础 UI 组件，位于 `src/components/ui/` 目录，可复用性高。

| 组件名 | 文件名 | 职责 |
|--------|--------|------|
| Button | `button.tsx` | 多功能按钮组件，支持变体、尺寸和状态 |
| Card | `card.tsx` | 卡片容器，提供统一的视觉容器 |
| Modal | `modal.tsx` | 模态对话框，支持自定义内容和动画 |

## 3. 命名规范

### 3.1 文件命名

- **组件文件**: 使用 kebab-case，例如 `build-list.tsx`、`component-selector.tsx`
- **工具文件**: 使用 kebab-case，例如 `firebase-service.ts`、`utils.ts`
- **类型文件**: 使用 kebab-case，例如 `index.ts`

### 3.2 组件命名

- **组件名**: 使用 PascalCase，例如 `BuildList`、`ComponentSelector`
- **Props 类型接口**: 使用 `ComponentNameProps` 格式，例如 `ButtonProps`、`ModalProps`
- **组件变体类型**: 使用 `ComponentNameVariant` 格式，例如 `ButtonVariant`

### 3.3 目录结构

```
src/components/
├── configurator/
│   ├── build-list/
│   │   ├── index.ts
│   │   ├── build-list.tsx
│   │   ├── build-list.test.tsx
│   │   └── build-list.module.css
│   ├── component-selector/
│   └── ...
├── layout/
│   └── navbar/
└── ui/
    ├── button/
    └── ...
```

## 4. Props 定义

### 4.1 TypeScript 接口规范

所有组件 Props 必须使用 TypeScript 接口定义，接口名称统一使用 `ComponentNameProps` 格式。

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}
```

### 4.2 Props 类型约束

- 使用具体类型，避免 `any`
- 必选 props 放在前面，可选 props 使用 `?` 标记
- 回调函数 props 必须标注返回类型（通常为 `void`）
- 复杂对象类型使用单独接口定义

### 4.3 默认 Props

使用解构赋值提供默认值：

```typescript
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  className = '',
}: ButtonProps) {
  // 组件实现
}
```

## 5. 动画集成

### 5.1 Framer Motion 使用规范

Veloform 使用 Framer Motion 作为动画库，所有动画组件必须使用 `motion` 前缀。

### 5.2 基础动画

```typescript
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeIn}
          className="modal-overlay"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

### 5.3 动画变体定义

将动画变体定义在组件外部或专门的动画配置文件中：

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};
```

### 5.4 动画性能优化

- 使用 `layoutId` 实现布局动画
- 对静态元素避免使用动画
- 控制 `will-change` 属性
- 使用 `transform` 和 `opacity` 触发 GPU 加速

## 6. 状态管理集成

### 6.1 Zustand Store 使用规范

Veloform 使用 Zustand 作为全局状态管理方案。

### 6.2 Store 定义

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfigState {
  selectedBikeType: string;
  selectedComponents: Component[];
  totalPrice: number;
  setSelectedBikeType: (type: string) => void;
  addComponent: (component: Component) => void;
  removeComponent: (componentId: string) => void;
  resetConfig: () => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      selectedBikeType: 'road',
      selectedComponents: [],
      totalPrice: 0,
      setSelectedBikeType: (type) => set({ selectedBikeType: type }),
      addComponent: (component) =>
        set((state) => ({
          selectedComponents: [...state.selectedComponents, component],
        })),
      removeComponent: (componentId) =>
        set((state) => ({
          selectedComponents: state.selectedComponents.filter(
            (c) => c.id !== componentId
          ),
        })),
      resetConfig: () =>
        set({
          selectedBikeType: 'road',
          selectedComponents: [],
          totalPrice: 0,
        }),
    }),
    {
      name: 'veloform-config',
    }
  )
);
```

### 6.3 组件中使用 Store

```typescript
import { useConfigStore } from '@/lib/store';

export function BuildList() {
  const { selectedComponents, removeComponent } = useConfigStore();

  return (
    <div className="build-list">
      {selectedComponents.map((component) => (
        <BuildListItem
          key={component.id}
          component={component}
          onRemove={() => removeComponent(component.id)}
        />
      ))}
    </div>
  );
}
```

### 6.4 Store 最佳实践

- 按功能模块拆分 store，避免单一 store 过于庞大
- 使用选择器（selector）优化性能
- 避免在组件外直接调用 store 方法
- 对于派生状态，使用 `useMemo` 或计算属性

## 7. 'use client' 指令使用场景

### 7.1 需要使用 'use client' 的场景

以下场景必须将组件标记为客户端组件：

| 场景 | 示例 |
|------|------|
| 使用 React Hooks | `useState`, `useEffect`, `useRef` |
| 使用事件处理 | `onClick`, `onChange`, `onSubmit` |
| 使用浏览器 API | `window`, `document`, `localStorage` |
| 使用动画库 | Framer Motion, React Spring |
| 使用状态管理 | Zustand store |
| 使用客户端库 | Firebase SDK（部分场景） |

### 7.2 服务端组件优先原则

遵循 Next.js App Router 的最佳实践，优先使用服务端组件：

- 页面组件默认是服务端组件
- 仅在需要交互时添加 `'use client'`
- 可以通过 props 从服务端组件向客户端组件传递数据

### 7.3 组件边界划分示例

```typescript
// src/components/configurator/build-list.tsx
'use client';

import { motion } from 'framer-motion';
import { useConfigStore } from '@/lib/store';

export function BuildList() {
  // 客户端逻辑
}
```

```typescript
// src/app/page.tsx
import { BuildList } from '@/components/configurator/build-list';
import { getServerComponents } from '@/lib/firebase-service';

export default async function ConfiguratorPage() {
  // 服务端数据获取
  const components = await getServerComponents();

  return (
    <main>
      <BuildList initialComponents={components} />
    </main>
  );
}
```

## 8. Tailwind CSS 使用规范

### 8.1 类名组织顺序

Tailwind CSS 类名按照以下顺序排列：

1. 布局类（Layout）: `container`, `flex`, `grid`, `hidden`
2. 定位类（Positioning）: `absolute`, `relative`, `fixed`, `sticky`
3. 尺寸类（Sizing）: `w-`, `h-`, `min-w-`, `max-w-`
4. 间距类（Spacing）: `p-`, `m-`, `gap-`
5. 排版类（Typography）: `text-`, `font-`, `leading-`, `tracking-`
6. 颜色类（Colors）: `bg-`, `text-`, `border-`, `from-`
7. 边框类（Borders）: `border`, `rounded-`, `divide-`
8. 效果类（Effects）: `shadow-`, `opacity-`, `blur-`
9. 交互类（Interactivity）: `hover:`, `focus:`, `active:`, `disabled:`
10. 变换类（Transform）: `scale-`, `rotate-`, `translate-`

### 8.2 响应式设计

使用响应式前缀实现多端适配：

```typescript
export function Navbar() {
  return (
    <nav className="hidden md:flex lg:flex items-center justify-between p-4">
      {/* 移动端隐藏，平板及以上显示 */}
    </nav>
  );
}
```

响应式断点：

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### 8.3 暗色模式支持

使用 `dark:` 前缀实现暗色模式：

```typescript
<button className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  提交
</button>
```

### 8.4 自定义配置

在 `tailwind.config.ts` 中扩展主题：

```typescript
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#1D4ED8',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
} satisfies Config;
```

### 8.5 组件样式模式

将重复的样式组合提取为工具类或组件变体：

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
}

const variantClasses = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
};

export function Button({ variant = 'primary' }: ButtonProps) {
  return <button className={variantClasses[variant]} />;
}
```

## 附录

### A. 组件检查清单

创建新组件时，确保完成以下事项：

- [ ] Props 接口已正确定义
- [ ] 组件已正确分类到对应目录
- [ ] 文件和组件命名符合规范
- [ ] 需要动画时已集成 Framer Motion
- [ ] 需要状态管理时已正确连接 Zustand store
- [ ] 正确添加 `'use client'` 指令（如需要）
- [ ] Tailwind CSS 类名组织有序
- [ ] 包含必要的 TypeScript 类型注解
- [ ] 已添加单元测试（如适用）

### B. 相关文档

- [架构概述](./overview.md)
- [数据流设计](./data-flow.md)
- [编码标准](../development/coding-standards.md)
