# 部署与环境配置规范 (v3.4.0)

## 概述

本文档定义 Veloform 项目的部署流程、环境配置和监控策略。

---

## 环境分类

| 环境 | 用途 | URL | 访问权限 |
|------|------|-----|----------|
| **Development** | 本地开发 | `http://localhost:3000` | 开发者 |
| **Staging** | 预发布测试 | `https://staging.veloform.app` | 内部团队 |
| **Production** | 生产环境 | `https://veloform.app` | 公开 |

---

## 部署配置

### 部署平台配置

项目支持两个部署到以下平台：

- **Vercel** - 主要部署平台
- **腾讯云 EdgeOne Pages** - 备用部署平台

配置文件分别位于：
- [deploy/vercel/vercel.json
- [deploy/edgeone/edgeone-pages.config.json

---

## 环境变量管理

### .env.example 模板

模板文件位于：[deploy/templates/.env.example](file:///workspace/deploy/templates/.env.example)

```bash
# Firebase Configuration
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIRESTORE_DATABASE_ID=(default)
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Google Gemini AI (optional)
GEMINI_API_KEY=your_gemini_key

# Application URL
APP_URL=https://veloform.app
```

### 本地开发设置

```bash
# 1. 复制模板
cp deploy/templates/.env.example .env

# 2. 填入真实值
# 编辑 .env 文件

# 3. 启动开发服务器
npm run dev
```

### 部署平台环境变量配置

#### Vercel

在 Vercel 控制台中设置：
1. 进入项目 Settings > Environment Variables
2. 添加所有必需变量
3. 选择适用环境（Production / Preview / Development）
4. 保存并重新部署

#### EdgeOne Pages

在 EdgeOne Pages 控制台中设置：
1. 进入项目设置 > 环境变量
2. 添加所有必需变量（前缀保持 `VITE_`）
3. 保存并重新部署

**注意**：`.env` 文件已被 `.gitignore` 排除，切勿提交到版本控制。

---

## Firebase 配置

### firebase-applet-config.json

项目使用专用的 Firebase Applet 配置格式（注意字段名与标准 Firebase SDK 格式略有不同）：

```json
{
  "projectId": "veloform-dev",
  "appId": "1:123456789:web:abcdef",
  "apiKey": "YOUR_API_KEY",
  "authDomain": "veloform-dev.firebaseapp.com",
  "firestoreDatabaseId": "(default)",
  "storageBucket": "veloform-dev.appspot.com",
  "messagingSenderId": "123456789",
  "measurementId": "G-XXXXXXXXXX"
}
```

**读取方式**：直接通过 `import` 导入 JSON 文件（`firebase.ts`）：
```typescript
import firebaseConfig from '../../firebase-applet-config.json';
```

**安全提醒**：
- 此文件包含占位符，实际配置通过环境变量注入（Vercel Secrets 面板）。
- 不要提交真实的 Firebase 密钥到仓库（已加入 `.gitignore`）。
- `firestoreDatabaseId` 字段为 Veloform 特有，用于支持多数据库。

---

## 部署检查清单

### 部署前

- [ ] 所有测试通过（`npm run test`）
- [ ] Lint 检查通过（`npm run lint`）
- [ ] 构建成功（`npm run build`）
- [ ] Bundle size 在预算内
- [ ] 环境变量已配置
- [ ] CHANGELOG.md 已更新
- [ ] 版本号已递增

### 部署后

- [ ] 验证生产 URL 可访问
- [ ] 检查核心功能正常工作
- [ ] 验证 Firebase 连接
- [ ] 测试用户认证流程
- [ ] 检查错误追踪上报
- [ ] 运行 Lighthouse 审计
- [ ] 监控 Core Web Vitals

---

## 相关文档

- [Vercel 部署指南](./vercel.md)
- [EdgeOne Pages 部署指南](./edgeone.md)
- [架构概览](../../openspec/architecture/overview.md
- [API 规范](../../openspec/api/firestore.md
- [开发规范](../../openspec/development/coding-standards.md
- [CI/CD 流程](../../openspec/devops/ci-cd.md

---

**版本**: v3.4.0
