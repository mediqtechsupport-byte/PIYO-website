import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('dist/ folder not found. Run "npm run build" first.');
  process.exit(1);
}

const stageDir = path.join(rootDir, '.gh-pages-stage');
if (fs.existsSync(stageDir)) {
  fs.rmSync(stageDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 250 });
}
fs.mkdirSync(stageDir, { recursive: true });

const remoteUrl = execFileSync(
  'git',
  ['-C', rootDir, 'remote', 'get-url', 'origin'],
  { encoding: 'utf8' }
).trim();

const runGit = (args) =>
  execFileSync('git', ['-C', stageDir, ...args], { stdio: 'inherit' });

try {
  fs.cpSync(distDir, stageDir, { recursive: true });
  fs.writeFileSync(path.join(stageDir, '.nojekyll'), '');

  // Clean /kitchen/ entry URL redirecting to ../#kitchen so relative assets resolve properly on GitHub Pages
  const kitchenDir = path.join(stageDir, 'kitchen');
  fs.mkdirSync(kitchenDir, { recursive: true });
  fs.writeFileSync(
    path.join(kitchenDir, 'index.html'),
    `<!doctype html><html lang="en"><head><meta charset="utf-8" /><title>PIYO Live Kitchen &amp; Cashier</title><meta http-equiv="refresh" content="0; url=../#kitchen" /><script>window.location.replace('../#kitchen');</script></head><body style="background:#061009;color:#FAF6EC;font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0"><a href="../#kitchen" style="color:#DFB96F">Opening PIYO Live Kitchen…</a></body></html>`
  );

  runGit(['init', '-b', 'gh-pages']);
  runGit(['config', 'core.autocrlf', 'false']);
  runGit(['config', 'core.fsync', 'none']);
  runGit(['config', 'gc.auto', '0']);
  runGit(['config', 'user.name', 'mediqtechsupport-byte']);
  runGit([
    'config',
    'user.email',
    'mediqtechsupport-byte@users.noreply.github.com',
  ]);
  runGit(['add', '-A']);
  runGit(['commit', '-m', 'Update live GitHub Pages site']);
  runGit(['remote', 'add', 'origin', remoteUrl]);
  runGit(['push', '-f', 'origin', 'gh-pages']);

  console.log('Published dist/ to gh-pages successfully.');
} finally {
  fs.rmSync(stageDir, {
    recursive: true,
    force: true,
    maxRetries: 3,
    retryDelay: 250,
  });
}
