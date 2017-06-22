// 获取配置
var config = require('../config')
// 如果Node的环境变量中没有设置当前的环境（NODE_ENV），则使用config中的配置作为当前的环境
if(!process.env.NODE_ENV) {
    process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
// console.log(process.env.NODE_ENV)
// 一个可以调用默认软件打开网址、图片、文件等内容的插件
// 这里用它来调用默认浏览器打开dev-server监听的端口，例如：localhost:8080
var opn = require('opn')
//一个express中间件，用于将http请求代理到其他服务器
//例如:localhost：8080/api/xxx => localhost:3000/api/xxx
//这里使用该插件可以将前端开发中涉及的请求代理api服务器上，方便与服务器对接
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
// 用于判断是否要自动打开浏览器的布尔变量，当配置文件中没有设置自动打开浏览器的时候其值为 false
var autoOpenBrowser = !!config.dev.autoOpenBrowser

// dev-server 监听的端口，默认为config.dev.port设置的端口，即8080
var port = process.env.PORT || config.dev.port
var  proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)
// console.log(compiler)
// webpack-dev-middleware使用compiler对象来对相应的文件进行编译和绑定
// 编译绑定后将得到的产物存放在内存中而没有写进磁盘
// 将这个中间件交给express使用之后即可访问这些编译后的产品文件
var devMiddleware = require('webpack-dev-middleware')(compiler,{
    publicPath: webpackConfig.output.publicPath,
    quiet:true
})
var hotMiddleware = require('webpack-hot-middleware')(compiler,{
    log:() => {}
})
// 当html-webpack-plugin提交之后通过热重载中间件发布重载动作使得页面重载
compiler.plugin('compilation',function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit',
    function(data,cb) {
        hotMiddleware.publish({action:'reload'})
        cb()
    })
}) 
app.use(devMiddleware)
app.use(hotMiddleware)
const uri = 'http://localhost:'+ port
app.listen(port,function(err) {
    if(err) {
        console.log(err)
        return
    }
    if(autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
        //打开浏览器  地址uri 
        opn(uri)
    }
})