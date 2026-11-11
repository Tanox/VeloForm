// 文件路径: scripts/check-lines.mjs v4.4.9
// 行数门禁：所有源码文件（含样式/原型/脚本/SQL）单文件不得超过 200 行。
// 用法：node scripts/check-lines.mjs（存在超长文件时退出码 1，可接入 CI 首步）
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOTS = ['src', 'prototype', 'scripts', 'supabase'];
const EXTENSIONS = new Set(['.ts', '.tsx', '.js', '.jsx', '.mjs', '.css', '.html', '.sql']);
const IGNORED_DIRS = new Set(['node_modules', '.next', '.tmp', 'dist', 'reports', 'coverage']);
const MAX_LINES = 200;

const overLimit = [];
const stack = [...ROOTS];
while (stack.length) {
  const dir = stack.pop();
  let entries = [];
  try {
    entries = readdirSync(dir);
  } catch {
    continue;
  }
  for (const name of entries) {
    const target = join(dir, name);
    if (!statSync(target).isDirectory()) {
      const dot = name.lastIndexOf('.');
      if (dot < 0 || !EXTENSIONS.has(name.slice(dot))) continue;
      const lines = readFileSync(target, 'utf8').split(/\r?\n/).length;
      if (lines > MAX_LINES) overLimit.push(`${target} (${lines} 行)`);
    } else if (!IGNORED_DIRS.has(name)) {
      stack.push(target);
    }
  }
}

overLimit.sort();
console.log(`OVER_${MAX_LINES}_COUNT=${overLimit.length}`);
if (overLimit.length) {
  console.log(overLimit.join('\n'));
  process.exit(1);
}
