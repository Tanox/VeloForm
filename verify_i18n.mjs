import fs from 'node:fs';
import path from 'node:path';

const areas = [
  'about', 'app', 'bikeTypes', 'categories', 'common', 'compare',
  'componentDetail', 'configurator', 'cta', 'error', 'features', 'footer',
  'hero', 'library', 'loading', 'nav', 'notFound', 'onboarding',
  'pricing', 'recommended', 'share', 'support',
];

function readObj(file) {
  let src = fs.readFileSync(file, 'utf8');
  src = src.replace(/^export const \w+ = /, '');
  src = src.replace(/;\s*$/, '');
  src = src.replace(/ satisfies \w+/, '');
  return new Function('return (' + src + ')')();
}

function keysOf(obj, prefix = '') {
  if (obj === null || typeof obj !== 'object') return [prefix];
  if (Array.isArray(obj)) return obj.flatMap((el, i) => keysOf(el, prefix + '[' + i + ']'));
  return Object.keys(obj).flatMap((k) => keysOf(obj[k], prefix ? prefix + '.' + k : k));
}

let ok = true;
for (const a of areas) {
  const en = readObj(path.join('src/lib/i18n/locales/en', a + '.ts'));
  const ja = readObj(path.join('src/lib/i18n/locales/ja', a + '.ts'));
  const ek = keysOf(en).sort();
  const jk = keysOf(ja).sort();
  const miss = ek.filter((k) => !jk.includes(k));
  const extra = jk.filter((k) => !ek.includes(k));
  if (miss.length || extra.length) {
    ok = false;
    console.log(`[${a}] MISMATCH missing:`, miss, 'extra:', extra);
  } else {
    console.log(`[${a}] OK (${ek.length} keys)`);
  }
}
console.log(ok ? 'ALL_MATCH' : 'MISMATCH_FOUND');
