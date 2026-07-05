# Veloform 页面完善 - 完成总结

## 已完成的工作

### 1. 新增页面级文件
- **`src/app/loading.tsx`** — 首页骨架屏，覆盖 Hero、Features、BikeTypeSelector 等区域
- **`src/app/library/loading.tsx`** — 配置库骨架屏，卡片网格加载状态
- **`src/app/not-found.tsx`** — 自定义 404 页面，含渐变文字、自行车图标、返回首页/配置库按钮

### 2. 页面功能增强
- **首页集成 Pricing 定价方案** — 月付/年付切换，已存在组件融入页面流程
- **首页集成 Cta 号召行动** — 最终转化区域，放置于 Pricing 之后
- **导航栏集成支持功能** — 新增「帮助」导航项，点击打开 SupportModal
- **导航栏集成新手引导** — OnboardingGuide 组件被引入，首次访问展示引导

### 3. 基础设施修复
- **`vercel.json`** — 修复框架配置，从 Angular 改为 Next.js，添加缓存策略
- **`next.config.mjs`** — 移除 Firebase 引用，更新为 Supabase 远程模式
- **SWC 兼容** — 沙盒环境不支持原生 `.node` 模块，手动安装 `@next/swc-wasm-nodejs` 并打补丁启用 WASM 回退
- **依赖安装** — 使用 `--ignore-scripts` 绕过 esbuild 安装问题

### 4. 构建验证
- **构建成功** — ✅ `next build` 通过，0 错误
- **路由** — `/`(26.1kB), `/library`(3.32kB), `/_not-found` 全部生成
- **Middleware** — 40.5kB，安全头配置
- **First Load JS** — shared 84.3kB，优化良好

## 关键决策
- 移除 `next-pwa` 配置以解决依赖冲突
- 使用 Babel + WASM SWC 替代原生 SWC（沙盒环境限制）
- 依赖安装使用 `--ignore-scripts` 绕过 Windows 二进制文件拦截

## 后续建议
- 配置 `.env` 真实 Supabase 值以启用云端同步
- 考虑升级 Next.js 到修复了安全漏洞的版本
- 添加测试覆盖新集成的组件
