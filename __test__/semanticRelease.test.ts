/* eslint no-template-curly-in-string: "off" */

import type { SemanticReleasePluginConfig } from '../src/semanticRelease/15.x/makeConfig.js'

import { describe, expect, it } from 'vitest'

import makeCommonConfig from '../src/semanticRelease/15.x/makeCommonConfig.js'
import makeConfig from '../src/semanticRelease/15.x/makeConfig.js'
import makeConfigWithPgkRootForLibrary from '../src/semanticRelease/19.x/makeConfigWithPgkRootForLibrary.js'

function pluginNames(plugins: SemanticReleasePluginConfig[]): string[] {
  return plugins.map(
    plugin => (Array.isArray(plugin)
      ? plugin[0]
      : plugin),
  )
}

function pluginOptions(plugins: SemanticReleasePluginConfig[], name: string): Record<string, unknown>[] {
  return plugins
    .filter((plugin): plugin is [string, Record<string, unknown>] => Array.isArray(plugin) && plugin[0] === name)
    .map(plugin => plugin[1])
}

describe('makeConfig', () => {
  it('only enables the analyzer and the notes generator by default', () => {
    const { plugins } = makeConfig()

    expect(pluginNames(plugins)).toEqual([
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/npm',
      '@semantic-release/github',
    ])
  })

  it('adds changelog, exec and git in that order when enabled', () => {
    const { plugins } = makeConfig({
      changelog: true,
      changelogFile: 'CHANGELOG.md',
      exec: true,
      execOptions: { prepareCmd: 'npm run build' },
      git: true,
      gitAssets: ['CHANGELOG.md'],
    })

    expect(pluginNames(plugins)).toEqual([
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      '@semantic-release/exec',
      '@semantic-release/npm',
      '@semantic-release/github',
      '@semantic-release/git',
    ])
    expect(pluginOptions(plugins, '@semantic-release/changelog')).toEqual([
      { changelogFile: 'CHANGELOG.md' },
    ])
    expect(pluginOptions(plugins, '@semantic-release/exec')).toEqual([
      { prepareCmd: 'npm run build' },
    ])
    expect(pluginOptions(plugins, '@semantic-release/git')).toEqual([
      {
        assets: ['CHANGELOG.md'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ])
  })
})

describe('makeCommonConfig', () => {
  it('always enables changelog and git with the default assets', () => {
    const { plugins } = makeCommonConfig()

    expect(pluginNames(plugins)).toEqual([
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      '@semantic-release/npm',
      '@semantic-release/github',
      '@semantic-release/git',
    ])
    expect(pluginOptions(plugins, '@semantic-release/changelog')).toEqual([
      { changelogFile: 'docs/CHANGELOG.md' },
    ])
    expect(pluginOptions(plugins, '@semantic-release/git')).toEqual([
      {
        assets: ['docs/CHANGELOG.md', 'package.json', 'package-lock.json'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ])
  })
})

describe('makeConfigWithPgkRootForLibrary', () => {
  it('publishes the .release directory with the expected plugin order', () => {
    const { plugins } = makeConfigWithPgkRootForLibrary()

    expect(pluginNames(plugins)).toEqual([
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      '@semantic-release/npm',
      '@semantic-release/exec',
      '@semantic-release/npm',
      '@semantic-release/github',
      '@semantic-release/git',
    ])
    // The first npm entry prepares the root package without publishing it, the
    // second one publishes the built package from `.release`.
    expect(pluginOptions(plugins, '@semantic-release/npm')).toEqual([
      { npmPublish: false },
      { pkgRoot: '.release' },
    ])
    expect(pluginOptions(plugins, '@semantic-release/exec')).toEqual([
      { prepareCmd: 'npm run package' },
    ])
  })

  it('drops the optional plugins when they are disabled', () => {
    const { plugins } = makeConfigWithPgkRootForLibrary({
      changelog: false,
      exec: false,
      git: false,
    })

    expect(pluginNames(plugins)).toEqual([
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/npm',
      '@semantic-release/npm',
      '@semantic-release/github',
    ])
  })
})
