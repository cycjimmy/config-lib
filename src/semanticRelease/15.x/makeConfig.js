/* eslint no-template-curly-in-string: "off" */

/**
 * makeConfig
 * @param changelog
 * @param changelogFile
 * @param exec
 * @param execOptions
 * @param npmOptions
 * @param githubOptions
 * @param git
 * @param gitAssets
 * @returns {{plugins: string[]}}
 */
export default ({
  changelog = false,
  changelogFile,
  exec = false,
  execOptions = {},
  npmOptions = {},
  githubOptions = {},
  git = false,
  gitAssets,
} = {}) => {
  const plugins = [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
  ];

  if (changelog) {
    const changelogSetting = [
      '@semantic-release/changelog',
      {
        changelogFile,
      },
    ];

    plugins.push(changelogSetting);
  }

  if (exec) {
    const execSetting = ['@semantic-release/exec', execOptions];
    plugins.push(execSetting);
  }

  const npmSetting = ['@semantic-release/npm', npmOptions];
  const githubSetting = ['@semantic-release/github', githubOptions];
  plugins.push(
    npmSetting,
    githubSetting,
  );

  if (git) {
    const gitSetting = [
      '@semantic-release/git',
      {
        assets: gitAssets,
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ];

    plugins.push(gitSetting);
  }

  return {
    plugins,
  };
};
