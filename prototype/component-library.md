# Veloform 组件库规范 v4.2.0

> **路径**: `/prototype/component-library.md`
> **版本**: v4.2.0
> **更新日期**: 2026-07-18
> **设计风格**: 极简主义 · Apple 风格 · 国际顶尖水准

---

## 设计理念

Veloform v4.2.0 组件库采用 **极简主义设计哲学**，每个组件都经过精心打磨，确保视觉精致、交互自然、性能优异。所有组件基于 shadcn/ui + @base-ui/react 实现，与设计系统完全对齐。

### 核心原则

1. **Less is More** - 每个组件只保留最必要的功能和样式
2. **一致性** - 同类组件使用相同的设计 token
3. **可访问性** - 内置 ARIA 支持，支持键盘导航
4. **性能** - 使用 CSS 而非 JavaScript 实现动效
5. **可组合** - 组件原子化设计，灵活组合

---

## 1. 组件分类体系

| 层级 | 名称             | 定义                       | 典型组件                       | 目录                           |
| ---- | ---------------- | -------------------------- | ------------------------------ | ------------------------------ |
| L1   | **基础组件**     | 原子级 UI，单一职责        | Button, Input, Card, Badge     | `src/components/ui/`           |
| L2   | **复合组件**     | 基础组件组合，明确交互模式 | Form, DataTable, Dropdown      | `src/components/ui/`           |
| L3   | **业务组件**     | 面向特定业务场景           | BikeTypeSelector, SummaryPanel | `src/components/configurator/` |
| L4   | **页面 Section** | 大型页面段落               | Hero, Features, Pricing        | `src/components/sections/`     |

---

## 2. 基础组件规范 (L1)

### 2.1 按钮 (Button) ⭐

**设计理念**：按钮是用户执行操作的主要方式。通过变体区分操作优先级，克制使用样式。

#### 变体 (Variants)

| 变体                     | 视觉特征                      | 语义         | 使用场景            | 限制          |
| ------------------------ | ----------------------------- | ------------ | ------------------- | ------------- |
| `default` / `primary`    | 填充 primary，白字，微妙阴影  | **主要操作** | 确认、保存、主 CTA  | 每屏最多 1 个 |
| `secondary`              | 填充 surface-tertiary，深色字 | 次要操作     | 取消、返回          | —             |
| `outline`                | 透明背景，border 描边         | 可选操作     | 辅助功能            | —             |
| `ghost`                  | 透明背景，文字操作            | 轻量操作     | 工具栏、行内操作    | —             |
| `destructive` / `danger` | 红色背景/文字                 | 破坏性操作   | 删除、移除          | —             |
| `link`                   | 仅文字，primary 色，下划线    | 导航操作     | 链接                | —             |
| `gradient`               | 渐变背景，白字                | **品牌强调** | Hero CTA（仅 1 处） | ⚠️ 限制使用   |

#### 尺寸 (Sizes)

| 尺寸      | 高度    | Padding   | 字号 | 图标 | 使用场景           |
| --------- | ------- | --------- | ---- | ---- | ------------------ |
| `xs`      | 32px    | 8px 12px  | 12px | 14px | 紧凑布局、表格行内 |
| `sm`      | 36px    | 12px 16px | 14px | 16px | 卡片内、表单       |
| `default` | 40-44px | 16px 20px | 14px | 18px | **默认尺寸**       |
| `lg`      | 48px    | 20px 28px | 16px | 20px | Hero、重要 CTA     |
| `icon`    | 40-44px | 0         | —    | 20px | 图标按钮           |

#### 状态 (States)

| 状态     | 样式变化                       | 动画  |
| -------- | ------------------------------ | ----- |
| Default  | 基础样式                       | —     |
| Hover    | 背景色加深，阴影增强           | 150ms |
| Active   | `scale(0.98)`，translateY(1px) | 100ms |
| Focus    | `ring-3 ring-ring/50`          | 150ms |
| Disabled | `opacity(0.5)`，禁止交互       | —     |
| Loading  | 显示 spinner，隐藏文字         | —     |

#### 圆角规范

- 普通按钮：`rounded-xl` (12px)
- Pill 按钮：`rounded-full` (9999px)
- 图标按钮：`rounded-xl` (12px)

#### 代码位置

- 文件：`src/components/ui/button.tsx`
- 依赖：`@base-ui/react/button` + `class-variance-authority`

---

### 2.2 输入框 (Input)

**设计理念**：清晰、简洁、即时反馈。

#### 变体

| 变体      | 视觉特征                             | 使用场景 |
| --------- | ------------------------------------ | -------- |
| `default` | 透明背景，border 边框，focus 时 ring | 默认     |
| `error`   | 红色边框，红色提示文字               | 验证错误 |

#### 规格

- 高度：32px（默认）
- 圆角：`rounded-lg` (8px)
- 内边距：10px 12px
- 字号：14px（默认）

#### 状态

| 状态     | 样式                      |
| -------- | ------------------------- |
| Default  | 灰色边框                  |
| Focus    | Ring 焦点环               |
| Error    | 红色边框 + 红色提示       |
| Disabled | 灰色背景 + `opacity(0.5)` |

#### 代码位置

- 文件：`src/components/ui/input.tsx`
- 依赖：`@base-ui/react/input`

---

### 2.3 卡片 (Card)

**设计理念**：清晰的内容容器，微妙的阴影和边框。

#### 结构

```tsx
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述</CardDescription>
    <CardAction>操作</CardAction>
  </CardHeader>
  <CardContent>内容</CardContent>
  <CardFooter>底部</CardFooter>
</Card>
```

#### 规格

- 圆角：`rounded-xl` (12px)
- 内边距：`--card-spacing` (16px 默认，12px sm)
- 边框：`ring-1 ring-foreground/10`
- 背景：`bg-card`

#### 代码位置

- 文件：`src/components/ui/card.tsx`

---

### 2.4 对话框 (Dialog/Modal)

**设计理念**：聚焦用户注意力，清晰的行动选项。

#### 结构

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>打开</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>标题</DialogTitle>
      <DialogDescription>描述</DialogDescription>
    </DialogHeader>
    内容
    <DialogFooter>
      <Button>确认</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

#### 规格

- 圆角：`rounded-xl` (12px)
- 内边距：16px
- 最大宽度：512px（sm）
- 背景遮罩：`bg-black/10`，`backdrop-blur-xs`
- 动画：fade + zoom 组合，100ms

#### 代码位置

- 文件：`src/components/ui/dialog.tsx`
- 依赖：`@base-ui/react/dialog`

---

### 2.5 其他基础组件

| 组件           | 文件                 | 说明         |
| -------------- | -------------------- | ------------ |
| Textarea       | `textarea.tsx`       | 多行文本输入 |
| Label          | `label.tsx`          | 表单标签     |
| Checkbox       | `checkbox.tsx`       | 复选框       |
| Radio Group    | `radio-group.tsx`    | 单选组       |
| Switch         | `switch.tsx`         | 开关切换     |
| Slider         | `slider.tsx`         | 滑块         |
| Select         | `select.tsx`         | 下拉选择     |
| Badge          | `badge.tsx`          | 徽章/标签    |
| Avatar         | `avatar.tsx`         | 头像         |
| Progress       | `progress.tsx`       | 进度条       |
| Skeleton       | `skeleton.tsx`       | 骨架屏       |
| Separator      | `separator.tsx`      | 分隔线       |
| Alert          | `alert.tsx`          | 警告提示     |
| Tooltip        | `tooltip.tsx`        | 工具提示     |
| Popover        | `popover.tsx`        | 弹出层       |
| Dropdown Menu  | `dropdown-menu.tsx`  | 下拉菜单     |
| Alert Dialog   | `alert-dialog.tsx`   | 确认对话框   |
| Sheet          | `sheet.tsx`          | 侧边抽屉     |
| Tabs           | `tabs.tsx`           | 标签页       |
| Accordion      | `accordion.tsx`      | 手风琴       |
| Scroll Area    | `scroll-area.tsx`    | 滚动区域     |
| Sonner (Toast) | `sonner.tsx`         | 通知提示     |
| Error Boundary | `error-boundary.tsx` | 错误边界     |

---

## 3. 复合组件规范 (L2)

### 3.1 Modal (封装)

**设计理念**：基于 Dialog 的业务封装，提供更简洁的 API。

**代码位置**：`src/components/ui/Modal.tsx`

---

### 3.2 Loading Screen

**设计理念**：全屏加载状态，品牌化体验。

**代码位置**：`src/components/ui/LoadingScreen.tsx`

---

### 3.3 Async Boundary

**设计理念**：统一处理异步加载和错误边界。

**代码位置**：`src/components/ui/AsyncBoundary.tsx`

---

### 3.4 Theme Toggle

**设计理念**：主题切换按钮，支持浅色/深色/系统模式。

**代码位置**：`src/components/ui/ThemeToggle.tsx`

---

### 3.5 Onboarding Guide

**设计理念**：新手引导，帮助用户快速上手。

**代码位置**：`src/components/ui/OnboardingGuide.tsx`

---

### 3.6 Support Modal

**设计理念**：帮助/支持对话框。

**代码位置**：`src/components/ui/SupportModal.tsx`

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

**代码位置**：`src/components/configurator/BikeTypeSelector.tsx`

---

### 4.2 BuildList

**功能**：显示已选组件清单

**设计要点**：

- 列表式布局，每行一个组件
- 组件图标 + 名称 + 价格 + 操作按钮
- 点击组件可替换
- 空状态引导

**代码位置**：`src/components/configurator/BuildList.tsx`

---

### 4.3 ComponentSelector

**功能**：组件选择器（模态框）

**设计要点**：

- 基于 Dialog 封装
- 分类标签页
- 搜索过滤
- 组件卡片列表

**代码位置**：`src/components/configurator/ComponentSelector.tsx`

---

### 4.4 ComponentDetailModal

**功能**：组件详情模态框

**设计要点**：

- 组件大图展示
- 详细规格参数
- 价格/重量信息
- 选择按钮

**代码位置**：`src/components/configurator/ComponentDetailModal.tsx`

---

### 4.5 SummaryPanel

**功能**：配置摘要面板（总价、重量、组件列表）

**设计要点**：

- 固定右侧（桌面端）、底部抽屉（移动端）
- 清晰的数字展示（总价、重量）
- 组件列表：图标 + 名称 + 价格
- 操作按钮：固定底部

**代码位置**：`src/components/configurator/SummaryPanel.tsx`

---

### 4.6 其他业务组件

| 组件               | 目录            | 功能         |
| ------------------ | --------------- | ------------ |
| CostBreakdownChart | `configurator/` | 成本分解图表 |
| ComparePanel       | `configurator/` | 配置比较面板 |
| RecommendedConfigs | `configurator/` | 推荐配置卡片 |
| ShareModal         | `configurator/` | 分享模态框   |

---

## 5. 页面 Section 规范 (L4)

### 5.1 Hero

**功能**：首页主视觉区域

**设计要点**：

- 大标题（48px-64px）
- 副标题（18px-20px，muted 色）
- 单一 CTA（gradient 按钮，限制使用）
- 大量留白（上下 80px+）

**代码位置**：`src/components/sections/Hero.tsx`

---

### 5.2 Features

**功能**：特性展示区域

**代码位置**：`src/components/sections/Features.tsx`

---

### 5.3 Pricing

**功能**：定价展示区域

**代码位置**：`src/components/sections/Pricing.tsx`

---

### 5.4 Cta

**功能**：行动号召区域

**代码位置**：`src/components/sections/Cta.tsx`

---

## 6. 实施指南

### 6.1 shadcn/ui 添加组件

```bash
# 添加组件
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
```

### 6.2 样式定制

所有组件样式通过 `cn()` 工具函数合并，支持：

```tsx
import { cn } from '@/lib/utils';

<Button variant="default" size="default" className="w-full md:w-auto">
  保存
</Button>;
```

---

## 7. 检查清单

### 7.1 组件审查

- [ ] 使用正确的 variant 命名
- [ ] 圆角符合规范（button: 12px, card: 12px）
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

| 版本       | 日期       | 关键变更                                                  |
| ---------- | ---------- | --------------------------------------------------------- |
| **v4.1.0** | 2026-07-10 | 与 shadcn/ui 完全对齐、更新组件清单、补充所有基础组件文档 |
| v4.0.0     | 2026-07-05 | 极简主义重构、移除冗余变体、统一圆角                      |
| v3.8.0     | 2026-06-17 | 新增 gradient 变体                                        |
| v3.6.0     | 2026-06-08 | shadcn/ui 集成                                            |

---

**文档路径**: `/prototype/component-library.md`  
**最后更新**: 2026-07-10  
**版本**: v4.2.0
