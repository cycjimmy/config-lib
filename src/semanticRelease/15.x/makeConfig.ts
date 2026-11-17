/* eslint no-template-curly-in-string: "off" */

// A semantic-release plugin entry: either a bare plugin name or a name with
// options.
export type SemanticReleasePluginConfig = string | [string, Record<string, unknown>]

export interface SemanticReleaseConfig {
  plugins: SemanticReleasePluginConfig[]
}

export interface MakeConfigOptions {
  changelog?: boolean
  changelogFile?: string
  exec?: boolean
  execOptions?: Record<string, unknown>
  npmOptions?: Record<string, unknown>
  githubOptions?: Record<string, unknown>
  git?: boolean
  gitAssets?: string[]
}

function makeConfig({
  changelog = false,
  changelogFile,
  exec = false,
  execOptions = {},
  npmOptions = {},
  githubOptions = {},
  git = false,
  gitAssets,
}: MakeConfigOptions = {}): SemanticReleaseConfig {
  const plugins: SemanticReleasePluginConfig[] = [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
  ]

  if (changelog) {
    const changelogSetting: SemanticReleasePluginConfig = [
      '@semantic-release/changelog',
      {
        changelogFile,
      },
    ]

    plugins.push(changelogSetting)
  }

  if (exec) {
    const execSetting: SemanticReleasePluginConfig = ['@semantic-release/exec', execOptions]
    plugins.push(execSetting)
  }

  const npmSetting: SemanticReleasePluginConfig = ['@semantic-release/npm', npmOptions]
  const githubSetting: SemanticReleasePluginConfig = ['@semantic-release/github', githubOptions]
  plugins.push(
    npmSetting,
    githubSetting,
  )

  if (git) {
    const gitSetting: SemanticReleasePluginConfig = [
      '@semantic-release/git',
      {
        assets: gitAssets,
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ]

    plugins.push(gitSetting)
  }

  return {
    plugins,
  }
}

export default makeConfig
