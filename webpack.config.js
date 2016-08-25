const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const parts = require('./libs/parts');

const TARGET = process.env.npm_lifecycle_event;
const ENABLE_POLLING = process.env.ENABLE_POLLING;


const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  test: path.join(__dirname, 'tests'),
  // Consists of libs which need to be transcompiled & loaded like bootstrap
  libs: []
};
// Array of all the components that need loaders / transcompilation
PATHS.compile = PATHS.libs.concat([PATHS.app]);


process.env.BABEL_ENV = TARGET;

const common = merge(
  {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
      // TODO: Set publicPath to match your GitHub project name
      // E.g., '/kanban-demo/'. Webpack will alter asset paths
      // based on this. You can even use an absolute path here
      // or even point to a CDN.
      //publicPath: ''
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
        'components' : path.resolve(__dirname, 'app', 'components')
      }
    }
  },
  parts.indexTemplate({
    title: 'investu.in',
    appMountId: 'app'
  }),
  parts.loadJSX(PATHS.compile),
  parts.lintJSX(PATHS.compile)
  // parts.fixJquery() //Only include when jquery is a dependency
);

var config;

// Detect how npm is run and branch based on that
switch(TARGET) {
  case 'build':
  case 'stats':
    config = merge(
      common,
      {
        // devtool: 'source-map', //Include sourcemaps
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          chunkFilename: '[chunkhash].js'
        }
      },
      parts.clean(PATHS.build),
      parts.setFreeVariable(
        'process.env.NODE_ENV',
        'production'
      ),
      parts.extractCSS(PATHS.compile),
      // Add dependencies in the vendor bundle
      parts.extractBundle({
        name: 'vendor',
        entries: ['react', 'react-dom', 'react-router', 'react-redux', 'redux', 'immutable']
      }),
      parts.setupImages(PATHS.compile),
      parts.setupFonts(PATHS.compile),
      parts.minify()
    );
    break;
  case 'test':
  case 'test:tdd':
    config = merge(
      {
        resolve: {
          extensions: ['', '.js', '.jsx']
        },
        devtool: 'inline-source-map'
      },
      parts.loadJSX(PATHS.test),
      parts.loadJSX(PATHS.compile)
    );
    break;
  default:
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
      },
      parts.setupCSS(PATHS.compile),
      parts.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT,
        poll: ENABLE_POLLING
      }),
      parts.enableReactPerformanceTools(),
      // Enable this to automatically install npm packages referenced
      // parts.npmInstall(),
      parts.setupImages(PATHS.compile),
      parts.setupFonts(PATHS.compile)
    );
}

module.exports = validate(config, {
  quiet: true
});
