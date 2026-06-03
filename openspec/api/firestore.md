# Firestore API 接口规范 (v3.4.1)

## 概述

Veloform 使用 Firebase Firestore 作为后端数据库，通过 Next.js Firebase SDK 进行数据操作。本文档定义所有数据库集合的 schema、安全规则和 API 契约。

---

## 服务初始化

### 动态导入策略

**重要**: Firebase 模块必须在客户端动态导入，避免服务端构建时出现问题。

```typescript
// 在 service 层顶部
let firestoreDb: Firestore | null = null;
let firebaseAuth: Auth | null = null;

export async function initializeFirebase(): Promise<boolean> {
  if (firestoreDb && firebaseAuth) {
    return true;
  }

  const { firebaseApp } = await import('./firebase');
  if (!firebaseApp) {
    return false;
  }

  firestoreDb = getFirestore(firebaseApp);
  firebaseAuth = getAuth(firebaseApp);
  return true;
}
```

### 配置检查

**函数**: `isFirebaseConfigured()`

**返回值**: `Promise<boolean>`

**行为**：检查 Firebase 是否已正确配置（环境变量存在且应用已初始化）

```typescript
export async function isFirebaseConfigured(): Promise<boolean> {
  const hasApiKey = !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const hasProjectId = !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!hasApiKey || !hasProjectId) {
    return false;
  }

  return await initializeFirebase();
}
```

### 认证状态监听

**函数**: `onAuthStateChangedListener(callback)`

**参数**：
- `callback`: `(user: User | null) => void`

**行为**：监听 Firebase Auth 状态变化

```typescript
export function onAuthStateChangedListener(
  callback: (user: User | null) => void
): () => void {
  if (!firebaseAuth) {
    return () => {};
  }
  return onAuthStateChanged(firebaseAuth, callback);
}
```

---

## 认证服务

### Google OAuth 登录

**函数**: `loginWithGoogle()`

**位置**: `src/lib/firebase-service.ts`

**返回值**: `Promise<UserCredential>`

**行为**：
- 触发 Google OAuth popup
- 成功后返回 UserCredential
- 失败时抛出结构化错误

**示例**：

```typescript
import { loginWithGoogle } from '@/lib/firebase-service';

try {
  const result = await loginWithGoogle();
  console.log('Logged in:', result.user.email);
} catch (error) {
  // Handle error
}
```

**错误处理**：

```typescript
interface AuthError {
  code: string;        // e.g., 'auth/popup-closed-by-user'
  message: string;     // Human-readable message
  operation: 'login';
  path: '/auth/google';
  authenticated: boolean;
}
```

### 登出

**函数**: `logoutFromFirebase()`

**返回值**: `Promise<void>`

```typescript
import { logoutFromFirebase } from '@/lib/firebase-service';

await logoutFromFirebase();
```

---

## 配置管理 API

### 1. 保存配置

**函数**: `saveConfigurationToFirebase(config: Configuration, userId?: string)`

**位置**: `src/lib/firebase-service.ts`

**参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `config` | `Configuration` | Yes | 配置对象 |
| `userId` | `string` | No | 用户 ID（未提供时自动获取当前用户） |

**返回值**: `Promise<string>` — 返回新建或更新后 Firestore 文档 ID

**前置条件**：用户已认证

**行为**：
- 如果 `config.id` 存在：执行 merge update
- 如果 `config.id` 不存在：创建新文档，自动生成 UUID
- 自动设置 `userId`（从参数或当前认证用户）
- 自动设置 `updatedAt` 为服务器时间戳
- 首次保存时设置 `createdAt`

**示例**：

```typescript
const config: Configuration = {
  bikeType: 'Road',
  name: 'S-Works Tarmac SL8',
  components: [
    {
      id: 'frame_road_sl8',
      category: 'Frame',
      name: 'S-Works Tarmac SL8 Frame',
      price: 3500,
      weight: 795
    }
  ],
  totalCost: 8500,
  estimatedWeight: 6.8
};

const configId = await saveConfigurationToFirebase(config);
// configId: 'abc123...'
```

**错误场景**：

| 错误码 | 说明 | 处理方式 |
|--------|------|----------|
| `permission-denied` | 未认证或不是所有者 | 提示用户重新登录 |
| `invalid-argument` | Schema 验证失败 | 显示具体字段错误 |
| `unavailable` | Firestore 不可用 | 重试机制（最多 3 次） |
| `firebase-not-configured` | Firebase 未配置 | 使用本地存储降级 |

**优雅降级**：

当 Firebase 未配置时，自动使用 localStorage 存储：

```typescript
const configId = await saveConfigurationToFirebase(config);
if (configId === 'local-storage') {
  console.log('Saved to localStorage');
}
```

---

### 2. 获取用户配置列表

**函数**: `loadConfigurationsFromFirebase(userId?: string)`

**位置**: `src/lib/firebase-service.ts`

**参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `userId` | `string` | No | 用户 ID（未提供时自动获取当前用户） |

**返回值**: `Promise<Configuration[]>`

**查询条件**：
- Collection: `configurations`
- Filter: `userId == userId`
- Order: `updatedAt DESC`

**示例**：

```typescript
const configs = await loadConfigurationsFromFirebase();
// Returns: [{ id: '...', name: 'My Road Bike', ... }, ...]
```

**性能优化**：
- 限制返回数量（最多 100 条）
- 客户端缓存结果（React Query/SWR 建议）

**错误场景**：

| 错误码 | 说明 | 处理方式 |
|--------|------|----------|
| `permission-denied` | 未认证 | 返回空数组，提示登录 |
| `unavailable` | Firestore 不可用 | 返回缓存数据或空数组 |
| `firebase-not-configured` | Firebase 未配置 | 从 localStorage 读取 |

---

### 3. 删除配置

**函数**: `deleteConfigurationFromFirebase(configId: string)`

**位置**: `src/lib/firebase-service.ts`

**参数**：

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `configId` | `string` | Yes | 配置文档 ID |

**返回值**: `Promise<void>`

**前置条件**：
- 用户已认证
- 用户是配置的所有者

**示例**：

```typescript
import { deleteConfigurationFromFirebase } from '@/lib/firebase-service';

try {
  await deleteConfigurationFromFirebase('abc123');
  showNotification('Configuration deleted');
} catch (error) {
  showError('Failed to delete configuration');
}
```

**错误场景**：

| 错误码 | 说明 | 处理方式 |
|--------|------|----------|
| `permission-denied` | 未认证或不是所有者 | 提示权限不足 |
| `not-found` | 配置不存在 | 静默忽略或刷新列表 |
| `firebase-not-configured` | Firebase 未配置 | 从 localStorage 删除 |

---

## 组件字典 API

### 1. 获取组件列表

**函数**: `loadComponentsFromFirebase()`

**位置**: `src/lib/firebase-service.ts`

**参数**: 无

**返回值**: `Promise<ConfigComponent[]>`

**ConfigComponent Schema**：

```typescript
interface ConfigComponent {
  id: string;           // Document ID (e.g., 'frame_road_sl8')
  category: string;     // e.g., 'Drivetrain', 'Wheelset', 'Frame'
  bikeType: string;     // 'Road' | 'MTB' | 'Fold'
  name: string;         // Display name
  price: number;        // USD
  weight: number;       // grams
  specs: string;        // Specification string
}
```

**行为**：
- 查询 `components` collection
- 如果 collection 为空，自动执行种子数据初始化
- 返回所有组件（客户端过滤 by bikeType）

**示例**：

```typescript
const allComponents = await loadComponentsFromFirebase();
const roadComponents = allComponents.filter(c => c.bikeType === 'Road');
```

**错误场景**：

| 错误码 | 说明 | 处理方式 |
|--------|------|----------|
| `unavailable` | Firestore 不可用 | 返回内置默认组件 |
| `firebase-not-configured` | Firebase 未配置 | 使用内置默认组件 |

---

### 2. 组件种子数据

**函数**: `seedComponentsToFirebase()`

**位置**: `src/lib/firebase-service.ts`

**触发条件**：`components` collection 为空时自动执行

**种子数据结构**：

```typescript
const SEED_COMPONENTS = [
  // Road (4 items)
  { id: 'frame_road_sl8', category: 'Frame', bikeType: 'Road', name: 'S-Works Tarmac SL8', price: 5500, weight: 850, specs: 'Carbon Fact 12r' },
  { id: 'frame_road_aethos', category: 'Frame', bikeType: 'Road', name: 'Aethos Pro', price: 4200, weight: 685, specs: 'Carbon Fact 10r' },
  { id: 'drive_road_da', category: 'Drivetrain', bikeType: 'Road', name: 'Shimano Dura-Ace Di2 R9200', price: 4200, weight: 2430, specs: '12-speed electronic' },
  { id: 'wheel_road_clx', category: 'Wheelset', bikeType: 'Road', name: 'Roval Rapide CLX II', price: 2800, weight: 1520, specs: 'Aero Carbon' },

  // MTB (4 items)
  { id: 'frame_mtb_epic', category: 'Frame', bikeType: 'MTB', name: 'Epic World Cup', price: 3500, weight: 1750, specs: 'Carbon, 75mm travel' },
  { id: 'drive_mtb_xx1', category: 'Drivetrain', bikeType: 'MTB', name: 'SRAM XX1 Eagle AXS', price: 2500, weight: 1515, specs: '12-speed wireless' },
  { id: 'susp_mtb_fox34', category: 'Suspension', bikeType: 'MTB', name: 'Fox 34 Float Factory', price: 1050, weight: 1738, specs: '120mm travel' },
  { id: 'wheel_mtb_res30', category: 'Wheelset', bikeType: 'MTB', name: 'Reserve 30|SL', price: 1800, weight: 1650, specs: 'Carbon MTB' },

  // Fold (3 items)
  { id: 'frame_fold_tline', category: 'Frame', bikeType: 'Fold', name: 'Brompton T Line Titanium', price: 2100, weight: 1800, specs: 'Titanium' },
  { id: 'drive_fold_6spd', category: 'Drivetrain', bikeType: 'Fold', name: 'Brompton 6-Speed', price: 400, weight: 1200, specs: 'Internal hub' },
  { id: 'wheel_fold_super', category: 'Wheelset', bikeType: 'Fold', name: 'Brompton Superlight', price: 800, weight: 1100, specs: '16 inch' }
];
```

**注意**：种子数据仅在 demo 模式下写入，生产环境应通过管理后台维护。

---

## Firestore 安全规则

### 默认规则

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Default: deny all
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Components Collection

```javascript
match /components/{componentId} {
  // Get requires valid ID format
  allow get: if componentId.matches('^[a-zA-Z0-9_-]+$');

  // List is public (for component browser)
  allow list: if true;

  // Write is open for demo seeding (production should restrict)
  allow write: if true;
}
```

**访问模式**：
- **Read**: 公开读取（组件浏览器需要）
- **Write**: Demo 模式开放，生产环境应限制为管理员

---

### Configurations Collection

```javascript
match /configurations/{configurationId} {
  // Helper function for schema validation
  function isValidConfiguration() {
    return resource.data.keys().hasOnly([
      'userId', 'bikeType', 'name', 'components',
      'totalCost', 'estimatedWeight', 'createdAt', 'updatedAt'
    ])
    && resource.data.bikeType in ['Road', 'MTB', 'Fold']
    && resource.data.name is string
    && resource.data.name.size() <= 200
    && resource.data.totalCost is number
    && resource.data.totalCost >= 0
    && resource.data.estimatedWeight is number
    && resource.data.estimatedWeight > 0
    && resource.data.components is list
    && resource.data.components.size() <= 50;
  }

  // Get: authenticated + owner match
  allow get: if request.auth != null
             && resource.data.userId == request.auth.uid;

  // List: authenticated + owner match
  allow list: if request.auth != null
              && resource.data.userId == request.auth.uid;

  // Create: authenticated + valid schema
  allow create: if request.auth != null
                && request.resource.data.userId == request.auth.uid
                && isValidConfiguration();

  // Update: authenticated + owner + immutable fields
  allow update: if request.auth != null
                && resource.data.userId == request.auth.uid
                && request.resource.data.userId == resource.data.userId
                && request.resource.data.createdAt == resource.data.createdAt
                && request.resource.data.updatedAt == request.time;

  // Delete: authenticated + owner
  allow delete: if request.auth != null
                && resource.data.userId == request.auth.uid;
}
```

**关键约束**：
1. **所有者隔离**：用户只能访问自己的配置
2. **不可变字段**：`userId` 和 `createdAt` 创建后不可修改
3. **Schema 验证**：严格字段类型和范围检查
4. **时间戳强制**：`updatedAt` 必须为服务器时间

---

## 错误处理模式

### 结构化错误对象

```typescript
interface FirestoreError {
  code: string;              // Firebase error code
  message: string;          // Original error message
  operation: 'create' | 'read' | 'update' | 'delete' | 'login';
  path: string;             // Firestore path
  authenticated: boolean;   // User auth status
  timestamp: number;        // Error occurrence time
  fallback?: boolean;       // Whether fallback was used
}
```

### 错误处理示例

```typescript
import { saveConfigurationToFirebase } from '@/lib/firebase-service';

async function handleSaveError(error: any, config: Configuration): Promise<void> {
  if (error.code === 'firebase-not-configured') {
    console.log('Firebase not configured, using local fallback');
    return;
  }

  if (error.code === 'permission-denied') {
    showNotification('Please log in to save configurations', 'error');
    openLoginModal();
    return;
  }

  if (error.code === 'unavailable') {
    showNotification('Network error. Will retry automatically.', 'warning');
    return;
  }

  showNotification('Failed to save. Please try again.', 'error');
}

// Usage
try {
  await saveConfigurationToFirebase(config);
} catch (error) {
  await handleSaveError(error, config);
}
```

### 优雅降级策略

当 Firebase 未配置时，系统自动降级到 localStorage：

```typescript
// 自动检测并降级
const result = await saveConfigurationToFirebase(config).catch(async (error) => {
  if (error.code === 'firebase-not-configured') {
    // 使用 localStorage 作为后备
    return saveToLocalStorage(config);
  }
  throw error;
});
```

---

## 性能优化建议

### 1. 查询优化

```typescript
// Good - Use where clause
const q = query(
  collection(firestoreDb, 'configurations'),
  where('userId', '==', userId),
  orderBy('updatedAt', 'desc'),
  limit(100)
);

// Bad - Client-side filtering
const snapshot = await getDocs(collection(firestoreDb, 'configurations'));
const filtered = snapshot.docs.filter(doc => doc.data().userId === userId);
```

### 2. 索引策略

确保以下复合索引已创建：
- `configurations`: `(userId ASC, updatedAt DESC)`
- `components`: `(bikeType ASC, category ASC)`

### 3. 缓存策略

使用 React Query 或 SWR 进行数据缓存：

```typescript
// 使用 React Query
const { data: configs, isLoading } = useQuery({
  queryKey: ['configurations', userId],
  queryFn: () => loadConfigurationsFromFirebase(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 30 * 60 * 1000 // 30 minutes
});
```

---

## 环境变量

需要以下环境变量：

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

---

## 相关文档

- [架构概览](../architecture/overview.md)
- [数据模型](./data-models.md)
- [开发规范](../development/coding-standards.md)

---

**最后更新**: 2026-05-26
**版本**: v3.4.1