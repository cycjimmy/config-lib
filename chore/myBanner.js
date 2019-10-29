/**
 * My Banner
 * @param pkg
 * @returns {string}
 */
module.exports = (pkg = {
  name: '',
  version: '',
  homepage: '',
  license: '',
}) => `/*! 
 * ${pkg.name} v${pkg.version}
 * Homepage: ${pkg.homepage}
 * Released under the ${pkg.license} License.
 */`;

