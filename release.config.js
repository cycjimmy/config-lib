import makeCommonConfig from './src/semanticRelease/15.x/makeCommonConfig';
import pkg from './package.json';

export default makeCommonConfig({
  exec: true,
  execOptions: {
    prepareCmd: 'npm run package',
  },
  npmOptions: {
    pkgRoot: '.release',
  },
  githubOptions: {
    assets: [pkg.browser],
  },
});
