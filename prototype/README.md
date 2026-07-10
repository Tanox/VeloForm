# Veloform 原型设计参考

> **版本**: v5.0.0
> **更新日期**: 2026-07-10
> **设计风格**: 极简主义 · 克制精准 · 国际水准

---

## 概述

本目录包含 Veloform 项目的原型设计参考文档。正式的设计规范文档位于 [../openspec/design/](../openspec/design/) 目录。

---

## 核心文档

| 文档                                    | 描述                             |
| --------------------------------------- | -------------------------------- |
| [设计系统规范](./design-system-spec.md) | 色彩、字体、间距、图标、动效规范 |
| [组件库规范](./component-library.md)    | 基础/复合/业务组件规范           |
| [交互标准](./interaction-standards.md)  | 模式、反馈、错误、空状态         |

---

## 官方规范

完整的设计规范和技术文档请参考 OpenSpec：

- [UI 设计系统](../openspec/design/ui-design-system.md) - 官方设计系统文档
- [组件设计规范](../openspec/architecture/component-design.md) - 组件架构与模式
- [OpenSpec 首页](../openspec/README.md) - 完整项目规范

---

## 技术栈

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS v3** + **shadcn/ui** (base-nova style)
- **@base-ui/react** - 基础组件原语
- **Framer Motion** - 动画库（克制使用）
- **Lucide React** - 图标库

---

## 设计原则

1. **极简克制** - 每个元素必须有存在理由
2. **功能优先** - 设计服务于功能
3. **像素完美** - 4px 网格系统，精确间距
4. **自然交互** - 符合物理规律的动效，即时反馈
5. **可访问性** - WCAG 2.1 AA 标准

---

**最后更新**: 2026-07-10
**版本**: v5.0.0
