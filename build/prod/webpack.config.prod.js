
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin

const output = path.resolve(__dirname, '../../public/')

const resolve = require('../commons/resolve')

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: output,
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  devtool: false,
  resolve,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              minimize: {
                calc: {
                  preserve: true
                },
                autoprefixer: false
              },
              url: false,
              sourceMap: false,
              importLoaders: 1,
              modules: true,
              localIdentName: '[hash:base64:6]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: path.resolve(__dirname, 'postcss.config.js')
            }
          }]
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new ExtractTextPlugin({ filename: 'css/bundle.css', allChunks: true }),
    new OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      minimize: true,
      compressor: {
        warnings: false
      }
    })
  ]
}
