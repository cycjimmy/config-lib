import type { MakeConfigOptions, SemanticReleaseConfig } from './makeConfig.js'

import makeConfig from './makeConfig.js'

// `changelog` and `git` are always on in this preset, so they are not part of
// the public options.
export type MakeCommonConfigOptions = Omit<MakeConfigOptions, 'changelog' | 'git'>

function makeCommonConfig({
  changelogFile = 'docs/CHANGELOG.md',
  exec = false,
  execOptions = {},
  npmOptions = {},
  githubOptions,
  gitAssets = [
    'docs/CHANGELOG.md',
    'package.json',
    'package-lock.json',
  ],
}: MakeCommonConfigOptions = {}): SemanticReleaseConfig {
  return makeConfig({
    changelog: true,
    changelogFile,
    exec,
    execOptions,
    npmOptions,
    githubOptions,
    git: true,
    gitAssets,
  })
}

export default makeCommonConfig
