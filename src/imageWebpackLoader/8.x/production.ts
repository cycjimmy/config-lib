// Production options for image-webpack-loader 8.x.
// Doc: https://github.com/tcoopman/image-webpack-loader#usage

export interface SvgoPlugin {
  name: string
  active?: boolean
  params?: { attributes: Array<Record<string, string>> }
}

export interface ImageWebpackLoader8Options {
  mozjpeg: { progressive: boolean, quality: number }
  gifsicle: { interlaced: boolean }
  optipng: { optimizationLevel: number }
  pngquant: { quality: [number, number], speed: number }
  // 8.x takes the svgo 2.x plugin shape: a descriptor per plugin.
  svgo: { plugins: SvgoPlugin[] }
}

export interface ImageWebpackLoader8Config {
  loader: string
  options: ImageWebpackLoader8Options
}

const production: ImageWebpackLoader8Config = {
  loader: 'image-webpack-loader',
  options: {
    mozjpeg: {
      progressive: true,
      quality: 70,
    },
    gifsicle: {
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 6,
    },
    pngquant: {
      quality: [0.65, 0.9],
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
          active: false,
        },
        {
          name: 'removeEmptyAttrs',
          active: false,
        },
        {
          name: 'moveGroupAttrsToElems',
          active: false,
        },
        {
          name: 'addAttributesToSVGElement',
          params: {
            attributes: [
              {
                xmlns: 'http://www.w3.org/2000/svg',
              },
            ],
          },
        },
      ],
    },
  },
}

export default production
