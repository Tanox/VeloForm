// 文件路径: scripts/split-styles.mjs v4.4.9
// 将超长 globals.css 按顶层 CSS 规则块拆分为 <=185 行的模块化分片。
// 幂等：重复执行会重建 src/app/styles/ 并重写入口，顺序与拆分前完全一致。
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
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
  // 块首可能带空行或注释，先定位真正的 at-rule 头
  const headerIndex = block.lines.findIndex((line) => line.trim() !== '');
  const prefix = block.lines.slice(0, headerIndex);
  const header = block.lines[headerIndex]?.trim() ?? '';
  if (!/^@(media|supports)\b/.test(header) || !header.endsWith('{')) return [block];
  if (!/}\s*$/.test(block.lines[block.lines.length - 1].trim())) return [block];

  const inner = block.lines.slice(headerIndex + 1, -1);
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
      block.lines[headerIndex],
      ...items.flatMap((sub) => [...sub, '']),
      '}',
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
const parsed = parseBlocks(lines);
const oversizedBefore = parsed.filter((block) => block.lines.length > MAX_LINES);
const blocks = parsed.flatMap((block) =>
  block.lines.length > MAX_LINES ? splitAtRuleBlock(block) : [block]
);
const oversizedAfter = blocks.filter((block) => block.lines.length > MAX_LINES);
console.log(
  `超大规则块：拆分前 ${oversizedBefore.length} 个，拆分后 ${oversizedAfter.length} 个`
);
if (oversizedAfter.length) {
  oversizedAfter.forEach((block) => {
    console.log(
      `  未拆分块 ${block.lines.length} 行，首行=${JSON.stringify(
        block.lines[0]
      )}，尾行=${JSON.stringify(block.lines[block.lines.length - 1])}`
    );
  });
}
const chunks = packChunks(blocks);
const counters = {};
const names = [];

rmSync(OUT_DIR, { recursive: true, force: true });
mkdirSync(OUT_DIR, { recursive: true });

chunks.forEach((chunk) => {
  const group = groupFor(chunk[0].startLine);
  counters[group] = (counters[group] || 0) + 1;
  const name = `${group}-${String(counters[group]).padStart(2, '0')}.css`;
  const body = chunk.map((block) => block.lines.join('\n')).join('\n\n');
  writeFileSync(
    join(OUT_DIR, name),
    `/* 文件路径: src/app/styles/${name} ${VERSION} — 由 scripts/split-styles.mjs 生成，请勿直接编辑 */\n${body}\n`,
    'utf8'
  );
  names.push(name);
});

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
