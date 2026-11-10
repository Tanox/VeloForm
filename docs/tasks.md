# Veloform 任务清单（进行中 / 待办）

> **派生来源**：`docs/design/design-review.md`（P0–P3 优化建议）+ OpenSpec 规范对齐
> **最后更新**：2026-11-10
> **当前版本**：v4.4.8
> **说明**：本清单由 OpenSpec 派生，已完成的任务已归档至 [`tasks-done.md`](./tasks-done.md)。

## 优先级约定

| 优先级 | 含义 |
| :--- | :--- |
| P0 | 核心体验，应立即处理 |
| P1 | 高优先级，显著提升体验 |
| P2 | 中优先级，锦上添花 |
| P3 | 低优先级，长期优化 |

## 进行中 / 待办任务

| ID | 任务 | 优先级 | 状态 | 说明 |
| :--- | :--- | :--- | :--- | :--- |
| — | 全部任务已完成 | — | 已完成 | 派生自 OpenSpec 的全部 18 项任务（T-01 ~ T-18）均已交付并归档至 `tasks-done.md` |

## 状态说明

- 本轮（2026-10-14，v4.4.5）完成 T-16：新增日语（ja）语言包，i18n 扩展至 en / zh-CN / ja 三语，并修正 `app.ts` 展示版本漂移（4.4.1 → 4.4.5）。
- 累计已完成 T-01 ~ T-18 共 18 项由 OpenSpec 派生的任务，完成率 100%。

## 维护轮次记录

- **2026-11-10（v4.4.8）代码健壮性与规范对齐轮次**：
  - 修复云端保存异常被吞并恒报“保存成功”的静默数据丢失；分享链接生成端做 `encodeURIComponent`、首页新增 `?config=` 消费端；SQL 加固迁移修正 `DROP` 策略名以保证全新库部署幂等。
  - 修复推荐配置（MTB/Fold）总价硬编码与组件明细不符；Navbar 语言切换后导航刷新；Supabase 配置校验补齐 anon key；`config-history` 快照读取校验；保存期间禁用按钮防并发写入。
  - 为导航栏、页脚、车型选择器、推荐配置区、分享弹窗等补充语义化 id；原型 `prototype.html` 的 id 统一为 kebab-case 并与代码侧对齐。
  - 同步 `SPEC.md`/`README`/`README_EN` 仓库地址（Tanox/VeloForm）、语言列表（EN/ZH-CN/JA）、Next 版本（14.2.35）；`APP_INFO.version` 与 `package.json` 对齐至 4.4.8；重新生成 `package-lock.json` 以匹配依赖版本。
  - 类型检查、104 项测试、ESLint 门禁均通过；详见 `CHANGELOG.md`。
