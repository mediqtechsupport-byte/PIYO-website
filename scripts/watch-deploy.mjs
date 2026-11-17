import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const watchTargets = [
  path.join(rootDir, 'src'),
  path.join(rootDir, 'public'),
  path.join(rootDir, 'index.html'),
];

let timer = null;
let running = false;
let queued = false;

function runNode(args) {
  return spawnSync(process.execPath, args, {
    cwd: rootDir,
    stdio: 'inherit',
  });
}

function syncWebsite() {
  if (running) {
    queued = true;
    return;
  }
  running = true;
  const stamp = new Date().toLocaleTimeString();
  console.log(`\n[${stamp}] Detected local edit — building and deploying to GitHub Pages...`);

  try {
    const tscBin = path.join(rootDir, 'node_modules', 'typescript', 'bin', 'tsc');
    const viteBin = path.join(rootDir, 'node_modules', 'vite', 'bin', 'vite.js');
    const deployScript = path.join(rootDir, 'scripts', 'deploy-pages.mjs');

    const tc = runNode([tscBin, '-p', path.join(rootDir, 'tsconfig.json'), '--noEmit']);
    if (tc.status !== 0) {
      console.error('[auto-deploy] Typecheck failed; skipping deploy until fixed.');
      return;
    }
    const bd = runNode([viteBin, 'build']);
    if (bd.status !== 0) {
      console.error('[auto-deploy] Build failed; skipping deploy until fixed.');
      return;
    }
    const dp = runNode([deployScript]);
    if (dp.status === 0) {
      console.log('[auto-deploy] Live site updated at https://mediqtechsupport-byte.github.io/PIYO-website/');
    }
  } finally {
    running = false;
    if (queued) {
      queued = false;
      syncWebsite();
    }
  }
}

function scheduleSync(filename) {
  if (!filename) return;
  clearTimeout(timer);
  timer = setTimeout(syncWebsite, 3500);
}

for (const target of watchTargets) {
  if (!fs.existsSync(target)) continue;
  const stat = fs.statSync(target);
  fs.watch(
    target,
    { recursive: stat.isDirectory() },
    (_eventType, filename) => scheduleSync(filename || target)
  );
}

console.log('Watching src/, public/, and index.html for changes (auto-deploying to gh-pages on save)...');
