# Vercel 部署指南 (v3.4.0)

本文档详细说明了如何将 Veloform 项目部署到 Vercel。

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
cp deploy/vercel/vercel.json ./
```

### 2. 部署到 Vercel

```bash
# 首次部署
vercel

# 部署到生产环境
vercel --prod
```

---

## 配置说明

### vercel.json 配置详解

```json
{
  "version": 2,
  "framework": "angular",
  "buildCommand": "npm run build",
  "outputDirectory": "dist/browser",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "headers": [...],
  "rewrites": [...]
}
```

### 安全响应头

- `X-Content-Type-Options: nosniff` - 防止 MIME 类型嗅探
- `X-Frame-Options: DENY` - 防止点击劫持
- `X-XSS-Protection: 1; mode=block` - 启用 XSS 保护
- `Referrer-Policy: strict-origin-when-cross-origin` - 控制引用信息

### 缓存策略

| 资源类型 | 缓存时间 | 说明 |
|---------|---------|------|
| JS/CSS | 365 天 | 不可变缓存 |
| Assets | 365 天 | 不可变缓存 |
| ICO/SVG | 1 天 | 短期缓存 |

### SPA 路由重写

```json
{
  "source": "/((?!api/).*)",
  "destination": "/index.html"
}
```

确保所有路由（除 API 外）都指向 `index.html`。

---

## 部署步骤

### 方式一：通过 Vercel 控制台部署

#### 1. 导入项目

1. 登录 [Vercel 控制台](https://vercel.com)
2. 点击 **Add New Project**
3. 选择 Git 仓库（GitHub / GitLab / Bitbucket）
4. 选择 `veloform` 仓库

#### 2. 构建设置

| 设置项 | 值 |
|--------|-----|
| Framework Preset | Angular |
| Build Command | `npm run build` |
| Output Directory | `dist/browser` |
| Install Command | `npm install` |

#### 3. 环境变量配置

在 **Environment Variables** 部分添加以下变量：

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

#### 4. 开始部署

点击 **Deploy**，等待部署完成。

### 方式二：CLI 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

---

## 环境变量配置

### 本地开发

```bash
# 复制模板
cp deploy/templates/.env.example .env

# 编辑 .env 填入真实值
# 然后启动开发服务器
npm run dev
```

### 生产环境

在 Vercel 控制台：
- Settings > Environment Variables
- 添加变量
- 选择适用环境（Production / Preview / Development）
- 保存并重新部署

---

## 常见问题解决

### 问题 1：构建成功但访问 404

**原因**：输出目录配置错误

**解决方案**：
1. 确认 `outputDirectory` 设为 `dist/browser`
2. 本地执行 `npm run build` 验证目录结构

### 问题 2：路由刷新 404

**原因**：SPA 路由未正确配置重写

**解决方案**：确认 `vercel.json` 中有正确的 `rewrites` 配置。

### 问题 3：Firebase 无法连接

**原因**：环境变量未正确配置

**解决方案**：
1. 检查 Vercel 控制台环境变量
2. 确认变量名前缀是 `VITE_`
3. 可以临时修改 `firebase-applet-config.json` 测试

---

## 回滚策略

### Vercel 回滚

1. 进入 Vercel Dashboard
2. 选择项目 > Deployments
3. 找到上一个稳定版本
4. 点击 "Promote to Production"

### Git 回滚

```bash
git revert <bad-commit-hash>
git push
```

---

## 相关资源

- [Vercel 官方文档](https://vercel.com/docs)
- [Angular 部署指南](https://angular.io/guide/deployment)
- [EdgeOne Pages 部署指南](./edgeone.md)

---

**版本**: v3.4.0
