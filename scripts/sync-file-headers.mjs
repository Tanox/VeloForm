// 文件路径: scripts/sync-file-headers.mjs v4.4.9
// 仅为指定文件补齐 / 更新头注释版本，不扫描全仓，避免批量刷写历史文件。
// 用法：node scripts/sync-file-headers.mjs <version> <file...>
import { readFileSync, writeFileSync } from 'node:fs';

const [version, ...files] = process.argv.slice(2);
if (!version || files.length === 0) {
  console.error('用法：node scripts/sync-file-headers.mjs <version> <file...>');
  process.exit(1);
}
const marker = `v${version}`;
let updated = 0;

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const lines = source.split('\n');
  const head = lines.slice(0, 3).join('\n');
  const prefix = file.endsWith('.sql') ? '--' : '//';
  const header = `${prefix} 文件路径: ${file} ${marker}`;

  if (head.includes('文件路径:')) {
    // 已有头注释：原地替换旧版本号，保留后面的说明文字
    const index = lines.findIndex((line) => line.includes('文件路径:'));
    if (lines[index].includes(marker)) continue;
    lines[index] = lines[index].replace(/v\d+\.\d+\.\d+/, marker);
    writeFileSync(file, lines.join('\n'), 'utf8');
    updated += 1;
    continue;
  }

  writeFileSync(file, `${header}\n${source}`, 'utf8');
  updated += 1;
}
console.log(`已同步 ${updated} 个文件的头注释版本至 ${marker}`);
