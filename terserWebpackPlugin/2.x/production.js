/**
 * production
 * @type Object
 */
module.exports = {
  extractComments: false,
  terserOptions: {
    ie8: false,
    safari10: true,
    ecma: 5,
    output: {
      comments: /^!/,
      beautify: false
    },
    compress: {
      drop_debugger: true,
      drop_console: true,
      collapse_vars: true,
      reduce_vars: true
    },
    warnings: false,
    sourceMap: true
  }
};
