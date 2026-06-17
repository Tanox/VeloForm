# Veloform 组件库规范

> **路径**: `/prototype/component-library.md`
> **版本**: v3.8.0
> **更新日期**: 2026-06-17

---

## 1. 组件分类体系

| 层级 | 名称 | 定义 | 典型组件 |
|-----|------|------|---------|
| L1 | **基础组件** | 原子级 UI，单一职责，无业务逻辑 | Button, Input, Card, Modal, Badge, Toast |
| L2 | **复合组件** | 由基础组件组合，具备明确交互模式 | Form, DataTable, Pagination, Dropdown |
| L3 | **业务组件** | 面向特定业务场景，包含业务状态与逻辑 | BikeTypeSelector, ComponentSelector, BuildList, ComparePanel |
| L4 | **页面 Section** | 大型页面段落，组合多个业务组件 | Hero, Features, Pricing, CTA |

> **目录映射**：
> - L1 → `src/components/ui/`
> - L2 → `src/components/composite/`
> - L3 → `src/components/configurator/`
> - L4 → `src/components/sections/`

### 1.1 基础组件来源

L1 基础组件（Button / Input / Card / Modal / Badge 等）基于 **shadcn/ui** 生成与扩展：
- 组件源码通过 `shadcn/ui` CLI 初始化，放置于 `src/components/ui/`
- 样式基于 **Tailwind CSS**，与设计系统规范中的 token 映射保持一致
- 可访问性（键盘、focus ring、ARIA）由底层 Radix UI 提供

---

## 2. 基础组件规范 (L1 - Foundation)

### 2.1 按钮 (Button)

#### 变体 (Variants)

| 变体 | 视觉特征 | 语义 | 使用场景 |
|-----|---------|------|---------|
| `primary` | 填充 `--primary`，白字，shadow-lg | 主要操作 | 确认、保存、主 CTA |
| `secondary` | 填充 `--surface-secondary`，深色字，边框 | 次要操作 | 取消、返回 |
| `accent` | 填充 `--accent`，白字 | 强调操作 | 重要号召（如「立即升级」） |
| `outline` | 透明背景，`--primary` 描边 | 次要可选操作 | 「了解更多」辅助链接 |
| `ghost` | 透明背景，文字操作 | 轻量操作 | 工具栏、行内操作 |
| `danger` | 填充 `--error`，白字 | 破坏性操作 | 删除、移除、取消订阅 |
| `gradient` | 渐变背景 `#0071E3 → #34C759 → #AF52DE`，白字，glow shadow | 品牌强调 | Hero CTA、特殊行动号召 |

#### 尺寸 (Sizes)

| 尺寸 | Padding | 最小高度 | 字号 | 图标尺寸 |
|-----|---------|---------|------|---------|
| `sm` | `px-5 py-2` | `40px` | `text-sm` | `h-4 w-4` |
| `md` | `px-7 py-3` | **48px** | `text-base` | `h-5 w-5` |
| `lg` | `px-9 py-4` | `56px` | `text-lg` | `h-5 w-5` |
| `icon` | `p-3` | `48px × 48px` | — | `h-5 w-5` |

#### 状态 (States)

| 状态 | 样式变化 | 动画时长 |
|-----|---------|---------|
| Default | 基础样式 | — |
| Hover | `bg-primary-hover`，`y: -1`，阴影加深 | 200ms |
| Active / Pressed | `scale: 0.97`，透明度 0.92 | 100ms |
| Focus | `ring-4 ring-primary/20` | 150ms |
| Disabled | `opacity-40`，`cursor-not-allowed`，禁 hover | — |
| Loading | 显示 spinner，按钮文字隐藏 | — |

#### 代码示例

```tsx
import { Button } from '@/components/ui/Button';
import { Bike, Loader2 } from 'lucide-react';

// 主操作按钮
<Button variant="primary" size="md">
  <Bike className="h-5 w-5" strokeWidth={1.75} />
  <span>开始构建</span>
</Button>

// 加载状态
<Button variant="primary" disabled>
  <Loader2 className="h-5 w-5 animate-spin" />
  <span>保存中...</span>
</Button>

// 图标按钮
<Button variant="ghost" size="icon" aria-label="关闭">
  <X className="h-5 w-5" />
</Button>
```

#### 操作区按钮排列规则

- **主操作按钮**永远在最右侧（LTR 语言）或最左侧（RTL）
- **次要操作按钮**靠近主按钮的内侧
- **破坏性操作按钮**与其他按钮之间保持 `gap-4` 视觉间隔
- 移动端操作区改为垂直排列，主按钮在顶部

---

### 2.2 输入框 (Input)

#### 变体

| 变体 | 样式 | 使用场景 |
|-----|------|---------|
| Default | `bg-surface-secondary` + `border-border` + `rounded-2xl` | 标准表单 |
| Search | 左侧搜索图标 + Enter 触发搜索 | 全局搜索、列表过滤 |
| Disabled | `opacity-50 cursor-not-allowed` | 只读字段 |
| Error | `border-error ring-4 ring-error/10` | 验证失败状态 |

#### 尺寸规范

| 尺寸 | Padding | 字号 | 行高 |
|-----|---------|------|------|
| sm | `px-3 py-2` | `text-sm` | `leading-none` |
| md | `px-4 py-3` | **text-base** | `leading-none` |
| lg | `px-5 py-4` | `text-lg` | `leading-none` |

#### 状态视觉

| 状态 | Border | Ring | 图标颜色 |
|-----|--------|------|---------|
| Default | `border-border` | — | `text-muted` |
| Focus | `border-primary` | `ring-4 ring-primary/20` | `text-primary` |
| Error | `border-error` | `ring-4 ring-error/10` | `text-error` |
| Success | `border-success` | `ring-4 ring-success/20` | `text-success` |
| Disabled | `border-border/50` | — | `text-muted` |

#### 输入框组合结构

```tsx
// 标准表单字段结构
<div className="flex flex-col gap-2">
  {/* 标签 - 垂直间距 8px */}
  <label htmlFor="config-name" className="text-sm font-medium">
    配置名称
    <span className="text-error ml-1" aria-hidden="true">*</span>
  </label>

  {/* 输入框 */}
  <div className="relative">
    <input
      id="config-name"
      type="text"
      className="w-full rounded-2xl border border-border bg-surface-secondary
                 px-4 py-3 text-base text-foreground placeholder:text-muted
                 focus:border-primary focus:ring-4 focus:ring-primary/20
                 outline-none transition-all"
      placeholder="输入配置名称"
      aria-invalid={!!error}
      aria-describedby={error ? 'config-name-error' : undefined}
    />
  </div>

  {/* 错误/帮助文字 - 垂直间距 8px */}
  {error ? (
    <p id="config-name-error" className="text-sm text-error">
      {error}
    </p>
  ) : (
    <p className="text-sm text-muted">
      仅用于标识你的配置，不影响组件选择
    </p>
  )}
</div>
```

#### 表单验证规则

| 规则 | 触发时机 | 视觉反馈 |
|-----|---------|---------|
| 必填 | blur 时校验 | 红色边框 + 错误文字 |
| 格式错误 | blur 时校验 | 红色边框 + 错误文字 |
| 长度限制 | 实时输入校验 | 右下角字符计数 |
| 异步验证 | 提交时 | Loading spinner + 禁用状态 |

---

### 2.3 卡片 (Card)

#### 变体

| 变体 | 样式 | 使用场景 |
|-----|------|---------|
| Default | `bg-surface-secondary rounded-3xl p-8 border border-border-light` | 标准内容卡片 |
| Elevated | Default + `shadow-apple-lg` | Hero 展示卡片 |
| Outlined | `bg-transparent border-2 border-border rounded-3xl p-8` | 对比卡片、选项卡片 |
| Interactive | Default + hover:shadow + hover:-translate-y-1 | 可点击的卡片列表项 |

#### 标准卡片结构

```tsx
<Card variant="default" className="shadow-apple">
  <CardHeader className="pb-4">
    <h3 className="text-xl font-semibold font-display">标题</h3>
    <p className="text-sm text-muted mt-1">副标题或说明文字</p>
  </CardHeader>
  <CardBody className="py-4 border-t border-border-light">
    卡片内容区域
  </CardBody>
  <CardFooter className="pt-4 flex justify-end gap-3">
    <Button variant="secondary">取消</Button>
    <Button variant="primary">确认</Button>
  </CardFooter>
</Card>
```

#### 卡片间距规则

- **卡片间距**：默认 `gap-6`；密集布局 `gap-4`；宽松布局 `gap-8`
- **卡片内部**：Header / Body / Footer 之间使用 `border-t + py-4`
- **顶部卡片**：标题与内容区使用 `pb-4` 作为视觉过度

---

### 2.4 模态框 (Modal)

#### 尺寸规范

| 尺寸 | 宽度 | 使用场景 |
|-----|------|---------|
| sm | 480px | 简单确认对话框 |
| md | 640px | **默认**，表单/详情 |
| lg | 900px | 复杂配置器 / 对比面板 |
| xl | 1200px | 全功能编辑器 |

#### 交互规则

1. **遮罩层**：`bg-black/50 backdrop-blur-sm`，点击关闭
2. **关闭方式**：关闭按钮、ESC 键、点击遮罩
3. **焦点管理**：打开时焦点自动聚焦首个可交互元素；关闭时焦点回原触发元素
4. **锁定滚动**：打开时锁定页面背景滚动
5. **禁止关闭**：保存中、加载中状态下禁用 ESC 和遮罩点击关闭

#### 代码示例

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="确认删除配置"
  size="sm"
  closeOnOverlayClick={!isSaving}
>
  <div className="pb-2">
    <p className="text-base leading-relaxed">
      你确定要删除「{configName}」吗？此操作不可撤销。
    </p>
  </div>
  <div className="flex justify-end gap-3 pt-4 border-t border-border-light">
    <Button variant="secondary" onClick={handleClose} disabled={isSaving}>
      取消
    </Button>
    <Button variant="danger" onClick={handleDelete} disabled={isSaving}>
      {isSaving ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>删除中...</span>
        </>
      ) : (
        '确认删除'
      )}
    </Button>
  </div>
</Modal>
```

---

### 2.5 标签 (Badge)

#### 变体

| 变体 | 背景色 | 文字色 | 使用场景 |
|-----|--------|--------|---------|
| Primary | `bg-primary/10` | `text-primary` | 激活状态、当前选择 |
| Accent | `bg-accent/10` | `text-accent` | 成功、正向指标 |
| Warning | `bg-warning/10` | `text-warning` | 警告、待处理 |
| Error | `bg-error/10` | `text-error` | 错误、危险状态 |
| Muted | `bg-surface-tertiary` | `text-muted` | 默认、中性信息 |

#### 尺寸与样式

```tsx
// 基础样式
<span className="inline-flex items-center gap-1.5
                 px-4 py-1.5 rounded-full
                 text-xs font-semibold uppercase tracking-wide
                 whitespace-nowrap">
  <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
  Active
</span>
```

---

### 2.6 Toast 通知

#### 类型

| 类型 | 图标 | 颜色 | 自动关闭时长 |
|-----|------|------|-----------|
| Success | `CheckCircle` | `--accent` | 3000ms |
| Error | `AlertCircle` | `--error` | 5000ms |
| Warning | `AlertTriangle` | `--warning` | 4000ms |
| Info | `Info` | `--primary` | 4000ms |
| Loading | `Loader2` | `--primary` | 手动关闭 |

#### 样式规范

- **位置**：固定在视口右上角（桌面）或居中底部（移动）
- **动画**：出现 `slide-up + fadeIn`，消失 `reverse`
- **尺寸**：最大宽度 380px；内边距 `px-5 py-4`
- **可交互**：可点击关闭按钮；hover 时暂停自动关闭计时

#### 代码示例

```tsx
import { toast } from 'sonner';

// 成功通知
toast.success('配置已保存', {
  description: '你的配置已成功同步到云端',
});

// 错误通知
toast.error('保存失败', {
  description: '网络异常，请稍后重试',
});

// 加载通知
const loadingId = toast.loading('正在保存配置...');
// 完成后更新状态
toast.success('保存成功', { id: loadingId });
```

---

## 3. 复合组件规范 (L2 - Composite)

### 3.1 表单 (Form)

#### 字段排列

- **单列布局**：标准表单，字段间 `gap-5`
- **双列布局**：桌面端使用 `grid-cols-2 gap-6`，移动端降级为单列
- **分组标题**：字段分组间使用 `border-t border-border-light pt-6 mt-6` 分隔

#### 必填项标识

```tsx
<label>
  配置名称
  <span className="text-error ml-1" aria-hidden="true">*</span>
</label>
```

#### 操作区位置

- **顶部操作区**：快速保存 / 返回导航（长表单场景）
- **底部操作区**：主按钮组（保存、取消、重置），固定 `sticky bottom-4`
- **按钮顺序**（LTR）：取消（次要）→ 保存草稿（次要）→ 保存（主操作）

---

### 3.2 选择器 / 下拉菜单 (Dropdown)

#### 触发方式

| 触发方式 | 样式 | 场景 |
|---------|------|------|
| 按钮触发 | `variant="secondary"` + 右侧 Chevron | 操作菜单（更多操作） |
| 输入框触发 | 类似 Input 样式，右侧显示当前值 | 过滤器、分类选择 |
| 组合框 (Combobox) | 可输入 + 下拉列表 | 大量选项的搜索选择 |

#### 菜单项规则

- **项高度**：`min-h-[44px]`，满足触控目标
- **项间距**：`px-4 py-3`，图标+文字间距 `gap-3`
- **分隔线**：`border-t border-border-light`，上下各 `4px`
- **悬停状态**：`bg-surface-tertiary`，选中项 `bg-primary/10 text-primary`
- **键盘导航**：↑↓ 移动，Enter 选择，Esc 关闭，Home/End 跳首尾

---

### 3.3 分页器 (Pagination)

- **每页数量**：默认 20 项，可切换 10/20/50
- **页码显示**：当前页 ± 2，两端省略号
- **信息显示**：`显示 1-20 共 148 条`

---

## 4. 业务组件规范 (L3 - Business)

### 4.1 车型选择器 (BikeTypeSelector)

**位置**：`src/components/configurator/BikeTypeSelector.tsx`

#### 视觉规范

| 元素 | 样式 |
|-----|------|
| 卡片容器 | `rounded-3xl p-8 bg-surface-secondary border border-border-light` |
| 激活卡片 | `border-2 border-primary bg-primary/5 shadow-apple` |
| 图标 | `h-12 w-12 text-primary`，激活时 `scale-1.1` |
| 名称 | `text-lg font-semibold font-display` |
| 描述 | `text-sm text-muted mt-1 leading-relaxed` |
| 激活标记 | `h-2.5 w-2.5 rounded-full bg-primary` (右上小圆点) |

#### 交互规则

- 默认选中第一项（公路车）
- 切换时重置组件列表为该车型默认组件
- 使用键盘 Tab 切换焦点，Enter 选择

---

### 4.2 组件选择器 (ComponentSelector)

**位置**：`src/components/configurator/ComponentSelector.tsx`

#### 列表项结构

```
┌─────────────────────────────────────────────────────┐
│ ┌──────────┐  名称 [text-base font-medium]           │
│ │ 图标容器  │  描述 [text-sm text-muted mt-1]         │
│ │ (h-14 w-14)│  品牌 · 规格 [text-xs text-muted mt-2] │
│ └──────────┘  价格 ¥9,800 [text-lg text-accent font-bold] │
│                                                         │
│                   [选择按钮 · variant="primary" sm]     │
└─────────────────────────────────────────────────────┘
```

#### 过滤与分类

| 分类 | 图标 | 说明 |
|-----|------|------|
| Frame / 车架 | `CircleDot` | 车架本体 + 颜色 |
| Drivetrain / 传动 | `Cog` | 牙盘、飞轮、链条、变速器 |
| Wheelset / 轮组 | `Circle` | 轮圈、花鼓、辐条 |
| Suspension / 避震 | `Zap` | 前叉、后避震（仅山地车） |
| Cockpit / 操控 | `MousePointer` | 把横、把立、座管、座垫 |
| Tires / 轮胎 | `Circle` | 内外胎、管胎类型 |

---

### 4.3 配置汇总面板 (SummaryPanel)

**位置**：`src/components/configurator/SummaryPanel.tsx`

#### 内容结构

| 区块 | 内容 | 样式 |
|-----|------|------|
| 标题 | 当前车型名 | `text-lg font-semibold` |
| 配置名称 | 可编辑输入框 | 顶部 |
| 组件清单 | 已选组件列表 + 单价 | `gap-4` |
| 重量汇总 | 每个组件的累计重量 | 小字 `text-sm` |
| 价格汇总 | 每个组件的累计价格 | 大字 `text-xl font-bold text-accent` |
| 操作区 | 保存、分享、对比 | 底部 sticky |

#### 粘性位置

```css
lg:sticky lg:top-24   /* 桌面端跟随滚动 */
static                /* 移动端 */
```

---

### 4.4 成本分析图表 (CostBreakdownChart)

**位置**：`src/components/configurator/CostBreakdownChart.tsx`

#### 数据可视化规范

- **图表类型**：水平条形图 / 饼图（切换）
- **分类颜色**：6 种预设颜色，与组件分类一一对应
- **图例**：方形色块 + 分类名称 + 占比百分比
- **动画**：首次加载 `fade-in-up` + `scale-in` 800ms

---

### 4.5 配置对比面板 (ComparePanel)

**位置**：`src/components/configurator/ComparePanel.tsx`

#### 列布局

| 项目 | 列 1 (配置 A) | 列 2 (配置 B) | 差异 |
|-----|--------------|--------------|------|
| 总重量 | 7.8 kg | 8.5 kg | -0.7 kg（绿色） |
| 总价格 | ¥28,500 | ¥32,800 | -¥4,300（红色） |
| 组件数 | 12 | 14 | — |

---

### 4.6 分享模态框 (ShareModal)

**位置**：`src/components/configurator/ShareModal.tsx`

#### 分享方式

| 方式 | 图标 | 实现 |
|-----|------|------|
| 复制链接 | `Link` | 生成短链接 + Clipboard API |
| 二维码 | `QrCode` | 本地生成 SVG 二维码 |
| 导出 JSON | `Download` | 生成配置 JSON 文件下载 |
| 导出图片 | `Image` | html-to-image 渲染配置截图 |

---

## 5. 组件使用规则

### 5.1 通用规则

| 规则 | 要求 | 原因 |
|-----|------|------|
| **单一 H1** | 每个页面仅允许一个 `<h1>` | 可访问性 - 文档结构层级 |
| **按钮语义** | 操作按钮必须使用 `<button>`，不能用 `<div onClick>` | 可访问性 - 键盘导航 |
| **触控目标** | 可交互元素最小 `44px × 44px` | WCAG 2.5.5 - 移动端可用性 |
| **焦点样式** | 所有可交互元素必须有清晰的 focus ring | 键盘用户必备 |
| **图标装饰** | 装饰性图标添加 `aria-hidden="true"` | 避免屏幕阅读器冗余 |
| **Label 绑定** | 表单控件通过 `htmlFor + id` 与 label 绑定 | 可访问性 + 点击扩大 |
| **禁用状态** | `disabled` 时不响应 hover 样式 | 视觉一致性 |
| **加载状态** | 异步操作必须显示 loading 指示器 | 用户反馈与防重复提交 |
| **动效尊重** | 动画需检测 `prefers-reduced-motion` | 无障碍合规 |

### 5.2 按钮使用规则

1. **主操作唯一性**：任何操作区内主操作按钮（variant="primary"）数量 ≤ 1
2. **操作顺序**：次要操作在左，主操作在右（LTR 语言）
3. **危险操作二次确认**：删除 / 撤销 / 重置等操作必须弹出确认框
4. **按钮文案以动词开头**：如「保存配置」「取消编辑」「分享配置」
5. **禁用时文案不变**：避免「保存中」之外的动态文案变化

### 5.3 表单使用规则

1. **必填标识**：必填项 Label 右侧显示红色星号
2. **实时校验**：输入框 blur 后触发校验；错误时输入框变成错误状态
3. **提交反馈**：提交按钮 loading + 全局 Toast 成功/失败通知
4. **可撤销**：重要编辑操作允许撤销（如通过 Toast 的撤销按钮）

### 5.4 间距规范

| 元素间距 | 值 |
|---------|----|
| 按钮组内部 | `gap-3` |
| 字段间（Label-Input-Error） | `gap-2` (8px) |
| 字段之间 | `gap-5` (20px) |
| 卡片标题与内容 | `pb-4` (16px) |
| Section 间 | `gap-16` (64px) |
| 页面顶部内边距 | `pt-24` (96px) |
| 页面底部内边距 | `pb-24` (96px) |

### 5.5 响应式降级策略

| 断点 | 降级策略 |
|-----|---------|
| `< 640px (base)` | 单列布局；按钮全宽；隐藏次要装饰图标；字体缩小一级 |
| `< 768px (md)` | 双列布局；侧栏改为顶部 Tab；图表简化数值显示 |
| `< 1024px (lg)` | 三列布局；非核心数据可省略 |
| `≥ 1280px (xl)` | 完整功能 + 装饰性元素 |

---

## 6. 组件代码模板

### 6.1 新组件模板

```tsx
'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * ComponentName - 简短描述
 *
 * Props:
 *  - variant: 变体样式
 *  - size: 尺寸
 *  - className: 自定义样式
 *  - children: 内容
 */

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles = {
  primary: 'bg-primary text-white',
  secondary: 'bg-surface-secondary text-foreground',
};

const sizeStyles = {
  sm: 'px-5 py-2 min-h-[40px] text-sm',
  md: 'px-7 py-3 min-h-[48px] text-base',
  lg: 'px-9 py-4 min-h-[56px] text-lg',
};

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  function ComponentName(
    { variant = 'primary', size = 'md', className, children, ...props },
    ref
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-3xl font-medium transition-all',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
```

---

## 相关文档

- [设计系统规范](./design-system-spec.md)
- [交互标准](./interaction-standards.md)
- [UI 设计系统](../openspec/design/ui-design-system.md)
- [组件设计模式](../openspec/architecture/component-patterns.md)

---

**文档路径**: `/prototype/component-library.md`
**最后更新**: 2026-06-17
**版本**: v3.8.0
