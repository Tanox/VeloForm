# 腾讯云 EdgeOne Pages 部署指南 (v3.4.0)

本文档详细说明了如何将 Veloform 项目部署到腾讯云 EdgeOne Pages。

## 目录

1. [快速开始](#快速开始)
2. [配置说明](#配置说明)
3. [部署步骤](#部署步骤)
4. [环境变量配置](#环境变量配置)
5. [常见问题解决](#常见问题解决)

---

## 快速开始

### 1. 复制配置文件

```bash
cp deploy/edgeone/edgeone-pages.config.json ./
```

### 2. 部署到 EdgeOne Pages

```bash
# 首次部署
eo init

# 后续部署
eo deploy
```

---

## 配置说明

### edgeone-pages.config.json 配置详解

```json
{
  "framework": "angular",
  "buildCommand": "npm run build",
  "outputDirectory": "dist/browser",
  "installCommand": "npm install",
  "rootDirectory": "",
  "headers": [...],
  "rewrites": [...]
}
```

### 与 Vercel 配置的差异

| 配置项 | Vercel | EdgeOne Pages |
|--------|--------|---------------|
| 配置文件名 | `vercel.json` | `edgeone-pages.config.json` |
| 输出目录 | `dist/browser` | **必须是 `dist/browser`** |
| 重写语法 | 略有不同 | 更接近 Netlify 格式 |

### 输出目录结构

构建后的目录结构：

```
dist/
├── browser/
│   ├── index.html         ✅ EdgeOne Pages 从此目录部署
│   ├── _headers
│   ├── _redirects
│   ├── *.js
│   ├── *.css
│   └── [静态资源]
├── 3rdpartylicenses.txt
└── prerendered-routes.json
```

---

## 部署步骤

### 方式一：通过 EdgeOne Pages 控制台部署

#### 1. 创建项目

1. 登录 [腾讯云 EdgeOne 控制台](https://console.cloud.tencent.com/edgeone)
2. 进入 **Pages** > **项目管理**
3. 点击 **新建项目**

#### 2. 配置 Git 仓库

1. 选择 Git 仓库类型（GitHub / GitLab / Gitee）
2. 授权并选择 `veloform` 仓库
3. 选择要部署的分支（如 `main` 或 `master`）

#### 3. 构建设置

| 设置项 | 值 |
|--------|-----|
| 框架预设 | `Angular` 或 `其他` |
| 构建命令 | `npm run build` |
| 输出目录 | `dist/browser` |
| 安装命令 | `npm install` |

#### 4. 环境变量（重要！）

在 **环境变量** 部分添加以下变量（参考 `.env.example`）：

```
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIRESTORE_DATABASE_ID=(default)
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
GEMINI_API_KEY=your-gemini-key (可选)
```

**注意**：变量名需与代码中一致，参考 `src/app/core/services/firebase.service.ts`

#### 5. 开始部署

1. 点击 **保存并部署**
2. 等待构建完成（约 1-3 分钟）
3. 部署成功后，会获得一个临时访问域名

---

### 方式二：CLI 部署（高级）

#### 1. 安装 EdgeOne CLI

```bash
# 使用 npm
npm install -g @tencentcloud/edgeone-cli

# 或使用 yarn
yarn global add @tencentcloud/edgeone-cli

# 或使用 bun
bun add -g @tencentcloud/edgeone-cli
```

#### 2. 配置认证

```bash
eo login
```

按照提示完成认证。

#### 3. 本地构建测试

```bash
# 先在本地构建，确保没问题
npm run build

# 验证输出目录
ls -la dist/browser
```

#### 4. 部署

```bash
# 首次部署
eo init

# 后续部署
eo deploy
```

---

## 环境变量配置

### 在代码中的使用方式

Firebase 配置加载逻辑位于 `src/app/core/services/firebase.service.ts`：

```typescript
private loadConfig(): FirebaseConfig {
  // 优先从环境变量读取
  const env = (import.meta as { env?: Record<string, string> }).env || {};
  
  // 回退到 firebase-applet-config.json
  return {
    projectId: env['VITE_FIREBASE_PROJECT_ID'] || fallbackConfig.projectId,
    // ...
  };
}
```

### EdgeOne Pages 环境变量注入方式

EdgeOne Pages 通过 **构建设置 > 环境变量** 配置变量。

这些变量在构建时会被注入，Angular 构建时通过 `angular.json` 中的 `define` 配置替换。

**注意**：EdgeOne Pages 的环境变量默认不会自动注入到 `import.meta.env`，需要在构建时通过 Angular 的配置处理。

---

## 常见问题解决

### 问题 1：构建成功但访问 404

**原因**：输出目录配置错误

**解决方案**：
1. 确认 `outputDirectory` 设为 `dist/browser`（不是 `dist` 或 `dist/app`）
2. 检查构建日志，确认输出位置
3. 本地执行 `npm run build` 验证目录结构

---

### 问题 2：路由刷新 404

**原因**：SPA 路由未正确配置重写

**解决方案**：
1. 确认 `edgeone-pages.config.json` 中有：
   ```json
   "rewrites": [{
     "source": "/*",
     "destination": "/index.html"
   }]
   ```
2. 确认 `public/_redirects` 文件存在且内容正确：
   ```
   /*    /index.html   200
   ```

---

### 问题 3：Firebase 无法连接

**原因**：环境变量未正确配置或注入

**解决方案**：
1. 检查 EdgeOne Pages 控制台的环境变量配置
2. 确认变量名前缀是 `VITE_`（不是 `NG_` 或其他）
3. 可以临时修改 `firebase-applet-config.json` 填入真实值测试（不要提交到 Git）

---

### 问题 4：静态资源加载失败

**原因**：资源路径或缓存问题

**解决方案**：
1. 检查 `index.html` 中的 `<base href="/">` 是否正确
2. 确认 `_headers` 配置正确
3. 尝试清除浏览器缓存或使用无痕模式

---

### 问题 5：构建错误 "Cannot find name 'inject'"

**原因**：Angular 21.x 需要显式导入这些 API

**解决方案**（已修复）：
```typescript
// 错误
import { Component } from '@angular/core';

// 正确
import { Component, inject, signal, computed } from '@angular/core';
```

---

## 部署验证清单

- [ ] 构建成功，无错误
- [ ] 首页可以正常访问
- [ ] 路由刷新正常（SPA 重写生效）
- [ ] 静态资源（图片、CSS、JS）正常加载
- [ ] Firebase 认证可以正常使用
- [ ] Firestore 数据可以正常读写
- [ ] 响应头正确设置（安全头、缓存策略）
- [ ] HTTPS 正常工作
- [ ] 移动端适配正常

---

## 回滚策略

如果新版本出现问题，可以：

1. **在 EdgeOne Pages 控制台回滚**：
   - 进入项目 > 部署历史
   - 选择稳定版本 > 点击"回滚"

2. **通过 Git 回滚**：
   ```bash
   git revert <bad-commit-hash>
   git push
   ```

---

## 性能优化建议

1. **开启 EdgeOne CDN 加速**：在控制台配置缓存策略
2. **启用 Gzip/Brotli 压缩**：EdgeOne Pages 默认已开启
3. **配置域名**：使用自定义域名获得更好的性能
4. **监控分析**：使用 EdgeOne 的数据分析功能监控访问情况

---

## 相关资源

- [腾讯云 EdgeOne Pages 官方文档](https://cloud.tencent.com/document/product/1552)
- [Angular 部署指南](https://angular.io/guide/deployment)
- [Vercel 部署指南](./vercel.md)

---

**版本**: v3.4.0
