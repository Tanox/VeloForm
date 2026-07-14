# Veloform 设计系统规范 v4.1.0

> **路径**: `/prototype/design-system-spec.md`
> **版本**: v4.1.0
> **更新日期**: 2026-07-10
> **设计风格**: 极简主义 · 国际顶尖水准

---

## 设计理念

Veloform v4.1.0 采用 **极简主义设计哲学**，追求 Apple 级别的精致与克制。每一个设计决策都服务于功能，去除一切非必要元素，让用户专注于核心任务——配置理想的自行车。

### 核心设计原则

| 原则         | 描述                                | 实现方式                              |
| ------------ | ----------------------------------- | ------------------------------------- |
| **极简克制** | Less is More，只为必要元素存在      | 清晰的视觉层级、大量留白、单一强调色  |
| **功能优先** | 设计服务于功能，不为装饰而装饰      | 明确的信息架构、直观的交互模式        |
| **像素完美** | 精确 spacing、alignment、typography | 4px 网格系统、光学对齐、数学间距      |
| **自然交互** | 符合物理规律的运动、即时反馈        | 150-300ms 缓动、≤100ms 反馈、克制动效 |

### 设计灵感来源

- **Apple** - 简洁、精致、专注用户体验
- **Linear** - 高效的 SaaS 设计、清晰的信息层级
- **Stripe** - 金融级界面、精准的间距系统
- **Figma** - 工具类产品的设计典范

---

## 1. 色彩规范 (Color System)

### 1.1 设计理念

**极简色彩策略**：中性灰底 + 单一品牌色 + 语义状态色

- 避免过多色彩干扰
- 使用深浅灰度建立视觉层级
- 单一品牌色（蓝色）用于关键行动
- 语义色（绿/橙/红）仅在必要时使用

### 1.2 核心色彩 Token

| Token                    | 浅色值 (HEX) | 深色值 (HEX) | 语义     | 典型使用场景             |
| ------------------------ | ------------ | ------------ | -------- | ------------------------ |
| `--background`           | `#FAFAFA`    | `#000000`    | 页面背景 | 页面主背景、滚动区域     |
| `--surface`              | `#FFFFFF`    | `#1A1A1A`    | 表面背景 | 卡片容器、分组背景       |
| `--surface-secondary`    | `#F5F5F7`    | `#2C2C2E`    | 次级表面 | 输入框背景、悬停状态     |
| `--surface-tertiary`     | `#EBEBEB`    | `#3A3A3C`    | 三级表面 | 选中状态、标签背景       |
| `--foreground`           | `#1D1D1F`    | `#FFFFFF`    | 主文本色 | 主标题、正文内容         |
| `--foreground-secondary` | `#6E6E73`    | `#A1A1A6`    | 次要文本 | 副标题、辅助说明         |
| `--foreground-tertiary`  | `#AEAEB2`    | `#636366`    | 三级文本 | 禁用状态、占位文字       |
| `--border`               | `#E5E5EA`    | `#38383A`    | 默认边框 | 分隔线、卡片描边         |
| `--border-light`         | `#F0F0F0`    | `#2C2C2E`    | 轻量边框 | 组件轻微分割             |
| `--primary`              | `#0071E3`    | `#2997FF`    | 品牌主色 | 主要按钮、链接、激活状态 |
| `--primary-hover`        | `#0066CC`    | `#409CFF`    | 主色悬停 | 主按钮 Hover             |
| `--primary-light`        | `#E8F0FE`    | `#1A2B3D`    | 主色浅底 | 选中背景、轻量强调       |
| `--success`              | `#34C759`    | `#30D158`    | 成功态   | 成功提示、价格高亮       |
| `--warning`              | `#FF9500`    | `#FF9F0A`    | 警告态   | 警告提示                 |
| `--error`                | `#FF3B30`    | `#FF453A`    | 错误态   | 错误提示、删除操作       |

### 1.3 色彩使用原则

#### ✅ 正确做法

1. **主要操作** - 使用 `--primary` 填充按钮
2. **次要操作** - 使用 `--primary` 描边按钮或纯文本链接
3. **成功状态** - 使用 `--success`（绿色）
4. **视觉层级** - 使用 `--surface-*` 系列建立层级
5. **文本层级** - 使用 `--foreground-*` 系列

#### ❌ 错误做法

1. **过度使用渐变** - 仅在 Hero CTA 使用渐变
2. **使用多种强调色** - 坚持单一品牌色（蓝色）
3. **色彩过于鲜艳** - 所有色彩应有足够的灰度
4. **忽视对比度** - 确保 WCAG 2.1 AA 标准（4.5:1）

### 1.4 品牌渐变（限制使用）

> **使用场景**：仅用于 Hero CTA 按钮、特殊行动号召  
> **禁止场景**：卡片背景、导航栏、页脚

```css
.gradient-brand {
  background: linear-gradient(135deg, #0071e3 0%, #34c759 50%, #af52de 100%);
  background-size: 200% 200%;
}
```

### 1.5 暗色模式适配

```css
/* 自动适配 */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #000000;
    --surface: #1a1a1a;
    /* ... */
  }
}
```

---

## 2. 字体规范 (Typography System)

### 2.1 字体族

Veloform 使用 **SF Pro** 字体族（Apple 系统字体），确保最佳的渲染效果和性能。

| 用途     | 字体           | Fallback                          | 说明                  |
| -------- | -------------- | --------------------------------- | --------------------- |
| **标题** | SF Pro Display | -apple-system, BlinkMacSystemFont | 大字号、 Display 风格 |
| **正文** | SF Pro Text    | -apple-system, BlinkMacSystemFont | 小字号、 Text 风格    |
| **等宽** | SF Mono        | 'Menlo', 'Monaco', monospace      | 代码、技术参数        |

### 2.2 字号层级

| Token         | 字号 | 行高 | 字重 | 用途           | 示例         |
| ------------- | ---- | ---- | ---- | -------------- | ------------ |
| `--text-xs`   | 12px | 16px | 400  | 辅助说明、标签 | 组件分类     |
| `--text-sm`   | 14px | 20px | 400  | 次要正文       | 卡片描述     |
| `--text-base` | 16px | 24px | 400  | 正文           | 段落文字     |
| `--text-lg`   | 18px | 28px | 500  | 小标题         | 区块标题     |
| `--text-xl`   | 20px | 32px | 600  | 中标题         | 卡片标题     |
| `--text-2xl`  | 24px | 36px | 600  | 大标题         | Section 标题 |
| `--text-3xl`  | 30px | 44px | 700  | 页面标题       | Hero 标题    |
| `--text-4xl`  | 36px | 52px | 700  | 超大标题       | 首页主标题   |
| `--text-5xl`  | 48px | 68px | 700  | Hero           | 品牌展示     |

### 2.3 字体使用原则

1. **限制字号数量** - 仅使用上表中的 9 种字号
2. **使用字重建立层级** - 400（常规）、500（中等）、600（半粗）、700（粗）
3. **行高与字号成比例** - 标题 1.2-1.3，正文 1.5-1.6
4. **避免使用 italic** - 仅在必要时使用（如引用）

---

## 3. 间距规范 (Spacing System)

### 3.1 4px 网格系统

所有间距必须是 **4px 的倍数**，确保视觉的一致性和节奏感。

| Token        | 值   | 用途       | 示例                 |
| ------------ | ---- | ---------- | -------------------- |
| `--space-1`  | 4px  | 最小间距   | 图标与文字间距       |
| `--space-2`  | 8px  | 小间距     | 紧凑布局元素间距     |
| `--space-3`  | 12px | 中间距     | 相关元素间距         |
| `--space-4`  | 16px | 基础间距   | 卡片内边距、元素间距 |
| `--space-5`  | 20px | 中等间距   | 组件间距             |
| `--space-6`  | 24px | 大间距     | Section 内边距       |
| `--space-8`  | 32px | 超大间距   | 区块间距             |
| `--space-10` | 40px | 巨大间距   | 页面区块间距         |
| `--space-12` | 48px | 最大间距   | Hero 区块间距        |
| `--space-16` | 64px | 页面级间距 | 主要 Section 间距    |

### 3.2 组件内边距

| 组件             | 内边距    | Token                           |
| ---------------- | --------- | ------------------------------- |
| Button (sm)      | 8px 12px  | `var(--space-2) var(--space-3)` |
| Button (default) | 10px 20px | `var(--space-2) var(--space-5)` |
| Button (lg)      | 12px 24px | `var(--space-3) var(--space-6)` |
| Card             | 20px      | `var(--space-5)`                |
| Card (紧凑)      | 16px      | `var(--space-4)`                |
| Input            | 10px 12px | `var(--space-2) var(--space-3)` |
| Modal            | 24px      | `var(--space-6)`                |

### 3.3 布局间距

| 布局类型           | 间距 | Token             |
| ------------------ | ---- | ----------------- |
| 卡片网格（移动端） | 12px | `var(--space-3)`  |
| 卡片网格（桌面端） | 20px | `var(--space-5)`  |
| Section 垂直间距   | 48px | `var(--space-12)` |
| 页面边距（移动端） | 16px | `var(--space-4)`  |
| 页面边距（桌面端） | 24px | `var(--space-6)`  |

---

## 4. 圆角规范 (Border Radius System)

### 4.1 圆角 Token

| Token           | 值     | 用途     | 示例                   |
| --------------- | ------ | -------- | ---------------------- |
| `--radius-sm`   | 8px    | 小圆角   | 输入框、标签           |
| `--radius`      | 12px   | 基础圆角 | 按钮、卡片             |
| `--radius-md`   | 16px   | 中圆角   | 大卡片、Modal          |
| `--radius-lg`   | 20px   | 大圆角   | Hero 区块、特色卡片    |
| `--radius-xl`   | 24px   | 超大圆角 | 特殊区块               |
| `--radius-full` | 9999px | 圆形     | 头像、Badge、Pill 按钮 |

### 4.2 圆角使用原则

1. **一致性** - 同类型组件使用相同圆角
2. **渐进式** - 小元素用小圆角，大元素用大圆角
3. **避免极端** - 不使用 0px（直角）或 50px+（过度圆角）

| 组件          | 圆角 Token                |
| ------------- | ------------------------- |
| Button        | `var(--radius)` (12px)    |
| Button (Pill) | `var(--radius-full)`      |
| Card          | `var(--radius-md)` (16px) |
| Input         | `var(--radius-sm)` (8px)  |
| Modal         | `var(--radius-md)` (16px) |
| Badge         | `var(--radius-full)`      |
| Avatar        | `var(--radius-full)`      |

---

## 5. 阴影规范 (Shadow System)

### 5.1 设计理念

**极简阴影策略**： subtle、层次分明、性能优先

- 避免使用 spread、blur 过大的阴影
- 使用多层叠加实现自然阴影
- 暗色模式使用更深的阴影

### 5.2 阴影 Token

| Token         | 浅色模式                       | 深色模式                      | 用途                    |
| ------------- | ------------------------------ | ----------------------------- | ----------------------- |
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06)`   | `0 1px 3px rgba(0,0,0,0.3)`   | 轻微浮起（卡片 Hover）  |
| `--shadow`    | `0 4px 12px rgba(0,0,0,0.08)`  | `0 4px 12px rgba(0,0,0,0.4)`  | 基础阴影（卡片、Modal） |
| `--shadow-md` | `0 8px 24px rgba(0,0,0,0.1)`   | `0 8px 24px rgba(0,0,0,0.5)`  | 中等阴影（悬浮卡片）    |
| `--shadow-lg` | `0 16px 48px rgba(0,0,0,0.12)` | `0 16px 48px rgba(0,0,0,0.6)` | 大阴影（Hero 区块）     |

### 5.3 阴影使用原则

1. **克制使用** - 仅在需要建立层级时使用阴影
2. **Hover 状态** - 使用 `--shadow-sm` 到 `--shadow` 的过渡
3. **避免彩色阴影** - 不使用 `shadow-glow` 等彩色阴影
4. **性能考虑** - 使用 `box-shadow` 而非 `filter: drop-shadow()`

---

## 6. 动效规范 (Animation System)

### 6.1 设计理念

**克制动效策略**：自然、即时、不干扰

- 动画时长 ≤ 300ms
- 使用 cubic-bezier 缓动曲线
- 尊重 `prefers-reduced-motion` 用户设置
- 避免布局偏移（Layout Shift）

### 6.2 缓动曲线

| Token           | 曲线                                   | 用途             |
| --------------- | -------------------------------------- | ---------------- |
| `--ease-out`    | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 退出动画（默认） |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)`       | 进出动画         |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)`    | 弹性动画（轻微） |

### 6.3 动画时长

| Token               | 时长  | 用途                        |
| ------------------- | ----- | --------------------------- |
| `--duration-fast`   | 150ms | 微交互（悬停、焦点）        |
| `--duration-normal` | 200ms | 常规动画（展开、收起）      |
| `--duration-slow`   | 300ms | 大型动画（页面过渡、Modal） |

### 6.4 预设动画

```css
/* 淡入 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* 上滑淡入 */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 缩放淡入 */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

### 6.5 动效使用原则

1. **必要性** - 每个动画必须有存在理由
2. **性能** - 优先使用 `transform` 和 `opacity`
3. **可访问性** - 尊重 `prefers-reduced-motion`
4. **一致性** - 同类交互使用相同动画

---

## 7. 图标规范 (Icon System)

### 7.1 图标库

Veloform 使用 **Lucide React** 作为图标库。

- 1000+ 精美 SVG 图标
- 统一的 24x24 viewBox
- 支持自定义尺寸和颜色
- Tree-shakeable（仅打包使用的图标）

### 7.2 图标尺寸

| Token       | 尺寸 | 用途             |
| ----------- | ---- | ---------------- |
| `--icon-xs` | 16px | 紧凑布局、列表项 |
| `--icon-sm` | 20px | 按钮内图标、表单 |
| `--icon`    | 24px | 默认尺寸、导航   |
| `--icon-lg` | 32px | 特色区块、空状态 |

### 7.3 图标使用原则

1. **一致性** - 同类型图标使用相同尺寸
2. **语义性** - 图标应清晰传达含义
3. **可访问性** - 装饰性图标添加 `aria-hidden="true"`
4. **颜色继承** - 使用 `currentColor` 继承文本颜色

---

## 8. 响应式断点 (Responsive Breakpoints)

### 8.1 断点定义

| Token          | 宽度   | 布局策略             |
| -------------- | ------ | -------------------- |
| `--screen-sm`  | 640px  | 移动端横屏、大屏手机 |
| `--screen-md`  | 768px  | 平板竖屏             |
| `--screen-lg`  | 1024px | 平板横屏、小屏桌面   |
| `--screen-xl`  | 1280px | 桌面                 |
| `--screen-2xl` | 1536px | 大屏桌面             |

### 8.2 响应式策略

| 断点           | 布局 | 导航     | 卡片网格 |
| -------------- | ---- | -------- | -------- |
| < 640px        | 单列 | 汉堡菜单 | 1 列     |
| 640px - 768px  | 双列 | 展开导航 | 2 列     |
| 768px - 1024px | 三列 | 完整导航 | 2-3 列   |
| > 1024px       | 四列 | 完整导航 | 3-4 列   |

---

## 9. 实施指南

### 9.1 Tailwind CSS 配置

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        surface: 'var(--surface)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        // ...
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        // ...
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        // ...
      },
      borderRadius: {
        DEFAULT: '12px',
        sm: '8px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        full: '9999px',
      },
    },
  },
};
```

### 9.2 CSS Variables

```css
/* src/app/globals.css */
:root {
  /* 色彩 */
  --background: #fafafa;
  --surface: #ffffff;
  --foreground: #1d1d1f;
  --primary: #0071e3;

  /* 间距 */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;

  /* 圆角 */
  --radius: 12px;
  --radius-md: 16px;

  /* 阴影 */
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

  /* 动效 */
  --duration-normal: 200ms;
  --ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #000000;
    --surface: #1a1a1a;
    --foreground: #ffffff;
    /* ... */
  }
}
```

---

## 10. 检查清单

### 10.1 设计审查

- [ ] 色彩使用符合规范（不超过 3 种主色）
- [ ] 字体使用符合层级（仅使用定义的字号）
- [ ] 间距符合 4px 网格系统
- [ ] 圆角使用一致
- [ ] 阴影克制且层次分明
- [ ] 动效时长 ≤ 300ms
- [ ] 图标尺寸统一

### 10.2 开发审查

- [ ] 使用 CSS Variables 而非硬编码颜色
- [ ] 使用 Tailwind 工具类而非自定义 CSS
- [ ] 响应式布局在 375px、768px、1024px、1440px 测试
- [ ] 暗色模式在所有页面测试
- [ ] 动画尊重 `prefers-reduced-motion`

---

## 版本历史

| 版本   | 日期       | 关键变更                                   |
| ------ | ---------- | ------------------------------------------ |
| v4.1.0 | 2026-07-10 | 极简主义重构、色彩克制、统一圆角、微妙阴影 |
| v3.8.0 | 2026-06-17 | 品牌渐变、gradient 按钮变体                |
| v3.7.0 | 2026-06-14 | 交互标准完善                               |
| v3.6.0 | 2026-06-08 | shadcn/ui 集成                             |

---

**文档路径**: `/prototype/design/design-system-spec.md`  
**最后更新**: 2026-07-05  
**版本**: v4.1.0
