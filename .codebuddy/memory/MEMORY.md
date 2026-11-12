# Veloform 项目记忆

> 项目：Veloform（Next.js 14.2 + React 18 + TypeScript + Tailwind + Supabase + Zustand）
> 当前版本：v4.4.11（main 分支，2026-11-12）

## 关键架构与约定

- 字体：系统字体栈（SF Pro 等），由 `src/app/styles/*` 的 `--font-display`/`--font-sans` 定义，**不依赖 next/font/google**（离线/CI 稳健）。
- 样式构建：`src/app/styles/*.css` 是已编译产物（含 `@layer`，无 `@tailwind` 指令），`postcss.config.mjs` 只启用 autoprefixer；若恢复 Tailwind 插件会触发 `@layer` 无匹配指令的构建错误。拆分脚本会校验分片大括号平衡。
- i18n：`en / zh-CN / ja` 三语，`src/lib/i18n/index.ts` 用 `satisfies Translations` 保证键对齐；语言切换 UI 覆盖三语，偏好存 localStorage 并做枚举校验。
- 版本单一来源：`package.json` → `next.config.mjs` 注入 `NEXT_PUBLIC_APP_VERSION` + `NEXT_PUBLIC_BUILD_ID`（10 位 yymmddhhmm）→ `src/lib/version.ts` → **页脚 `#footer-version`** 展示 `V{semver}· build {id}`；页眉/移动抽屉不得出现版本号。
- 认证：`AuthModal` 提供登录/注册/登出，会话由 `subscribeToAuthChanges` 同步到 user-store；未登录时保存明确降级为本地草稿并提示，RLS 要求 `auth.uid() = user_id`。
- 云端同步：`SyncProvider` 调用 `mergeConfigurations` 按 `updatedAt` 取新，本地独有草稿永不丢弃；加载失败保持本地数据；保存有模块级 in-flight 锁。
- 分享：`generateShareableLink` 使用 `encodeURIComponent(base64)`；`use-shared-config.ts` 负责解析、zod 校验、类型映射、保留其它 query/hash 并清理 `config` 参数。
- 超长源码拆分：`globals.css` 为入口，`src/app/styles/*.css` 为分片（`scripts/split-styles.mjs` 幂等生成）；`prototype.html` 为入口，`prototype/{styles,parts,scripts}` 为分片（`scripts/split-prototype.mjs`），片段用同步 `document.write` 保证 `file://` 可用。
- DOM id 统一 kebab-case（应用与原型），主要容器/关键元素均带语义化 id。
- 临时文件与产物目录：`.tmp/` 为**唯一临时目录**（一次性脚本 / 日志 / 探针 / 临时构建产物）；临时构建固定输出 `.tmp/next/build`（`npm run build:tmp`），`npm run clean:tmp` 统一回收；`next.config.mjs` 校验 `NEXT_DIST_DIR` 必须位于 `.tmp/` 下，越界直接抛错；`.next/` 为平台约定目录（Vercel / Cloudflare 依赖）保留，不再新增 `.next-*` 变体目录。
- 测试：vitest 3.x，`pool=forks`（Windows），`vitest.config.ts` 用 `coverage.include/exclude` 显式限定统计口径；测试文件静态 import。

## 环境注意

- 本机 Node 26.x；`npm install` 会触发 IDE Safe-Delete 批量删除护栏（node_modules ≥500 文件），**不要反复重试或改写等效删除**，需用户在 IDE 手动确认后执行。
- 长命令（tsc/lint/test/build）用后台 detached node 脚本 + `.tmp/*-out.txt` 结果文件轮询，前台常因耗时被跳过。
- 项目历史上 package.json 曾写入 UTF-8 BOM，已修复（v4.4.1）；build 报 `Unexpected token` 优先排查 BOM。
- Next 14.2.35 的 `writeConfigurationDefaults` 用**精确字符串**匹配 tsconfig `include` 中的 distDir/types 通配路径，不匹配即自动追加——故临时构建目录名必须固定为 `.tmp/next/build`，否则 tsconfig 会被自动改写并堆积历史路径（v4.4.11 前已堆积 3 条）。
- 2026-11-10 存在多会话并行改动同一仓库的情况；写文档/提交前必须重新 `git status` + `git log` + 实查版本号。

## 版本发布

- 规则：每次修改至少 bump 一次 patch；同步 `package.json`/`package-lock.json`、`README.md`/`README_EN.md` 版本展示位、`docs/SPEC.md`、`docs/tasks.md`、`CHANGELOG.md` 新增小节、页脚自动注入；**只有被改动文件**更新头注释版本，禁止全仓批量刷写，历史 CHANGELOG 版本不得改写。
- 规范文档位置（v4.4.7 起）：`docs/`（api/architecture/design/development/deployment/performance/security + 根级 SPEC.md/README.md/PROJECT_GUIDELINES.md/规范标准化.md/prototype-guide.md），`docs/README.md` 为规范索引；唯一任务单源为 `docs/tasks.md` + `docs/tasks-done.md` 归档。
- 主要分支：main（生产）、develop（集成）；远程 `https://github.com/Tanox/VeloForm.git`。
