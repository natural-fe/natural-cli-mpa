// This is the webpack config used for unit tests.

var utils = require('./utils/index')
var webpack = require('webpack')
var merge = require('webpack-merge')

// 配置
var baseConfig = require('./webpack.base.conf')

var webpackConfig = merge(baseConfig, {
    // use inline sourcemap for karma-sourcemap-loader
    module: {
        rules: utils.styleLoaders()
    },
    devtool: '#inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': require('../config/test.env')
        })
    ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = webpackConfig
