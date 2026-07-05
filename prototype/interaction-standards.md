# Veloform 交互标准 v4.0.0

> **路径**: `/prototype/interaction-standards.md`  
> **版本**: v4.0.0  
> **更新日期**: 2026-07-05  
> **设计风格**: 极简主义 · 自然交互

---

## 设计理念

Veloform v4.0.0 的交互设计遵循 **自然、即时、克制** 的原则，让用户在无感知的情况下完成任务。

### 核心原则

1. **即时反馈** - 用户操作后 ≤100ms 内给出视觉反馈
2. **自然运动** - 动画模拟物理规律，使用缓动曲线
3. **克制使用** - 避免过度动画和装饰性效果
4. **清晰状态** - 每个交互状态都有明确的视觉表达

---

## 1. 交互模式库

### 1.1 导航模式

#### 顶部导航栏 (Navbar)

**设计要点**：
- 固定顶部，背景 `backdrop-blur-sm`
- Logo 左侧，导航链接居中/右侧
- 移动端：汉堡菜单 + 侧边抽屉
- Hover：微妙的下划线或背景色变化

**交互细节**：
- 导航链接 Hover：颜色变化（150ms）
- 当前页面：primary 色 + 底部指示条
- 移动端菜单：从右侧滑入（300ms）

#### 面包屑 (Breadcrumb)

**设计要点**：
- 显示当前位置层级
- 分隔符：`/ ` 或 `>`
- 当前页面：加粗，无链接
- 父级页面：链接，hover 下划线

---

### 1.2 选择模式

#### 单选 (Radio)

**设计要点**：
- 清晰的选中状态（实心圆点）
- 足够的点击区域（44x44px）
- 禁用状态：降低透明度

**交互细节**：
- 选中：瞬间反馈（无动画）
- 切换：微妙的颜色变化

#### 多选 (Checkbox)

**设计要点**：
- 方形复选框，圆角 4px
- 选中状态：primary 填充 + 白色勾号
- 不确定状态：primary 填充 + 横线

#### 卡片选择

**设计要点**（如 BikeTypeSelector）：
- 卡片式单选
- 选中：primary 边框 + 微妙背景色
- Hover：边框颜色变化 + 轻微上移

**交互细节**：
```tsx
// 选中状态
className="border-2 border-primary bg-primary/5"

// Hover 状态
className="hover:border-primary/30 hover:-translate-y-1"
```

---

### 1.3 列表模式

#### 无限滚动 (Infinite Scroll)

**设计要点**：
- 滚动到底部自动加载
- 加载指示器：Spinner + "加载中..."
- 全部加载完毕："已显示全部结果"

#### 分页 (Pagination)

**设计要点**：
- 每页固定数量（10/20/50）
- 当前页：primary 背景
- 省略号：`...`
- 上一页/下一页：箭头图标

---

### 1.4 搜索模式

#### 实时搜索

**设计要点**：
- 输入时即时搜索（debounce 300ms）
- 清空按钮：输入框右侧 X 图标
- 搜索结果：下拉列表或页面跳转

**交互细节**：
- Focus：输入框边框变 primary 色
- 输入：实时显示结果（300ms debounce）
- 清空：点击 X 图标，清空并聚焦输入框

---

## 2. 反馈规范

### 2.1 悬停反馈 (Hover)

**设计原则**：所有可交互元素必须有悬停反馈

| 元素类型 | Hover 效果 | 时长 |
|---------|-----------|------|
| 按钮（填充） | 背景色加深 | 150ms |
| 按钮（描边） | 背景色变浅 | 150ms |
| 按钮（幽灵） | 背景色出现 | 150ms |
| 卡片 | 阴影增强 + 轻微上移 | 200ms |
| 链接 | 颜色变化或下划线 | 150ms |
| 列表项 | 背景色变化 | 100ms |

**代码示例**：
```css
/* 按钮 Hover */
button:hover {
  background-color: var(--primary-hover);
  transition: background-color 150ms var(--ease-out);
}

/* 卡片 Hover */
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
  transition: all 200ms var(--ease-out);
}
```

---

### 2.2 按下反馈 (Active/Press)

**设计原则**：提供按下的物理感

| 元素类型 | Active 效果 | 时长 |
|---------|-----------|------|
| 按钮 | `scale(0.98)` + 透明度降低 | 100ms |
| 卡片 | `scale(0.99)` | 100ms |
| 列表项 | 背景色加深 | 100ms |

**代码示例**：
```css
button:active {
  transform: scale(0.98);
  opacity: 0.95;
  transition: transform 100ms, opacity 100ms;
}
```

---

### 2.3 焦点反馈 (Focus)

**设计原则**：清晰的键盘导航焦点指示器

| 元素类型 | Focus 效果 | 时长 |
|---------|-----------|------|
| 按钮 | `ring-2 ring-primary/20` | 150ms |
| 输入框 | `border-primary` + `ring-2 ring-primary/20` | 150ms |
| 链接 | 下划线 + 颜色变化 | 150ms |
| 卡片 | `ring-2 ring-primary/20` | 150ms |

**代码示例**：
```css
/* 全局 Focus 样式 */
*:focus-visible {
  outline: none;
  ring: 2px solid rgba(0, 113, 227, 0.2);
  transition: ring 150ms var(--ease-out);
}
```

---

### 2.4 加载反馈 (Loading)

**设计原则**：让用户知道系统在运行

#### 按钮加载

- 显示 Spinner，隐藏按钮文字
- 按钮禁用，cursor: wait
- Spinner 尺寸：16px（sm）、20px（default）、24px（lg）

#### 页面加载

- 全屏 Loading Screen
- 品牌 Logo + Spinner
- 可选：进度条（不确定进度）

#### 局部加载

- 卡片/区域加载：Skeleton 屏幕
- Spinner 居中显示
- 背景半透明遮罩

**代码示例**：
```tsx
// 按钮加载状态
<Button disabled={isLoading}>
  {isLoading ? (
    <>
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>保存中...</span>
    </>
  ) : (
    <span>保存</span>
  )}
</Button>
```

---

### 2.5 Toast 通知

**设计原则**：非侵入式的临时反馈

#### 类型

| 类型 | 图标 | 颜色 | 使用场景 |
|-----|------|------|---------|
| Success | ✅ | 绿色 | 操作成功（保存、删除） |
| Error | ❌ | 红色 | 操作失败（网络错误、验证失败） |
| Warning | ⚠️ | 橙色 | 需要注意（即将到期、配额不足） |
| Info | ℹ️ | 蓝色 | 信息提示（新功能、更新） |

#### 交互

- 自动消失：3-5 秒后自动关闭
- 手动关闭：右侧 X 按钮
- 悬停暂停：鼠标悬停时暂停自动关闭
- 点击跳转：可选，点击跳转到相关页面

**位置**：
- 桌面端：右上角
- 移动端：顶部居中

---

## 3. 错误处理

### 3.1 输入错误

**设计原则**：即时、清晰、友好

#### 验证时机

- 即时验证：输入时实时验证（debounce 300ms）
- 提交验证：提交时验证所有字段

#### 错误提示

- 位置：输入框正下方
- 颜色：红色（`var(--error)`）
- 字号：12px（sm）、14px（default）
- 图标：红色感叹号

**代码示例**：
```tsx
<div className="space-y-2">
  <Input
    type="email"
    placeholder="邮箱地址"
    className={cn(errors.email && "border-error")}
  />
  {errors.email && (
    <p className="text-sm text-error flex items-center gap-1">
      <AlertCircle className="h-4 w-4" />
      {errors.email.message}
    </p>
  )}
</div>
```

---

### 3.2 网络错误

**设计原则**：清晰的错误信息 + 重试选项

#### 错误处理组件

- 图标：WiFi 离线图标
- 标题："网络连接失败"
- 描述："请检查你的网络连接，然后重试"
- 操作：重试按钮

**代码示例**：
```tsx
<div className="text-center py-20">
  <WifiOff className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold mb-2">网络连接失败</h3>
  <p className="text-muted-foreground mb-6">
    请检查你的网络连接，然后重试
  </p>
  <Button variant="primary" onClick={retry}>
    <RefreshCw className="h-4 w-4" />
    重试
  </Button>
</div>
```

---

### 3.3 错误边界 (Error Boundary)

**设计原则**：优雅地捕获和处理运行时错误

#### 错误边界组件

- 标题："出现了一些问题"
- 描述："我们已记录此错误，将尽快修复"
- 操作：重新加载页面、返回首页
- 开发模式：显示错误堆栈

**代码示例**：
```tsx
// src/components/ui/error-boundary.tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">出现了一些问题</h2>
            <p className="text-muted-foreground mb-8">
              我们已记录此错误，将尽快修复
            </p>
            <Button onClick={() => window.location.reload()}>
              重新加载
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 4. 空状态设计

### 4.1 首次使用

**设计原则**：引导用户完成首次操作

#### 空状态组件

- 图标：大尺寸、语义化图标
- 标题："还没有配置"
- 描述："创建你的第一个自行车配置"
- 操作：主要操作按钮

**代码示例**：
```tsx
<div className="text-center py-20">
  <Bike className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
  <h3 className="text-lg font-semibold mb-2">还没有配置</h3>
  <p className="text-muted-foreground mb-6">
    创建你的第一个自行车配置
  </p>
  <Button variant="primary">
    <Plus className="h-4 w-4" />
    创建配置
  </Button>
</div>
```

---

### 4.2 搜索无结果

**设计原则**：提供替代方案

#### 无结果组件

- 图标：搜索图标
- 标题："未找到结果"
- 描述："尝试使用不同的关键词搜索"
- 可选：推荐搜索词

---

### 4.3 权限不足

**设计原则**：清晰的权限说明 + 升级路径

#### 权限不足组件

- 图标：锁图标
- 标题："权限不足"
- 描述："升级到高级版以使用此功能"
- 操作：升级按钮、返回按钮

---

## 5. 键盘快捷键

### 5.1 全局快捷键

| 快捷键 | 功能 | 上下文 |
|-------|------|--------|
| `Ctrl/Cmd + K` | 打开搜索 | 全局 |
| `Ctrl/Cmd + S` | 保存 | 配置页面 |
| `Esc` | 关闭对话框/取消 | 对话框、Drawer |
| `?` | 显示快捷键帮助 | 全局 |

---

### 5.2 表单快捷键

| 快捷键 | 功能 |
|-------|------|
| `Enter` | 提交表单 |
| `Tab` | 下一个字段 |
| `Shift + Tab` | 上一个字段 |

---

## 6. 无障碍规范 (WCAG 2.1 AA)

### 6.1 键盘导航

- ✅ 所有交互元素可通过 Tab 键访问
- ✅ 焦点顺序符合逻辑
- ✅ 焦点指示器清晰可见
- ✅ 支持方向键导航（菜单、列表）

---

### 6.2 ARIA 属性

| 元素 | ARIA 属性 | 说明 |
|-----|----------|------|
| 按钮 | `aria-label` | 图标按钮的描述 |
| 对话框 | `role="dialog"`, `aria-modal` | 对话框角色 |
| 下拉菜单 | `aria-expanded`, `aria-haspopup` | 展开状态 |
| 输入框 | `aria-invalid`, `aria-describedby` | 验证状态 |
| 加载 | `aria-busy`, `aria-live` | 加载状态 |

---

### 6.3 色彩对比度

- ✅ 正文文本：≥ 4.5:1（WCAG AA）
- ✅ 大文本（18px+）：≥ 3:1
- ✅ 图标：≥ 3:1
- ✅ 使用 WebAIM 对比度检查器验证

---

### 6.4 动画偏好

**设计原则**：尊重用户的动画偏好设置

```css
/* 尊重 prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. 实施检查清单

### 7.1 交互审查

- [ ] 所有可交互元素有 Hover 状态
- [ ] 按下状态有视觉反馈（scale 或颜色变化）
- [ ] 焦点状态清晰可见（ring）
- [ ] 加载状态有明确指示（spinner 或 skeleton）
- [ ] 错误状态有清晰提示
- [ ] 空状态有引导操作

### 7.2 无障碍审查

- [ ] 所有图片有 alt 属性
- [ ] 所有表单字段有 label
- [ ] 色彩对比度符合 WCAG AA
- [ ] 支持键盘导航
- [ ] 尊重 `prefers-reduced-motion`

---

## 版本历史

| 版本 | 日期 | 关键变更 |
|-----|------|---------|
| v4.0.0 | 2026-07-05 | 极简主义重构、自然交互、克制动效 |
| v3.7.0 | 2026-06-14 | 完善交互标准、空状态设计 |
| v3.5.0 | 2026-06-06 | 初始交互标准 |

---

**文档路径**: `/prototype/interaction-standards.md`  
**最后更新**: 2026-07-05  
**版本**: v4.0.0
