import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const getCommitType = (message: string): 'major' | 'minor' | 'patch' | null => {
  if (message.startsWith('feat!:')) return 'major';
  if (message.startsWith('feat:')) return 'minor';
  if (message.startsWith('fix:') || message.startsWith('perf:')) return 'patch';
  return null;
};

const getPackageFromCommit = (message: string): string | null => {
  const scope = message.match(/\((.*?)\)/)?.[1];
  return scope ? `@animation-ui/${scope}` : null;
};

const generateChangeset = (): void => {
  const lastCommit = execSync('git log -1 --pretty=%B').toString().trim();
  const type = getCommitType(lastCommit);
  const pkgName = getPackageFromCommit(lastCommit);

  if (!type || !pkgName) return;

  const changesetContent = `---
"${pkgName}": ${type}
---

${lastCommit}
`;

  const changesetDir = path.join(process.cwd(), '.changeset');
  const changesetFile = path.join(changesetDir, `${Date.now()}.md`);
  fs.writeFileSync(changesetFile, changesetContent);
};

generateChangeset();
