import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const child = spawn(process.execPath, ['node_modules/vitest/vitest.mjs', 'run'], {
  cwd: process.cwd(),
  env: process.env,
  stdio: ['ignore', 'pipe', 'pipe'],
});

let out = '';
child.stdout.on('data', (d) => (out += d));
child.stderr.on('data', (d) => (out += d));
child.on('close', (code) => {
  writeFileSync('vitest_out.txt', `EXIT:${code}\n\n${out}`);
});
