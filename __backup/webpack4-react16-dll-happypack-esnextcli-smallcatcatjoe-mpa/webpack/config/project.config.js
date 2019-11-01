const { resolve } = require('path')
const { getEntry } = require('../utils/get-entries')

const env = process.env.NODE_ENV

// dev/test/production config
const config = {
  env: process.env.NODE_ENV,
  
  // html entries
  htmlEntries: getEntry('./src/pages/**/*.html'),
  // modern entries
  modernEntries: getEntry('./src/pages/**/!(*legacy).jsx'),
  // get lagacy entries
  getLegacyEntries: function () {
    return getEntry('./src/pages/**/+(*legacy).jsx')
  },

  // modern boundles
  modernFileName: '[name].[chunkhash].js',
  modernChunkFileName: '[name].[chunkhash].chunk.js',
  // legacy boundles
  legacyFileName: '[name].legacy.[chunkhash].js',
  legacyChunkFileName: '[name].legacy.[chunkhash].chunk.js',

  // output config
  outputPath: resolve(process.cwd(), './public'),
  publicPath: '/',

  // dev config
  development: {
    host: 'localhost',
    port: 9000,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    proxy: {
      '/api/**': {
        target: '', // 服务器地址
        changeOrigin: true
      }
    }
  },

  // global variable
  globalVar: {
    development: {
      __MODE__: JSON.stringify(env)
    },
    test: {
      __MODE__: JSON.stringify(env)
    },
    production: {
      __MODE__: JSON.stringify(env)
    }
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    //优先搜索src下的公共资源目录
    modules: [
      resolve(process.cwd(), "./src/assets"),
      resolve(process.cwd(), "./src/libs"),
      resolve(process.cwd(), "./src/components"),
      resolve(process.cwd(), "./src/service"),
      resolve(process.cwd(), "./src/store"),
      "node_modules"
    ],
    alias: {
      // 公共资源
      'assets': resolve(process.cwd(), './src/assets'),
      'libs': resolve(process.cwd(), './src/libs'),
      'components': resolve(process.cwd(), './src/components'),
      'service': resolve(process.cwd(), './src/service'),
      'store': resolve(process.cwd(), './src/store')
    }
  }
}

module.exports = config
