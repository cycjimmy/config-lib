/* eslint no-template-curly-in-string: "off" */

import type { SemanticReleaseConfig, SemanticReleasePluginConfig } from '../15.x/makeConfig.js'

export interface MakeConfigWithPgkRootForLibraryOptions {
  changelog?: boolean
  changelogFile?: string
  exec?: boolean
  execOptions?: Record<string, unknown>
  npmOptions?: Record<string, unknown>
  githubOptions?: Record<string, unknown>
  git?: boolean
  gitAssets?: string[]
}

function makeConfigWithPgkRootForLibrary({
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
}: MakeConfigWithPgkRootForLibraryOptions = {}): SemanticReleaseConfig {
  const changelogSetting: SemanticReleasePluginConfig[] = changelog
    ? [
        [
          '@semantic-release/changelog',
          {
            changelogFile,
          },
        ],
      ]
    : []

  const execSetting: SemanticReleasePluginConfig[] = exec
    ? [
        ['@semantic-release/exec', execOptions],
      ]
    : []

  const npmSetting: SemanticReleasePluginConfig[] = [
    ['@semantic-release/npm', npmOptions],
  ]

  const githubSetting: SemanticReleasePluginConfig[] = [
    ['@semantic-release/github', githubOptions],
  ]

  const gitSetting: SemanticReleasePluginConfig[] = git
    ? [
        [
          '@semantic-release/git',
          {
            assets: gitAssets,
            message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
          },
        ],
      ]
    : []

  return {
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      ...changelogSetting,
      [
        '@semantic-release/npm',
        {
          npmPublish: false,
        },
      ],
      ...execSetting,
      ...npmSetting,
      ...githubSetting,
      ...gitSetting,
    ],
  }
}

export default makeConfigWithPgkRootForLibrary
