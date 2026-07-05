# Veloform 组件库规范 v4.0.0

> **路径**: `/prototype/component-library.md`  
> **版本**: v4.0.0  
> **更新日期**: 2026-07-05  
> **设计风格**: 极简主义 · 国际顶尖水准

---

## 设计理念

Veloform v4.0.0 组件库采用 **极简主义设计哲学**，每个组件都经过精心打磨，确保视觉精致、交互自然、性能优异。

### 核心原则

1. **Less is More** - 每个组件只保留最必要的功能和样式
2. **一致性** - 同类组件使用相同的设计 token
3. **可访问性** - 内置 ARIA 支持，支持键盘导航
4. **性能** - 使用 CSS 而非 JavaScript 实现动效

---

## 1. 组件分类体系

| 层级 | 名称 | 定义 | 典型组件 | 目录 |
|-----|------|------|---------|------|
| L1 | **基础组件** | 原子级 UI，单一职责 | Button, Input, Card, Badge | `src/components/ui/` |
| L2 | **复合组件** | 基础组件组合，明确交互模式 | Form, DataTable, Dropdown | `src/components/composite/` |
| L3 | **业务组件** | 面向特定业务场景 | BikeTypeSelector, SummaryPanel | `src/components/configurator/` |
| L4 | **页面 Section** | 大型页面段落 | Hero, Features, Pricing | `src/components/sections/` |

---

## 2. 基础组件规范 (L1)

### 2.1 按钮 (Button) ⭐

**设计理念**：按钮是用户执行操作的主要方式。通过变体区分操作优先级，克制使用样式。

#### 变体 (Variants)

| 变体 | 视觉特征 | 语义 | 使用场景 | 限制 |
|-----|---------|------|---------|------|
| `primary` | 填充 primary，白字，微妙阴影 | **主要操作** | 确认、保存、主 CTA | 每屏最多 1 个 |
| `secondary` | 填充 surface-secondary，深色字 | 次要操作 | 取消、返回 | — |
| `outline` | 透明背景，primary 描边 | 可选操作 | 辅助功能 | — |
| `ghost` | 透明背景，文字操作 | 轻量操作 | 工具栏、行内操作 | — |
| `danger` | 填充 error，白字 | 破坏性操作 | 删除、移除 | — |
| `link` | 仅文字，primary 色，下划线 | 导航操作 | 链接 | — |
| `gradient` | 渐变背景，白字 | **品牌强调** | Hero CTA（仅 1 处） | ⚠️ 限制使用 |

#### 尺寸 (Sizes)

| 尺寸 | 高度 | Padding | 字号 | 图标 | 使用场景 |
|-----|------|---------|------|------|---------|
| `xs` | 32px | 8px 12px | 12px | 14px | 紧凑布局、表格行内 |
| `sm` | 40px | 12px 16px | 14px | 16px | 卡片内、表单 |
| `default` | 44px | 16px 20px | 14px | 18px | **默认尺寸** |
| `lg` | 52px | 20px 28px | 16px | 20px | Hero、重要 CTA |
| `icon` | 44px | 0 | — | 20px | 图标按钮 |

#### 状态 (States)

| 状态 | 样式变化 | 动画 |
|-----|---------|------|
| Default | 基础样式 | — |
| Hover | 背景色加深，阴影增强 | 150ms |
| Active | `scale(0.98)` | 100ms |
| Focus | `ring-2 ring-primary/20` | 150ms |
| Disabled | `opacity(0.5)`，禁止交互 | — |
| Loading | 显示 spinner，隐藏文字 | — |

#### 圆角规范

- 普通按钮：`rounded-xl` (12px)
- Pill 按钮：`rounded-full` (9999px)
- 图标按钮：`rounded-xl` (12px)

#### 代码示例

```tsx
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Loader2 } from 'lucide-react';

// 主要操作
<Button variant="primary" size="default">
  保存配置
</Button>

// Hero CTA（限制使用 gradient）
<Button variant="gradient" size="lg" className="rounded-full">
  开始配置
  <ChevronRight className="h-5 w-5" />
</Button>

// 次要操作
<Button variant="secondary" size="default">
  取消
</Button>

// 危险操作
<Button variant="danger" size="default">
  <Trash2 className="h-4 w-4" />
  删除
</Button>

// 图标按钮
<Button variant="ghost" size="icon">
  <Plus className="h-5 w-5" />
</Button>

// 加载状态
<Button variant="primary" disabled>
  <Loader2 className="h-5 w-5 animate-spin" />
  保存中...
</Button>
```

---

### 2.2 输入框 (Input)

**设计理念**：清晰、简洁、即时反馈。

#### 变体

| 变体 | 视觉特征 | 使用场景 |
|-----|---------|---------|
| `default` | 白色背景，灰色边框，focus 时 primary 边框 | 默认 |
| `error` | 红色边框，红色提示文字 | 验证错误 |

#### 规格

- 高度：44px（default）、52px（lg）
- 圆角：`rounded-lg` (8px)
- 内边距：12px 16px
- 字号：14px（default）、16px（lg）

#### 状态

| 状态 | 样式 |
|-----|------|
| Default | 灰色边框 |
| Focus | Primary 边框 + 微妙阴影 |
| Error | 红色边框 + 红色提示 |
| Disabled | 灰色背景 + `opacity(0.5)` |

#### 代码示例

```tsx
import { Input } from '@/components/ui/input';

<Input
  type="text"
  placeholder="搜索组件..."
  className="w-full"
/>

<Input
  type="email"
  placeholder="邮箱地址"
  error="请输入有效的邮箱地址"
/>
```

---

### 2.3 卡片 (Card)

**设计理念**：清晰的内容容器，微妙的阴影和边框。

#### 变体

| 变体 | 背景 | 边框 | 阴影 | 使用场景 |
|-----|------|------|------|---------|
| `default` | `var(--surface)` | `var(--border-light)` | `var(--shadow-sm)` | 默认卡片 |
| `elevated` | `var(--surface)` | 无 | `var(--shadow)` | 悬浮卡片 |
| `outline` | 透明 | `var(--border)` | 无 | 表单区域 |

#### 规格

- 圆角：`rounded-2xl` (16px)
- 内边距：20px（default）、24px（large）
- 阴影：`var(--shadow-sm)` 到 `var(--shadow)`

#### 代码示例

```tsx
import { Card } from '@/components/ui/card';

<Card className="p-6">
  <h3 className="text-lg font-semibold">组件名称</h3>
  <p className="text-sm text-muted-foreground mt-2">
    组件描述
  </p>
</Card>
```

---

### 2.4 对话框 (Dialog/Modal)

**设计理念**：聚焦用户注意力，清晰的行动选项。

#### 规格

- 圆角：`rounded-2xl` (16px)
- 内边距：24px
- 最大宽度：500px（default）、700px（large）
- 背景遮罩：`bg-black/50`，`backdrop-blur-sm`

#### 代码示例

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button variant="primary">打开对话框</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>确认删除</DialogTitle>
      <DialogDescription>
        此操作不可撤销。确定要删除此配置吗？
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="secondary">取消</Button>
      <Button variant="danger">删除</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

## 3. 复合组件规范 (L2)

### 3.1 表单 (Form)

**设计理念**：清晰的标签、即时的验证反馈、逻辑的分组。

#### 布局

- 标签位置：输入框上方
- 标签间距：8px（label 到 input）
- 字段间距：20px（垂直）
- 按钮间距：24px（按钮组）

#### 验证反馈

- 即时验证：输入时实时验证
- 错误提示：输入框下方，红色，14px
- 成功提示：绿色勾号图标

---

### 3.2 数据表格 (DataTable)

**设计理念**：清晰的数据展示，高效的操作。

#### 规格

- 行高：52px
- 字号：14px
- padding：12px 16px
- 边框：`border-b border-border-light`
- Hover：背景 `var(--surface-secondary)`

---

## 4. 业务组件规范 (L3)

### 4.1 BikeTypeSelector

**功能**：选择自行车类型（公路车/山地车/折叠车）

**设计要点**：
- 3 列网格（桌面端）、1 列（移动端）
- 卡片式设计，图标 + 标题 + 描述
- 选中状态：primary 边框 + 微妙背景色
- 圆角：`rounded-3xl` (24px)
- Hover：轻微上移 + 阴影增强

**代码示例**：

```tsx
// src/components/configurator/BikeTypeSelector.tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {bikeTypes.map((type) => (
    <button
      key={type.id}
      onClick={() => selectBikeType(type.id)}
      className={cn(
        "p-6 rounded-3xl text-left transition-all duration-300",
        "border-2",
        isSelected
          ? "border-primary bg-primary/5 shadow-lg"
          : "border-border-light hover:border-primary/30"
      )}
    >
      <type.icon className="h-8 w-8 mb-4 text-primary" />
      <h3 className="text-lg font-semibold">{type.name}</h3>
      <p className="text-sm text-muted-foreground mt-2">
        {type.description}
      </p>
    </button>
  ))}
</div>
```

---

### 4.2 SummaryPanel

**功能**：显示配置摘要（总价、重量、组件列表）

**设计要点**：
- 固定右侧（桌面端）、底部抽屉（移动端）
- 清晰的数字展示（总价、重量）
- 组件列表：图标 + 名称 + 价格
- 操作按钮：固定底部

---

## 5. 页面 Section 规范 (L4)

### 5.1 Hero

**功能**：首页主视觉区域

**设计要点**：
- 大标题（48px-64px）
- 副标题（18px-20px，muted 色）
- 单一 CTA（gradient 按钮，限制使用）
- 大量留白（上下 80px+）
- 可选：背景渐变或图案

**代码示例**：

```tsx
// src/components/sections/Hero.tsx
<section className="py-20 md:py-32">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
      配置你的梦想自行车
    </h1>
    <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
      选择组件、实时计算价格与重量，打造专属骑行装备
    </p>
    <div className="mt-10">
      <Button variant="gradient" size="lg" className="rounded-full">
        开始配置
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  </div>
</section>
```

---

## 6. 实施指南

### 6.1 shadcn/ui 初始化

```bash
# 初始化 shadcn/ui
npx shadcn-ui@latest init

# 添加组件
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
```

### 6.2 样式定制

所有组件样式通过 `cn()` 工具函数合并，支持：

```tsx
<Button
  variant="primary"
  size="lg"
  className="w-full md:w-auto" // 自定义类名
>
  保存
</Button>
```

---

## 7. 检查清单

### 7.1 组件审查

- [ ] 使用正确的 variant 命名（`primary` 而非 `default`）
- [ ] 圆角符合规范（button: 12px, card: 16px）
- [ ] 间距符合 4px 网格
- [ ] 阴影克制（仅使用定义的 shadow token）
- [ ] 动效时长 ≤ 300ms
- [ ] 支持键盘导航
- [ ] ARIA 属性完整

### 7.2 性能审查

- [ ] 使用 `transform` 和 `opacity` 实现动效
- [ ] 避免 `layout` 属性动画（width, height）
- [ ] 图标使用 SVG 而非 emoji
- [ ] 图片使用 `next/image` 优化

---

## 版本历史

| 版本 | 日期 | 关键变更 |
|-----|------|---------|
| v4.0.0 | 2026-07-05 | 极简主义重构、移除冗余变体、统一圆角 |
| v3.8.0 | 2026-06-17 | 新增 gradient 变体 |
| v3.6.0 | 2026-06-08 | shadcn/ui 集成 |

---

**文档路径**: `/prototype/component-library.md`  
**最后更新**: 2026-07-05  
**版本**: v4.0.0
