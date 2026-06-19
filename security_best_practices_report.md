# Veloform 安全最佳实践审查报告（已迁移至 Supabase）

> **审查日期**: 2026-06-19
> **数据库**: Supabase (Postgres + Row Level Security)
> **版本**: v3.8.0

---

## 执行摘要

本次迁移将 Veloform 的数据库后端从 Firebase (Firestore + Firebase Auth) 迁移至 Supabase，带来以下安全架构升级：

1. **PostgreSQL + RLS**: 使用 Supabase 的行级安全策略，粒度控制数据访问权限
2. **内置 Auth**: Supabase Auth 替代 Firebase Auth，支持邮箱/密码和 OAuth 登录
3. **存储过程和触发器**: `updated_at` 触发器确保元数据完整性
4. **索引优化**: 针对 `user_id`、`bike_type`、`updated_at` 建立索引确保查询性能

---

## 数据库架构

### 核心表

#### `public.configurations`

| 列                 | 类型        | 约束                                        | 说明              |
| ------------------ | ----------- | ------------------------------------------- | ----------------- |
| `id`               | uuid        | PRIMARY KEY, DEFAULT uuid_generate_v4()     | 配置唯一标识      |
| `user_id`          | uuid        | REFERENCES auth.users(id) ON DELETE CASCADE | 创建者用户 ID     |
| `bike_type`        | text        | NOT NULL, CHECK IN ('Road', 'MTB', 'Fold')  | 车型分类          |
| `name`             | text        | NOT NULL, CHECK (char_length(name) <= 200)  | 配置名称          |
| `components`       | jsonb       | NOT NULL, DEFAULT '[]'::jsonb               | 组件列表（JSONB） |
| `total_cost`       | integer     | NOT NULL, DEFAULT 0                         | 总造价            |
| `estimated_weight` | integer     | NOT NULL, DEFAULT 0                         | 预计重量          |
| `description`      | text        | NULLABLE                                    | 配置描述          |
| `tags`             | text[]      | DEFAULT '{}'                                | 标签数组          |
| `created_at`       | timestamptz | NOT NULL, DEFAULT now()                     | 创建时间          |
| `updated_at`       | timestamptz | NOT NULL, DEFAULT now()                     | 最后更新时间      |

#### `public.components`（保留表，用于静态组件目录）

| 列            | 类型        | 约束                    | 说明         |
| ------------- | ----------- | ----------------------- | ------------ |
| `id`          | text        | PRIMARY KEY             | 组件 ID      |
| `category`    | text        | NOT NULL                | 组件分类     |
| `bike_type`   | text        | NOT NULL                | 适用车型     |
| `name`        | text        | NOT NULL                | 组件名称     |
| `brand`       | text        | NULLABLE                | 品牌         |
| `model`       | text        | NULLABLE                | 型号         |
| `price`       | integer     | NOT NULL, DEFAULT 0     | 价格         |
| `weight`      | integer     | NOT NULL, DEFAULT 0     | 重量         |
| `description` | text        | NULLABLE                | 描述         |
| `image_url`   | text        | NULLABLE                | 图片地址     |
| `specs`       | jsonb       | DEFAULT '{}'::jsonb     | 规格参数     |
| `created_at`  | timestamptz | NOT NULL, DEFAULT now() | 创建时间     |
| `updated_at`  | timestamptz | NOT NULL, DEFAULT now() | 最后更新时间 |

---

## 行级安全策略（RLS）

### `configurations` 表策略

| 策略名                                      | 操作   | 适用角色            | 逻辑                   |
| ------------------------------------------- | ------ | ------------------- | ---------------------- |
| `Configurations are publicly readable`      | SELECT | anon, authenticated | 公开可读（支持浏览）   |
| `Users can insert their own configurations` | INSERT | authenticated       | `auth.uid() = user_id` |
| `Users can update their own configurations` | UPDATE | authenticated       | `auth.uid() = user_id` |
| `Users can delete their own configurations` | DELETE | authenticated       | `auth.uid() = user_id` |

### `components` 表策略

| 策略名                             | 操作   | 适用角色            | 逻辑     |
| ---------------------------------- | ------ | ------------------- | -------- |
| `Components are publicly readable` | SELECT | anon, authenticated | 公开可读 |

> 注意：`components` 表禁止公开写入，需通过 Supabase Console 或服务角色 API 维护

---

## 数据库触发器

### `handle_updated_at()`

- **用途**: 自动更新 `updated_at` 字段为当前时间
- **触发时机**: BEFORE UPDATE
- **适用表**: `configurations`, `components`
- **语言**: PL/pgSQL

```sql
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

---

## 环境变量配置

### 必需变量

| 变量                            | 位置            | 描述                               |
| ------------------------------- | --------------- | ---------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | 浏览器 + 服务端 | Supabase 项目 URL                  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | 浏览器 + 服务端 | Supabase Anonymous Key（公开安全） |

### 服务端专用（可选）

| 变量                        | 位置     | 描述                                                     |
| --------------------------- | -------- | -------------------------------------------------------- |
| `SUPABASE_SERVICE_ROLE_KEY` | 仅服务端 | 服务角色密钥（跳过 RLS，高权限，**绝不能暴露给浏览器**） |

---

## API / 客户端访问模式

### 浏览器端（`src/lib/supabase.ts`）

- **客户端**: 单例模式，浏览器加载后初始化
- **认证 Session**: 持久化到 localStorage，自动刷新 token
- **鉴权方式**: 用户登录后自动在请求头注入 `Authorization: Bearer <jwt>`
- **安全保障**: RLS 在 Postgres 端强制执行，anon key 无权限写 `configurations`（除非 `user_id` 匹配）

### 服务端组件 / Route Handlers（`createClient()` 内联）

- **SSR 场景**: 每次调用新建客户端，避免跨请求状态泄漏
- **Cookie 同步**: 需要在 `middleware.ts` 中显式处理 Auth Cookie（见下方）

---

## Middleware 安全头（`src/middleware.ts`）

| Header                      | 值                                                     | 说明                   |
| --------------------------- | ------------------------------------------------------ | ---------------------- |
| `Content-Security-Policy`   | default-src 'self' + connect-src \*.supabase.co        | 阻止非白名单来源连接   |
| `X-Content-Type-Options`    | `nosniff`                                              | 防止 MIME 类型嗅探     |
| `X-Frame-Options`           | `DENY`                                                 | 防止点击劫持           |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                      | 最小化 referrer 泄漏   |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=(), payment=()` | 禁用敏感 API           |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload`         | 强制 HTTPS（生产环境） |

---

## 代码层面的数据安全保障

### 服务层（`src/lib/supabase-service.ts`）

| 函数                                          | 行为                 | 安全保障                                                                        |
| --------------------------------------------- | -------------------- | ------------------------------------------------------------------------------- |
| `saveConfigurationToSupabase(config, userId)` | Upsert configuration | RLS 会校验 `user_id = auth.uid()`；客户端使用 `isSupabaseConfigured()` 降级本地 |
| `loadConfigurationsFromSupabase(userId)`      | 读取用户配置列表     | RLS + `eq('user_id', userId)` 双重过滤                                          |
| `deleteConfigurationFromSupabase(configId)`   | 删除配置             | RLS 确保仅所有者可删                                                            |

### 配置验证（`src/lib/shareable-config.ts`）

- 使用 Zod 校验分享链接参数
- 限制最大长度（`MAX_CONFIG_LENGTH = 10000`），防止超大 payload 攻击

### 环境变量校验（`src/lib/env.ts`）

- 在开发模式自动校验 `NEXT_PUBLIC_SUPABASE_URL` 和 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- 缺失时给出警告，但不阻止生产构建

---

## 认证流程

### 登录方式

1. **邮箱 + 密码**: `loginWithEmail(email, password)`
2. **Google OAuth**: `loginWithGoogle()`（需要在 Supabase Console 配置 Google Provider）
3. **注册**: `signUpWithEmail(email, password)`

### 登出

```ts
await logout(); // 清除 Supabase session + 本地 Zustand store
```

### Session 监听

```ts
const unsubscribe = subscribeToAuthChanges(async (user) => {
  if (user) {
    setUserId(user.uid);
    const configs = await loadConfigurationsFromSupabase(user.uid);
    setMyConfigs(configs);
  } else {
    setUserId(null);
    setMyConfigs([]);
  }
});
```

---

## 迁移步骤（已完成）

| 步骤 | 文件                                                    | 说明                                        |
| ---- | ------------------------------------------------------- | ------------------------------------------- |
| 1    | `supabase/migrations/20260619000000_initial_schema.sql` | 创建数据库 schema + RLS 策略                |
| 2    | `src/lib/supabase.ts`                                   | Supabase 客户端初始化                       |
| 3    | `src/lib/supabase-service.ts`                           | 数据操作 API（替代 firebase-service.ts）    |
| 4    | `src/lib/auth.ts`                                       | 重写认证模块（使用 Supabase Auth）          |
| 5    | `src/lib/env.ts`                                        | 更新环境变量校验（从 Firebase → Supabase）  |
| 6    | `src/lib/constants.ts`                                  | `FIRESTORE_COLLECTIONS` → `SUPABASE_TABLES` |
| 7    | `src/components/SyncProvider.tsx`                       | 使用新的订阅函数                            |
| 8    | `src/lib/config-service.ts`                             | 切换到 Supabase service                     |
| 9    | `src/middleware.ts`                                     | 更新 CSP 白名单（允许 \*.supabase.co）      |
| 10   | `package.json`                                          | `firebase` → `@supabase/supabase-js`        |
| 11   | `README.md`                                             | 技术栈文档更新                              |

---

## 部署指南

### Supabase 项目准备

1. 在 [https://supabase.com/dashboard](https://supabase.com/dashboard) 创建新项目
2. 复制项目 URL 和 `anon` public key
3. 在 SQL Editor 中运行 `supabase/migrations/20260619000000_initial_schema.sql`
4. 在 **Authentication → URL Configuration** 配置站点 URL
5. （可选）在 **Authentication → Providers** 启用 Google OAuth

### 应用部署

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env.local
# 填写 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. 本地开发
npm run dev

# 4. 生产构建
npm run build
npm run start
```

---

## 安全审查清单

| 检查项                                    | 状态 | 说明                                           |
| ----------------------------------------- | ---- | ---------------------------------------------- |
| RLS 在 `configurations` 表启用            | ✅   | `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`    |
| RLS 在 `components` 表启用                | ✅   | 公开只读，禁止写入                             |
| Postgres 扩展 `uuid-ossp` 启用            | ✅   | 用于生成 UUID 主键                             |
| Anon Key 仅拥有公开读取权限               | ✅   | RLS 强制在数据库端执行                         |
| `updated_at` 自动更新触发器               | ✅   | `handle_updated_at()`                          |
| `user_id` 外键约束 + CASCADE 删除         | ✅   | `REFERENCES auth.users(id) ON DELETE CASCADE`  |
| `bike_type` 枚举 CHECK 约束               | ✅   | `CHECK (bike_type IN ('Road', 'MTB', 'Fold'))` |
| `name` 长度 CHECK 约束                    | ✅   | `CHECK (char_length(name) <= 200)`             |
| `user_id`、`bike_type`、`updated_at` 索引 | ✅   | 优化查询性能                                   |
| CSP 包含 Supabase 域名白名单              | ✅   | `connect-src 'self' https://*.supabase.co`     |
| 环境变量校验已更新为 Supabase 变量        | ✅   | `NEXT_PUBLIC_SUPABASE_URL` + `_ANON_KEY`       |
| SSR / 浏览器客户端分离实现                | ✅   | 避免 session 泄漏和 hydration mismatch         |

---

## 后续优化建议（可选）

1. **存储桶**: 如果后续需要上传组件图片，建议创建 `config-images` 存储桶并设置公开读取 + 认证用户上传的策略
2. **审计日志**: 添加 `audit_logs` 表和触发器，记录配置的创建/更新/删除事件
3. **分页查询**: `loadConfigurationsFromSupabase()` 当前无分页，如用户配置数量增多，建议添加 `.range()` 或 `.limit()` 分页
4. **实时订阅**: 使用 `client.channel('configurations').on('*', handler).subscribe()` 实现多设备实时同步

---

**报告路径**: `/workspace/security_best_practices_report.md`
**上次更新**: 2026-06-19
