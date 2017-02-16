import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import rimraf from 'rimraf';
import autoprefixer from 'autoprefixer';

// addHash = (template, hash) => {
//   return NODE_ENV == 'production' ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : `${template}?hash=[${hash}]`;
// }

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
        extensions: ['', '.js', '.jsx', '.less']
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 50
    },
    module: {
        loaders:[
            {
                test: /\.js$/,
                include: path.join(__dirname, '/src'),
                //exclude: path.join(__dirname, '/node_modules/'),
                loaders: ['babel']
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
    postcss: ()=> [autoprefixer],
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