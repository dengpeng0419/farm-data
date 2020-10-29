'use strict'
// Template version: 1.2.4
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

const packageJson = require('../package')
const codeEnv = process.env.CODE_ENV
const config = packageJson.config[codeEnv]

const os = require('os')
const NetworkInterfaces = os.networkInterfaces()
const localIp = () => {
  let ip = 'localhost';
  let count = 0;
  Object.keys(NetworkInterfaces).forEach(name => {
    if (count > 0) return;
    NetworkInterfaces[name].forEach(item => {
      if (item.family !== 'IPv4' || item.internal !== false) return;
        ip = item.address;
        count++;
        return;
      });
    });
    return ip;
}

module.exports = {
  dev: {
    env: {
      'CODE_ENV': JSON.stringify(codeEnv),
      'URL': JSON.stringify(config)
    },
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: localIp() || 'localhost', // can be overwritten by process.env.HOST
    port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    env: {
      'CODE_ENV': JSON.stringify(codeEnv),
      'URL': JSON.stringify(config)
    },
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: codeEnv === 'production' ? false : true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}