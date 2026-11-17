import type { TerserWebpackPluginOptions } from './production.js'

import terserOptions from '../../terser/4.x/production.js'

// Mutating the shared options object is the documented behaviour of this entry:
// importing it turns off the licence-comment banner for the build that uses it.
terserOptions.output.comments = false

const working: TerserWebpackPluginOptions = {
  extractComments: false,
  terserOptions,
}

export default working
