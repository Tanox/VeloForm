# ADR 001: 采用 Signal-based 状态管理

> **路径**: `/openspec/architecture/adr/001-signal-based-state.md`  
> **版本**: v3.4.1  
> **更新日期**: 2026-05-05

## 概述

本 ADR 记录了 Veloform 项目选择 Angular Signals 作为主要状态管理方案的决策过程和实施策略。

---

## 状态

**已接受**

---

## 决策背景

在 Angular 21 中，Signals 成为了官方推荐的状态管理方式。本项目需要选择一种状态管理方案，支持：

1. 响应式状态更新
2. 细粒度变更检测
3. 类型安全
4. 与 Angular 21 的 Zoneless 架构兼容

---

## 决策内容

采用 **Angular Signals** 作为项目的主要状态管理方案，具体策略如下：

### 1. 根组件状态管理

```typescript
// src/app/app.ts
@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // 基础状态
  activeType = signal<'Road' | 'MTB' | 'Fold'>('Road');
  components = signal<ConfigComponent[]>(ROAD_DEFAULTS);
  
  // 计算属性
  configName = computed(() => {
    switch(this.activeType()) {
      case 'Road': return 'S-Works Tarmac SL8';
      case 'MTB': return 'Epic World Cup';
      case 'Fold': return 'Brompton T Line';
    }
  });
  
  totalCost = computed(() => 
    this.components().reduce((sum, c) => sum + c.price, 0)
  );
  
  // 副作用
  constructor() {
    effect(() => {
      console.log('Bike type changed:', this.activeType());
    });
  }
}
```

### 2. 组件间通信

- **父子组件**: 使用 `input()` / `output()` 装饰器
- **跨组件通信**: 使用服务（如 `NotificationService`, `ConfirmDialogService`）
- **全局状态**: 必要时使用 Injectable 服务持有信号

### 3. 服务层状态

```typescript
// src/app/services/notification.ts
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications = signal<Notification[]>([]);
  
  notifications$ = this.notifications.asReadonly();
  
  success(message: string) {
    this.addNotification(message, 'success');
  }
  
  error(message: string) {
    this.addNotification(message, 'error');
  }
  
  private addNotification(message: string, type: NotificationType) {
    const notification: Notification = {
      id: crypto.randomUUID(),
      message,
      type,
      createdAt: new Date()
    };
    this.notifications.update(n => [...n, notification]);
    
    // 3秒后自动移除
    setTimeout(() => {
      this.notifications.update(n => n.filter(notif => notif.id !== notification.id));
    }, 3000);
  }
}
```

---

## 权衡分析

| 因素 | 支持 Signal | 支持 RxJS |
|------|-------------|-----------|
| **性能** | 细粒度更新，只更新依赖信号的组件 | 订阅模式，可能产生不必要的更新 |
| **学习曲线** | 简单直观，API 简洁 | 概念较多，学习成本高 |
| **类型安全** | 编译时类型检查 | 类型安全但需要额外操作符 |
| **组合性** | computed 信号可组合 | 操作符丰富，但复杂度高 |
| **Angular 集成** | 原生支持，无缝集成 | 需要额外导入和配置 |
| **调试** | 简单直观 | 操作符链复杂，调试困难 |

---

## 实施策略

### 渐进式迁移

1. **第一阶段**: 根组件使用 Signals 管理核心状态
2. **第二阶段**: 服务层逐步迁移到 Signals
3. **第三阶段**: 复杂组件内部状态使用 Signals

### 编码规范

- 优先使用 Signals 管理组件状态
- 只有在需要复杂异步流处理时才使用 RxJS
- 避免混合使用 Signals 和 RxJS（除非必要）

### 测试策略

```typescript
// 测试示例
describe('App', () => {
  it('should update totalCost when components change', () => {
    const app = new App();
    
    expect(app.totalCost()).toBe(7780); // 默认 Road 配置
    
    app.components.set([
      { id: '1', category: 'Frame', name: 'Test', price: 1000, weight: 1000 }
    ]);
    
    expect(app.totalCost()).toBe(1000);
  });
});
```

---

## 影响

### 正面影响

- 更好的性能（细粒度更新）
- 简化状态管理代码
- 更好的开发体验
- 与 Angular 21 原生集成

### 负面影响

- 需要学习新的 API
- 某些复杂场景可能需要 RxJS 补充
- 第三方库可能不完全支持 Signals

---

## 相关决策

- ADR 002: Zoneless Angular 架构
- ADR 004: Firebase 后端选型

---

**最后更新**: 2026-05-05  
**版本**: v3.4.1