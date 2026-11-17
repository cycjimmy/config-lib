import type { TerserProductionOptions } from '../../terser/4.x/production.js'

import terserOptions from '../../terser/4.x/production.js'

export interface TerserWebpackPluginOptions {
  extractComments: boolean
  terserOptions: TerserProductionOptions
}

const production: TerserWebpackPluginOptions = {
  extractComments: false,
  terserOptions,
}

export default production
