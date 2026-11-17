export interface BannerPackageInfo {
  name?: string
  version?: string
  homepage?: string
  license?: string
}

function myBanner(pkg: BannerPackageInfo = {}): string {
  return `/*!
 * ${pkg.name ?? ''} v${pkg.version ?? ''}
 * Homepage: ${pkg.homepage ?? ''}
 * Released under the ${pkg.license ?? ''} License.
 */`
}

export default myBanner
