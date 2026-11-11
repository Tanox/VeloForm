// 文件路径: scripts/split-styles.mjs v4.4.9
// 将超长 globals.css 按顶层规则块拆为 <=185 行模块；幂等，顺序与拆分前一致。
import { readFileSync, writeFileSync, mkdirSync, readdirSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'src/app/globals.css';
const OUT_DIR = 'src/app/styles';
const MAX_LINES = 185;
const VERSION = 'v4.4.9';

const BOUNDARIES = [
  [560, 'preflight'],
  [727, 'tokens'],
  [3032, 'utilities'],
  [Infinity, 'design-system'],
];

function groupFor(lineNo) {
  return BOUNDARIES.find(([max]) => lineNo < max)[1];
}

// 扫描一行中的注释/引号状态，避免把注释或字符串里的花括号计入层级
function scanLine(line, state) {
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const next = line[i + 1];
    if (state.inComment) {
      if (char === '*' && next === '/') {
        state.inComment = false;
        i += 1;
      }
      continue;
    }
    if (state.quote) {
      if (char === state.quote && line[i - 1] !== '\\') state.quote = null;
      continue;
    }
    if (char === '/' && next === '*') {
      state.inComment = true;
      i += 1;
      continue;
    }
    if (char === '"' || char === "'") {
      state.quote = char;
      continue;
    }
    if (char === '{') state.depth += 1;
    if (char === '}') state.depth -= 1;
  }
}

function parseBlocks(lines) {
  const blocks = [];
  let current = [];
  let startLine = 1;
  const state = { depth: 0, inComment: false, quote: null };
  lines.forEach((line, idx) => {
    if (current.length === 0) startLine = idx + 1;
    current.push(line);
    scanLine(line, state);
    const atTopLevel = state.depth === 0 && !state.inComment;
    const endsRule = /}\s*(\/\*.*\*\/\s*)?$/.test(line.trim());
    if (atTopLevel && (endsRule || current.length >= MAX_LINES)) {
      blocks.push({ lines: current, startLine });
      current = [];
    }
  });
  if (current.length) blocks.push({ lines: current, startLine });
  return blocks;
}

// 超大 at-rule 块（如 @media）内部拆成多个同条件的完整块，保持顺序与语义不变
function splitAtRuleBlock(block) {
  const lines = block.lines;
  // 精确定位 at-rule 头与闭合行，块前后的注释/空行都需保留
  const headerIndex = lines.findIndex(
    (line) => /^\s*@(media|supports|layer)\b/.test(line) && line.trim().endsWith('{')
  );
  if (headerIndex < 0) return [block];
  let closeIndex = -1;
  for (let i = lines.length - 1; i > headerIndex; i -= 1) {
    if (/}\s*$/.test(lines[i].trim())) {
      closeIndex = i;
      break;
    }
  }
  if (closeIndex < 0) return [block];

  const prefix = lines.slice(0, headerIndex);
  const inner = lines.slice(headerIndex + 1, closeIndex);
  const suffix = lines.slice(closeIndex + 1);
  const subBlocks = [];
  let current = [];
  const state = { depth: 0, inComment: false, quote: null };
  inner.forEach((line) => {
    current.push(line);
    scanLine(line, state);
    if (state.depth === 0 && !state.inComment && /}\s*$/.test(line.trim())) {
      subBlocks.push(current);
      current = [];
    }
  });
  if (current.some((line) => line.trim())) subBlocks.push(current);

  const limit = MAX_LINES - 4;
  const groups = [];
  let group = [];
  let lineCount = 0;
  subBlocks.forEach((sub) => {
    const size = sub.length + 1;
    if (group.length && lineCount + size > limit) {
      groups.push(group);
      group = [];
      lineCount = 0;
    }
    group.push(sub);
    lineCount += size;
  });
  if (group.length) groups.push(group);

  return groups.map((items, index) => ({
    lines: [
      ...(index === 0 ? prefix : []),
      lines[headerIndex],
      ...items.flatMap((sub) => [...sub, '']),
      '}',
      ...(index === groups.length - 1 ? suffix : []),
    ],
    startLine: block.startLine,
  }));
}

function packChunks(blocks) {
  const chunks = [];
  let current = [];
  let lineCount = 0;
  blocks.forEach((block) => {
    const size = block.lines.length + 1;
    if (current.length && lineCount + size > MAX_LINES) {
      chunks.push(current);
      current = [];
      lineCount = 0;
    }
    current.push(block);
    lineCount += size;
  });
  if (current.length) chunks.push(current);
  return chunks;
}

let source = readFileSync(SRC, 'utf8');
if (source.startsWith('/* 文件路径: src/app/globals.css')) {
  // 已是拆分入口时，从分片反向重组源内容，使重复执行可以重新平衡分片大小
  const names = [...source.matchAll(/@import '\.\/styles\/([^']+)';/g)].map((match) => match[1]);
  source = names
    .map((name) => readFileSync(join(OUT_DIR, name), 'utf8').replace(/^\/\*[^\n]*\*\/\n/, ''))
    .join('\n');
  console.log(`从 ${names.length} 个分片重组源内容，重新拆分`);
}

const lines = source.split(/\r?\n/);
const blocks = parseBlocks(lines).flatMap((block) =>
  block.lines.length > MAX_LINES ? splitAtRuleBlock(block) : [block]
);
const chunks = packChunks(blocks);
const counters = {};
const names = [];
// 不做递归删除：IDE 安全删除护栏会拦截目录批量删除，这里只覆盖写入
mkdirSync(OUT_DIR, { recursive: true });
chunks.forEach((chunk) => {
  const group = groupFor(chunk[0].startLine);
  counters[group] = (counters[group] || 0) + 1;
  const name = `${group}-${String(counters[group]).padStart(2, '0')}.css`;
  const body = chunk.map((block) => block.lines.join('\n')).join('\n\n');
  // 每个分片必须自闭合，否则浏览器/PostCSS 解析会失败
  const balance = { depth: 0, inComment: false, quote: null };
  body.split('\n').forEach((line) => scanLine(line, balance));
  if (balance.depth) throw new Error(`分片 ${name} 大括号不平衡 (${balance.depth})`);
  const banner = `/* 文件路径: src/app/styles/${name} ${VERSION} — 由 scripts/split-styles.mjs 生成 */\n`;
  writeFileSync(join(OUT_DIR, name), `${banner}${body}\n`, 'utf8');
  names.push(name);
});

// 旧分片移入 .tmp 暂存（不删除），避免残留未被入口引用的文件
const stale = readdirSync(OUT_DIR).filter((f) => f.endsWith('.css') && !names.includes(f));
if (stale.length) mkdirSync('.tmp/styles-old', { recursive: true });
stale.forEach((f) => renameSync(join(OUT_DIR, f), join('.tmp/styles-old', `${Date.now()}-${f}`)));

const entry = [
  `/* 文件路径: src/app/globals.css ${VERSION}`,
  ' * 全局样式入口：内容按职责拆分至 styles/，@import 顺序等价于拆分前的文件顺序，请勿调整。',
  ' * 重新拆分请运行：node scripts/split-styles.mjs',
  ' */',
  '',
  ...names.map((name) => `@import './styles/${name}';`),
  '',
].join('\n');
writeFileSync(SRC, entry, 'utf8');
console.log(`拆分完成：${names.length} 个分片，入口 ${entry.split('\n').length} 行`);
