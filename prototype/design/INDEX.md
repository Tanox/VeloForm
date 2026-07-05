# Veloform 原型设计文档索引

> **路径**: `/prototype/INDEX.md`
> **版本**: v3.8.0
> **更新日期**: 2026-06-17

---

## 概述

本目录包含 Veloform 自行车配置器的核心原型设计资源与规范文档。所有规范均以 **高保真原型** 为标准，采用 **shadcn/ui + Radix UI + Tailwind CSS** 技术栈。

---

## 规范体系

Veloform 设计系统采用三层规范结构，确保设计与开发的一致性：

| 层级 | 文档 | 作用 | 面向对象 |
|-----|------|------|---------|
| **L1 - 设计系统** | design-system-spec.md | 色彩、字体、间距、图标、动效基础规范 | 设计师 + 开发者 |
| **L2 - 组件库** | component-library.md | 组件分类、变体、状态、使用规则 | 开发者 |
| **L3 - 交互标准** | interaction-standards.md | 交互模式、反馈、错误处理、空状态 | 设计师 + 开发者 |

---

## 核心规范文档

### 1. 设计系统规范 ⭐
> `design-system-spec.md` · v3.8.0

**核心内容**：
- 色彩系统（Core Tokens、主色阶、渐变色）
- 字体系统（SF Pro Display/Text、字号层级、字重）
- 间距系统（4px 网格、组件内边距、圆角）
- 图标规范（Lucide React、尺寸、语义）
- 动效系统（预设动画、Keyframes、Framer Motion 预设）
- Utility Classes（.gradient-brand、.gradient-text）

**设计原则**：
- 即时响应（≤100ms 反馈）
- 自然过渡（cubic-bezier缓动）
- 适度克制（≤400ms 动画）

### 2. 组件库规范 ⭐
> `component-library.md` · v3.8.0

**组件层级**：
- **L1 基础组件**：Button、Input、Card、Modal、Badge、Toast
- **L2 复合组件**：Form、DataTable、Pagination、Dropdown
- **L3 业务组件**：BikeTypeSelector、ComponentSelector、SummaryPanel
- **L4 页面 Section**：Hero、Features、Pricing

**技术来源**：shadcn/ui CLI + Radix UI + Tailwind CSS

### 3. 交互标准 ⭐
> `interaction-standards.md` · v3.8.0

**核心内容**：
- 交互模式库（导航、选择、列表、搜索）
- 反馈规范（悬停、按下、焦点、加载、Toast）
- 错误处理（输入错误、网络错误、错误边界）
- 空状态设计（首次使用、搜索无结果、权限不足）
- 键盘快捷键（全局、表单）
- 无障碍规范（WCAG 2.1 AA）

---

## 目录结构

```
prototype/
├── INDEX.md                          # 文档索引（本文档）
├── README.md                         # 设计系统总览
│
├── design-system-spec.md             # 设计系统规范 ⭐
├── component-library.md              # 组件库规范 ⭐
├── interaction-standards.md          # 交互标准 ⭐
│
├── prototype.html                    # HTML 原型文件
├── prototype-guide.md                # 原型使用指南
├── design-critique.md               # 设计审视报告
│
├── design/                          # 辅助设计文档
│   ├── ui-recommendations.md
│   ├── responsive-guidelines.md
│   ├── accessibility-guidelines.md
│   └── design-optimization-report.md
│
└── documentation/                  # 参考文档
    ├── design-system-summary.md
    └── component-mapping.md
```

---

## 技术栈

### 前端技术
- **React 18** + TypeScript
- **Next.js** (App Router)
- **Tailwind CSS v3**
- **shadcn/ui** + Radix UI
- **Framer Motion**
- **Lucide React**
- **Sonner** (Toast)

### 设计工具
- **Figma** - 设计与协作
- **CSS Variables** - Design Tokens
- **WCAG 2.1 AA** - 无障碍标准

---

## 设计系统版本

| 版本 | 日期 | 关键变更 |
|-----|------|---------|
| v3.8.0 | 2026-06-17 | 新增品牌渐变、gradient 按钮变体、Utility Classes |
| v3.7.0 | 2026-06-14 | 完善交互标准、空状态设计 |
| v3.6.0 | 2026-06-08 | shadcn/ui 集成、组件库重构 |
| v3.5.0 | 2026-06-06 | 动效规范完善 |
| v3.0.0 | 2026-06-01 | 设计系统 v3 重构 |
| v2.0 | 2026-06-05 | 高保真原型规范化 |
| v1.0 | 2026-06-01 | 初始原型创建 |

---

## 无障碍设计

原型遵循 WCAG 2.1 AA 级无障碍标准：

- ✅ 所有交互元素支持键盘导航
- ✅ 使用 ARIA 属性增强语义化
- ✅ 支持 `prefers-reduced-motion` 用户偏好
- ✅ 色彩对比度：正文 ≥ 4.5:1，大文本 ≥ 3:1
- ✅ 触控目标最小 44×44px
- ✅ 使用语义化 HTML 标签

---

## 响应式断点

| 断点 | 宽度 | 布局策略 |
|-----|------|----------|
| base | < 640px | 单列，垂直布局 |
| sm | ≥ 640px | 双列网格基础 |
| md | ≥ 768px | 双列，侧边栏可展开 |
| lg | ≥ 1024px | 三列，完整导航 |
| xl | ≥ 1280px | 四列，最大内容宽度限制 |

---

## 快速开始

### 预览规范文档

1. 查看 [设计系统规范](./design-system-spec.md) - 基础设计规范
2. 查看 [组件库规范](./component-library.md) - 组件使用指南
3. 查看 [交互标准](./interaction-standards.md) - 交互设计指南

### 运行应用

```bash
# 从项目根目录
npm install
npm run dev
# 访问 http://localhost:3000
```

### 预览 HTML 原型

```bash
cd prototype
python3 -m http.server 8080
# 访问 http://localhost:8080/prototype.html
```

---

## 相关资源

- [项目 README](../README.md) - 项目概述
- [openspec 规范](../openspec/README.md) - 完整技术规范
- [UI 设计系统](../openspec/design/ui-design-system.md) - 官方设计系统
- [变更日志](../CHANGELOG.md) - 版本历史

---

**文档路径**: `/prototype/INDEX.md`
**最后更新**: 2026-06-17
**版本**: v3.8.0
