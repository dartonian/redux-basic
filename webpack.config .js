'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development',
      webpack = require('webpack'),
      path = require('path'),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      rimraf = require('rimraf');

function addHash(template, hash) {
  return NODE_ENV == 'production' ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`;
}

module.exports = {
    context: path.join(__dirname, '/src'),

    entry: {
        app: './index'
    },

    output: {
        path:       path.join(__dirname, '/dist'),
        publicPath: '',
        filename:   '[name].[hash].js'
    },
    resolve: {
        extensions: ['', '.js', '.less']
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                exclude: path.join(__dirname, '/node_modules/'),
                loader: 'babel?presets[]=es2015'
            },
            {
                test: /\.less/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less', 'postcss', 'less?sourceMap')
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|otf|woff|woff2)$/,
                loader: 'file?name=[path][name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }

        ],
    },
    plugins: [
        new ExtractTextPlugin('[name].[hash].css', {publicPath: path.join(__dirname, '/src/'),allChunks: true}),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app'
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            chunks: ['app'],
            inject: 'body',
            minify: {
            removeComments: true,
            collapseWhitespace: true
          }
        })
    ],

    devServer: {
        contentBase: path.join(__dirname, '/src'),
        hot: true
    }
};