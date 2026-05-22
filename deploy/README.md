# deploy/ 部署配置目录 (v3.4.0)

本目录包含 Veloform 项目的所有部署配置文件。

## 目录结构

```
deploy/
├── README.md              # 本文档
├── vercel/              # Vercel 部署配置
│   └── vercel.json
├── edgeone/             # 腾讯云 EdgeOne Pages 配置
│   └── edgeone-pages.config.json
├── scripts/            # 部署脚本
│   └── prepare-deploy.js
├── docs/               # 部署文档
│   ├── vercel.md
│   ├── edgeone.md
│   └── environments.md
└── templates/          # 配置模板
    ├── .env.example
    └── _headers
```

## 部署平台

- **Vercel**: 主要部署平台，使用 [deploy/vercel/](file:///workspace/deploy/vercel/)
- **腾讯云 EdgeOne Pages**: 备用部署平台，使用 [deploy/edgeone/](file:///workspace/deploy/edgeone/)

## 快速开始

### Vercel 部署

1. 复制配置文件到项目根目录：

```bash
cp deploy/vercel/vercel.json ./
```

2. 部署到 Vercel：

```bash
vercel
```

### EdgeOne Pages 部署

1. 复制配置文件到项目根目录：

```bash
cp deploy/edgeone/edgeone-pages.config.json ./
```

2. 部署到 EdgeOne Pages：

```bash
eo deploy
```

## 相关文档

- [Vercel 部署指南](docs/vercel.md)
- [EdgeOne Pages 部署指南](docs/edgeone.md)
- [环境配置规范](docs/environments.md)

---

**版本**: v3.4.0
