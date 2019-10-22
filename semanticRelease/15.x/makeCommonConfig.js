const makeConfig = require("./makeConfig");

/**
 * makeCommonConfig
 * @param changelogFile
 * @param exec
 * @param execOptions
 * @param githubOptions
 * @param gitAssets
 * @returns {{plugins: string[]}}
 */
module.exports = ({
                    changelogFile = "docs/CHANGELOG.md",
                    exec = false,
                    execOptions = {},
                    githubOptions,
                    gitAssets = [
                      "docs/CHANGELOG.md",
                      "package.json",
                      "package-lock.json"
                    ]
                  } = {}) => makeConfig({
  changelog: true,
  changelogFile,
  exec,
  execOptions,
  githubOptions,
  git: true,
  gitAssets,
});
