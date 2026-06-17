# Veloform 设计系统规范

> **路径**: `/prototype/design-system-spec.md`
> **版本**: v3.8.0
> **更新日期**: 2026-06-17

---

## 1. 色彩规范 (Color System)

### 1.1 核心色彩 Token

| Token | 浅色值 (HEX) | 深色值 (HEX) | 语义 | 典型使用场景 |
|-------|---------------|---------------|------|-------------|
| `--background` | `#ffffff` | `#000000` | 页面背景 | 页面主背景、滚动区域 |
| `--foreground` | `#1d1d1f` | `#ffffff` | 主文本色 | 主标题、正文内容、表格数据 |
| `--surface` | `#f5f5f7` | `#1d1d1f` | 表面背景 | 卡片容器、分组背景、次要背景 |
| `--surface-secondary` | `#ffffff` | `#2c2c2e` | 次级表面 | 卡片内容区、输入框背景 |
| `--surface-tertiary` | `#e5e5ea` | `#3a3a3c` | 三级表面 | 悬停状态、分隔背景、标签底 |
| `--border` | `#d2d2d7` | `#3a3a3c` | 默认边框 | 分隔线、表单边框、卡片描边 |
| `--border-light` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.08)` | 轻量边框 | 组件轻微分割 |
| `--muted` | `#6e6e73` | `#6e6e73` | 弱化文本 | 辅助说明、占位文字、次要信息 |
| `--secondary` | `#86868b` | `#86868b` | 次要文本 | 副标题、次要数据 |
| `--primary` | `#0071e3` | `#2997ff` | 品牌主色 | 主要按钮、激活状态、链接、进度条 |
| `--primary-hover` | `#0077ed` | `#409cff` | 主色悬停 | 主按钮 Hover、链接 Hover |
| `--accent` | `#34c759` | `#30d158` | 强调色 | 成功状态、价格高亮、重要提示 |
| `--success` | `#34c759` | `#30d158` | 成功态 | 成功 Toast、已保存状态 |
| `--warning` | `#ff9500` | `#ff9f0a` | 警告态 | 警告 Toast、即将到期提示 |
| `--error` | `#ff3b30` | `#ff453a` | 错误态 | 错误 Toast、表单验证错误、删除操作 |
| `--info` | `#0071e3` | `#2997ff` | 信息态 | 信息 Toast、帮助提示 |

### 1.2 主色阶 (Primary Scale)

| Token | HEX | 使用 |
|-------|-----|------|
| `--primary-50` | `#f0f7ff` | 背景衬色 |
| `--primary-100` | `#e0ebff` | 轻量激活背景 |
| `--primary-500` | `#0071e3` | 品牌主色基准 |
| `--primary-600` | `#0077ed` | 悬停状态 |
| `--primary-700` | `#006ed6` | 按下/聚焦状态 |

### 1.3 色彩使用原则

- **主要操作 (Primary Action)**：永远使用 `--primary`
- **次要操作 (Secondary Action)**：使用透明背景 + `--primary` 描边或文字
- **强调信息 (Accent)**：使用 `--accent`（绿色），用于正向强调，如价格、成功
- **语义色 (Semantic)**：`--success / --warning / --error / --info` 仅用于状态反馈，不可做装饰用途
- **中性色 (Neutral)**：`--surface-*` 系列用于构建视觉层级，避免在单一界面混用多种表面色

### 1.5 品牌渐变色 (Brand Gradient)

| Token | CSS 值 | 用途 |
|-------|--------|------|
| `--gradient-brand` | `linear-gradient(90deg, #0071E3, #34C759, #AF52DE)` | 品牌渐变 |
| `--gradient-brand-subtle` | `linear-gradient(135deg, rgba(0,113,227,0.05), rgba(52,199,89,0.03))` | 卡片悬停背景 |

### 1.6 对比度要求 (WCAG 2.1 AA)

| 文本类型 | 最小对比度 | 示例组合 |
|---------|-----------|---------|
| 正文 (≥ 16px) | 4.5:1 | `--foreground` / `--background` = 14.1:1 ✅ |
| 大文本 (≥ 24px) | 3:1 | `--primary` / `--background` = 7.3:1 ✅ |
| 次要文本 | 3:1 | `--secondary` / `--background` = 6.8:1 ✅ |
| 交互元素轮廓 | 3:1 | 所有按钮/输入框边框需满足 3:1 |

---

## 2. 字体规范 (Typography)

### 2.1 字体家族

```css
/* 标题字体 - SF Pro Display 优先 */
.font-display {
  font-family: 'SF Pro Display', system-ui, -apple-system, 'Segoe UI', sans-serif;
}

/* 正文字体 - SF Pro Text 优先 */
.font-sans {
  font-family: 'SF Pro Text', system-ui, -apple-system, 'Segoe UI', sans-serif;
}

/* 等宽字体 - 代码与数字展示 */
.font-mono {
  font-family: 'SF Mono', 'JetBrains Mono', 'Menlo', monospace;
}
```

> **策略说明**：SF Pro 系列为 Apple 平台预装字体，不在 Apple 设备上会自动回退到系统字体栈（`system-ui` → `-apple-system` → `Segoe UI`），不通过 Google Fonts 加载外部字体，以减少 FCP 网络请求。

### 2.2 字号层级 (基于 Major Third 比例尺)

| Token | Rem | 像素 | 用途 | 示例位置 |
|-------|-----|------|------|---------|
| `text-xs` | 0.75 | 12 | 辅助信息 | 表单帮助文字、标签说明 |
| `text-sm` | 0.875 | 14 | 小字 | 描述文本、次要标签 |
| `text-base` | 1 | 16 | **正文基准** | 段落、列表、表格文本 |
| `text-lg` | 1.125 | 18 | 放大正文 | 重要段落、卡片标题 |
| `text-xl` | 1.25 | 20 | 小标题 | 模块标题、Section 标题 |
| `text-2xl` | 1.5 | 24 | 中标题 | 页面二级标题 |
| `text-3xl` | 1.875 | 30 | 大标题 | 页面一级标题 |
| `text-4xl` | 2.25 | 36 | 超大标题 | Hero 副标题 |
| `text-5xl` | 3 | 48 | Hero 标题 | 首页主标题（Mobile） |
| `text-6xl` | 3.75 | 60 | Hero 标题 | 首页主标题（Tablet） |
| `text-7xl` | 4.5 | 72 | Hero 标题 | 首页主标题（Desktop） |

### 2.3 字重规范

| 字重 | CSS 值 | 使用场景 |
|-----|--------|---------|
| Light | 300 | 极少使用，仅装饰性大标题 |
| Regular | 400 | **正文默认**，所有段落文本 |
| Medium | 500 | 按钮文字、标签文字、表头 |
| SemiBold | 600 | 小标题 (h4/h5)、强调文本 |
| Bold | 700 | 大标题 (h1/h2/h3)、关键数据、价格 |

### 2.4 行高与字距

| Token | CSS 值 | 使用 |
|-------|--------|------|
| `leading-tight` | 1.2 | 大标题 (text-4xl 以上) |
| `leading-snug` | 1.35 | 中等标题 |
| `leading-normal` | 1.47 | **正文默认** |
| `leading-relaxed` | 1.6 | 长段落阅读 |
| `tracking-tight` | -0.02em | 大标题字距紧缩 |
| `tracking-normal` | 0 | **正文默认** |
| `tracking-wide` | 0.04em | 大写标签、品牌字 |

### 2.5 响应式字号示例

```tsx
// Hero 大标题 - 响应式缩放
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl
               font-display font-bold leading-tight tracking-tight">
  打造你的梦想自行车
</h1>

// Section 标题
<h2 className="text-2xl sm:text-3xl md:text-4xl
               font-display font-semibold tracking-tight">
  核心功能
</h2>
```

---

## 3. 间距与布局规范 (Spacing & Layout)

### 3.1 间距 Token (基于 4px 网格)

| Token | Rem | 像素 | 典型用途 |
|-------|-----|------|---------|
| `space-0` | 0 | 0 | 无间距 |
| `space-1` | 0.25 | 4 | 极小间隔（图标与文字） |
| `space-2` | 0.5 | 8 | 小组件间距 |
| `space-3` | 0.75 | 12 | 标签与内容的间距 |
| `space-4` | 1 | 16 | 基础元素间距 |
| `space-5` | 1.25 | 20 | 表单字段间距 |
| `space-6` | 1.5 | 24 | 组件区块间距 |
| `space-8` | 2 | 32 | **Section 内部间距** |
| `space-10` | 2.5 | 40 | 中等 Section 间距 |
| `space-12` | 3 | 48 | **大 Section 间距** |
| `space-16` | 4 | 64 | Page Section 间距 |
| `space-20` | 5 | 80 | 超大间距（Hero 底部） |
| `space-24` | 6 | 96 | 页面前后最大间距 |

> **Tailwind 映射**：`space-N` 直接对应 `gap-N` / `p-N` / `m-N`

### 3.2 组件内边距规范

| 组件类型 | Padding 规范 | 说明 |
|---------|--------------|------|
| 按钮 (sm) | `px-5 py-2 min-h-[40px]` | 小型操作按钮 |
| 按钮 (md) | `px-7 py-3 min-h-[48px]` | **默认按钮** |
| 按钮 (lg) | `px-9 py-4 min-h-[56px]` | Hero 主操作按钮 |
| 图标按钮 | `p-3 min-w-[48px] min-h-[48px]` | 独立图标按钮 |
| 卡片 | `p-8` | 标准内容卡片 |
| 模态框 | `p-8` | 模态内容区（底部操作区 `pb-6`） |
| 输入框 | `px-4 py-3` | 表单输入框内边距 |
| 标签 (Tag) | `px-4 py-1.5` | 小型状态标签 |

### 3.3 圆角规范

| Token | 像素 | 典型元素 |
|-------|------|---------|
| `rounded-sm` | 4 | 小型标签、小图标 |
| `rounded-md` | 6 | 输入框、表单项 |
| `rounded-lg` | 8 | 小卡片、按钮辅助区 |
| `rounded-xl` | 12 | 中型卡片 |
| `rounded-2xl` | 16 | **小卡片默认**、图标容器 |
| `rounded-3xl` | 28 | **大卡片默认**、Hero 图片、模态框 |
| `rounded-full` | 9999 | 按钮胶囊形、头像、标签 |

> **设计规则**：容器越大圆角越大；主操作按钮使用胶囊形 (`rounded-full`)，增强识别度。

### 3.4 响应式断点

| 断点 | 最小宽度 | 设备类型 | 布局策略 |
|-----|---------|---------|---------|
| `base` | 0 | Mobile (< 640px) | **单列**、堆叠布局、垂直操作区 |
| `sm` | 640px | Large Mobile | 双列网格基础 |
| `md` | 768px | Tablet | **双列**、侧边栏可展开、水平操作区 |
| `lg` | 1024px | Desktop | **三列**、完整导航、并列布局 |
| `xl` | 1280px | Large Desktop | 四列网格、最大内容宽度限制 |

```css
/* 容器最大宽度限制 */
.container { max-width: 1280px; margin: 0 auto; }
```

### 3.5 栅格规范

- **移动**：1 列栅格
- **平板**：2 列栅格
- **桌面**：12 列栅格（主内容 8 列 + 侧边 4 列，或 3×4 等分）
- **Gutter**：`gap-6` (24px) 默认；紧凑布局 `gap-4`；宽松布局 `gap-8`

---

## 4. 图标规范 (Iconography)

### 4.1 图标来源

| 来源 | 用途 | 引用 |
|-----|------|------|
| **Lucide React** | 系统级 UI 图标（默认） | `import { IconName } from 'lucide-react'` |
| 自定义 SVG | 品牌图标、特色装饰图标 | `/public/icons/` 目录 |

### 4.2 图标尺寸规范

| Token | 像素 | 使用场景 |
|-------|------|---------|
| `size=14` | 14 | 小字内联、标签辅助图标 |
| `size=16` | 16 | **正文内联图标** |
| `size=20` | 20 | 小按钮内图标 |
| `size=24` | 24 | **默认按钮/导航图标** |
| `size=32` | 32 | 中等图标容器 |
| `size=40` | 40 | 大图标装饰、Feature 图标 |
| `size=48` | 48 | Hero 装饰图标 |

### 4.3 图标视觉规范

- **线条粗细**：默认 `stroke-width=1.75`；强调状态 `stroke-width=2`
- **端点样式**：`stroke-linecap="round"`
- **转角样式**：`stroke-linejoin="round"`
- **颜色**：默认继承 `currentColor`，特殊状态使用 `--primary / --muted / --accent`
- **不可装饰图标**：装饰性图标需添加 `aria-hidden="true"`

### 4.4 代码示例

```tsx
import { Bike, Settings, ChevronRight } from 'lucide-react';

// 默认按钮图标
<Button>
  <Bike className="h-5 w-5" strokeWidth={1.75} />
  <span>选择车型</span>
</Button>

// 装饰性图标（隐藏于读屏器）
<div aria-hidden="true">
  <Bike className="h-10 w-10 text-primary" strokeWidth={1.75} />
</div>

// 行内图标 + 垂直对齐
<div className="flex items-center gap-2">
  <Settings className="h-4 w-4 text-muted" />
  <span>设置</span>
</div>
```

### 4.5 常见图标语义

| 图标 | 语义 | 场景 |
|-----|------|------|
| `Plus` | 添加、新建 | 新建配置、添加组件 |
| `Trash2` | 删除、移除 | 删除组件、移除配置 |
| `Edit3` | 编辑、修改 | 编辑配置信息 |
| `Save` | 保存 | 保存配置、持久化 |
| `Share2` | 分享 | 分享配置、导出链接 |
| `X` | 关闭、取消 | 关闭模态、清除选择 |
| `Check` | 确认、成功 | 选中状态、成功标记 |
| `ChevronRight` | 展开、下一级 | 列表展开、导航跳转 |
| `ArrowUp` | 上升、增加 | 重量减少、价格升高 |
| `Info` | 信息提示 | 帮助信息、辅助说明 |

---

## 5. 动效规范 (Motion)

### 5.1 动效三原则

1. **即时响应 (Responsive)**：用户操作 ≤ 100ms 内给予视觉反馈
2. **自然过渡 (Natural)**：使用缓动曲线 `cubic-bezier(0.4, 0, 0.2, 1)`，模拟物理运动
3. **适度克制 (Restrained)**：动画时长 ≤ 400ms，避免分散用户注意力

### 5.2 预设动画库

```typescript
// tailwind.config.ts - animation 配置
animation: {
  "fade-in": "fadeIn 0.4s ease-out",              // 淡入
  "fade-in-up": "fadeInUp 0.8s ease-out",         // 上移淡入 (Hero)
  "slide-up": "slideUp 0.4s ease-out",            // 底部滑入 (Toast)
  "slide-in-right": "slideInRight 0.4s ease-out", // 右侧滑入 (侧栏)
  "scale-in": "scaleIn 0.4s cubic-bezier(0.4,0,0.2,1)", // 放大出现 (模态框)
  "pulse": "pulse 2s ease-in-out infinite",       // 加载脉冲
  "float": "float 8s ease-in-out infinite",       // 缓慢浮动 (装饰元素)
  "glow-pulse": "glowPulse 4s ease-in-out infinite", // 光晕呼吸
  "gradient-shift": "gradientShift 6s ease-in-out infinite", // 渐变呼吸位移动画
}
```

### 5.3 Keyframes 定义

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-15px); }
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.1); }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50%      { background-position: 100% 50%; }
}
```

### 5.4 Framer Motion 预设

```typescript
// 标准过渡 (通用交互动画)
const transition = {
  duration: 0.25,
  ease: [0.4, 0, 0.2, 1],
};

// 弹性过渡 (卡片/按钮微交互)
const spring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// 页面入场动画
const pageIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
};
```

### 5.5 动效时长矩阵

| 交互类型 | 时长 | 缓动曲线 | 示例 |
|---------|------|---------|------|
| **即时反馈** | 100 - 150ms | linear | 按钮按下、选项切换 |
| **微交互** | 200 - 300ms | ease-out | 悬停动画、颜色过渡 |
| **元素过渡** | 300 - 400ms | cubic-bezier(0.4,0,0.2,1) | 模态框、侧边栏、Toast |
| **页面入场** | 500 - 800ms | cubic-bezier(0.4,0,0.2,1) | 页面加载、首屏动画 |
| **循环动画** | 2s - 8s | ease-in-out infinite | 浮动装饰、脉冲加载 |

### 5.6 动效禁用规则

满足以下任一条件时，**必须禁用非必要动画**：

```tsx
// 尊重用户的 reduced-motion 设置
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// 实现方式
<motion.div
  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
/>
```

> **规则**：当用户在系统设置中开启「减少动态效果」时，所有装饰性动画必须失效，仅保留必要的状态过渡。

---

## 6. Utility Classes

### 6.1 通用工具类

| Class | 说明 |
|-------|------|
| `container` | `max-width: 1280px; margin: 0 auto;` — 页面内容容器 |
| `sr-only` | 视觉隐藏，保留给无障碍读屏器 |
| `truncate` | 单行截断溢出文本 |
| `line-clamp-2` | 最多 2 行截断 |
| `no-scrollbar` | 隐藏滚动条但保留滚动功能 |

### 6.2 渐变与装饰工具

```css
.gradient-brand {
  background: linear-gradient(90deg, #0071E3, #34C759, #AF52DE);
  color: #ffffff;
}

.gradient-text {
  background: linear-gradient(90deg, #0071E3, #34C759, #AF52DE);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}
```

---

## 相关文档

- [原型说明](./prototype-guide.md)
- [UI 组件库](../openspec/design/ui-design-system.md)
- [交互标准](./interaction-standards.md)
- [组件库规范](./component-library.md)

---

**文档路径**: `/prototype/design-system-spec.md`
**最后更新**: 2026-06-17
**版本**: v3.8.0
