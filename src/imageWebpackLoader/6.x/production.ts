// Production options for image-webpack-loader 6.x.
// Doc: https://github.com/tcoopman/image-webpack-loader#usage

export interface ImageWebpackLoader6Options {
  mozjpeg: { progressive: boolean, quality: number }
  gifsicle: { interlaced: boolean }
  optipng: { optimizationLevel: number }
  pngquant: { quality: [number, number], speed: number }
  // 6.x takes the raw svgo 1.x plugin shape: a plain object per plugin.
  svgo: { plugins: Array<Record<string, boolean>> }
}

export interface ImageWebpackLoader6Config {
  loader: string
  options: ImageWebpackLoader6Options
}

const production: ImageWebpackLoader6Config = {
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
          removeViewBox: false,
        },
        {
          removeEmptyAttrs: false,
        },
        {
          moveGroupAttrsToElems: false,
        },
      ],
    },
  },
}

export default production
