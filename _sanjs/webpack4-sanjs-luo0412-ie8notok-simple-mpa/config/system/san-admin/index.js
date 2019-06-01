// 处理路径
const  path = require('path')
function resolve(dir) {
    return path.join(__dirname, '../../../' + dir)
}

module.exports = {
    system: {
        supportIE8: true,
        pages: "_admin",
        modules: "index",
        resolveAlias: {},
        externals: {
            san: 'window.san',
        },
    },

    build: {
    }

};
