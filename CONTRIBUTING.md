# Contributing
The repository is released under the MIT license, and follows a standard Github development process, using Github tracker for issues and merging pull requests into main.

## Development

```shell
$ npm ci
$ npm run lint:fix    # eslint 10 with @antfu/eslint-config
$ npm run type-check  # tsc --noEmit
$ npm test            # vitest
$ npm run package     # build dist/ and assemble .release/
```

### Sources

Every file under `src/` is a published entry point, and the build keeps that
one-to-one mapping in `dist/`. Adding a module therefore needs no build
configuration: create the `.ts` file, and `vite build` picks it up. Consumers
import it by path, with the `.js` extension:

```javascript
import myBanner from '@cycjimmy/config-lib/dist/chore/myBanner.js'
```

Relative imports inside `src/` must carry the `.js` extension as well, because
they are mirrored into the emitted declarations.

### Commit messages

[Conventional Commits](https://www.conventionalcommits.org/) drive the release:
`fix:` produces a patch and `feat:` a minor.

A major release needs a `BREAKING CHANGE:` footer. The `feat!:` shorthand alone
is not enough here: with the default `angular` preset of
`@semantic-release/commit-analyzer`, a subject-only `feat!:` commit matches no
release rule and is dropped instead of being treated as breaking.

```text
feat: migrate to an ESM-only distribution

BREAKING CHANGE: published entries moved from esm/** to dist/**, the cjs/**
artifacts are gone, and Node.js ^22.18.0 || >=24.11.0 is required.
```
