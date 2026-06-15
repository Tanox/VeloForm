# Veloform 交互标准

> **路径**: `/prototype/interaction-standards.md`
> **版本**: v3.7.0
> **更新日期**: 2026-06-14

---

## 1. 交互模式库 (Interaction Pattern Library)

### 1.1 导航模式 (Navigation)

#### 1.1.1 顶部导航栏 (Navbar)

| 元素 | 规格 |
|-----|------|
| 高度 | 72px (固定) |
| 内边距 | `px-6 md:px-10` |
| Logo 区域 | 左侧，`flex items-center gap-2`，点击返回首页 |
| 导航链接 | 居中，水平 `gap-8`，文字 `text-sm font-medium` |
| 激活状态 | 当前页链接文字 `text-primary`，下划线 `border-b-2 border-primary` |
| 右侧操作区 | 主题切换按钮 + 语言切换 + 主操作按钮（登录/配置库） |
| 移动端 | 1024px 以下，导航链接折叠为汉堡菜单 → 抽屉式展开 |

#### 1.1.2 侧边栏导航 (Sidebar)

适用于配置器、管理后台等工具型页面。

| 元素 | 规格 |
|-----|------|
| 宽度 | 默认 280px（桌面），可折叠到 72px |
| 背景 | `bg-surface-secondary border-r border-border-light` |
| 项高度 | `min-h-[52px]` |
| 项内边距 | `px-4` |
| 激活项 | `bg-primary/10 text-primary` + 左侧 3px 色条 `border-l-[3px] border-l-primary` |
| 悬停项 | `bg-surface-tertiary` |
| 图标 | `h-5 w-5`，与文字间距 `gap-3` |

#### 1.1.3 面包屑 (Breadcrumbs)

```tsx
// 结构
<nav aria-label="breadcrumb">
  <ol className="flex items-center gap-2 text-sm text-muted">
    <li><Link href="/">首页</Link></li>
    <li aria-hidden="true">/</li>
    <li><Link href="/library">配置库</Link></li>
    <li aria-hidden="true">/</li>
    <li className="text-foreground font-medium" aria-current="page">
      当前配置
    </li>
  </ol>
</nav>
```

> **使用规则**：页面深度 ≥ 2 级时显示；最后一项不可点击。

---

### 1.2 选择模式 (Selection)

#### 1.2.1 单选 (Single Select)

| 场景 | 推荐组件 |
|-----|---------|
| 3 项以内 | Radio Group / Button Group |
| 3-10 项 | 下拉选择器 (Select / Dropdown) |
| 10 项以上 | 可搜索的 Combobox |
| 视觉化选项（车型、颜色） | 卡片式选择 (Card Select) |

#### 1.2.2 多选 (Multi Select)

| 场景 | 推荐组件 |
|-----|---------|
| 5 项以内 | Checkbox Group |
| 5 项以上 | 带标签的 Multi-select |
| 批量操作 | 带选择框的数据表 (DataTable + select all) |

#### 1.2.3 卡片式选择（车型选择器）

```
┌───────────┐   ┌───────────┐   ┌───────────┐
│ ┌───────┐ │   │ ┌───────┐ │   │ ┌───────┐ │
│ │  图标  │ │   │ │  图标  │ │   │ │  图标  │ │
│ └───────┘ │   │ └───────┘ │   │ └───────┘ │
│           │   │           │   │           │
│ 公路车 Road│   │ 山地车 MTB│   │ 折叠车 Fold│
│           │   │           │   │           │
│ 速度与... │   │ 越野与... │   │ 便携与... │
│           │   │           │   │           │
│    ●      │   │    ○      │   │    ○      │   ← 选中标记
└───────────┘   └───────────┘   └───────────┘
 Selected (Primary border)    Default             Default
 (bg-primary/5)              (bg-surface-secondary)
```

**选中反馈**：
- 边框颜色：`border-primary`，2px
- 背景：`bg-primary/5`
- 图标：`scale-1.1`，`text-primary`
- 右上角小圆点：`h-2.5 w-2.5 rounded-full bg-primary`
- 动画：`scale-in 250ms cubic-bezier(0.4,0,0.2,1)`

---

### 1.3 列表模式 (List Patterns)

#### 1.3.1 组件清单 (BuildList)

每个组件项结构：

```
┌──────────────────────────────────────────────────────────┐
│ [图标]  车架 · Giant TCR Advanced SL                      │
│         碳纤维车架 · 尺寸 M                               │
│                                                     ¥23,800│
│                                    [编辑] [替换] [移除]   │
└──────────────────────────────────────────────────────────┘
```

| 元素 | 样式 |
|-----|------|
| 容器 | `rounded-2xl bg-surface-secondary p-6 border border-border-light` |
| 分类标签 | `text-xs uppercase tracking-wide text-muted` |
| 名称 | `text-base font-medium text-foreground` |
| 描述 | `text-sm text-muted mt-1` |
| 价格 | `text-accent font-bold text-lg`，右对齐 |
| 操作按钮 | variant="ghost" size="sm"，行内排列 |

#### 1.3.2 空状态 (Empty State) — 详见 §4

---

### 1.4 筛选与搜索 (Filter & Search)

#### 1.4.1 搜索框

```tsx
<div className="relative w-full max-w-md">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
  <input
    type="search"
    placeholder="搜索组件名称、品牌..."
    className="w-full rounded-2xl bg-surface-secondary border border-border-light
               pl-12 pr-12 py-3 text-base
               focus:border-primary focus:ring-4 focus:ring-primary/20
               outline-none transition-all"
  />
  <kbd className="absolute right-4 top-1/2 -translate-y-1/2
                 text-xs text-muted border border-border-light
                 rounded px-2 py-1 hidden sm:block">
    /
  </kbd>
</div>
```

#### 1.4.2 筛选标签 (Filter Chips)

| 状态 | 样式 |
|-----|------|
| 未选中 | `bg-surface-secondary text-foreground rounded-full px-4 py-2 text-sm` |
| 选中 | `bg-primary text-white rounded-full px-4 py-2 text-sm font-medium` |
| 悬停 | 未选中时 `bg-surface-tertiary` |

> **快捷键**：按 `/` 聚焦搜索框；按 `Esc` 清空搜索。

---

### 1.5 引导与教程 (Onboarding & Tutorial)

#### 1.5.1 新用户引导模式 (Tour / Coach Marks)

- **遮罩层**：半透明黑色遮罩 + 高亮目标元素的镂空
- **引导卡片**：目标元素附近弹出，含标题、说明、「下一步」「跳过」按钮
- **进度指示**：`步骤 1 / 4`
- **可跳过**：所有引导默认可跳过，且不再显示

#### 1.5.2 首次访问引导流程

1. **欢迎页面**：介绍 Veloform 核心价值，展示快速开始按钮
2. **车型选择**：高亮三种车型，帮助用户选择
3. **组件配置**：演示如何添加/替换组件
4. **保存与分享**：演示保存配置并生成分享链接

---

## 2. 交互反馈规范 (Feedback)

### 2.1 视觉反馈层级

| 层级 | 强度 | 典型场景 | 视觉元素 |
|-----|------|---------|---------|
| L1 | 即时反馈 | Hover / Focus | 颜色变化、缩放 |
| L2 | 操作反馈 | Click / Select | 涟漪动画、选中高亮 |
| L3 | 过程反馈 | Loading / Saving | Spinner、进度条、骨架屏 |
| L4 | 结果反馈 | Success / Error | Toast、Banner、Modal |
| L5 | 通知反馈 | 系统通知 | Toast + 声音（可选） |

### 2.2 悬停反馈 (Hover)

| 组件 | 悬停样式 | 动画时长 |
|-----|---------|---------|
| 主按钮 | `bg-primary-hover, y: -1, shadow deepen` | 200ms |
| 次按钮 | `bg-surface-tertiary` | 150ms |
| 卡片 | `shadow-apple-lg, -translate-y-1` | 250ms |
| 列表项 | `bg-surface-tertiary` | 150ms |
| 链接文字 | `text-primary-hover` + 下划线 | 150ms |

### 2.3 按下反馈 (Pressed)

| 组件 | 按下样式 | 时长 |
|-----|---------|------|
| 按钮 | `scale: 0.97, opacity: 0.92` | 100ms |
| 卡片 | `scale: 0.995` | 100ms |
| Tab | `scale: 0.98` | 100ms |

### 2.4 焦点反馈 (Focus)

所有可交互元素的默认焦点样式：

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.2);
  border-color: #0071e3;
}
```

> **不可移除焦点样式** — 键盘用户的唯一视觉指示。

### 2.5 加载反馈 (Loading)

#### 2.5.1 按钮内加载

```tsx
<Button disabled>
  <Loader2 className="h-5 w-5 animate-spin" />
  <span>保存中...</span>
</Button>
```

#### 2.5.2 页面级加载

- **骨架屏 (Skeleton)**：首次加载数据时使用，保持与实际内容相同的布局结构
- **进度条**：顶部细线进度条（Next.js 的 `NProgress` 风格）
- **全屏 Loading**：仅用于初始化或重要的同步操作

#### 2.5.3 骨架屏规范

- **动画**：`shimmer` 效果，`2s linear infinite`
- **颜色**：`bg-surface-tertiary/50` → `bg-surface-tertiary/30`
- **最小展示时长**：800ms（避免闪烁）

---

### 2.6 Toast 通知规范

#### 2.6.1 视觉规范（参考 §2.6 Toast）

| 类型 | 背景色 | 图标 | 时长 |
|-----|--------|------|------|
| 成功 | `bg-surface-secondary border-l-4 border-accent` | `CheckCircle` (accent) | 3s |
| 错误 | `bg-surface-secondary border-l-4 border-error` | `AlertCircle` (error) | 5s |
| 警告 | `bg-surface-secondary border-l-4 border-warning` | `AlertTriangle` (warning) | 4s |
| 信息 | `bg-surface-secondary border-l-4 border-primary` | `Info` (primary) | 4s |
| 加载中 | `bg-surface-secondary` | `Loader2 (animate-spin)` | 手动关闭 |

#### 2.6.2 文案规范

```tsx
// ✅ 好的 Toast 文案 - 具体、行动导向
toast.success('配置已保存', {
  description: '你的配置「周末赛车」已同步到云端',
  action: { label: '查看', onClick: () => router.push('/library') },
});

// ❌ 差的 Toast 文案 - 含糊、无价值
toast.success('操作成功', { description: '你做了一个操作' });
```

#### 2.6.3 放置与堆叠

- **位置**：桌面端右上角（`top-24 right-6`）；移动端底部居中
- **最大数量**：同时显示 ≤ 3 个；超出的放入队列
- **堆叠间距**：`gap-3`
- **可撤销操作**：删除类操作应包含「撤销」按钮（5 秒内可撤销）

---

### 2.7 内联反馈 (Inline Feedback)

#### 2.7.1 表单验证反馈

```
  配置名称 *
┌────────────────────────────────┐
│ 周末长途赛车配置                 │ ← 用户输入
└────────────────────────────────┘
  ✅ 名称可用（绿色小字，blur 后 300ms 显示）

  / 或 /

  ❌ 名称已存在，请更换（红色 + 错误图标）
```

#### 2.7.2 保存状态指示

组件中保存按钮旁边显示小状态：

```tsx
<div className="flex items-center gap-2 text-sm text-muted">
  {isDirty && !isSaving && <span>● 有未保存更改</span>}
  {isSaving && (
    <span className="flex items-center gap-1.5">
      <Loader2 className="h-4 w-4 animate-spin" />
      正在保存...
    </span>
  )}
  {!isDirty && !isSaving && <span>✓ 已保存</span>}
</div>
```

---

## 3. 错误处理规范 (Error Handling)

### 3.1 错误类型与应对策略

| 错误类型 | 典型场景 | 用户影响 | 推荐应对 |
|---------|---------|---------|---------|
| **输入错误** | 表单字段无效、必填缺失、格式错 | 低 | 内联错误文字 + 红色边框，禁用提交 |
| **操作错误** | 删除不存在的项、权限不足 | 中 | Modal 确认 + Toast 提示 |
| **网络错误** | API 请求失败、超时 | 中 | Toast 错误通知 + 重试按钮 |
| **认证错误** | Token 过期、未登录 | 高 | 跳转登录页 + 保存当前状态 |
| **系统错误** | 服务异常、500 错误 | 高 | 错误边界页面 + 联系支持 |
| **资源缺失** | 404 页面未找到 | 中 | 404 专用页面 + 推荐内容 |

### 3.2 输入错误处理

#### 3.2.1 表单字段错误

```tsx
// ✅ 推荐：错误信息直接放在字段下方
<div className="flex flex-col gap-2">
  <label htmlFor="email" className="text-sm font-medium">邮箱</label>
  <input
    id="email"
    type="email"
    className={`rounded-2xl border px-4 py-3 text-base outline-none
                transition-all focus:ring-4
                ${error
                  ? 'border-error focus:border-error focus:ring-error/20'
                  : 'border-border focus:border-primary focus:ring-primary/20'}`}
    aria-invalid={!!error}
    aria-describedby={error ? 'email-error' : undefined}
  />
  {error && (
    <p id="email-error" className="text-sm text-error flex items-center gap-1.5">
      <AlertCircle className="h-4 w-4" aria-hidden="true" />
      {error}
    </p>
  )}
</div>
```

#### 3.2.2 字段验证时机

| 验证类型 | 触发时机 | 说明 |
|---------|---------|------|
| 初始校验 | 提交时 | 首次提交时一次性校验所有字段 |
| 增量校验 | blur 后 | 用户离开字段时校验 |
| 实时校验 | input 时 | 仅用于格式/长度校验，不用于异步 |
| 异步校验 | debounce 500ms | 如邮箱是否存在、名称是否重复 |

#### 3.2.3 错误文案原则

1. **具体不指责**：「此邮箱格式不正确」 > 「你输入有误」
2. **给出解决方案**：「密码至少需要 8 位字符」> 「密码太短」
3. **一屏一错**：避免同一字段显示多个错误，只显示当前最严重的
4. **使用用户语言**：不显示技术错误码（如「Error 422」）给终端用户

### 3.3 网络错误处理

#### 3.3.1 重试机制

```tsx
// 指数退避重试
// 第 1 次失败 → 等待 1000ms 后重试
// 第 2 次失败 → 等待 2000ms 后重试
// 第 3 次失败 → 等待 4000ms 后重试
// 最多 3 次，之后显示手动重试按钮
```

#### 3.3.2 网络中断状态

- **检测**：`navigator.onLine` + 周期性心跳
- **视觉反馈**：顶部红色 Banner「网络连接已断开，你的更改保存在本地」
- **自动恢复**：网络恢复时自动同步，并显示成功 Toast「已恢复，配置已同步」

### 3.4 错误边界 (Error Boundary)

#### 3.4.1 组件级错误边界

React 组件在渲染过程中抛出错误时，由错误边界捕获并展示降级 UI。

```tsx
// UI 规范：
<Card className="p-8 text-center">
  <div className="mx-auto w-12 h-12 rounded-full bg-error/10
                  flex items-center justify-center mb-4" aria-hidden="true">
    <AlertTriangle className="h-6 w-6 text-error" />
  </div>
  <h3 className="text-lg font-semibold mb-2">此组件加载失败</h3>
  <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
    抱歉，出现了一个意外错误。你可以尝试刷新页面，或稍后再试。
  </p>
  <div className="flex justify-center gap-3">
    <Button variant="secondary" onClick={handleReset}>重新加载</Button>
    <Button variant="ghost" onClick={() => reportError(error)}>反馈问题</Button>
  </div>
</Card>
```

#### 3.4.2 页面级 404 规范

```tsx
// 404 页面内容规范
<div className="text-center py-24">
  <h1 className="text-8xl font-display font-bold text-primary/30">404</h1>
  <h2 className="text-2xl font-semibold mt-4">页面未找到</h2>
  <p className="text-muted mt-3 max-w-md mx-auto">
    你访问的页面可能已被移动或删除。
  </p>
  <div className="flex justify-center gap-3 mt-8">
    <Button variant="primary" onClick={() => router.push('/')}>返回首页</Button>
    <Button variant="secondary" onClick={() => router.back()}>返回上一页</Button>
  </div>

  {/* 推荐内容 */}
  <div className="mt-12 max-w-3xl mx-auto text-left">
    <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4">
      也许你在找：
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* 推荐卡片 */}
    </div>
  </div>
</div>
```

### 3.5 错误日志与上报

```tsx
// src/lib/logger.ts - 统一错误上报接口
export const logger = {
  error: (message: string, context?: Record<string, unknown>) => {
    // 开发环境 console.error；生产环境上报到监控服务
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[Error] ${message}`, context);
    }
  },
  warn: (message: string, context?: Record<string, unknown>) => {},
  info: (message: string, context?: Record<string, unknown>) => {},
};
```

---

## 4. 空状态设计规范 (Empty State)

### 4.1 空状态分类

| 场景 | 类型 | 情感基调 |
|-----|------|---------|
| 初次使用 | **首次空状态** | 欢迎、引导 |
| 清空列表 | **操作后空状态** | 确认、鼓励重试 |
| 搜索无结果 | **过滤空状态** | 帮助、建议 |
| 权限不足 | **访问空状态** | 清晰、解释 |
| 加载失败 | **错误空状态** | 抱歉、提供重试 |

### 4.2 空状态组件结构

所有空状态必须包含以下 4 个元素：

```
┌─────────────────────────────────────────┐
│                                         │
│            ┌──────────┐                 │
│            │   插图   │ ← 48-96px 图标 │
│            │  (Icon)  │                 │
│            └──────────┘                 │
│                                         │
│         标题 (Heading 2-3)              │ ← 一句话说明
│                                         │
│     正文描述 (Body text, muted)         │ ← 解释 + 建议
│                                         │
│   [主操作按钮]  [次操作按钮]             │ ← 行动导向
│                                         │
└─────────────────────────────────────────┘
```

### 4.3 空状态视觉规范

| 元素 | 规格 |
|-----|------|
| 插图尺寸 | `h-16 w-16` ~ `h-24 w-24`（移动端偏小） |
| 插图背景 | 可选圆形背景 `bg-surface rounded-full p-6` |
| 插图颜色 | `text-muted`，避免使用主色（会被误解为错误） |
| 标题 | `text-xl font-semibold font-display` |
| 描述 | `text-sm text-muted max-w-sm mx-auto leading-relaxed` |
| 操作按钮区 | `mt-8 flex flex-col sm:flex-row gap-3 justify-center` |
| 整体容器 | `py-16 md:py-24 text-center` |

### 4.4 空状态场景示例

#### 4.4.1 首次使用 — 配置库为空

```
            ┌──────────┐
            │ 🛠  扳手图标│     ← Lucide: Wrench
            └──────────┘

           还没有任何配置

     从选择车型开始，打造你的第一辆自行车。
     所有配置会自动保存在你的账户中。

         [开始第一个配置]     [查看示例配置]
```

#### 4.4.2 搜索无结果

```
            ┌──────────┐
            │ 🔍  搜索图标│     ← Lucide: Search
            └──────────┘

          未找到匹配的组件

     试试调整搜索关键词，或清除筛选条件查看所有组件。
     当前搜索：「碳刀 50mm」

             [清除搜索条件]
```

#### 4.4.3 删除后空状态

```
            ┌──────────┐
            │ 🗑  垃圾桶图标│     ← Lucide: Trash2
            └──────────┘

          配置已被清空

     你删除了所有组件。可以从默认配置重新开始，或恢复上一版本。

         [恢复默认配置]     [重新选择车型]
```

#### 4.4.4 权限不足

```
            ┌──────────┐
            │ 🔒  锁图标 │     ← Lucide: Lock
            └──────────┘

          需要登录才能查看

     此配置为私有配置，请登录对应账户后再查看。

         [登录]
```

#### 4.4.5 加载失败

```
            ┌──────────┐
            │ ⚠️ 警告图标│     ← Lucide: AlertTriangle
            └──────────┘

          加载配置失败

     网络连接可能不稳定。请检查网络后重试。

         [重新加载]     [离线查看本地缓存]
```

### 4.5 空状态写作原则

1. **标题动词化**：用动词开头，让用户感知行动方向
2. **描述共情 + 方案**：先解释当前状态 → 给出可行建议
3. **按钮文案具体**：「开始第一个配置」>「确定」>「继续」
4. **避免机械感**：用自然的口语化表达，不使用机器人语气
5. **保持乐观**：即使出错也保持帮助用户的态度，不使用指责性语言

### 4.6 空状态推荐图标

| 场景 | 推荐 Lucide 图标 | 颜色 |
|-----|-----------------|------|
| 首次使用 / 空白 | `Wrench`, `PlusCircle`, `FilePlus` | `text-muted` |
| 搜索无结果 | `Search`, `SearchX` | `text-muted` |
| 清空/删除 | `Trash2`, `RotateCcw` | `text-muted` |
| 权限不足 | `Lock`, `ShieldAlert` | `text-secondary` |
| 加载失败 | `AlertTriangle`, `WifiOff` | `text-warning` |
| 无数据（列表） | `List`, `LayoutList` | `text-muted` |

> **原则**：空状态图标避免使用过于鲜艳的颜色（尤其是红色），以免被误读为错误。

---

## 5. 键盘快捷键规范

### 5.1 全局快捷键

| 操作 | 快捷键 | 说明 |
|-----|--------|------|
| 聚焦搜索 | `/` | 任何页面均可使用 |
| 打开命令面板 | `⌘ + K` / `Ctrl + K` | 命令搜索与跳转 |
| 保存 | `⌘ + S` / `Ctrl + S` | 表单/编辑器页面 |
| 关闭模态框 | `Esc` | 所有弹窗 |
| 取消编辑 | `Esc` | 需在编辑模式下 |

### 5.2 表单快捷键

| 操作 | 快捷键 |
|-----|--------|
| 下一个字段 | `Tab` |
| 上一个字段 | `Shift + Tab` |
| 提交表单 | `Enter` (单字段表单) |
| 新建行 | `Enter` (列表编辑器) |
| 删除当前行 | `⌘ + Backspace` |

### 5.3 快捷键发现

- **命令面板**：集中展示所有可用快捷键及功能
- **按钮提示**：工具类型按钮的 tooltip 中展示对应快捷键
- **首次使用**：快捷键以 badge 形式短暂出现在按钮旁（3 秒后自动隐藏）

---

## 6. 可访问性交互规范 (A11y)

### 6.1 基础要求清单

- [ ] 所有可交互元素使用 `<button>` 或 `<a>` 语义标签
- [ ] 所有按钮有可理解的文字内容（或 `aria-label`）
- [ ] 所有输入框通过 `htmlFor + id` 与 `<label>` 绑定
- [ ] 所有装饰性图标添加 `aria-hidden="true"`
- [ ] 所有可交互元素最小触控目标 `44 × 44px`
- [ ] 所有表单错误通过 `aria-invalid` + `aria-describedby` 告知屏幕阅读器
- [ ] 所有 `role="tab"` / `role="dialog"` 等含对应 `aria-*` 属性
- [ ] 颜色对比度满足 WCAG AA（正文 4.5:1，大字 3:1）
- [ ] 焦点顺序与视觉顺序一致（不使用 `tabindex > 0`）
- [ ] 不依赖仅颜色来传达信息（例如错误必须同时有文字/图标）

### 6.2 焦点管理

| 场景 | 焦点行为 |
|-----|---------|
| 打开模态框 | 焦点移动到模态框内第一个可交互元素 |
| 关闭模态框 | 焦点返回触发模态框的按钮 |
| 打开下拉菜单 | 焦点移至第一个菜单项 |
| Tab 切换 | 焦点顺序 = 视觉顺序 = DOM 顺序 |
| 表单错误 | 第一个错误字段自动聚焦并显示错误信息 |

### 6.3 减少动效 (Prefers Reduced Motion)

```tsx
// 全局检测
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 应用
<motion.div
  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
/>
```

---

## 相关文档

- [设计系统规范](./design-system-spec.md)
- [组件库规范](./component-library.md)
- [UI 设计系统](../openspec/design/ui-design-system.md)
- [可访问性指南](./design/accessibility-guidelines.md)

---

**文档路径**: `/prototype/interaction-standards.md`
**最后更新**: 2026-06-14
**版本**: v3.7.0
