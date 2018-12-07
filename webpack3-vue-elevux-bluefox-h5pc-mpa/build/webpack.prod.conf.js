var path = require('path')
var utils = require('./utils/index')

var webpack = require('webpack')
var merge = require('webpack-merge')

// 配置
var config = require('../config')
var baseWebpackConfig = require('./webpack.base.conf')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var CleanWebpackPlugin = require("clean-webpack-plugin")
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var ImageminPlugin = require('imagemin-webpack-plugin').default

// 入口
var entries = utils.getMultiEntry(`./src/${config.moduleName}/*.js`); // 获得入口js文件
var chunks = Object.keys(entries);


// 是否为测试
var env = process.env.NODE_ENV === 'testing'
    ? require('../config/test.env')
    : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    //devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash:8].js')
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,

                // 移除console debugger
                drop_debugger: true,
                drop_console: true
            },
            sourceMap: true
        }),
        // 清理旧打包
        // fix -> ...\build is outside of the project root. Skipping...
        // http://mobilesite.github.io/2017/02/18/all-the-errors-encountered-in-webpack/
        new CleanWebpackPlugin(config.build.assetsRoot, {
            root: resolve('./'), // 设置root
            verbose: true
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[chunkhash:8].css')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin(),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        /* new HtmlWebpackPlugin({
           filename: process.env.NODE_ENV === 'testing'
             ? 'index.html'
             : config.build.index,
           template: 'index.html',
           inject: true,
           minify: {
             removeComments: true,
             collapseWhitespace: true,
             removeAttributeQuotes: true
             // more options:
             // https://github.com/kangax/html-minifier#options-quick-reference
           },
           // necessary to consistently work with multiple chunks via CommonsChunkPlugin
           chunksSortMode: 'dependency'
         }),*/
        // split vendor js into its own file
        /*new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: function (module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf(
                path.join(__dirname, '../node_modules')
              ) === 0
            )
          }
        }),*/
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks: chunks,
            minChunks: 2 || chunks.length
        }),
        new webpack.HashedModuleIdsPlugin(),
        // https://blog.csdn.net/zb_ctrl/article/details/75549350
        // new ImageminPlugin({
        //     // disable: process.env.NODE_ENV !== 'production',
        //     pngquant: {
        //         quality: '95-100'
        //     }
        // }),
        // copy custom static assets
        new CopyWebpackPlugin([
          {
            from: resolve('static'),
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
          }
        ]),

        // 默认分析
        new BundleAnalyzerPlugin(),
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}


// if (config.build.bundleAnalyzerReport) {
//     var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//     webpackConfig.plugins.push(new BundleAnalyzerPlugin())
// }

//构建生成多页面的HtmlWebpackPlugin配置，主要是循环生成
var pages = utils.getMultiEntry('./src/' + config.moduleName + '/*.html');
var outputHtmlPathname
for (var pathname in pages) {

    // 输出路径
    outputHtmlPathname = pathname.replace(new RegExp(new RegExp(config.moduleName), "i"), config.build.assetsHtmlPath)

    var conf = {
        filename: outputHtmlPathname + '.html',
        // 模板路径
        template: pages[pathname],
        // 每个html引用的js模块
        chunks: ['vendor', pathname],
        // js插入位置
        inject: true,
        // hash: true
    };

    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}


module.exports = webpackConfig
