# Veloform 自行车配置器原型 - 技术架构

## 1. 技术栈

- **HTML5**: 语义化标签
- **CSS3**: 现代布局和动画
- **JavaScript**: 原生 ES6+
- **字体**: Google Fonts (Space Grotesk, Inter)
- **图标**: Lucide Icons (CDN)

## 2. 文件结构

```
prototype.html  # 单一文件原型
```

## 3. CSS 架构

### 3.1 变量定义
```css
:root {
  --bg-primary: #09090b;
  --bg-secondary: #18181b;
  --color-primary: #3b82f6;
  --color-accent: #f97316;
  --text-primary: #fafafa;
  --text-muted: #a1a1aa;
}
```

### 3.2 布局系统
- CSS Grid: 页面主布局
- Flexbox: 组件内部布局
- Container queries: 响应式设计

### 3.3 动画系统
- CSS transitions: 状态变化
- CSS keyframes: 复杂动画
- Animation delays: 交错效果

## 4. 组件设计

### 4.1 车型选择器
- 三个车型卡片
- 选中状态高亮
- 图标和颜色区分

### 4.2 配置清单
- 组件列表展示
- 编辑/删除操作
- 状态指示

### 4.3 组件选择器
- 模态框形式
- 分类标签页
- 搜索功能（可选）

### 4.4 汇总面板
- 价格和重量卡片
- 实时计算
- 趋势指示

## 5. 状态管理

- JavaScript 对象存储配置
- 事件驱动的 UI 更新
- 本地状态持久化（可选）

## 6. 性能优化

- 延迟加载动画
- CSS 硬件加速
- 事件委托
- 防抖处理
