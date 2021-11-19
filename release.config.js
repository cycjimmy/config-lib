/* eslint no-template-curly-in-string: "off" */

module.exports = {
  dryRun: false,
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/exec', {
      prepareCmd: 'npm run package',
    }],
    ['@semantic-release/npm', {
      pkgRoot: 'dist',
    }],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: [
          'package.json',
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};
