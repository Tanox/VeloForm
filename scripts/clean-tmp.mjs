// 文件路径: scripts/clean-tmp.mjs v4.4.11
// 清空 .tmp/ 临时目录内容（保留 .tmp 目录本身），用于回收一次性文件与临时构建产物。
// 用法：npm run clean:tmp
import { existsSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const TEMP_ROOT = join(ROOT, '.tmp');

/** 统计目录体积（MB），用于输出清理摘要 */
function dirSizeMB(dir) {
  let total = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      total += dirSizeMB(full);
    } else {
      try {
        total += statSync(full).size;
      } catch {
        // 文件可能已被其他进程删除，忽略即可
      }
    }
  }
  return total;
}

/** 删除 .tmp/ 下的单个条目，失败仅告警并计入失败数 */
function removeEntry(entryPath) {
  try {
    rmSync(entryPath, { recursive: true, force: true });
    return true;
  } catch (error) {
    console.warn(`[clean-tmp] 删除失败 ${relative(ROOT, entryPath)}：${error.message}`);
    return false;
  }
}

function main() {
  if (!existsSync(TEMP_ROOT)) {
    console.log('[clean-tmp] .tmp/ 不存在，无需清理');
    return;
  }

  const entries = readdirSync(TEMP_ROOT);
  if (entries.length === 0) {
    console.log('[clean-tmp] .tmp/ 已是空目录');
    return;
  }

  const sizeMB = dirSizeMB(TEMP_ROOT).toFixed(1);
  let failed = 0;
  for (const entry of entries) {
    if (!removeEntry(join(TEMP_ROOT, entry))) failed += 1;
  }

  console.log(
    `[clean-tmp] 已清理 ${entries.length - failed}/${entries.length} 个条目，释放约 ${sizeMB}MB`
  );
  if (failed > 0) {
    console.warn('[clean-tmp] 存在删除失败的条目，可能被进程占用，请稍后重试');
    process.exitCode = 1;
  }
}

main();
