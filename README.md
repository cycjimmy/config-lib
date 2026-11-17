# config-lib
[![libraries sourcerank][libraries-sourcerank-image]][libraries-sourcerank-url]
[![Release date][release-date-image]][release-url]
[![semantic-release][semantic-image]][semantic-url]
[![npm license][license-image]][download-url]

Personal collection of configs.

Every entry is a standalone ES module, so you import exactly the one you need and
nothing else is evaluated. TypeScript declarations ship next to the JavaScript.

## Requirements
Node.js `^22.18.0 || >=24.11.0`.

## Install
[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

```shell
# via npm
$ npm install @cycjimmy/config-lib --save

# or via yarn
$ yarn add @cycjimmy/config-lib
```

## Usage

```javascript
import production from '@cycjimmy/config-lib/dist/terser/4.x/production.js'

// do something
// ...
```

CommonJS consumers can still require the ES modules on Node.js >= 22.12, where a
`require` of an ES module is supported:

```javascript
const { default: production } = require('@cycjimmy/config-lib/dist/terser/4.x/production.js')
```

The declarations are resolved from the same path:

```typescript
import type { TerserProductionOptions } from '@cycjimmy/config-lib/dist/terser/4.x/production.js'
import terserProduction from '@cycjimmy/config-lib/dist/terser/4.x/production.js'

const custom: TerserProductionOptions = {
  ...terserProduction,
  ecma: 2015,
}
```

## Migration from v3 to v4

v4 is a breaking release: the package is ESM only, the build moved to Vite and
the sources are written in TypeScript.

| v3 | v4 |
| --- | --- |
| `@cycjimmy/config-lib/esm/<entry>.js` | `@cycjimmy/config-lib/dist/<entry>.js` |
| `@cycjimmy/config-lib/cjs/<entry>.cjs` | removed - use the ES module (or `require()` on Node.js >= 22.12) |
| Node.js 18 | Node.js `^22.18.0 \|\| >=24.11.0` |
| no type declarations | one `.d.ts` next to every entry |

The `import` statements keep the explicit `.js` extension, the export shape of
every entry is unchanged.

## Entries

### chore

| Entry | Description |
| --- | --- |
| `dist/chore/myBanner.js` | Renders the licence banner comment for a bundle. |
| `dist/chore/judgeProcessEnv.js` | `IS_DEVELOPMENT` / `IS_PRODUCTION` / `IS_DEPLOYMENT` flags, read once from `process.env.NODE_ENV` when the module is evaluated. |

### terser

| Entry | Description |
| --- | --- |
| `dist/terser/4.x/production.js` | Production `minify` options for terser 4.x. |

### terserWebpackPlugin

| Entry | Description |
| --- | --- |
| `dist/terserWebpackPlugin/2.x/production.js` | `TerserPlugin` options sharing the terser 4.x production options. |
| `dist/terserWebpackPlugin/2.x/working.js` | Same options with the licence comments disabled. |

### imageWebpackLoader

| Entry | Description |
| --- | --- |
| `dist/imageWebpackLoader/6.x/production.js` | Production loader options for image-webpack-loader 6.x (svgo 1.x plugin shape). |
| `dist/imageWebpackLoader/8.x/production.js` | Production loader options for image-webpack-loader 8.x (svgo 2.x plugin shape). |

### browsersync

| Entry | Description |
| --- | --- |
| `dist/browsersync/2.x/middleware/makeAjax.js` | browser-sync middleware factory that mocks an Ajax endpoint: `makeAjax({ apiName, data, timeout })`. |

### semanticRelease

| Entry | Description |
| --- | --- |
| `dist/semanticRelease/15.x/makeConfig.js` | Builds a semantic-release `plugins` array from explicit flags. |
| `dist/semanticRelease/15.x/makeCommonConfig.js` | The same builder with changelog and git enabled. |
| `dist/semanticRelease/19.x/makeConfigWithPgkRootForLibrary.js` | Preset that builds the package and publishes it from `.release`. |

```javascript
import makeConfigFromConfigLib from '@cycjimmy/config-lib/dist/semanticRelease/19.x/makeConfigWithPgkRootForLibrary.js'

export default makeConfigFromConfigLib({
  githubOptions: {
    assets: ['dist/index.js']
  },
})
```

## Development

```shell
$ npm ci
$ npm run type-check   # tsc --noEmit
$ npm run lint         # eslint
$ npm test             # vitest
$ npm run package      # build dist and assemble .release
```

`npm run package` builds the declarations with `tsc`, transpiles every source
file to `dist/` with Vite (one module per file), then copies `dist`, `README.md`
and `LICENSE` into `.release`, which is the directory published to npm.

## License
[MIT](./LICENSE)

<!-- Links: -->
[npm-image]: https://img.shields.io/npm/v/@cycjimmy/config-lib
[npm-url]: https://npmjs.org/package/@cycjimmy/config-lib

[download-image]: https://img.shields.io/npm/dt/@cycjimmy/config-lib
[download-url]: https://npmjs.org/package/@cycjimmy/config-lib

[libraries-sourcerank-image]: https://img.shields.io/librariesio/sourcerank/npm/@cycjimmy/config-lib
[libraries-sourcerank-url]: https://libraries.io/npm/@cycjimmy%2Fconfig-lib

[release-date-image]: https://img.shields.io/github/release-date/cycjimmy/config-lib
[release-url]: https://github.com/cycjimmy/config-lib/releases

[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release

[license-image]: https://img.shields.io/npm/l/@cycjimmy/config-lib
