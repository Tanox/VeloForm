# Veloform 原型设计文档

> **路径**: `/prototype/INDEX.md`  
> **版本**: v2.0  
> **更新日期**: 2026-06-05

## 概述

本目录包含 Veloform 自行车配置器的核心原型设计资源。所有原型均以 **高保真原型** 为规范标准。

---

## 目录结构

```
prototype/
├── prototype-high-fidelity.html  # ⭐ 高保真原型（规范标准）
├── prototype-guide.md           # 原型使用指南
├── design-improvements.md       # UI/UX 优化建议
└── INDEX.md                     # 本文档
```

---

## 核心文件

### prototype-high-fidelity.html ⭐

**高保真原型 - 规范标准**

这是项目的核心原型文件，包含了完整的设计系统、交互逻辑和视觉效果。所有设计和开发均应以此文件为准。

**特性**:
- 完整的响应式设计（桌面端、平板、移动端）
- 精致的微交互动画和过渡效果
- 无障碍访问支持（ARIA 属性、键盘导航、prefers-reduced-motion）
- SEO 优化元数据
- 深色主题 + 玻璃态效果
- 实时价格计算和性能评分
- 组件选择器模态框
- Toast 通知系统
- 移动端底部导航栏

**技术栈**:
- HTML5 + Tailwind CSS CDN
- Lucide Icons
- Vanilla JavaScript
- CSS 变量设计系统
- Framer Motion 风格动画

**预览方式**:
```bash
# 使用 Python 本地服务器
cd prototype && python3 -m http.server 8080

# 或直接在浏览器中打开
open prototype-high-fidelity.html
```

---

## 支持文档

### prototype-guide.md

原型使用指南，包含详细的功能说明、组件映射和交互流程。

### design-improvements.md

顶级 UI/UX 设计师视角的优化建议，包含 16 项专业改进方向。

---

## 设计系统

原型中使用的核心设计 tokens：

### 色彩系统

| 用途 | 变量 | 颜色 |
|------|------|------|
| 主背景 | `--bg-primary` | `#050505` |
| 次背景 | `--bg-secondary` | `#0f0f11` |
| 卡片背景 | `--bg-tertiary` | `#1a1a1f` |
| 主强调 | `--accent-primary` | `#10b981` (翡翠绿) |
| 次强调 | `--accent-secondary` | `#34d399` |
| 金色强调 | `--accent-gold` | `#fbbf24` |
| 主文本 | `--text-primary` | `#f8fafc` |
| 次文本 | `--text-secondary` | `#94a3b8` |

### 圆角系统

| 名称 | 值 |
|------|-----|
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-lg` | 16px |
| `--radius-xl` | 20px |
| `--radius-2xl` | 28px |

### 字体系统

- **标题字体**: DM Serif Display
- **正文字体**: Plus Jakarta Sans
- **字重**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### 动画系统

| 动画名称 | 用途 | 时长 |
|---------|------|------|
| `fadeIn` | 淡入效果 | 0.5s |
| `slideUp` | 向上滑入 | 0.6s |
| `slideInLeft` | 向左滑入 | 0.6s |
| `slideInRight` | 向右滑入 | 0.6s |
| `scaleIn` | 缩放进入 | 0.5s |
| `float1/2/3` | 背景漂浮 | 20-30s |

---

## 无障碍设计

原型遵循 WCAG 2.1 AA 级无障碍标准：

- ✅ 所有交互元素支持键盘导航
- ✅ 使用 ARIA 属性增强语义化
- ✅ 支持 `prefers-reduced-motion` 用户偏好
- ✅ 足够的色彩对比度（文本至少 4.5:1）
- ✅ 使用语义化 HTML 标签

---

## 响应式断点

| 断点 | 宽度 | 布局策略 |
|------|------|----------|
| Mobile | < 768px | 单列，底部导航栏 |
| Tablet | 768px - 1023px | 双列，侧边栏折叠 |
| Desktop | 1024px+ | 三列，完整功能 |

---

## 版本历史

| 版本 | 日期 | 说明 |
|------|------|------|
| v2.0 | 2026-06-05 | 规范化单一原型，移除冗余文件，增强无障碍和微交互 |
| v1.0 | 2026-06-01 | 初始高保真原型创建 |

---

## 相关资源

- [项目 README](../README.md) - 项目概述和快速开始
- [规范文档](../openspec/README.md) - 完整技术规范
- [变更日志](../CHANGELOG.md) - 版本历史

---

**最后更新**: 2026-06-05  
**版本**: v2.0
