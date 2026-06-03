# Veloform State Management Specification

**文件路径**: `/workspace/openspec/architecture/state-management.md`
**版本**: v3.4.1
**日期**: 2026-05-26
**更新**: Zustand 状态管理规范

## 1. 概述

Zustand 是 Veloform 应用的核心状态管理解决方案，提供轻量级、简洁的状态管理机制。该库在 Veloform 中的主要作用包括：

- 管理自行车配置状态（类型、组件选择、总成本、总重量）
- 处理用户认证状态（登录状态、用户 ID）
- 控制 UI 状态（组件库显示、选择器弹窗）
- 管理配置数据的持久化（我的配置列表）
- 支持 Firebase 云存储与 localStorage 本地降级策略

Zustand 的选择基于其极小的包体积、无 Provider 包裹需求以及 TypeScript 良好的类型推导支持，非常适合 Veloform 这类中小型应用。

## 2. Store 架构

ConfigStore 是应用的核心 Store，通过 Zustand 的 `create` 函数定义，采用函数式 set/get 模式管理状态。

```typescript
interface ConfigStore extends ConfigState {
  setActiveType: (type: BikeType) => void;
  replaceComponent: (newComponent: ConfigComponent) => void;
  setComponents: (components: ConfigComponent[]) => void;
  loadConfiguration: (config: Configuration) => void;
  resetToDefaults: () => void;
  toggleLibrary: () => void;
  toggleComponentSelector: (componentId?: string) => void;
  setMyConfigs: (configs: Configuration[]) => void;
  setLoggedIn: (loggedIn: boolean) => void;
  setSaving: (saving: boolean) => void;
  setConfigId: (id: string | null) => void;
  setManualConfigName: (name: string | null) => void;
  getTotalCost: () => number;
  getTotalWeight: () => number;
  saveConfiguration: () => Promise<void>;
  deleteConfiguration: (configId: string) => Promise<void>;
  loadMyConfigs: (userId?: string) => Promise<void>;
  userId: string | null;
  setUserId: (userId: string | null) => void;
}
```

Store 实例通过 `useConfigStore` Hook 导出，可在任何组件中使用。

## 3. State 属性

ConfigStore 包含以下状态字段：

| 属性 | 类型 | 默认值 | 用途 |
|------|------|--------|------|
| `activeType` | `BikeType` | `'Road'` | 当前选择的自行车类型（Road/MTB/City） |
| `components` | `ConfigComponent[]` | Road 类型默认值 | 当前配置的所有组件列表 |
| `configId` | `string \| null` | `null` | 当前配置的唯一标识符 |
| `manualConfigName` | `string \| null` | `null` | 用户手动设置的配置名称 |
| `allDbComponents` | `ConfigComponent[]` | `[]` | 从数据库加载的所有可用组件 |
| `showLibrary` | `boolean` | `false` | 控制组件库面板的显示/隐藏 |
| `myConfigs` | `Configuration[]` | `[]` | 当前用户的所有保存配置列表 |
| `isLoggedIn` | `boolean` | `false` | 用户登录状态标识 |
| `isSaving` | `boolean` | `false` | 保存操作进行中状态 |
| `showComponentSelector` | `boolean` | `false` | 组件选择器弹窗显示状态 |
| `editingComponentId` | `string` | `''` | 当前正在编辑的组件 ID |
| `userId` | `string \| null` | `null` | 当前登录用户的 Firebase UID |

### BikeType 枚举

```typescript
type BikeType = 'Road' | 'MTB' | 'City';
```

### ConfigComponent 结构

```typescript
interface ConfigComponent {
  id: string;
  category: string;
  name: string;
  price: number;
  weight: number;
  specs: Record<string, string | number>;
  imageUrl?: string;
}
```

### Configuration 结构

```typescript
interface Configuration {
  id?: string;
  bikeType: BikeType;
  name: string;
  components: ConfigComponent[];
  totalCost: number;
  estimatedWeight: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## 4. Actions

### 4.1 类型切换与组件管理

| Action | 参数 | 功能描述 |
|--------|------|----------|
| `setActiveType` | `type: BikeType` | 切换自行车类型，同时重置组件为该类型的默认值，并清除 configId |
| `replaceComponent` | `newComponent: ConfigComponent` | 替换指定分类的组件，保留其他组件不变 |
| `setComponents` | `components: ConfigComponent[]` | 直接设置组件列表（批量更新） |
| `resetToDefaults` | 无 | 重置为当前类型的默认组件配置 |

### 4.2 配置管理

| Action | 参数 | 功能描述 |
|--------|------|----------|
| `loadConfiguration` | `config: Configuration` | 加载完整配置，设定类型、组件、配置ID和名称 |
| `saveConfiguration` | 无 | 异步保存当前配置到 Firebase 或降级到 localStorage |
| `deleteConfiguration` | `configId: string` | 从存储中删除指定配置 |
| `loadMyConfigs` | `userId?: string` | 从 Firebase 加载用户的所有配置 |
| `setMyConfigs` | `configs: Configuration[]` | 直接设置我的配置列表 |
| `setConfigId` | `id: string \| null` | 设置当前配置的 ID |
| `setManualConfigName` | `name: string \| null` | 设置手动配置名称 |

### 4.3 UI 状态控制

| Action | 参数 | 功能描述 |
|--------|------|----------|
| `toggleLibrary` | 无 | 切换组件库的显示/隐藏状态 |
| `toggleComponentSelector` | `componentId?: string` | 切换组件选择器弹窗，可指定正在编辑的组件 ID |

### 4.4 用户状态

| Action | 参数 | 功能描述 |
|--------|------|----------|
| `setLoggedIn` | `loggedIn: boolean` | 设置用户登录状态 |
| `setUserId` | `userId: string \| null` | 设置当前用户 ID |
| `setSaving` | `saving: boolean` | 设置保存操作进行中状态 |

### 4.5 计算属性

| Action | 参数 | 功能描述 |
|--------|------|----------|
| `getTotalCost` | 无 | 计算所有组件的总价格 |
| `getTotalWeight` | 无 | 计算总重量（基础重量 + 组件重量）/ 转换因子 |

## 5. Selectors

Zustand 支持三种 Selector 使用方式：直接访问、内联 Selector 和自定义 Hook Selector。

### 5.1 基本用法

```typescript
import { useConfigStore } from '@/lib/store';

// 直接访问单个属性
const activeType = useConfigStore((state) => state.activeType);
const components = useConfigStore((state) => state.components);

// 访问多个属性
const { activeType, components, isSaving } = useConfigStore((state) => ({
  activeType: state.activeType,
  components: state.components,
  isSaving: state.isSaving,
}));
```

### 5.2 计算 Selector

```typescript
// 计算总成本
const totalCost = useConfigStore((state) => state.getTotalCost());

// 计算总重量
const totalWeight = useConfigStore((state) => state.getTotalWeight());

// 获取配置数量
const configCount = useConfigStore((state) => state.myConfigs.length);
```

### 5.3 自定义 Selector Hook

```typescript
// 创建可复用的 Selector Hook
const useActiveComponents = () =>
  useConfigStore((state) => state.components);

const useIsLoading = () =>
  useConfigStore((state) => state.isSaving || state.isLoading);

const useCurrentConfig = () =>
  useConfigStore((state) => ({
    type: state.activeType,
    components: state.components,
    id: state.configId,
    name: state.manualConfigName,
  }));
```

### 5.4 条件 Selector

```typescript
// 获取特定类型的配置
const mtbConfigs = useConfigStore(
  (state) => state.myConfigs.filter((c) => c.bikeType === 'MTB')
);

// 获取已保存的配置
const hasSavedConfig = useConfigStore(
  (state) => state.configId !== null
);
```

## 6. Firebase 集成

### 6.1 集成策略

Veloform 采用 Firebase 作为主要云存储后端，通过 `firebase-service.ts` 模块封装所有 Firebase 操作。Store 中的异步操作采用动态导入方式，避免服务端渲染问题。

```typescript
// 动态导入 Firebase 服务
const { saveConfigurationToFirebase } = await import('./firebase-service');
const savedId = await saveConfigurationToFirebase(config, state.userId || undefined);
```

### 6.2 数据流

```
用户操作 → Store Action → Firebase Service → Firestore
                ↓
         UI 状态更新
```

### 6.3 Firebase 降级策略

当 Firebase 未配置或请求失败时，系统自动降级到 localStorage 方案：

```typescript
try {
  const { saveConfigurationToFirebase } = await import('./firebase-service');
  const savedId = await saveConfigurationToFirebase(config, state.userId || undefined);
  config.id = savedId;
} catch (error) {
  console.warn('Firebase save failed, using local only:', error);
  if (!config.id) {
    config.id = `config_${Date.now()}`;
  }
}
```

降级策略特点：

- 静默失败：仅记录警告日志，不阻塞用户操作
- 本地 ID 生成：使用时间戳生成临时 ID
- 状态同步：即使 Firebase 失败，本地状态仍会更新

### 6.4 错误处理

所有 Firebase 操作都包含错误处理：

```typescript
deleteConfiguration: async (configId: string) => {
  try {
    const { deleteConfigurationFromFirebase } = await import('./firebase-service');
    await deleteConfigurationFromFirebase(configId);
  } catch (error) {
    console.warn('Failed to delete from Firebase:', error);
  }
  // 本地状态仍会更新
  set((state) => ({
    myConfigs: state.myConfigs.filter((c) => c.id !== configId),
  }));
},
```

## 7. 最佳实践

### 7.1 组件使用原则

**按需订阅**：仅订阅所需的状态字段，避免不必要的重渲染。

```typescript
// 不推荐：订阅整个 state
const store = useConfigStore();

// 推荐：精确订阅
const activeType = useConfigStore((state) => state.activeType);
```

### 7.2 状态更新模式

**函数式更新**：在复杂状态更新中使用函数式写法确保状态准确性。

```typescript
// 替换组件
replaceComponent: (newComponent: ConfigComponent) =>
  set((state) => ({
    components: state.components.map((comp) =>
      comp.category === newComponent.category ? newComponent : comp
    ),
  })),
```

**不可变性**：始终返回新对象/数组，而非修改原状态。

### 7.3 异步操作处理

**加载状态**：异步操作应设置加载状态供 UI 反馈。

```typescript
saveConfiguration: async () => {
  const state = get();
  set({ isSaving: true });
  try {
    // 保存逻辑
  } catch (error) {
    console.error('Failed to save configuration:', error);
  } finally {
    set({ isSaving: false });
  }
},
```

### 7.4 TypeScript 类型安全

确保所有 Action 参数和 State 属性都有明确的类型定义。Store 接口应继承 `ConfigState` 类型以保证一致性。

### 7.5 性能优化

**避免过度订阅**：将大型对象拆分为多个小 Selector。

```typescript
// 拆分前
const config = useConfigStore((state) => state);

// 拆分后
const activeType = useConfigStore((state) => state.activeType);
const components = useConfigStore((state) => state.components);
const configId = useConfigStore((state) => state.configId);
```

### 7.6 命名规范

- Store Hook：`use` 前缀 + Store 名称（`useConfigStore`）
- Actions：动词开头（`set`、`toggle`、`load`、`save`、`delete`）
- State：名词或形容词（`activeType`、`isSaving`、`myConfigs`）
- Computed：get 前缀或描述性名称（`getTotalCost`、`totalWeight`）

### 7.7 代码组织

Store 文件应保持简洁，复杂逻辑应提取到独立服务：

- Firebase 逻辑 → `firebase-service.ts`
- 常量定义 → `constants.ts`
- 类型定义 → `types/index.ts`

### 7.8 测试建议

- 单元测试：测试单个 Action 的状态转换
- 集成测试：测试多个 Action 组合的场景
- Mock Firebase：使用 Jest mock 模拟 Firebase 服务

### 7.9 调试技巧

使用 Zustand DevTools（开发环境）：

```typescript
import { devtools } from 'zustand/middleware';

export const useConfigStore = create<ConfigStore>()(
  devtools((set, get) => ({
    // ... store implementation
  }), { name: 'Veloform Config Store' })
);
```
