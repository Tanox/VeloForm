# 测试规范 (v3.4.0)

## 概述

本文档定义 Veloform 项目的测试策略、测试框架使用方法和质量标准，适用于 Next.js/React 技术栈。

---

## 测试金字塔

```
        /\
       /  \
      / E2E \         ~10% - Critical user journeys
     /______\
    /        \
   /Integration\      ~20% - Service integration, component interaction
  /______________\
 /                \
/    Unit Tests    \   ~70% - Components, services, utilities
/____________________\
```

**目标分布**：
- **单元测试**: 70% - 快速、隔离、可重复
- **集成测试**: 20% - 验证组件/服务协作
- **E2E 测试**: 10% - 关键用户流程

---

## 测试框架

### Vitest 配置

**测试运行器**: Vitest ^2.0.0

**依赖包**:
- `vitest` - 测试运行器
- `@testing-library/react` - React 组件测试
- `@testing-library/jest-dom` - DOM 断言
- `jsdom` - DOM 环境

**配置文件**: `vite.config.ts`

```typescript
// vite.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 80,
        branches: 75,
        functions: 85,
        lines: 80
      }
    }
  }
});
```

**测试设置文件** `src/test-setup.ts`:

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
```

---

## 单元测试规范

### 1. 组件测试

**使用 React Testing Library**

```typescript
// components/BuildList/BuildList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BuildList } from './BuildList';
import type { ConfigComponent } from '@/types';

const mockComponents: ConfigComponent[] = [
  {
    id: 'frame_road_sl8',
    category: 'Frame',
    name: 'S-Works Tarmac SL8',
    price: 3500,
    weight: 795
  }
];

describe('BuildList', () => {
  it('should create', () => {
    const { container } = render(<BuildList components={mockComponents} />);
    expect(container).toBeTruthy();
  });

  it('should display component count', () => {
    render(<BuildList components={mockComponents} />);
    const countElement = screen.getByTestId('component-count');
    expect(countElement).toHaveTextContent('1');
  });

  it('should calculate total cost correctly', () => {
    render(<BuildList components={mockComponents} />);
    const totalCostElement = screen.getByTestId('total-cost');
    expect(totalCostElement).toHaveTextContent('$3,500');
  });

  it('should call onSync when save button is clicked', async () => {
    const onSync = vi.fn();
    render(<BuildList components={mockComponents} onSync={onSync} />);

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);

    expect(onSync).toHaveBeenCalledTimes(1);
  });

  it('should show loading state when isSaving is true', () => {
    render(<BuildList components={mockComponents} isSaving={true} />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
  });
});
```

**数据测试 ID 规范**:

```tsx
// 推荐在组件中使用 data-testid
<div data-testid="component-count">{components.length}</div>
<button data-testid="save-btn">Save</button>
<span data-testid="total-cost">${total}</span>
```

**测试要点**：
- ✅ 组件能否成功渲染
- ✅ Props 数据正确显示
- ✅ 回调函数正确触发
- ✅ 计算逻辑正确
- ✅ UI 状态切换（loading、error 等）
- ✅ 用户交互响应

---

### 2. Hooks 测试

**使用 @testing-library/react 的 renderHook**

```typescript
// hooks/useBuildTotal.test.ts
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useBuildTotal } from './useBuildTotal';

describe('useBuildTotal', () => {
  it('should calculate initial total as 0', () => {
    const { result } = renderHook(() => useBuildTotal([]));
    expect(result.current.total).toBe(0);
  });

  it('should calculate total from components', () => {
    const components = [
      { price: 1000, weight: 800 },
      { price: 500, weight: 400 }
    ];

    const { result } = renderHook(() => useBuildTotal(components));
    expect(result.current.total).toBe(1500);
  });

  it('should update when components change', () => {
    const { result, rerender } = renderHook(
      ({ components }) => useBuildTotal(components),
      { initialProps: { components: [] } }
    );

    expect(result.current.total).toBe(0);

    rerender({ components: [{ price: 1000, weight: 800 }] });
    expect(result.current.total).toBe(1000);
  });
});
```

---

### 3. 服务/工具函数测试

**纯函数测试（推荐）**

```typescript
// utils/validation.test.ts
import { describe, it, expect } from 'vitest';
import { validateConfiguration } from './validation';
import type { BikeConfiguration } from '@/types';

describe('validateConfiguration', () => {
  it('should accept valid configuration', () => {
    const config: BikeConfiguration = {
      bikeType: 'Road',
      name: 'Test Bike',
      components: [],
      totalCost: 1000,
      estimatedWeight: 7.5
    };

    const result = validateConfiguration(config);
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it('should reject empty name', () => {
    const config: BikeConfiguration = {
      bikeType: 'Road',
      name: '',
      components: [],
      totalCost: 1000,
      estimatedWeight: 7.5
    };

    const result = validateConfiguration(config);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Name is required');
  });

  it('should reject invalid bike type', () => {
    const config: BikeConfiguration = {
      bikeType: 'Invalid',
      name: 'Test',
      components: [],
      totalCost: 1000,
      estimatedWeight: 7.5
    };

    const result = validateConfiguration(config);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Invalid bike type');
  });

  it('should reject too many components', () => {
    const config: BikeConfiguration = {
      bikeType: 'Road',
      name: 'Test',
      components: Array(51).fill({ id: '1' } as any),
      totalCost: 1000,
      estimatedWeight: 7.5
    };

    const result = validateConfiguration(config);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Maximum 50 components allowed');
  });
});
```

**权重计算测试**:

```typescript
// utils/weight.test.ts
import { describe, it, expect } from 'vitest';
import { calculateWeight } from './weight';

describe('calculateWeight', () => {
  it('should calculate weight with components', () => {
    const components = [
      { weight: 1520 },
      { weight: 1370 }
    ];

    const weight = calculateWeight(components, 'Road');
    expect(weight).toBeCloseTo(3.79);
  });

  it('should use correct base weight for MTB', () => {
    const weight = calculateWeight([], 'MTB');
    expect(weight).toBe(1.8);
  });

  it('should use correct base weight for Fold', () => {
    const weight = calculateWeight([], 'Fold');
    expect(weight).toBe(2.0);
  });
});
```

---

## Jest Mock 策略

### 1. Mock Firebase/外部 SDK

```typescript
// mocks/firebase.ts
export const mockFirebaseAuth = {
  currentUser: null,
  onAuthStateChanged: vi.fn((callback) => {
    callback(null);
    return vi.fn();
  }),
  signInWithPopup: vi.fn(),
  signOut: vi.fn()
};

export const mockFirebaseFirestore = {
  getFirestore: vi.fn(() => ({})),
  collection: vi.fn(() => ({
    addDoc: vi.fn(),
    getDocs: vi.fn()
  })),
  doc: vi.fn()
};

vi.mock('@/lib/firebase', () => ({
  auth: mockFirebaseAuth,
  db: mockFirebaseFirestore,
  googleProvider: {}
}));
```

**在测试中使用**:

```typescript
// services/auth.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useAuth } from './useAuth';
import * as firebase from '@/lib/firebase';

vi.mock('@/lib/firebase');

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null user when not authenticated', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
  });

  it('should set user on successful login', async () => {
    const mockUser = { uid: '123', email: 'test@example.com' };
    (firebase.auth.signInWithPopup as any).mockResolvedValueOnce({
      user: mockUser
    });

    const { result } = renderHook(() => useAuth());
    await result.current.loginWithGoogle();

    expect(result.current.user).toEqual(mockUser);
  });
});
```

### 2. Mock Next.js 路由

```typescript
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn()
  }),
  usePathname: () => '/build',
  useSearchParams: () => new URLSearchParams()
}));
```

### 3. Mock Context/Providers

```typescript
// 创建测试用 Provider wrapper
function TestWrapper({ children, initialValue = {} }) {
  return (
    <AuthProvider {...initialValue}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}

// 使用
render(<Component />, { wrapper: TestWrapper });
```

---

## 集成测试规范

### 组件交互测试

```typescript
// components/BuildEditor/BuildEditor.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BuildEditor } from './BuildEditor';
import { AppProvider } from '@/contexts/AppContext';

describe('BuildEditor Integration', () => {
  it('should update preview when bike type changes', async () => {
    render(
      <AppProvider>
        <BuildEditor />
      </AppProvider>
    );

    const mtbButton = screen.getByTestId('sidebar-mtb');
    fireEvent.click(mtbButton);

    await waitFor(() => {
      const preview = screen.getByTestId('preview-type');
      expect(preview).toHaveTextContent('MTB');
    });
  });

  it('should open library modal when navbar button is clicked', () => {
    render(
      <AppProvider>
        <BuildEditor />
      </AppProvider>
    );

    const libraryButton = screen.getByTestId('library-btn');
    fireEvent.click(libraryButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
  });
});
```

---

## E2E 测试规范

### Playwright 配置（可选）

虽然当前项目未配置 E2E 测试，但建议为关键用户流程添加：

**测试场景**:

1. **用户登录流程**
   - 访问应用
   - 点击登录按钮
   - 完成 Google OAuth
   - 验证用户信息显示

2. **配置自行车流程**
   - 选择车型（Road/MTB/Fold）
   - 修改组件
   - 验证价格和重量更新
   - 保存配置

3. **库管理流程**
   - 打开库模态框
   - 查看已保存配置
   - 加载配置到编辑器
   - 删除配置

**示例**（Playwright）:

```typescript
// e2e/configure-bike.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Bike Configuration', () => {
  test('should switch bike types', async ({ page }) => {
    await page.goto('/');

    await page.click('[data-testid="sidebar-mtb"]');
    await expect(page.locator('[data-testid="preview-type"]')).toHaveText('MTB');

    await page.click('[data-testid="sidebar-fold"]');
    await expect(page.locator('[data-testid="preview-type"]')).toHaveText('Fold');
  });

  test('should update total cost when component changes', async ({ page }) => {
    await page.goto('/');

    const initialCost = await page.locator('[data-testid="total-cost"]').textContent();

    await page.click('[data-testid="component-selector-btn"]');
    await page.click('[data-testid="component-option"]:first');

    const newCost = await page.locator('[data-testid="total-cost"]').textContent();
    expect(newCost).not.toBe(initialCost);
  });

  test('should save configuration after login', async ({ page }) => {
    await page.goto('/');

    await page.click('[data-testid="login-btn"]');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password');
    await page.click('[data-testid="submit-login"]');

    await page.click('[data-testid="save-btn"]');
    await expect(page.locator('[data-testid="notification"]')).toContainText('Saved');
  });
});
```

---

## 测试覆盖率要求

### 覆盖率阈值

```typescript
// vite.config.ts
coverage: {
  thresholds: {
    statements: 80,   // ≥ 80%
    branches: 75,     // ≥ 75%
    functions: 85,    // ≥ 85%
    lines: 80         // ≥ 80%
  }
}
```

### 运行覆盖率检查

```bash
npm run test -- --coverage
```

**生成报告**：
- Terminal 中的文本摘要
- HTML 报告在 `coverage/index.html`
- JSON 报告在 `coverage/coverage-final.json`

### 排除文件

以下文件不计入覆盖率：
- `*.test.ts` / `*.spec.ts` (测试文件本身)
- `main.ts` / `main.tsx` (入口文件)
- `env.*.ts` (环境配置)
- `*.d.ts` (类型声明)
- `index.ts` (重导出文件)

---

## 测试最佳实践

### ✅ 推荐做法

1. **每个测试独立**：
   ```typescript
   beforeEach(() => {
     vi.clearAllMocks();
   });
   ```

2. **使用描述性测试名称**：
   ```typescript
   it('should call onSync callback when save button is clicked', () => {
     // ...
   });
   ```

3. **Arrange-Act-Assert 模式**：
   ```typescript
   it('should calculate total cost', () => {
     // Arrange
     const components = [{ price: 100 }, { price: 200 }];

     // Act
     const total = calculateTotal(components);

     // Assert
     expect(total).toBe(300);
   });
   ```

4. **Mock 外部依赖**：
   ```typescript
   vi.mock('@/lib/firebase', () => ({
     auth: {
       signInWithPopup: vi.fn()
     }
   }));
   ```

5. **测试边界条件**：
   ```typescript
   it('should handle empty component list', () => {
     const total = calculateTotal([]);
     expect(total).toBe(0);
   });

   it('should handle maximum components (50)', () => {
     const maxComponents = Array(50).fill(mockComponent);
     const result = validateConfiguration({ components: maxComponents });
     expect(result.valid).toBe(true);
   });
   ```

### ❌ 避免的做法

1. **测试实现细节**：
   ```typescript
   // ❌ Bad - Testing internal state
   expect(component.state.internalValue).toBe(...);

   // ✅ Good - Testing public API/output
   expect(screen.getByText('Expected Value')).toBeInTheDocument();
   ```

2. **硬编码魔法数字**：
   ```typescript
   // ❌ Bad
   expect(result).toBe(3.79);

   // ✅ Good
   const expectedWeight = BASE_WEIGHTS.Road + COMPONENT_WEIGHTS.reduce((sum, w) => sum + w, 0);
   expect(result).toBeCloseTo(expectedWeight);
   ```

3. **测试之间共享状态**：
   ```typescript
   // ❌ Bad - Test order dependent
   it('test 1', () => {
     state.count = 5;
   });

   it('test 2', () => {
     expect(state.count).toBe(5); // Depends on test 1
   });

   // ✅ Good - Each test sets up its own state
   it('test 1', () => {
     const state = createState({ count: 5 });
     expect(state.count).toBe(5);
   });
   ```

4. **过度使用 container/querySelector**：
   ```typescript
   // ❌ Bad - Implementation detail
   const button = component.container.querySelector('.btn-primary');

   // ✅ Good - Accessible query
   const button = screen.getByRole('button', { name: /submit/i });
   ```

---

## 持续集成中的测试

### GitHub Actions 示例

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run tests with coverage
        run: npm run test -- --coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4
        with:
          file: ./coverage/lcov.info
```

---

## 测试清单

在提交 PR 前，确保：

- [ ] 所有新代码都有对应的单元测试
- [ ] Bug 修复包含回归测试
- [ ] 测试覆盖率满足阈值要求
- [ ] 所有测试通过（`npm run test`）
- [ ] Lint 检查通过（`npm run lint`）
- [ ] 没有 `console.log` 或 `fit`/`fdescribe`（focused tests）
- [ ] Mock 数据合理且可维护
- [ ] 测试名称清晰描述行为

---

## 相关文档

- [开发规范](./coding-standards.md)
- [架构概览](../architecture/overview.md)
- [API 规范](../api/firestore.md)

---

**最后更新**: 2026-05-26
**版本**: v3.4.0