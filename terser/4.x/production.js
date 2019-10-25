/**
 * production
 * @doc https://github.com/terser/terser#minify-options
 * @type Object
 */
module.exports = {
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
};
