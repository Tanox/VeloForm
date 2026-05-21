# 🚀 部署问题分析与解决方案

## 📋 问题总结

本项目已识别并修复以下部署问题。

---

## 腾讯云 EdgeOne Pages 部署问题

### 1. 环境变量注入限制（识别并提供解决方案）

**问题描述：**
- EdgeOne Pages 和 Vercel 在静态部署 Angular 应用时，环境变量不会自动注入到 `import.meta.env`
- Firebase 配置依赖环境变量或 fallback 配置文件

**解决方案：**
- 保持 [firebase-applet-config.json](file:///workspace/firebase-applet-config.json) 作为默认配置
- 在部署平台设置环境变量作为可选覆盖
- 改进 [firebase.service.ts](file:///workspace/src/app/core/services/firebase.service.ts#L20-L58) 中的 `loadConfig` 方法，支持多种环境变量读取方式

### 2. 静态资源缓存头不完整（已修复）

**问题描述：**
- 缺少 `.ico` 和 `.svg` 文件的缓存策略配置

**修复方案：**
- 更新 [edgeone-pages.config.json](file:///workspace/edgeone-pages.config.json#L56-L74)，添加这些资源的缓存头

---

## Vercel 部署问题

### 1. 环境变量注入限制（与 EdgeOne Pages 相同）

**解决方案：**
- 使用相同的 fallback 配置文件策略

### 2. 安全响应头不完整（已修复）

**问题描述：**
- 缺少 `Referrer-Policy` 头
- 缺少 `.ico` 和 `.svg` 文件的缓存策略

**修复方案：**
- 更新 [vercel.json](file:///workspace/vercel.json#L24-L27)，添加完整的安全头
- 添加缺失的资源缓存策略

---

## 通用部署改进

### 新增文件

- [.env.example](file:///workspace/.env.example) - 环境变量示例文件
- [scripts/prepare-deploy.js](file:///workspace/scripts/prepare-deploy.js) - 部署前准备脚本

### 部署检查清单

部署前请确保：

- [ ] Firebase 配置已正确设置（可在 [firebase-applet-config.json](file:///workspace/firebase-applet-config.json) 中配置）
- [ ] 所有环境变量已在部署平台配置（可选覆盖）
- [ ] 本地构建成功 (`npm run build`)
- [ ] 输出目录结构正确 (`dist/browser`)

---

## 环境变量配置指南（可选）

如果需要通过环境变量覆盖 Firebase 配置，请在部署平台设置以下变量：

### EdgeOne Pages

1. 进入 **项目设置 > 环境变量**
2. 添加以下变量（前缀 `VITE_`）：
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_APP_ID`
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIRESTORE_DATABASE_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_MEASUREMENT_ID`
   - (可选) `GEMINI_API_KEY`

### Vercel

1. 进入 **Settings > Environment Variables**
2. 添加与上述相同的变量

**注意**：对于静态 Angular 应用，直接在 `firebase-applet-config.json` 中配置可能更简单可靠。

---

## 验证步骤

部署完成后验证：

1. **构建检查**：部署日志中无错误
2. **访问检查**：首页可以正常访问
3. **路由检查**：刷新页面后 SPA 路由正常工作
4. **资源检查**：所有静态资源（CSS、JS、图片）正常加载
5. **功能检查**：Firebase 认证等核心功能正常

---

## 文件变更列表

- [src/app/core/services/firebase.service.ts](file:///workspace/src/app/core/services/firebase.service.ts) - 改进环境变量读取逻辑
- [edgeone-pages.config.json](file:///workspace/edgeone-pages.config.json) - 添加完整的响应头配置
- [vercel.json](file:///workspace/vercel.json) - 添加完整的安全头和缓存策略
- [.env.example](file:///workspace/.env.example) - 新增环境变量示例文件
- [scripts/prepare-deploy.js](file:///workspace/scripts/prepare-deploy.js) - 新增部署准备脚本
