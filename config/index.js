var path = require('path')

module.exports = {
    build: {
        assetsRoot:path.resolve(__dirname,'../dist'),
        assetsPublicPath:'/'//静态资源目录
    },
    dev: {
        env:require('./dev.env'),
        port:8080,
        autoOpenBrowser: true,
        assetsSubDirectory:'static',
        assetsPublicPath:'/',
        proxyTable:{
            '/api': {
                target:'http://localhost:3000',
                changeOrigin:true
            }
        },
        cssSourceMap: false//sourceMap  在打包时生成的文件形成源文件的映射，用于调试
    }
}