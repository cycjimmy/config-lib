// Shared production options for terser 4.x.
// Doc: https://github.com/terser/terser#minify-options

export interface TerserOutputOptions {
  // `working` in terserWebpackPlugin/2.x flips this to `false`, so the type has
  // to accept both a pattern and a boolean.
  comments: RegExp | boolean
  beautify: boolean
}

export interface TerserCompressOptions {
  drop_debugger: boolean
  drop_console: boolean
  collapse_vars: boolean
  reduce_vars: boolean
}

// The ECMA versions terser 4 accepts. Kept as a union instead of `number` so the
// options stay assignable to terser's own `MinifyOptions`.
export type TerserEcma = 5 | 6 | 7 | 8 | 9 | 10 | 11
  | 2015 | 2016 | 2017 | 2018 | 2019 | 2020

export interface TerserProductionOptions {
  ecma: TerserEcma
  warnings: boolean
  ie8: boolean
  safari10: boolean
  output: TerserOutputOptions
  compress: TerserCompressOptions
}

const production: TerserProductionOptions = {
  ecma: 5,
  warnings: false,
  ie8: false,
  safari10: true,
  output: {
    comments: /^!/,
    beautify: false,
  },
  compress: {
    drop_debugger: true,
    drop_console: true,
    collapse_vars: true,
    reduce_vars: true,
  },
}

export default production
