/**
 * Judge Process Env
 * @type {{IS_DEPLOYMENT: boolean, IS_PRODUCTION: boolean, IS_DEVELOPMENT: boolean}}
 */
export default ({
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEPLOYMENT: process.env.NODE_ENV === 'deployment',
});
