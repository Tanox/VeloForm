# 开发规范 (v3.7.0)

## 概述

本文档定义 Veloform 项目的代码风格、编程实践和协作流程。所有贡献者必须遵循这些规范以确保代码质量和一致性。

---

## TypeScript 编码规范

### 1. 类型安全

**强制使用明确类型，避免 `any`**：

```typescript
// ✅ Good
function calculateWeight(components: ConfigComponent[]): number {
  return components.reduce((sum, c) => sum + c.weight, 0);
}

// ❌ Bad
function calculateWeight(components: any): any {
  return components.reduce((sum, c) => sum + c.weight, 0);
}
```

**使用泛型增强类型安全**：

```typescript
// ✅ Good - Generic function
function createDataService<T extends { id: string }>() {
  return {
    items: [] as T[],
    addItem(item: T): void {
      this.items.push(item);
    }
  };
}

const componentService = createDataService<ConfigComponent>();
```

**联合类型优于字符串字面量**：

```typescript
// ✅ Good
type BikeType = 'Road' | 'MTB' | 'Fold';
function setBikeType(type: BikeType): void { ... }

// ❌ Bad
function setBikeType(type: string): void { ... }
```

### 2. 函数签名

**完整标注输入输出类型**：

```typescript
// ✅ Good
async function saveConfiguration(
  config: Configuration
): Promise<void> {
  // ...
}

// ❌ Bad - Missing return type
async function saveConfiguration(config: Configuration) {
  // ...
}
```

**可选参数使用 `?` 而非 `undefined`**：

```typescript
// ✅ Good
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}` : `Hello, ${name}`;
}

// ❌ Bad
function greet(name: string, greeting: string | undefined): string {
  // ...
}
```

### 3. 接口与类型别名

**使用 `interface` 定义对象结构**：

```typescript
// ✅ Good
interface ConfigComponent {
  id: string;
  category: string;
  name: string;
  price: number;
  weight: number;
}
```

**使用 `type` 定义联合类型或工具类型**：

```typescript
// ✅ Good
type BikeType = 'Road' | 'MTB' | 'Fold';
type ComponentId = string & { readonly __brand: unique symbol };
```

---

## Next.js/React 最佳实践

### 1. 'use client' 指令使用

**确定使用场景**：

| 场景 | 'use client' |
|------|---------------|
| 使用 Hooks (useState, useEffect 等) | 必须 |
| 使用浏览器 API (window, document) | 必须 |
| 事件处理器 | 必须 |
| 纯服务端组件 (Server Components) | 禁止 |
| 仅接收 props 渲染 UI | 禁止 |
| 数据获取 (server components) | 禁止 |

```typescript
// ✅ Good - 需要交互的组件
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

```typescript
// ✅ Good - Server Component (no 'use client')
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetchData(); // 服务端数据获取
  return <Dashboard data={data} />;
}
```

**组件拆分原则**：

```typescript
// ❌ Bad - 在根组件使用 'use client'，阻止服务端渲染
'use client';

import { HeavyComponent } from './HeavyComponent';

export default function Page() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Show</button>
      {show && <HeavyComponent />}
    </div>
  );
}
```

```typescript
// ✅ Good - 拆分出 Client Component
// components/ShowButton.tsx
'use client';

import { HeavyComponent } from './HeavyComponent';

export function ShowButton() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Show</button>
      {show && <HeavyComponent />}
    </div>
  );
}

// app/page.tsx
import { ShowButton } from '@/components/ShowButton';

export default function Page() {
  return <ShowButton />;
}
```

### 2. 组件定义

**使用函数组件**：

```typescript
// ✅ Good - 函数组件
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  const baseStyles = 'px-4 py-2 rounded font-medium';
  const variantStyles = variant === 'primary'
    ? 'bg-blue-500 text-white hover:bg-blue-600'
    : 'bg-gray-200 text-gray-800 hover:bg-gray-300';

  return (
    <button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

**组件文件组织**：

```
src/components/
├── Button/
│   ├── Button.tsx        # 组件实现
│   ├── Button.test.tsx   # 测试
│   └── index.ts          # 导出
└── Modal/
    ├── Modal.tsx
    ├── Modal.test.tsx
    └── index.ts
```

### 3. Hooks 使用规范

#### useState

**初始化**：

```typescript
// ✅ Good - 使用函数初始化 (惰性初始化)
const [items, setItems] = useState(() => {
  return JSON.parse(localStorage.getItem('items') || '[]');
});

// ❌ Bad - 每次渲染执行
const [items, setItems] = useState(JSON.parse(localStorage.getItem('items') || '[]'));
```

**状态结构化**：

```typescript
// ✅ Good - 相关状态合并为对象
const [formState, setFormState] = useState({
  name: '',
  email: '',
  isSubmitting: false
});

// ❌ Bad - 多个独立状态
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [isSubmitting, setIsSubmitting] = useState(false);
```

#### useEffect

**依赖数组完整**：

```typescript
// ✅ Good - 完整依赖
useEffect(() => {
  const subscription = dataSource.subscribe(data => setData(data));
  return () => subscription.unsubscribe();
}, [dataSource]);

// ❌ Bad - 遗漏依赖
useEffect(() => {
  const subscription = dataSource.subscribe(data => setData(data));
  return () => subscription.unsubscribe();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

**Effect 清理**：

```typescript
// ✅ Good - 清理副作用
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);

  return () => clearInterval(timer); // 清理定时器
}, []);
```

**数据获取使用 Server Components**：

```typescript
// ✅ Good - 服务端数据获取 (Next.js 13+)
// app/users/page.tsx
export default async function UsersPage() {
  const users = await db.query('SELECT * FROM users');
  return <UserList users={users} />;
}

// ❌ Bad - 在 Client Component 中获取数据
'use client';
function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);

  return <UserList users={users} />;
}
```

#### useCallback

**使用场景**：

```typescript
// ✅ Good - 作为 props 传递给子组件
const handleSubmit = useCallback((data: FormData) => {
  saveForm(data);
}, []);

return <Form onSubmit={handleSubmit} />;
```

```typescript
// ✅ Good - 用于 useEffect 依赖
const [filter, setFilter] = useState('');

const fetchFilteredData = useCallback(async () => {
  return await api.getData(filter);
}, [filter]);

useEffect(() => {
  fetchFilteredData().then(setData);
}, [fetchFilteredData]);
```

```typescript
// ❌ Bad - 简单计算不需要 useCallback
const doubled = useCallback(() => count * 2, [count]); // 性能损耗大于收益
```

#### useMemo

**使用场景**：

```typescript
// ✅ Good - 昂贵计算
const sortedItems = useMemo(() => {
  return items.sort((a, b) => a.name.localeCompare(b.name));
}, [items]);
```

```typescript
// ✅ Good - 引用稳定性
const options = useMemo(() => ({
  enableHighAccuracy: true,
  timeout: 5000
}), []); // 空依赖，引用永远不变
```

```typescript
// ❌ Bad - 简单计算不需要 useMemo
const doubled = useMemo(() => count * 2, [count]);
```

---

## Zustand 状态管理

### 1. Store 结构

**单一职责 Store**：

```typescript
// stores/useConfigStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfigState {
  components: ConfigComponent[];
  selectedId: string | null;
  addComponent: (component: ConfigComponent) => void;
  removeComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  updateComponent: (id: string, updates: Partial<ConfigComponent>) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      components: [],
      selectedId: null,

      addComponent: (component) =>
        set((state) => ({
          components: [...state.components, component]
        })),

      removeComponent: (id) =>
        set((state) => ({
          components: state.components.filter((c) => c.id !== id),
          selectedId: state.selectedId === id ? null : state.selectedId
        })),

      selectComponent: (id) => set({ selectedId: id }),

      updateComponent: (id, updates) =>
        set((state) => ({
          components: state.components.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          )
        }))
    }),
    { name: 'config-storage' }
  )
);
```

### 2. Store 使用

**组件中使用**：

```typescript
// ✅ Good - 使用选择器避免不必要的重渲染
function ConfigList() {
  const components = useConfigStore((state) => state.components);
  const selectComponent = useConfigStore((state) => state.selectComponent);

  return (
    <ul>
      {components.map((c) => (
        <li key={c.id} onClick={() => selectComponent(c.id)}>
          {c.name}
        </li>
      ))}
    </ul>
  );
}

// ❌ Bad - 获取整个 state
function ConfigList() {
  const { components, selectComponent } = useConfigStore(); // 任何 state 变化都会重渲染
}
```

### 3. Store 命名

```typescript
// ✅ Good - 清晰的前缀命名
useAuthStore      // 认证相关
useConfigStore    // 配置相关
useUIStore        // UI 状态相关

// ❌ Bad - 模糊命名
useStore
useAppStore
```

### 4. 派生状态

```typescript
// ✅ Good - 在组件中计算派生状态
function ConfigSummary() {
  const components = useConfigStore((state) => state.components);
  const totalWeight = useMemo(
    () => components.reduce((sum, c) => sum + c.weight, 0),
    [components]
  );
  const totalPrice = useMemo(
    () => components.reduce((sum, c) => sum + c.price, 0),
    [components]
  );

  return (
    <div>
      <span>Weight: {totalWeight}g</span>
      <span>Price: ${totalPrice}</span>
    </div>
  );
}
```

---

## 样式规范

### Tailwind CSS 使用

**移动优先响应式**：

```tsx
// Mobile: column, Desktop: row
<div className="flex flex-col md:flex-row gap-4">
  <aside className="w-full md:w-64">Sidebar</aside>
  <main className="flex-1">Content</main>
</div>
```

**暗色模式支持**：

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>
```

**避免自定义 CSS**：

```css
/* ❌ Bad - Unnecessary custom CSS */
.my-button {
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 4px;
}
```

```tsx
{/* ✅ Good - Tailwind utilities */}
<button className="px-4 py-2 bg-blue-500 text-white rounded">
  Click me
</button>
```

**提取重复模式为组件**：

```tsx
// components/PrimaryButton.tsx
interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function PrimaryButton({ children, onClick }: PrimaryButtonProps) {
  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

**Tailwind 配置**：

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#3b82f6'
        }
      }
    }
  }
};
```

---

## 测试规范

### 1. 测试文件组织

**测试文件位置**：与被测文件同目录

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx
│   └── Modal/
│       ├── Modal.tsx
│       └── Modal.test.tsx
├── stores/
│   ├── useConfigStore.ts
│   └── useConfigStore.test.ts
└── lib/
    ├── api.ts
    └── api.test.ts
```

**测试文件命名**：`*.test.tsx` 或 `*.test.ts`

### 2. 组件测试

**React Testing Library 模板**：

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} disabled>Click me</Button>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

### 3. Hooks 测试

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('should decrement count', () => {
    const { result } = renderHook(() => useCounter({ initial: 10 }));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(9);
  });
});
```

### 4. Store 测试

```typescript
import { renderHook, act } from '@testing-library/react';
import { useConfigStore } from './useConfigStore';
import { vi } from 'vitest';

describe('useConfigStore', () => {
  beforeEach(() => {
    useConfigStore.setState({ components: [], selectedId: null });
  });

  it('should add component', () => {
    const { result } = renderHook(() => useConfigStore());

    act(() => {
      result.current.addComponent({ id: '1', name: 'Wheel', category: 'wheel', price: 100, weight: 500 });
    });

    expect(result.current.components).toHaveLength(1);
  });

  it('should select component', () => {
    const { result } = renderHook(() => useConfigStore());

    act(() => {
      result.current.addComponent({ id: '1', name: 'Wheel', category: 'wheel', price: 100, weight: 500 });
      result.current.selectComponent('1');
    });

    expect(result.current.selectedId).toBe('1');
  });
});
```

### 5. 测试覆盖率目标

| 指标 | 目标 |
|------|------|
| 语句覆盖率 | ≥ 80% |
| 分支覆盖率 | ≥ 75% |
| 函数覆盖率 | ≥ 85% |
| 行覆盖率 | ≥ 80% |

**运行测试**：

```bash
npm run test
npm run test:coverage  # 带覆盖率报告
```

---

## 错误处理规范

### 1. 统一错误格式

```typescript
interface AppError {
  code: string;
  message: string;
  context?: Record<string, unknown>;
  timestamp: number;
}
```

### 2. Try-Catch 模式

```typescript
async function saveConfig(config: Configuration): Promise<void> {
  try {
    await firebaseService.saveConfiguration(config);
  } catch (error) {
    const appError: AppError = {
      code: 'SAVE_CONFIG_FAILED',
      message: error instanceof Error ? error.message : 'Unknown error',
      context: { configId: config.id },
      timestamp: Date.now()
    };

    console.error('[Save Config Error]', appError);
    notificationService.error('Failed to save configuration');
    throw appError;
  }
}
```

### 3. 错误边界 (Error Boundaries)

```tsx
// components/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('[Error Boundary]', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 日志规范

### 1. 日志级别

| 级别 | 用途 | 示例 |
|------|------|------|
| `ERROR` | 需要立即处理的错误 | API 调用失败、认证错误 |
| `WARN` | 潜在问题但不影响功能 | 废弃 API 使用、性能警告 |
| `INFO` | 重要业务事件 | 用户登录、配置保存 |
| `DEBUG` | 调试信息（仅开发环境） | 状态变更、API 请求详情 |

### 2. 日志格式

```typescript
// ✅ Good - Structured logging
console.log('[Auth] User logged in', {
  userId: user.uid,
  email: user.email,
  timestamp: new Date().toISOString()
});

// ❌ Bad - Unstructured
console.log('User logged in');
```

### 3. 生产环境日志

**移除 `console.log`**：

```typescript
// ✅ Good - 使用日志服务
const logger = {
  log(message: string, data?: unknown): void {
    if (process.env.NODE_ENV !== 'production') {
      console.log(message, data);
    }
  },

  error(message: string, error?: unknown): void {
    console.error(message, error);
  }
};
```

**Server Components 中的日志**：

```typescript
// app/api/data/route.ts
import { logger } from '@/lib/logger';

export async function GET() {
  try {
    const data = await fetchData();
    return Response.json(data);
  } catch (error) {
    logger.error('[API] Failed to fetch data', { error });
    return Response.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

---

## 可访问性 (A11y) 规范

### WCAG 2.1 AA 合规要求

**键盘导航**：

```tsx
<button
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') onSelect();
  }}
>
  Select
</button>
```

**ARIA 标签**：

```tsx
<button aria-label="Close dialog" onClick={close}>
  <span className="material-icons">close</span>
</button>
```

**焦点管理**：

```tsx
useEffect(() => {
  if (isOpen) {
    firstFocusableRef.current?.focus();
  }
}, [isOpen]);
```

**颜色对比度**：

确保文本与背景对比度至少 4.5:1（AA 级）。

---

## 国际化规范

### 1. 翻译键命名

**命名空间.描述**：

```typescript
const translations = {
  'nav.home': 'Home',
  'nav.library': 'Library',
  'sidebar.road': 'Road Bike',
  'sidebar.mtb': 'Mountain Bike',
  'preview.weight': 'Weight',
  'preview.cost': 'Cost'
};
```

### 2. 使用自定义 i18n hook（不依赖 next-intl）

项目使用自定义 Zustand store + hook 实现国际化，结构如下：

```
src/lib/i18n/
├── index.ts        # useTranslation() hook 定义 + Zustand store
├── en.ts           # 英文翻译
└── zh-CN.ts        # 中文翻译
```

```tsx
// components/NavLink.tsx
'use client';

import { useTranslation } from '@/lib/i18n';

interface NavLinkProps {
  href: string;
}

export function NavLink({ href }: NavLinkProps) {
  const t = useTranslation();
  const label = href === '/' ? t('nav.home') : t('nav.library');

  return <a href={href}>{label}</a>;
}
```

### 3. 语言切换

```tsx
// components/LanguageSwitcher.tsx
'use client';

import { useLanguage, useSetLanguage } from '@/lib/i18n';

export function LanguageSwitcher() {
  const language = useLanguage();
  const setLanguage = useSetLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'zh-CN')}
    >
      <option value="en">English</option>
      <option value="zh-CN">中文</option>
    </select>
  );
}
```

---

## Git 工作流

### 分支命名

```
feature/<description>   - New features
fix/<description>       - Bug fixes
docs/<description>      - Documentation updates
hotfix/<description>    - Critical fixes
```

**示例**：
- `feature/add-mtb-suspension`
- `fix/firebase-auth-error`
- `docs/update-api-spec`

### 提交信息规范

**Conventional Commits**：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**：
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no logic change)
- `refactor`: Code restructuring
- `test`: Test changes
- `chore`: Build/config changes

**示例**：

```
feat(components): add suspension selector for MTB

- Add SuspensionCategory enum
- Update component-selector modal
- Filter components by bikeType

Closes #123
```

### PR 流程

1. 从 `main` 创建功能分支
2. 开发并提交更改
3. 推送分支到远程
4. 创建 Pull Request
5. 至少一位 reviewer 审核通过
6. 合并到 `main`
7. 删除功能分支

---

## 性能优化指南

### 1. Bundle Size 预算

| 类型 | 警告 | 错误 |
|------|------|------|
| Initial bundle | 1.5 MB | 2 MB |
| Component style | 4 kB | 8 kB |

**检查 bundle size**：

```bash
npm run build
npx @next/bundle-analyzer .next/analyze
```

### 2. 组件优化

**使用 `React.memo`**：

```tsx
// ✅ Good - 优化子组件重渲染
const ListItem = React.memo(({ item, onClick }: ListItemProps) => {
  return <div onClick={() => onClick(item.id)}>{item.name}</div>;
});
```

```tsx
// ❌ Bad - 所有 props 变化都会导致重渲染
function ListItem({ item, onClick }: ListItemProps) {
  return <div onClick={() => onClick(item.id)}>{item.name}</div>;
}
```

**使用 `next/image`**：

```tsx
import Image from 'next/image';

export function ProductImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={300}
      placeholder="blur"
      blurDataURL={generateBlurPlaceholder(src)}
    />
  );
}
```

### 3. 路由优化

**布局组件分离**：

```tsx
// ✅ Good - 布局组件分离
// app/layout.tsx (服务端)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Navbar /> {/* 可能需要 'use client' */}
        {children}
      </body>
    </html>
  );
}

// app/page.tsx (服务端)
export default function HomePage() {
  return <h1>Welcome</h1>;
}
```

**动态导入**：

```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <Skeleton />,
  ssr: false
});

export function Dashboard() {
  return (
    <div>
      <HeavyChart data={data} />
    </div>
  );
}
```

---

## 相关文档

- [架构概览](../architecture/overview.md)
- [组件设计规范](../architecture/component-design.md)
- [测试规范](./testing.md)

---

**最后更新**: 2026-06-09
**版本**: v3.7.0