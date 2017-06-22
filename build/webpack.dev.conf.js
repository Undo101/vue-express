var webpack = require('webpack')
var baseWebpackConfig = require('./webpack.base.conf')
var merge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('../config')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig,{
    devtool:'#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env':config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template:'index.html',
            inject: true
        })
    ]
})