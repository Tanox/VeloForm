import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const run = (cmd, args, outFile) =>
  new Promise((resolve) => {
    const log = [];
    const p = spawn(cmd, args, { cwd: process.cwd(), shell: true });
    p.stdout.on('data', (d) => log.push(d.toString()));
    p.stderr.on('data', (d) => log.push(d.toString()));
    p.on('close', (code) => {
      writeFileSync(outFile, `EXIT=${code}\n\n` + log.join(''), 'utf8');
      resolve();
    });
  });

await run('npx', ['tsc', '--noEmit'], 'review_tsc.txt');
await run('npm', ['run', 'lint'], 'review_lint.txt');
await run('npm', ['test'], 'review_test.txt');
await run('npm', ['audit', '--json'], 'review_audit.json');
writeFileSync('review_done.txt', 'done', 'utf8');
console.log('ALL DONE');
