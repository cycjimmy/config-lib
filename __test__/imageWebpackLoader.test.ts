import { describe, expect, it } from 'vitest'

import production6 from '../src/imageWebpackLoader/6.x/production.js'
import production8 from '../src/imageWebpackLoader/8.x/production.js'

describe('imageWebpackLoader production options', () => {
  it('keeps the compression settings shared by both versions', () => {
    for (const config of [production6, production8]) {
      expect(config.loader).toBe('image-webpack-loader')
      expect(config.options.mozjpeg).toEqual({ progressive: true, quality: 70 })
      expect(config.options.pngquant).toEqual({
        quality: [0.65, 0.9],
        speed: 4,
      })
      expect(config.options.optipng).toEqual({ optimizationLevel: 6 })
    }
  })

  it('uses the svgo 1.x plugin shape for 6.x', () => {
    expect(production6.options.svgo.plugins).toEqual([
      { removeViewBox: false },
      { removeEmptyAttrs: false },
      { moveGroupAttrsToElems: false },
    ])
  })

  it('uses the svgo 2.x plugin shape for 8.x', () => {
    expect(production8.options.svgo.plugins.map(plugin => plugin.name)).toEqual([
      'removeViewBox',
      'removeEmptyAttrs',
      'moveGroupAttrsToElems',
      'addAttributesToSVGElement',
    ])
    expect(production8.options.svgo.plugins.every(plugin => plugin.active === false
      || plugin.name === 'addAttributesToSVGElement')).toBe(true)
  })
})
