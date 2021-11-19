/**
 * My Banner
 * @param pkg
 * @returns {string}
 */
export default (pkg = {
  name: '',
  version: '',
  homepage: '',
  license: '',
}) => `/*!
 * ${pkg.name} v${pkg.version}
 * Homepage: ${pkg.homepage}
 * Released under the ${pkg.license} License.
 */`;
