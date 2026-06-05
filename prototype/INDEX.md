# Veloform 原型设计文档

本目录包含 Veloform 自行车配置器的所有原型设计资源和相关文档。

## 目录结构

```
prototype/
├── index.html                    # 基础原型演示
├── prototype.html                # 第二版原型
├── prototype-high-fidelity.html  # 高保真设计原型
├── prototype-guide.md            # 原型使用指南
├── prototype-review.md           # 设计评审文档
├── design-improvements.md         # UI/UX 优化建议
├── scripts/                       # 原型脚本
│   ├── components.js
│   ├── data.js
│   ├── main.js
│   ├── state.js
│   └── utils.js
└── styles/                        # 原型样式
    ├── animations.css
    ├── components.css
    ├── main.css
    └── variables.css
```

## 文档说明

### 核心原型文件

| 文件 | 说明 |
|------|------|
| `index.html` | 基础原型，包含完整的交互功能演示 |
| `prototype.html` | 迭代版本，改进的布局和视觉效果 |
| `prototype-high-fidelity.html` | **高保真原型**，使用翡翠绿品牌色，展示最佳设计状态 |

### 文档资源

| 文件 | 说明 |
|------|------|
| `prototype-guide.md` | 原型功能说明和使用指南 |
| `prototype-review.md` | 设计评审记录和改进建议 |
| `design-improvements.md` | 顶级UI/UX设计师视角的优化建议 |

## 快速预览

### 高保真原型（推荐）
直接在浏览器中打开 `prototype-high-fidelity.html` 查看最新设计：

```bash
# 在浏览器中打开
open prototype/prototype-high-fidelity.html
# 或使用 Python 服务器
cd prototype && python3 -m http.server 8080
```

### 完整交互原型
`index.html` 包含完整的配置器交互逻辑，可在浏览器中直接运行。

## 设计系统

原型中使用的设计 tokens（定义在 `styles/variables.css`）：

- **主色调**: `#10b981` (翡翠绿)
- **强调色**: `#fbbf24` (金色)
- **背景色**: `#050505` (深黑)
- **圆角系统**: 8px → 12px → 16px → 20px → 28px
- **字体**: DM Serif Display (标题) + Plus Jakarta Sans (正文)

## 更新日志

- **v2.0** (高保真原型): 翡翠绿品牌色，精致动画，完整响应式支持
- **v1.0** (基础原型): 核心功能验证

---

*此目录由 Veloform 设计团队维护*
