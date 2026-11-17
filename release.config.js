/* eslint no-template-curly-in-string: "off" */

// Kept as JavaScript on purpose: semantic-release loads this file through
// cosmiconfig, whose TypeScript loader resolves `typescript` from the action's
// own install tree instead of this project's.
//
// The plugin list is spelled out here instead of importing this package's own
// `makeConfigWithPgkRootForLibrary`: the published modules only exist after
// `prepareCmd` has built them, which runs long after this file is loaded.
import process from 'node:process'

const config = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'docs/CHANGELOG.md',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'npm run package',
      },
    ],
    [
      '@semantic-release/npm',
      {
        pkgRoot: '.release',
      },
    ],
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        assets: [
          'docs/CHANGELOG.md',
          'package.json',
          'package-lock.json',
        ],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
}

// Publishing to npm uses trusted publishing (OIDC): the release workflow grants
// `id-token: write` and no NPM_TOKEN secret is read. Set SKIP_NPM_AUTH=true to
// skip npm credential verification (e.g., dry-run jobs that never publish), so
// verifyAuth never exchanges an OIDC token there. See @semantic-release/npm's
// `npmPublish` option.
if (process.env.SKIP_NPM_AUTH === 'true') {
  config.plugins = config.plugins.map((plugin) => {
    if (Array.isArray(plugin) && plugin[0] === '@semantic-release/npm' && plugin[1]?.pkgRoot) {
      return [
        plugin[0],
        { ...plugin[1], npmPublish: false },
      ]
    }

    return plugin
  })
}

export default config
