var path = require('path')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
function resolve (dir){
    return path.join(__dirname,'..',dir)
}

module.exports = {
    entry : {
        app: './src/main.js'
    },
    output:{
        path:config.build.assetsRoot,
        filename:'[name].js',
        publicPath:process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {//解决的问题
        extensions: ['.js','.vue','.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias:{//快捷映射
            'src':resolve('src'),
            'assets':resolve('src/assets'),
            'components':resolve('src/components')
        }
    },
    module: {//怎么解决
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
                // options:
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                include:[resolve('src')]
            },
            {
                test:/\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader:'url-loader',
                query: {
                    limit:10000,
                    name:'img/[name].[hash:7].[ext]'
                }
            }
        ]
    }
}