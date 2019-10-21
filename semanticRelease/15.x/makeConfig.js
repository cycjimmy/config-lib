/**
 * makeConfig
 * @param npmOptions
 * @param githubOptions
 * @param git
 * @param gitAssets
 * @param changelog
 * @param changelogFile
 * @returns {{plugins: *[]}}
 */
module.exports = ({
                    npmOptions = {},
                    githubOptions = {},
                    git = false,
                    gitAssets,
                    changelog = false,
                    changelogFile,
                  }) => {

  const _plugins = [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/npm", npmOptions],
    ["@semantic-release/github", githubOptions],
  ];

  if (git) {
    const gitSetting = [
      "@semantic-release/git",
      {
        "assets": gitAssets,
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ];

    _plugins.push(gitSetting);
  }

  if (changelog) {
    const changelogSetting = [
      "@semantic-release/changelog",
      {
        "changelogFile": changelogFile
      }
    ];

    _plugins.push(changelogSetting);
  }

  return {
    "plugins": _plugins
  };
};
