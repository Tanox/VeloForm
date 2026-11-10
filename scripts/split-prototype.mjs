// 文件路径: scripts/split-prototype.mjs v4.4.9
// 将单文件高保真原型拆为 <=185 行的模块：CSS 分片 / 交互脚本 / HTML 片段。
// 片段以同步 document.write 注入，保持 file:// 下双击 prototype.html 即可预览。
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'prototype/prototype.html';
const MAX = 185;
const VERSION = 'v4.4.9';
const STYLES = 'prototype/styles';
const SCRIPTS = 'prototype/scripts';
const PARTS = 'prototype/parts';

function scan(line, state) {
  for (let i = 0; i < line.length; i += 1) {
    const c = line[i];
    const n = line[i + 1];
    if (state.comment) {
      if (c === '*' && n === '/') {
        state.comment = false;
        i += 1;
      }
    } else if (state.quote) {
      if (c === state.quote && line[i - 1] !== '\\') state.quote = null;
    } else if (c === '/' && n === '*') {
      state.comment = true;
      i += 1;
    } else if (c === '"' || c === "'") {
      state.quote = c;
    } else if (c === '{') state.depth += 1;
    else if (c === '}') state.depth -= 1;
  }
}

function chunkCss(text) {
  const blocks = [];
  let cur = [];
  const state = { depth: 0, comment: false, quote: null };
  text.split(/\r?\n/).forEach((line) => {
    cur.push(line);
    scan(line, state);
    if (state.depth === 0 && !state.comment && (/}\s*$/.test(line.trim()) || cur.length >= MAX)) {
      blocks.push(cur);
      cur = [];
    }
  });
  if (cur.length) blocks.push(cur);

  // 超大 @media 块按内部子规则拆成多个同条件块
  const expanded = [];
  blocks.forEach((block) => {
    const hi = block.findIndex((line) => line.trim());
    const header = (block[hi] || '').trim();
    if (block.length <= MAX - 4 || !/^@media\b/.test(header) || !header.endsWith('{')) {
      expanded.push(block);
      return;
    }
    const subs = [];
    let sub = [];
    const innerState = { depth: 0, comment: false, quote: null };
    block.slice(hi + 1, -1).forEach((line) => {
      sub.push(line);
      scan(line, innerState);
      if (innerState.depth === 0 && !innerState.comment && /}\s*$/.test(line.trim())) {
        subs.push(sub);
        sub = [];
      }
    });
    if (sub.some((line) => line.trim())) subs.push(sub);
    let group = [];
    let count = 0;
    const flush = () => {
      expanded.push([block[hi], ...group.flatMap((item) => [...item, '']), '}']);
      group = [];
      count = 0;
    };
    subs.forEach((item) => {
      if (group.length && count + item.length + 1 > MAX - 4) flush();
      group.push(item);
      count += item.length + 1;
    });
    if (group.length) flush();
  });

  const chunks = [];
  let group = [];
  let count = 0;
  const pack = () => {
    chunks.push(group.flatMap((block, index) => (index ? ['', ...block] : block)).join('\n'));
    group = [];
    count = 0;
  };
  expanded.forEach((block) => {
    if (group.length && count + block.length + 1 > MAX) pack();
    group.push(block);
    count += block.length + 1;
  });
  if (group.length) pack();
  return chunks;
}

function chunkHtml(text) {
  const chunks = [];
  let cur = [];
  text.split(/\r?\n/).forEach((line) => {
    // 优先在语义区块注释处切分，避免切断结构
    if (cur.length > MAX - 30 && /^\s*<!--/.test(line)) {
      chunks.push(cur.join('\n'));
      cur = [];
    }
    cur.push(line);
    if (cur.length >= MAX - 4) {
      chunks.push(cur.join('\n'));
      cur = [];
    }
  });
  if (cur.some((line) => line.trim())) chunks.push(cur.join('\n'));
  return chunks;
}

const html = readFileSync(SRC, 'utf8');
if (html.includes('<!-- 原型入口')) {
  console.log('原型已是拆分后的入口，跳过');
  process.exit(0);
}
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!styleMatch || !scriptMatch) throw new Error('未找到 <style> 或 <script> 区块');

[STYLES, SCRIPTS, PARTS].forEach((dir) => {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
});

const cssNames = [];
chunkCss(styleMatch[1]).forEach((content, index) => {
  const name = `part-${String(index + 1).padStart(2, '0')}.css`;
  writeFileSync(
    join(STYLES, name),
    `/* 文件路径: ${STYLES}/${name} ${VERSION} — 由 scripts/split-prototype.mjs 生成 */\n${content}\n`,
    'utf8'
  );
  cssNames.push(name);
});

const scriptName = 'prototype.js';
writeFileSync(
  join(SCRIPTS, scriptName),
  `// 文件路径: ${SCRIPTS}/${scriptName} ${VERSION} — 由 scripts/split-prototype.mjs 生成\n${scriptMatch[1].trim()}\n`,
  'utf8'
);

const bodyStart = html.indexOf('<body>') + '<body>'.length;
const bodyEnd = html.indexOf('</body>');
const bodyHtml = html
  .slice(bodyStart, bodyEnd)
  .replace(scriptMatch[0], '')
  .replace(/^\s*\n/, '');
const partNames = [];
chunkHtml(bodyHtml).forEach((content, index) => {
  const name = `part-${String(index + 1).padStart(2, '0')}.js`;
  const escaped = content.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  writeFileSync(
    join(PARTS, name),
    `// 文件路径: ${PARTS}/${name} ${VERSION} — 由 scripts/split-prototype.mjs 生成\ndocument.write(\`${escaped}\`);\n`,
    'utf8'
  );
  partNames.push(name);
});

const head = html.slice(0, html.indexOf('<style>'));
const entry = [
  head.trimEnd(),
  '  <!-- 原型入口：样式/片段/脚本按职责拆分，顺序与拆分前一致，请勿手工调整顺序 -->',
  ...cssNames.map((name) => `  <link rel="stylesheet" href="styles/${name}" />`),
  '</head>',
  '<body>',
  ...partNames.map((name) => `  <script src="parts/${name}"></script>`),
  `  <script src="scripts/${scriptName}"></script>`,
  '</body>',
  '</html>',
  '',
].join('\n');
writeFileSync(SRC, entry, 'utf8');
console.log(
  `原型拆分完成：CSS ${cssNames.length} 片、HTML 片段 ${partNames.length} 个、入口 ${entry.split('\n').length} 行`
);
