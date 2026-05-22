# 部署配置目录 (v3.4.0)

> 本目录包含所有部署相关的配置文件，按平台分类组织。

## 目录结构

```
deploy/
├── README.md                      # 本文档
├── scripts/
│   └── prepare-deploy.js          # 部署准备脚本
├── vercel/
│   └── vercel.json                # Vercel 部署配置
├── edgeone/
│   └── edgeone-pages.config.json  # 腾讯云 EdgeOne Pages 配置
├── firebase/
│   ├── firebase-applet-config.json # Firebase 应用配置
│   └── firestore.rules            # Firestore 安全规则
└── env.example                    # 环境变量模板
```

## 平台配置

### Vercel

部署配置 `vercel.json`：
- 构建命令：`npm run build`
- 输出目录：`dist/browser`
- 安全头配置
- 缓存策略

### 腾讯云 EdgeOne Pages

部署配置 `edgeone-pages.config.json`：
- 构建命令：`npm run build`
- 输出目录：`dist/browser`
- 错误页面处理
- 缓存策略

### Firebase

配置文件：
- `firebase-applet-config.json` - Firebase 项目配置
- `firestore.rules` - Firestore 安全规则

## 使用说明

### 1. 本地开发

```bash
npm run dev
```

### 2. 部署准备

```bash
npm run deploy:prepare
```

此脚本将部署配置复制到项目根目录。

### 3. Vercel 部署

```bash
npm run deploy:vercel       # 预览部署
npm run deploy:vercel:prod  # 生产部署
```

## 注意事项

- 根目录中的配置文件（如 `vercel.json`）是实际部署使用的文件
- `deploy/` 目录中的文件是备份/参考版本
- 修改部署配置后，请同步更新 `deploy/` 目录中的对应文件

## 相关文档

- [部署与环境配置](../../openspec/deployment/environments.md)
- [CI/CD 流程](../../openspec/devops/ci-cd.md)

---

**最后更新**: 2026-05-22  
**版本**: v3.4.0
