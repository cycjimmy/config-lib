import terserOptions from '../../terser/4.x/production';

terserOptions.output.comments = false;

/**
 * working
 * @type Object
 */
export default {
  extractComments: false,
  terserOptions,
};
