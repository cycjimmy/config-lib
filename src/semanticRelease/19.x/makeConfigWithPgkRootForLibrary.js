/* eslint no-template-curly-in-string: "off" */

/**
 * makeConfigWithPgkRootForLibrary
 * @param changelog
 * @param changelogFile
 * @param exec
 * @param execOptions
 * @param npmOptions
 * @param githubOptions
 * @param git
 * @param gitAssets
 * @returns {{plugins: *[]}}
 */
export default ({
  changelog = true,
  changelogFile = 'docs/CHANGELOG.md',
  exec = true,
  execOptions = {
    prepareCmd: 'npm run package',
  },
  npmOptions = {
    pkgRoot: '.release',
  },
  githubOptions = {},
  git = true,
  gitAssets = [
    'docs/CHANGELOG.md',
    'package.json',
    'package-lock.json',
  ],
} = {}) => {
  const changelogSetting = changelog
    ? [
      [
        '@semantic-release/changelog',
        {
          changelogFile,
        },
      ],
    ]
    : [];

  const execSetting = exec
    ? [
      ['@semantic-release/exec', execOptions],
    ]
    : [];

  const npmSetting = [
    ['@semantic-release/npm', npmOptions],
  ];

  const githubSetting = [
    ['@semantic-release/github', githubOptions],
  ];

  const gitSetting = git
    ? [
      [
        '@semantic-release/git',
        {
          assets: gitAssets,
          message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        },
      ],
    ]
    : [];

  return {
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      ...changelogSetting,
      ['@semantic-release/npm', {
        npmPublish: false,
      }],
      ...execSetting,
      ...npmSetting,
      ...githubSetting,
      ...gitSetting,
    ],
  };
};
