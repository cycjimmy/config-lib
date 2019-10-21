const makeConfig = require("./makeConfig");

/**
 * makeCommonConfig
 * @param githubOptions
 * @param gitAssets
 * @returns {{plugins: *[]}}
 */
module.exports = ({
                    githubOptions,
                    gitAssets = [
                      "docs/CHANGELOG.md",
                      "package.json",
                      "package-lock.json"
                    ],
                  }) => makeConfig({
  githubOptions,
  git: true,
  gitAssets,
  changelog: true,
  changelogFile: "docs/CHANGELOG.md"
});
