# README

- 用途：攒Vue组件的练习项目
- 多页面是以一级目录下的*.js算入口的
- 文件名hash > hash后缀
- 移除了原项目的二级目录支持
- postcss-px2rem插件 -> 仅vue视图文件里的px会被转化成rem

# 遇到的问题

- axios解决OPTIONS问题，导致后台无法接收到数据 
    - https://blog.csdn.net/revival_liang/article/details/79016895
    - 两次请求 后台设置
    
# TODO 

- 提取出来的公共css的autoprefix问题 以及 mixins问题
- 开发时的路径矫正 /_topping 直接去掉 

# 模板文件

```vue
<template>
    <div>

    </div>
</template>

<script>

    import Lib from 'assets/js/Lib';


    export default {
        data() {
            return {}
        },
        components: {},
        props: {
            headfont: {
                type: String,
                default: '导航'
            }
        },
        //实例初始化最之前，无法获取到data里的数据
        beforeCreate() {

        },
        //在挂载开始之前被调用
        beforeMount() {

        },
        //已成功挂载，相当ready()
        mounted() {


        },
        //相关操作事件
        methods: {}
    }
</script>

<style lang="less">

</style>
```
