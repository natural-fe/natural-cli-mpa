# README

> 随缘运行, 人品不好的时候就跑不动

- 配置文件没配好, 现在只作学习用...
- 复杂的项目约定大于配置？？


# 安装运行

- 使用npm install!! -> 安装结束会报错,但并无影响
- 全局安装一波

```shell
cnpm install -g node-gyp
```

# 常见问题

- 分工程跑不起来，八成是路由的问题...
- html里引用static内容注意相对路径 ../../static
- main.js 引用css报错 -> 引用less/sass

# San.js兼容

- 打包的内容才可能兼容IE8，开发时因为要支持热更新，IE运行起来是不兼容的
- san.js @deprecated

    - 配置坏掉了 只能兼容到IE9了
    - 以前成功过，我的幻觉吗？？ 好气哦
    - 需求一般是提供其中的几张页面给xp用户，不是整个系统
    - san.js可以cdn引入
    - import和export 用require module.exports
    - 官方的san-mui 并不兼容IE8 @deprecated
    - 最后 为什么我年纪轻轻要兼容IE8 😭

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>San 演示</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">

    <!--[if lt IE 8]>
    <script>
        if (typeof document.querySelector === 'undefined') {
            document.querySelector = function (target) {
                return document.getElementsByTagName(target)[0] || null;
            }
        }
    </script>
    <![endif]-->

    <!--[if lt IE 9]>
    <script src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <script src="https://cdn.bootcss.com/es5-shim/4.5.10/es5-shim.min.js"></script>
    <script src="https://cdn.bootcss.com/es5-shim/4.5.10/es5-sham.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/selectivizr/1.0.2/selectivizr-min.js"></script>
    <script src="https://cdn.bootcss.com/nwmatcher/1.4.2/nwmatcher-base.js"></script>
    <![endif]-->

    <script src="https://unpkg.com/san@latest/dist/san.dev.js"></script>
    <!--<script src="https://unpkg.com/san@latest"></script>-->
</head>
<body>

<div id="app"></div>

</body>
</html>

<script>
// require("babel-polyfill")
require("es5-polyfill")

//IE8 ^4.5.10
// import 'es5-shim';
// 司徒大佬的库，关键时刻还是...
// import 'object-create-ie8';
import 'object-defineproperty-ie8';
import 'console-polyfill';

//比IE8的JSON好用
// import 'json3';
//性能超高的Promise实现
// import 'bluebird';
// import 'fetch-polyfill2';
</script>
```

# element-admin

- 样式错乱 -> node v.10.13.0 + yarn

# neteasecloud 

- router require().default https://www.cnblogs.com/legendjslc/p/9041804.html

```shell
# muse-ui 为旧版本 
cnpm install -S muse-ui@2.1.0
```

# map
