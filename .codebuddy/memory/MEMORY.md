# Veloform 项目记忆

> 项目：Veloform（Next.js 14 + React 18 + TypeScript + Tailwind + Supabase + Zustand）
> 当前版本：v4.4.1（main 分支）

## 关键架构与约定
- 字体：使用系统字体栈（SF Pro 等），由 `globals.css` 的 `--font-display`/`--font-sans` 定义。**不依赖 next/font/google**（离线/CI 稳健），对齐 prototype/design-system-spec.md。
- i18n：en + zh-CN，44 个语言文件，`src/lib/i18n/index.ts` 用 `satisfies Translations` 编译期保证键对齐。运行时版本常量在 `src/lib/constants/app.ts`。
- 测试：vitest 3.x（^3.2），pool=threads，配置 `vitest.config.ts`。测试文件用静态 import（vitest 3 ESM 不支持 require 加载 .ts）。
- 安全：Supabase anon key 属常态暴露（RLS 兜底），configurations 表仅所有者可读写（无 IDOR）。

## 环境注意
- Node 版本 26.x。vitest 1.x 在此环境无法运行测试（需 3.x）。
- 命令执行工具会 skip 预判耗时的命令（tsc/build/npm install 前台）。关键长命令用后台 detached node 脚本 + 结果文件方式执行。
- 项目历史上 package.json 等文件曾被写入 UTF-8 BOM，已修复（v4.4.1）；若 build 报 `Unexpected token` 优先排查 BOM。

## 版本发布
- 版本规则：每次修改 bump patch（x.y.Z+1）；同步位置见各文件头部注释、package.json、README.md/README_EN.md、openspec/SPEC.md、CHANGELOG.md。
- 主要分支：main（生产）、dev（独立）。
