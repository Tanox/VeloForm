# Veloform 安全规范 (v3.2.0)

## 概述

本文档定义了 Veloform 项目的安全标准和最佳实践，涵盖认证授权、数据保护、安全审计和常见威胁防护等方面。

---

## 1. 认证与授权

### 1.1 Firebase Auth 最佳实践

#### 登录流程
- 使用 Firebase Auth 的 `signInWithPopup()` 而非 `signInWithRedirect()`，提供更好的用户体验
- 登录成功后立即获取 ID Token，并存储在 `localStorage` 中
- 设置 Token 过期监听，自动刷新令牌

#### 用户状态管理
```typescript
// src/app/services/firebase.ts
loginWithGoogle(): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  provider.addScope('email');
  provider.addScope('profile');
  return signInWithPopup(auth, provider);
}

// 监听认证状态变化
onAuthStateChanged(auth, (user) => {
  if (user) {
    user.getIdToken().then((token) => {
      localStorage.setItem('idToken', token);
    });
  } else {
    localStorage.removeItem('idToken');
  }
});
```

#### 权限边界
- **公共数据**: 所有用户可读取（如组件目录）
- **私有数据**: 仅所有者可读写（如用户配置）
- **管理员数据**: 仅管理员可访问（预留）

### 1.2 令牌管理
- ID Token 有效期为 1 小时，需定期刷新
- 敏感操作（保存配置）前验证令牌有效性
- 登出时清除所有本地存储的令牌

---

## 2. 数据保护

### 2.1 用户数据加密
- Firestore 数据传输自动使用 TLS 加密
- 敏感配置字段（如用户偏好）考虑客户端加密存储
- 不要存储明文密码或敏感个人信息

### 2.2 API 密钥保护
- Firebase 配置通过环境变量注入（Vercel Secrets）
- 客户端 API Key 限制来源域名（Firebase 控制台配置）
- 敏感 API（如 GenAI）使用后端代理，不暴露给前端

### 2.3 输入验证与过滤

#### 客户端验证
```typescript
// 配置名称验证
function validateConfigName(name: string): boolean {
  if (!name || name.length < 2 || name.length > 50) {
    return false;
  }
  // 禁止特殊字符
  const invalidChars = /[<>{}[\]\\|`~!@#$%^&*()+=;:'"]/;
  return !invalidChars.test(name);
}
```

#### Firestore 安全规则验证
```typescript
// firestore.rules 中的验证
function isValidConfiguration(config) {
  return config.keys().hasOnly([
    'id', 'userId', 'bikeType', 'name', 
    'components', 'totalCost', 'estimatedWeight', 'createdAt', 'updatedAt'
  ]) &&
  config.bikeType in ['Road', 'MTB', 'Fold'] &&
  config.name is string && config.name.size() <= 200 &&
  config.components is list && config.components.size() <= 50;
}
```

---

## 3. 安全审计

### 3.1 漏洞扫描流程
- 使用 npm audit 定期检查依赖漏洞
- ESLint 安全规则检测（`eslint-plugin-security`）
- 定期依赖版本更新

### 3.2 安全日志记录
- 记录所有认证事件（登录/登出/失败）
- 记录配置保存和删除操作
- 日志包含时间戳、用户 ID、操作类型和 IP（可选）

### 3.3 安全审查清单

| 检查项 | 说明 | 频率 |
|--------|------|------|
| 依赖漏洞 | npm audit 扫描 | 每周 |
| 访问控制 | Firestore 规则审查 | 每月 |
| 代码安全 | ESLint 安全规则 | CI/CD |
| 密钥管理 | 环境变量检查 | 部署前 |

---

## 4. 常见威胁防护

### 4.1 XSS 防护
- Angular 模板自动进行 HTML 转义
- 使用 `[innerHTML]` 时确保内容已清理
- 禁止使用 `eval()` 和 `new Function()`

### 4.2 CSRF 防护
- Firebase Auth 自动处理 CSRF
- 状态改变操作要求认证令牌
- 关键操作（删除配置）需要二次确认

### 4.3 注入攻击防护
- Firestore 查询使用参数化查询
- 禁止字符串拼接构建查询
- 用户输入必须经过验证和清理

### 4.4 点击劫持防护
- 设置正确的 X-Frame-Options 响应头
- 使用 Angular 的 `DomSanitizer` 处理外部内容

---

## 5. 安全事件响应

### 5.1 事件分类
- **P0**: 关键漏洞（如认证绕过）- 立即修复
- **P1**: 高危漏洞（如 XSS）- 24 小时内修复
- **P2**: 中危漏洞（如信息泄露）- 1 周内修复
- **P3**: 低危漏洞（如安全配置）- 月度更新

### 5.2 响应流程
1. 发现漏洞 → 创建安全 Issue
2. 评估风险等级 → 制定修复方案
3. 实施修复 → 验证修复效果
4. 更新文档 → 记录变更

---

## 6. 安全最佳实践清单

| 类别 | 最佳实践 |
|------|----------|
| **认证** | 使用 Firebase Auth 的官方 SDK |
| **数据** | 仅存储必要的用户数据 |
| **依赖** | 定期更新并扫描漏洞 |
| **代码** | 避免 `any` 类型，使用类型安全 |
| **部署** | 生产环境禁用调试模式 |
| **日志** | 不记录敏感信息 |

---

**最后更新**: 2026-05-05  
**版本**: v3.2.0