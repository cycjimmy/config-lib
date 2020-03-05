const terserOptions = require('../../terser/4.x/production');

terserOptions.output.comments = false;

/**
 * working
 * @type Object
 */
module.exports = {
  extractComments: false,
  terserOptions,
};
