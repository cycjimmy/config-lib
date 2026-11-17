import { expect, it, vi } from 'vitest'

import production from '../src/terserWebpackPlugin/2.x/production.js'
import working from '../src/terserWebpackPlugin/2.x/working.js'

it('keeps the licence comment pattern in the shared terser options', async () => {
  // A fresh module registry is needed: importing `working` above already flipped
  // the shared object.
  vi.resetModules()
  const { default: terserOptions } = await import('../src/terser/4.x/production.js')

  expect(terserOptions.output.comments).toBeInstanceOf(RegExp)
  expect(terserOptions.ecma).toBe(5)
  expect(terserOptions.compress.drop_console).toBe(true)
})

it('stays assignable to the terser 4 minify options', async () => {
  vi.resetModules()
  const { default: terserOptions } = await import('../src/terser/4.x/production.js')

  // Mirror of terser 4's `MinifyOptions` surface this entry touches. terser is
  // not a dependency here, so the ECMA union is declared inline: widening
  // `ecma` back to `number` would make this call fail to type-check.
  type TerserEcma = 5 | 6 | 7 | 8 | 9 | 10 | 11 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020
  const minify = (options: {
    ecma?: TerserEcma
    compress?: { drop_console?: boolean, drop_debugger?: boolean }
    output?: { comments?: RegExp | boolean }
  }): boolean => options.ecma === 5

  expect(minify(terserOptions)).toBe(true)
})

it('exposes the same terser options object for both webpack plugin entries', () => {
  expect(working.terserOptions).toBe(production.terserOptions)
  expect(production.extractComments).toBe(false)
})

it('turns the comment banner off when the working entry is imported', () => {
  expect(working.terserOptions.output.comments).toBe(false)
})
