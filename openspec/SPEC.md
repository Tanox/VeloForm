# Veloform 规范概览 (v3.4.0)

## 概述

Veloform 是一个本地化（EN/ZH-CN）、高性能的自行车配置器，支持 **公路车**、**山地车** 和 **折叠车** 三类车型的自定义构建模拟。具备实时价格和重量计算、Firebase 后端持久化和静态部署。

- **生产地址**: `https://veloform.app`
- **代码仓库**: `https://github.com/sutchan/Veloform`

---

## 技术栈摘要

| 层级 | 技术 | 版本 |
| :--- | :--- | :--- |
| **框架** | Next.js (App Router) | 14.1.0 |
| **UI 库** | React | ^18.2.0 |
| **状态管理** | Zustand | ^4.5.0 |
| **样式** | Tailwind CSS | 3.4.0 |
| **后端/数据库** | Firebase (Firestore) | ^10.0.0 |
| **动画** | Framer Motion | ^10.16.4 |
| **图标** | Lucide React | ^0.294.0 |

完整技术栈说明见下方。

---

## 核心架构原则

1. **组件优先** - 使用 React 函数组件配合客户端 Hooks
2. **状态隔离** - 使用 Zustand 进行全局状态管理
3. **类型安全** - 使用 TypeScript 严格类型检查
4. **渐进增强** - 使用客户端组件 ('use client') 处理交互
5. **数据分离** - 组件、服务、状态管理分离
6. **错误处理** - 使用 ErrorBoundary 捕获渲染错误

---

## 目录结构

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # 根布局
│   ├── page.tsx                   # 首页（配置器）
│   ├── globals.css                # 全局样式
│   └── library/
│       └── page.tsx               # 配置库页面
├── components/
│   ├── configurator/              # 配置器组件
│   │   ├── BikeTypeSelector.tsx   # 车型选择器
│   │   ├── BuildList.tsx          # 配置清单
│   │   ├── ComponentSelector.tsx  # 组件选择器
│   │   └── SummaryPanel.tsx       # 摘要面板
│   ├── layout/
│   │   └── Navbar.tsx             # 导航栏
│   └── ui/                        # UI 基础组件
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       └── ErrorBoundary.tsx
├── lib/
│   ├── constants.ts               # 应用常量
│   ├── mock-data.ts               # 模拟数据
│   ├── store.ts                   # Zustand 状态管理
│   ├── utils.ts                   # 工具函数
│   ├── firebase.ts                # Firebase 初始化
│   ├── firebase-service.ts        # Firebase 服务
│   └── i18n/                      # 国际化
│       ├── index.ts               # i18n 服务
│       ├── en.ts                  # 英文翻译
│       └── zh-CN.ts               # 中文翻译
└── types/
    └── index.ts                   # 类型定义
```

---

## 数据模型

### 核心实体

- **ConfigComponent** - 自行车组件
- **Configuration** - 用户保存的自行车配置

完整类型定义见 `src/types/index.ts`

---

## API 接口

### Firebase 服务

- `saveConfigurationToFirebase(config, userId?)` - 保存配置到 Firestore
- `loadConfigurationsFromFirebase(userId?)` - 加载用户配置列表
- `deleteConfigurationFromFirebase(configId)` - 删除配置
- `loadComponentsFromFirebase()` - 加载组件字典

完整服务定义见 `src/lib/firebase-service.ts`

---

## 开发规范要点

### TypeScript
- 避免 `any`，使用明确类型
- 导出函数必须标注返回类型
- 使用类型守卫和类型断言

### React
- 使用函数组件配合 Hooks
- 状态管理使用 Zustand
- 客户端组件使用 `'use client'` 指令
- 保持组件单一职责

### 样式
- 使用 Tailwind CSS 工具类
- 避免自定义 CSS
- 移动端优先设计

### 错误处理
- 使用 ErrorBoundary 捕获组件错误
- 合理处理 Promise 错误
- 提供友好的错误提示

---

## UI 组件清单

| 组件 | 说明 | 状态 |
|------|------|------|
| `Navbar` | 顶部导航栏，包含语言切换 | ✅ |
| `BikeTypeSelector` | 车型选择器 | ✅ |
| `BuildList` | 配置清单和组件编辑 | ✅ |
| `SummaryPanel` | 价格和重量计算 | ✅ |
| `ComponentSelector` | 组件选择模态框 | ✅ |
| `ErrorBoundary` | 错误边界 | ✅ |
| `Button` | 通用按钮组件 | ✅ |
| `Card` | 通用卡片组件 | ✅ |
| `Modal` | 通用模态框组件 | ✅ |

---

## 文档导航

### 📚 完整规范体系

| 分类 | 说明 |
|------|------|
| **架构** | 整体架构和数据流 |
| **开发** | 编码规范和最佳实践 |
| **部署** | 部署环境和流程 |

---

## 版本历史

| 规范版本 | 项目版本 | 更新日期 | 说明 |
|---------|---------|---------|------|
| v3.4.0 | 3.4.0 | 2026-05-26 | 文档体系标准化，新增国际化支持、错误边界，更新为 Next.js 架构 |
| v3.3.2 | 3.3.2 | 2026-05-20 | 部署配置修复、版本号统一 |
| v3.3.1 | 3.3.1 | 2026-05-19 | 动态项目 ID、测试文件整理 |
| v3.3.0 | 3.3.0 | 2026-05-11 | 完整架构重构，修复 UI 问题 |

---

**最后更新**: 2026-05-26  
**版本**: v3.4.0
