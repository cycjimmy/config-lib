/**
 * production
 * @doc https://github.com/tcoopman/image-webpack-loader#usage
 * @type Object
 */
module.exports = {
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
      quality: [.65, .9],
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
};
