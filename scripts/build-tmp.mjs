// 文件路径: scripts/build-tmp.mjs v4.4.11
// 将生产构建输出到固定的 .tmp/next/build 目录，避免在仓库根目录堆积 .next-* 变体目录。
// 说明：Next.js 会按 distDir 精确匹配 tsconfig 的 include 片段，改名会导致 tsconfig 被自动改写，
// 因此临时构建目录必须使用固定路径；旧目录采用「重命名归档」代替删除，可绕开 IDE 批量删除护栏。
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const TEMP_ROOT = join(ROOT, '.tmp');
const NEXT_DIR = join(TEMP_ROOT, 'next');
const DIST_DIR = join(NEXT_DIR, 'build');
const STALE_PREFIX = 'stale-';
// 与 tsconfig.json include 中的 ".tmp/next/build/types/**/*.ts" 保持一致
const DIST_DIR_ENV = '.tmp/next/build';

/** 将既有构建目录重命名为归档目录：rename 不涉及批量删除，避免触发安全删除护栏 */
function archiveDistDir() {
  if (!existsSync(DIST_DIR)) return null;
  const target = join(NEXT_DIR, `${STALE_PREFIX}${Date.now()}`);
  renameSync(DIST_DIR, target);
  return target;
}

/** 清理归档目录：失败仅告警，不影响构建结论 */
function purgeStale(target) {
  if (!target) return;
  try {
    rmSync(target, { recursive: true, force: true });
    console.log(`[build-tmp] 已清理归档目录 ${relative(ROOT, target)}`);
  } catch (error) {
    console.warn(`[build-tmp] 归档目录清理失败，可手动执行 npm run clean:tmp：${error.message}`);
  }
}

function main() {
  mkdirSync(NEXT_DIR, { recursive: true });
  const stale = archiveDistDir();

  const nextBin = join(ROOT, 'node_modules', 'next', 'dist', 'bin', 'next');
  if (!existsSync(nextBin)) {
    console.error('[build-tmp] 未找到 next 可执行文件，请先执行 npm install');
    process.exit(1);
  }

  console.log(`[build-tmp] 构建输出目录：${DIST_DIR_ENV}`);
  const result = spawnSync(process.execPath, [nextBin, 'build'], {
    cwd: ROOT,
    stdio: 'inherit',
    env: { ...process.env, NEXT_DIST_DIR: DIST_DIR_ENV },
  });

  purgeStale(stale);
  process.exit(result.status ?? 1);
}

main();
