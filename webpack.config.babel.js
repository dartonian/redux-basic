import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import rimraf from 'rimraf';
import autoprefixer from 'autoprefixer';

const loaders = [
    {
        loader: 'css-loader',
        options: {
          modules: true
        }
    },
    {
        loader: 'postcss-loader'
    },
    {
        loader: 'less-loader'
    }
];

export default {
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
    	modules:[
			path.join(__dirname, '/src'),
			'node_modules'
    	]
        //extensions: ['', '.js', '.jsx', '.less']
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 50
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                use:[{
            		
            		loader: 'babel-loader'
                }]
                
            },

            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                      fallback: 'style-loader',
                      use: loaders
                    })
            },
            {
                test: /\.(png|jpg|svg|ttf|eot|otf|woff|woff2)$/,
                use:[{
					loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }]
            },
            {
                test: /\.html$/,
                use:[{
					loader: 'raw-loader'
                }]
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '[name].[hash].css',
            publicPath: path.join(__dirname, '/src/'),
            allChunks: true

        }),
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