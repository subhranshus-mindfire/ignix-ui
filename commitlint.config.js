// eslint-disable-next-line no-undef
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [2, 'always', ['cli', 'registry', 'docs', 'poc', 'release']],
    'type-enum': [
      2,
      'always',
      [
        'feat', // minor version bump
        'fix', // patch version bump
        'docs', // no version bump
        'chore', // no version bump
        'style', // no version bump
        'refactor', // patch version bump
        'perf', // patch version bump
        'test', // no version bump
        'revert', // patch version bump
        'ci', // no version bump
        'build', // no version bump
      ],
    ],
    'scope-empty': [2, 'never'],
    'subject-case': [0],
    'body-max-line-length': [0],
    'footer-max-line-length': [0],
  },
};
