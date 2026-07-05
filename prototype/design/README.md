# Veloform 原型设计系统

> **路径**: `/prototype/README.md`
> **版本**: v3.8.0
> **更新日期**: 2026-06-17

## 设计理念

Veloform 设计系统是一套面向高端自行车配置场景的设计规范体系，融合了 **Apple 极简美学** 与 **现代科技感**。整体风格追求精致、克制、功能导向，同时通过精心设计的动效与渐变传递品牌的专业与创新精神。

### 核心美学方向

| 维度 | 选择 | 说明 |
|-----|------|------|
| **视觉基调** | Apple 极简 + 科技渐变 | 大量留白、精确间距、微妙阴影、品牌渐变点缀 |
| **色彩策略** | 中性灰底 + 蓝绿主色 | 营造高端、专业的工具型产品氛围 |
| **字体系统** | SF Pro 系列 + 等宽数字 | Apple 平台原生体验，数字清晰易读 |
| **动效哲学** | 即时响应 + 自然过渡 | 快速反馈、自然缓动、克制使用 |
| **组件风格** | shadcn/ui + Radix UI | 可访问性优先、样式与逻辑分离 |

## 目录结构

```
prototype/
├── README.md                          # 设计系统总览（本文档）
├── design-system-spec.md              # 设计系统规范 v3.8.0 ⭐
├── component-library.md               # 组件库规范 v3.8.0 ⭐
├── interaction-standards.md           # 交互标准 v3.8.0 ⭐
├── prototype-guide.md                 # 原型使用指南
├── design-critique.md                 # 设计审视报告
│
├── design/                            # 辅助设计文档
│   ├── ui-recommendations.md          # UI/UX 优化建议
│   ├── responsive-guidelines.md       # 响应式设计指南
│   ├── accessibility-guidelines.md     # 可访问性指南
│   └── design-optimization-report.md  # 世界级优化报告
│
├── documentation/                     # 设计文档
│   ├── design-system-summary.md        # 设计系统摘要
│   └── component-mapping.md            # 组件映射表
│
└── archive/                           # 已归档文件
    └── README.md
```

## 规范文档

### 核心规范（v3.8.0）

| 文档 | 内容 | 状态 |
|-----|------|------|
| [设计系统规范](./design-system-spec.md) | 色彩、字体、间距、图标、动效、Utility Classes | ✅ v3.8.0 |
| [组件库规范](./component-library.md) | 基础/复合/业务组件、使用规则、shadcn/ui 来源 | ✅ v3.8.0 |
| [交互标准](./interaction-standards.md) | 交互模式库、反馈规范、错误处理、空状态设计 | ✅ v3.8.0 |

### 快速导航

- [原型说明](./prototype-guide.md) - 原型设计理念与使用方法
- [UI/UX 优化建议](./design/ui-recommendations.md) - 详细改进方向
- [响应式设计指南](./design/responsive-guidelines.md) - 多设备适配策略
- [可访问性指南](./design/accessibility-guidelines.md) - WCAG 标准实现
- [设计系统摘要](./documentation/design-system-summary.md) - 规范速查
- [组件映射表](./documentation/component-mapping.md) - 原型与代码对照

## 设计系统版本

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| **v3.8.0** | 2026-06-17 | 新增品牌渐变 token、gradient-shift 动画、gradient 按钮变体、Utility Classes |
| **v3.7.0** | 2026-06-14 | 完善交互标准、空状态设计、键盘快捷键规范 |
| **v3.6.0** | 2026-06-08 | 组件库规范重构、shadcn/ui 集成 |
| **v3.5.0** | 2026-06-06 | 动效规范完善、Framer Motion 预设 |
| **v3.0.0** | 2026-06-01 | 设计系统 v3 重构 |

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

