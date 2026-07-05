# Veloform 原型设计系统

> **版本**: v4.0.0  
> **更新日期**: 2026-07-05  
> **设计风格**: 极简主义 · 国际顶尖水准

---

## 快速导航

欢迎来到 Veloform 原型设计系统！本目录包含完整的高保真原型设计资源。

### 核心文档

| 文档 | 描述 | 优先级 |
|------|------|--------|
| [设计系统规范](./design-system-spec.md) | 色彩、字体、间距、图标、动效 | ⭐⭐⭐ |
| [组件库规范](./component-library.md) | 基础/复合/业务组件 | ⭐⭐⭐ |
| [交互标准](./interaction-standards.md) | 模式、反馈、错误、空状态 | ⭐⭐⭐ |

### 目录结构

```
prototype/
├── README.md                          # 本文档
├── design/                            # 设计规范和文档
│   ├── design-system-spec.md         # 设计系统 ⭐
│   ├── component-library.md          # 组件库 ⭐
│   ├── interaction-standards.md      # 交互标准 ⭐
│   └── ...
├── components/                        # 组件原型
├── interactions/                      # 交互原型
├── shadcn/                           # shadcn/ui 配置
├── archives/                         # 历史版本
└── assets/                           # 图片和资源
```

---

## 设计哲学

### 极简主义原则

1. **Less is More** - 每个元素必须有存在理由
2. **清晰优先** - 信息层级清晰，视觉干扰最小化
3. **自然交互** - 符合用户直觉，无需学习成本
4. **完美细节** - 像素级精度，国际顶尖水准

### 设计特质

- **Apple 风格** - 简洁、精致、专注用户体验
- **Material Design 3** - 合理的动效和深度
- **Linear/Figma** - 高效的工作流程设计
- **Stripe** - 清晰的金融级界面

---

## 技术栈

### 前端
- **Next.js 14** (App Router)
- **React 18** + TypeScript
- **Tailwind CSS v3** 
- **shadcn/ui** (base-nova style)
- **Framer Motion**
- **Lucide React**

### 设计工具
- **Figma** - 设计协作
- **CSS Variables** - Design Tokens
- **WCAG 2.1 AA** - 无障碍标准

---

## 快速开始

### 查看原型

```bash
# 启动开发服务器
cd E:\Github\Veloform
npm run dev

# 访问 http://localhost:3000
```

### 查看设计规范

1. 阅读 [设计系统规范](./design/design-system-spec.md)
2. 阅读 [组件库规范](./design/component-library.md)
3. 阅读 [交互标准](./design/interaction-standards.md)

---

## 版本历史

| 版本 | 日期 | 关键变更 |
|-----|------|---------|
| v4.0.0 | 2026-07-05 | 重构原型系统、极简风格、shadcn/ui集成 |
| v3.8.0 | 2026-06-17 | 品牌渐变、gradient按钮、Utility Classes |
| v3.7.0 | 2026-06-14 | 交互标准完善 |
| v3.6.0 | 2026-06-08 | shadcn/ui集成 |
| v3.5.0 | 2026-06-06 | 动效规范 |

---

## 设计系统生成

使用 `ui-ux-pro-max` 技能生成设计系统：

```bash
# 生成完整设计系统
python3 scripts/search.py "sports fitness bike configuration minimal professional" --design-system -p "Veloform"

# 搜索UI风格
python3 scripts/search.py "minimal clean apple-style" --domain style

# 搜索色彩方案
python3 scripts/search.py "sports fitness outdoor" --domain color

# 搜索字体搭配
python3 scripts/search.py "professional modern clean" --domain typography
```

---

## 贡献指南

### 设计变更流程

1. 更新设计规范和原型
2. 同步更新代码实现
3. 更新 OpenSpec 文档
4. 提交 PR 并标注设计变更

### 代码对齐检查

- [ ] 组件使用正确的 shadcn/ui 变体
- [ ] 间距符合 4px 网格系统
- [ ] 色彩使用 Design Tokens
- [ ] 动效使用预设动画
- [ ] 响应式断点正确

---

## 相关资源

- [项目 README](../README.md)
- [OpenSpec 规范](../openspec/README.md)
- [shadcn/ui 文档](https://ui.shadcn.com)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [Framer Motion 文档](https://www.framer.com/motion/)

---

**最后更新**: 2026-07-05  
**维护者**: Veloform Team  
**版本**: v4.0.0
