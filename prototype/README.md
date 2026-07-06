# Veloform 原型设计系统

> **路径**: `/prototype/README.md`
> **版本**: v3.8.0
> **更新日期**: 2026-06-17

## 设计理念

Veloform 设计系统是一套面向高端自行车配置场景的设计规范体系，融合了 **Apple 极简美学** 与 **现代科技感**。整体风格追求精致、克制、功能导向，同时通过精心设计的动效与渐变传递品牌的专业与创新精神。

### 核心美学方向

| 维度         | 选择                   | 说明                                       |
| ------------ | ---------------------- | ------------------------------------------ |
| **视觉基调** | Apple 极简 + 科技渐变  | 大量留白、精确间距、微妙阴影、品牌渐变点缀 |
| **色彩策略** | 中性灰底 + 蓝绿主色    | 营造高端、专业的工具型产品氛围             |
| **字体系统** | SF Pro 系列 + 等宽数字 | Apple 平台原生体验，数字清晰易读           |
| **动效哲学** | 即时响应 + 自然过渡    | 快速反馈、自然缓动、克制使用               |
| **组件风格** | shadcn/ui + Radix UI   | 可访问性优先、样式与逻辑分离               |

## 目录结构

```
prototype/
├── README.md                          # 设计系统总览（本文档）
├── prototype.html                     # 高保真可交互原型 ⭐
│
├── design-system/                     # 设计系统核心规范
│   ├── design-tokens.md               # 设计系统规范（色彩/字体/间距/动效）
│   └── components.md                  # 组件库规范（基础/复合/业务组件）
│
├── interaction/                       # 交互标准
│   └── patterns.md                    # 交互模式（导航/选择/反馈/错误处理）
│
└── archive/                           # 已归档的历史文档
    ├── old-docs/                      # 旧版文档
    ├── design-docs/                   # 旧版设计指南
    └── documentation-docs/            # 旧版文档索引
```

## 规范文档

### 核心规范（v4.0.0）

| 文档                                             | 内容                                          | 状态      |
| ------------------------------------------------ | --------------------------------------------- | --------- |
| [设计系统规范](./design-system/design-tokens.md) | 色彩、字体、间距、图标、动效、Utility Classes | ✅ v4.0.0 |
| [组件库规范](./design-system/components.md)      | 基础/复合/业务组件、使用规则、shadcn/ui 来源  | ✅ v4.0.0 |
| [交互标准](./interaction/patterns.md)            | 交互模式库、反馈规范、错误处理、空状态设计    | ✅ v4.0.0 |

### 快速导航

- [高保真原型](./prototype.html) - 可交互原型预览
- [设计系统规范](./design-system/design-tokens.md) - 核心 Design Tokens
- [组件库规范](./design-system/components.md) - 组件层级与变体
- [交互标准](./interaction/patterns.md) - 交互模式与反馈规范

## 设计系统版本

| 版本       | 日期       | 变更内容                                                                    |
| ---------- | ---------- | --------------------------------------------------------------------------- |
| **v3.8.0** | 2026-06-17 | 新增品牌渐变 token、gradient-shift 动画、gradient 按钮变体、Utility Classes |
| **v3.7.0** | 2026-06-14 | 完善交互标准、空状态设计、键盘快捷键规范                                    |
| **v3.6.0** | 2026-06-08 | 组件库规范重构、shadcn/ui 集成                                              |
| **v3.5.0** | 2026-06-06 | 动效规范完善、Framer Motion 预设                                            |
| **v3.0.0** | 2026-06-01 | 设计系统 v3 重构                                                            |

## 技术栈

### 前端框架

- **React 18** + TypeScript
- **Next.js** (App Router)
- **Tailwind CSS v3** - 样式系统
- **shadcn/ui** + Radix UI - 组件库
- **Framer Motion** - 动画库
- **Lucide React** - 图标库

### 设计工具

- **Figma** - 设计与协作
- **CSS Variables** - 设计 token
- **WCAG 2.1 AA** - 无障碍标准

## 设计原则

### 1. 即时响应 (Responsive)

用户操作后 **100ms** 内给予视觉反馈，让用户感知系统的灵敏与可控。

### 2. 自然过渡 (Natural)

使用 `cubic-bezier(0.4, 0, 0.2, 1)` 缓动曲线，模拟物理运动规律，避免突兀的线性动画。

### 3. 适度克制 (Restrained)

动画时长 **≤ 400ms**，避免分散用户注意力。装饰性动画在 `prefers-reduced-motion` 下禁用。

## 无障碍承诺

所有组件遵循 WCAG 2.1 AA 标准：

- ✅ 色彩对比度：正文 ≥ 4.5:1，大文本 ≥ 3:1
- ✅ 键盘导航：所有交互元素可 Tab 聚焦
- ✅ ARIA 属性：语义化标签与屏幕阅读器支持
- ✅ 触控目标：最小 44×44px
- ✅ 减少动效：尊重用户 `prefers-reduced-motion` 设置

## 相关资源

- [项目 README](../README.md) - 项目概述
- [openspec 规范](../openspec/README.md) - 完整技术规范
- [UI 设计系统](../openspec/design/ui-design-system.md) - 官方设计系统
- [变更日志](../CHANGELOG.md) - 版本历史

---

**文档路径**: `/prototype/README.md`
**最后更新**: 2026-06-17
**版本**: v3.8.0
