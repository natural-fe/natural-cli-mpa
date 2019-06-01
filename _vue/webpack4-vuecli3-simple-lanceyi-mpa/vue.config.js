const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

/**
 * 方案一
 * 生成的文件为
 * -dist
 *    - img
 *    - index
 *        - index.js
 *        - index.css
 *        - index.html
 *    - page1
 *        - index.js
 *        - index.css
 *        - index.html
 *    - page2
 *        - index.js
 *        - index.css
 *        - index.html
 */
// const path = require("path");
// const glob = require("glob");
// const fs = require("fs");

// const config = {
//   entry: "main.js",
//   html: "index.html",
//   pattern: ["src/pages/*"]
// };

// const genPages = () => {
//   const pages = {};
//   const pageEntries = config.pattern.map(e => {
//     const matches = glob.sync(path.resolve(__dirname, e));
//     return matches.filter(match => fs.existsSync(`${match}/${config.entry}`));
//   });
//   Array.prototype.concat.apply([], pageEntries).forEach(dir => {
//     const filename = dir.split('pages/')[1];
//     const pathName = 'src' + dir.split('src')[1]
//     pages[filename] = {
//       entry: `${pathName}/${config.entry}`,
//       template: `${pathName}/${config.html}`,
//       filename: `${filename}/${config.html}`,
//     };
//   });
//   return pages;
// };

// const pages = genPages();
// module.exports = {
//   productionSourceMap: false,
//   pages,
//   chainWebpack: config => {
//     Object.keys(pages).forEach(entryName => {
//       config.plugins.delete(`prefetch-${entryName}`);
//     });
//     if (process.env.NODE_ENV === "production") {
//       config.plugin("extract-css").tap(() => [
//         {
//           filename: "[name]/css/[name].[contenthash:8].css",
//           chunkFilename: "[name]/css/[name].[contenthash:8].css"
//         }
//       ]);
//     }
//   },
//   configureWebpack: config => {
//     if (process.env.NODE_ENV === "production") {
//       config.output = {
//         path: path.join(__dirname, "./dist"),
//         filename: "[name]/js/[name].[contenthash:8].js",
//         publicPath: "/",
//         chunkFilename: "[name]/js/[name].[contenthash:8].js"
//       };
//     }
//   }
// };


/**
 * 方案二
 * 生成的文件为
 * -dist
 *    - css
 *        - index.xxx.css
 *        - page1.xxx.css
 *        - page2.xxx.css
 *    - img
 *  - index.html
 *    - page1.html
 *    - page2.html
 */

let path = require('path')
let glob = require('glob')

// 配置pages多页面获取当前文件夹下的html和js
function getEntry(globPath) {
    let entries = {},
        basename, tmp, pathname;

    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        // console.log(entry)
        tmp = entry.split('/').splice(-3);
        pathname = basename; // 正确输出js和html的路径

        // console.log(pathname)
        entries[pathname] = {
            entry: 'src/' + tmp[0] + '/' + tmp[1] + '/main.js',
            template: 'src/' + tmp[0] + '/' + tmp[1] + '/' + tmp[2],
            title: tmp[2],
            filename: tmp[2]
        };
    });

    console.log(entries)

    return entries;
}

let pages = getEntry('./src/pages/**?/*.html');

// 配置end
module.exports = {
    // 禁用eslint
    lintOnSave: false,
    productionSourceMap: false,
    pages,

    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        loaderOptions: {
            // css预设器配置项
            less: {
                javascriptEnabled: true
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        modules: false
    },

    // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    parallel: require('os').cpus().length > 1,

    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => {
                // 修改它的选项...
                options.limit = 100
                return options
            })

        // config.resolve.alias
        //     .set('@', resolve('src'))
        //     .set('_lib', resolve('src/common'))
        //     .set('_com', resolve('src/components'))
        //     .set('_img', resolve('src/images'))
        //     .set('_ser', resolve('src/services'))

        Object.keys(pages).forEach(entryName => {
            config.plugins.delete(`prefetch-${entryName}`);
        })

        if (process.env.NODE_ENV === "production") {
            config.plugin("extract-css").tap(() => [{
                path: path.join(__dirname, "./dist"),
                filename: "css/[name].[contenthash:8].css"
            }])
        }

    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === "production") {
            config.output = {
                path: path.join(__dirname, "./dist"),
                publicPath: "/",
                filename: "js/[name].[contenthash:8].js"
            }

            config.plugins.push(
                // 开启 Gzip 压缩
                // new CompressionWebpackPlugin({
                //     asset: '[path].gz[query]',
                //     algorithm: 'gzip',
                //     test: new RegExp(
                //         '\\.(js|css)$'
                //     ),
                //     threshold: 10240,
                //     minRatio: 0.8
                // }),

                // 使用包分析工具
                new BundleAnalyzerPlugin()
            )

        }
    },

    devServer: {
        // historyApiFallback: {
        //     rewrites: [
        //         {from: new RegExp(baseUrl + 'page1'), to: baseUrl + 'page1.html'},
        //         {from: new RegExp(baseUrl + 'page2'), to: baseUrl + 'page2.html'},
        //     ]
        // },

        // 是否自动打开浏览器页面
        open: true,
        index: 'index.html',
        // 指定使用一个 host。默认是 localhost
        host: '127.0.0.1',
        // 端口地址
        port: 8080,
        // 使用https提供服务
        https: false,
        // hotOnly: false,

        // string | Object 代理设置
        proxy: {
            '/repos': {
                target: 'https://api.github.com',
                changeOrigin: true
                // pathRewrite: {'^/api': ''}
            }
        },
        progress: true,

        // 提供在服务器内部的其他中间件之前执行自定义中间件的能力
        before: app => {
            // `app` 是一个 express 实例
        }
    }
}
