import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = 'src';
const ext = new Set(['.ts', '.tsx']);
const stack = [root];
const over = [];
while (stack.length) {
  const dir = stack.pop();
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) stack.push(p);
    else if (ext.has(p.slice(p.lastIndexOf('.')))) {
      const n = readFileSync(p, 'utf8').split('\n').length;
      if (n > 200) over.push(`${p} (${n} lines)`);
    }
  }
}
over.sort();
console.log('OVER_200_COUNT=' + over.length);
console.log(over.join('\n'));
