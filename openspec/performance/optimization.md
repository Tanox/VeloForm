# Veloform 性能优化规范 (v3.2.0)

## 概述

本文档定义了 Veloform 项目的性能优化标准和最佳实践，涵盖前端性能、Angular 性能、3D 渲染性能和后端性能等方面。

---

## 1. 前端性能优化

### 1.1 Bundle Size 优化

#### 代码分割策略
- 使用 Angular 的 `loadChildren` 进行路由级懒加载
- 第三方库按需导入（如 Three.js 只导入必要模块）
- 移除未使用的依赖

#### 依赖优化
```typescript
// 不好的做法：导入整个库
import * as THREE from 'three';

// 好的做法：按需导入
import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
```

#### 构建优化配置
```json
// angular.json 中的优化配置
{
  "optimization": true,
  "outputHashing": "all",
  "sourceMap": false,
  "extractCss": true,
  "namedChunks": false,
  "aot": true,
  "statsJson": false
}
```

### 1.2 懒加载策略

#### 组件懒加载
```typescript
// src/routes.ts
export const routes: Route[] = [
  {
    path: 'config/:id',
    loadComponent: () => 
      import('./app/components/component-selector').then(c => c.ComponentSelectorComponent)
  }
];
```

#### 图片懒加载
- 使用 `loading="lazy"` 属性
- 对于 Three.js 纹理，使用异步加载

### 1.3 缓存策略

#### 静态资源缓存
- CSS/JS 文件使用内容哈希命名
- 设置适当的 Cache-Control 响应头
- 使用 Service Worker 进行离线缓存

#### 数据缓存
- Firestore 查询结果缓存到内存
- 使用 `localStorage` 缓存用户配置列表
- 设置合理的缓存失效时间

---

## 2. Angular 性能优化

### 2.1 Signal 优化模式

#### 避免不必要的计算
```typescript
// 不好的做法：每次访问都会重新计算
const totalWeight = computed(() => {
  const componentWeight = components().reduce(
    (sum, c) => sum + c.weight / 1000,
    0
  );
  return baseWeight() + componentWeight;
});

// 好的做法：缓存计算结果（Angular Signal 已自动优化）
// Signal 的 computed 会自动缓存，只有依赖变化时才重新计算
```

#### 批量更新信号
```typescript
// 使用 batchUpdate 减少变更检测次数
import { batchUpdate } from '@angular/core';

batchUpdate(() => {
  components.set(newComponents);
  activeType.set(newType);
});
```

### 2.2 变更检测优化

#### OnPush 策略
所有组件必须使用 `ChangeDetectionStrategy.OnPush`：
```typescript
@Component({
  selector: 'app-preview',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '...'
})
export class PreviewComponent { }
```

#### 避免不必要的绑定
- 使用 `trackBy` 优化列表渲染
- 避免在模板中调用方法

### 2.3 虚拟滚动

对于大型组件列表，考虑使用虚拟滚动：
```typescript
import { ScrollingModule } from '@angular/cdk/scrolling';

// 模板中使用
<cdk-virtual-scroll-viewport itemSize="60">
  <div *cdkVirtualFor="let component of components; trackBy: trackById">
    {{ component.name }}
  </div>
</cdk-virtual-scroll-viewport>
```

---

## 3. 3D 渲染性能

### 3.1 Three.js 优化技巧

#### 几何体优化
- 使用尽可能少的几何体
- 合并静态几何体
- 使用 LOD（Level of Detail）技术

#### 材质优化
- 减少纹理数量和大小
- 使用压缩纹理格式
- 复用材质对象

#### 渲染循环优化
```typescript
// 使用 requestAnimationFrame
function animate() {
  requestAnimationFrame(animate);
  
  // 只在需要时更新
  if (needsUpdate) {
    bikeGroup.rotation.y += 0.005;
  }
  
  renderer.render(scene, camera);
}
```

### 3.2 内存管理

#### 资源清理
```typescript
// 组件销毁时清理 Three.js 资源
ngOnDestroy() {
  if (this.renderer) {
    this.renderer.dispose();
  }
  if (this.bikeGroup) {
    this.bikeGroup.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        object.material.dispose();
      }
    });
  }
}
```

#### 避免内存泄漏
- 及时移除事件监听器
- 清理动画帧引用
- 释放不再使用的对象

---

## 4. 后端性能优化

### 4.1 Firestore 查询优化

#### 索引优化
- 创建复合索引支持复杂查询
- 避免全表扫描
- 使用 `where()` 过滤数据

#### 查询缓存
```typescript
// 使用内存缓存查询结果
private componentCache = new Map<string, ConfigComponent[]>();

async getComponentsByType(bikeType: BikeType): Promise<ConfigComponent[]> {
  const cacheKey = bikeType;
  if (this.componentCache.has(cacheKey)) {
    return this.componentCache.get(cacheKey)!;
  }
  
  const snapshot = await getDocs(
    query(
      collection(db, 'components'),
      where('bikeType', '==', bikeType)
    )
  );
  
  const components = snapshot.docs.map(doc => doc.data() as ConfigComponent);
  this.componentCache.set(cacheKey, components);
  
  return components;
}
```

### 4.2 批量操作

#### 批量写入
```typescript
// 使用批量写入减少网络请求
const batch = writeBatch(db);

configurations.forEach(config => {
  batch.set(doc(db, 'configurations', config.id!), config);
});

await batch.commit();
```

---

## 5. 性能监控与基准测试

### 5.1 性能指标

| 指标 | 目标值 | 测量方式 |
|------|--------|----------|
| 首屏加载时间 | < 2s | LCP (Largest Contentful Paint) |
| 交互响应时间 | < 100ms | FID (First Input Delay) |
| Bundle Size | < 1.5MB | 构建输出大小 |
| 内存使用 | < 500MB | Chrome DevTools |

### 5.2 监控工具

- **Lighthouse**: 综合性能评估
- **Chrome DevTools**: 实时性能分析
- **Firebase Performance Monitoring**: 生产环境监控

### 5.3 性能回归检测

在 CI/CD 流程中添加性能基准测试：
```bash
# package.json 脚本
"scripts": {
  "perf": "lighthouse --view --throttling.cpuSlowdownMultiplier=4"
}
```

---

## 6. 性能优化最佳实践清单

| 类别 | 最佳实践 |
|------|----------|
| **Bundle** | 使用懒加载，按需导入 |
| **Angular** | OnPush + Signal 组合 |
| **3D** | 复用几何体和材质，及时清理资源 |
| **Firestore** | 使用索引和查询缓存 |
| **监控** | 定期运行 Lighthouse 检查 |

---

**最后更新**: 2026-05-05  
**版本**: v3.2.0