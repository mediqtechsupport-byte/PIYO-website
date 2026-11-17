import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const stageDir = path.join(os.tmpdir(), 'piyo-gh-pages-deploy');

if (!fs.existsSync(distDir)) {
  console.error('dist/ folder not found. Run "npm run build" first.');
  process.exit(1);
}

fs.rmSync(stageDir, { recursive: true, force: true });
fs.cpSync(distDir, stageDir, { recursive: true });
fs.writeFileSync(path.join(stageDir, '.nojekyll'), '');

const remoteUrl = execFileSync(
  'git',
  ['-C', rootDir, 'remote', 'get-url', 'origin'],
  { encoding: 'utf8' }
).trim();

const runGit = (args) =>
  execFileSync('git', ['-C', stageDir, ...args], { stdio: 'inherit' });

runGit(['init', '-b', 'gh-pages']);
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

fs.rmSync(stageDir, { recursive: true, force: true });
console.log('Published dist/ to gh-pages successfully.');
