import { execSync } from 'child_process';
import fs from 'fs';

// Get the most recent commit message
const commitMessage = execSync('git log -1 --format=%s').toString().trim();

console.log(`📝 Processing commit message: "${commitMessage}"`);

// Define valid scopes
const validScopes = [
  'cli',
  'docs',
  'release',
  'registry',
  'poc',
];

// Define regex patterns
const commitPatterns = {
  major: /^BREAKING CHANGE: (.+)/,
  minor: /^feat\(([^)]+)\): (.+)/,
  patch: /^fix\(([^)]+)\): (.+)/,
  docs: /^docs\(([^)]+)\): (.+)/,
  chore: /^chore\(([^)]+)\): (.+)/,
  style: /^style\(([^)]+)\): (.+)/,
  refactor: /^refactor\(([^)]+)\): (.+)/,
  perf: /^perf\(([^)]+)\): (.+)/,
  test: /^test\(([^)]+)\): (.+)/,
};

// Identify type, package, and description
let packageScope = null;
let changeType = null;
let description = null;

// Check for breaking changes first
if (commitPatterns.major.test(commitMessage)) {
  changeType = 'major';
  description = commitMessage.match(commitPatterns.major)?.[1];
  console.log('🚨 Breaking change detected');
} else if (commitPatterns.minor.test(commitMessage)) {
  const scope = commitMessage.match(commitPatterns.minor)?.[1];
  if (validScopes.includes(scope)) {
    changeType = 'minor';
    packageScope = scope;
    description = commitMessage.match(commitPatterns.minor)?.[2];
    console.log(`✨ Feature detected for scope: ${scope}`);
  }
} else if (commitPatterns.patch.test(commitMessage)) {
  const scope = commitMessage.match(commitPatterns.patch)?.[1];
  if (validScopes.includes(scope)) {
    changeType = 'patch';
    packageScope = scope;
    description = commitMessage.match(commitPatterns.patch)?.[2];
    console.log(`🐛 Fix detected for scope: ${scope}`);
  }
} else {
  // Check other patterns for patch releases
  for (const [patternName, pattern] of Object.entries(commitPatterns)) {
    if (patternName === 'major' || patternName === 'minor' || patternName === 'patch') continue;
    
    if (pattern.test(commitMessage)) {
      const scope = commitMessage.match(pattern)?.[1];
      if (validScopes.includes(scope)) {
        changeType = 'patch';
        packageScope = scope;
        description = commitMessage.match(pattern)?.[2];
        console.log(`${patternName} change detected for scope: ${scope}`);
        break;
      }
    }
  }
}

// Generate and write changeset if valid package found
if (packageScope) {
  packageScope = packageScope.trim();
  description = description?.trim() || 'No description provided.';

  // Determine the full package name based on scope
  const packageName =
    packageScope === 'cli' || packageScope === 'release'
      ? '@mindfiredigital/ignix-ui'
      : `@mindfiredigital/ignix-ui-${packageScope}`;

  // Generate changeset content
  const changesetContent = `---
'${packageName}': ${changeType}
---
${description}
`;

  // Create .changeset directory if it doesn't exist
  if (!fs.existsSync('.changeset')) {
    fs.mkdirSync('.changeset', { recursive: true });
  }

  // Write to a changeset file
  const filename = `auto-${Date.now()}.md`;
  fs.writeFileSync(`.changeset/${filename}`, changesetContent);
  console.log(`✅ Changeset file created: .changeset/${filename}`);
  console.log(`📦 Package: ${packageName}`);
  console.log(`🔢 Type: ${changeType}`);
  console.log(`📝 Description: ${description}`);
} else {
  console.log('⚠️ No valid package scope found in commit message.');
  console.log('Valid scopes are:', validScopes.join(', '));
  console.log('Valid commit patterns:');
  console.log('- feat(scope): description');
  console.log('- fix(scope): description');
  console.log('- docs(scope): description');
  console.log('- chore(scope): description');
  console.log('- style(scope): description');
  console.log('- refactor(scope): description');
  console.log('- perf(scope): description');
  console.log('- test(scope): description');
  console.log('- BREAKING CHANGE: description');
}
