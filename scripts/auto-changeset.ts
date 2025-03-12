import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const getVersionType = (commitMsg: string): string | null => {
  if (commitMsg.startsWith('feat!:')) return 'major';
  if (commitMsg.startsWith('feat:')) return 'minor';
  if (commitMsg.startsWith('fix:') || commitMsg.startsWith('perf:')) return 'patch';
  return null;
};

const getPackage = (commitMsg: string): string | null => {
  const scope = commitMsg.match(/\((.*?)\)/)?.[1];
  return scope === 'cli' ? '@ignix-ui/cli' : null;
};

const lastCommitMsg = execSync('git log -1 --pretty=%B').toString().trim();
const type = getVersionType(lastCommitMsg);
const pkg = getPackage(lastCommitMsg);

if (type && pkg) {
  const content = `---
"${pkg}": ${type}
---

${lastCommitMsg}`;

  fs.writeFileSync(path.join('.changeset', `${Date.now()}.md`), content);
}
