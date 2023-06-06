
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const output = path.resolve(__dirname, '../../public/')

const resolve = require('../commons/resolve')

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: output,
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, '../../public/'),
    host: '0.0.0.0',
    port: 9000
  },
  devtool: 'inline-source-map',
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
              url: false,
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]--[local]-[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader?sourceMap=inline',
            options: {
              config: path.resolve(__dirname, 'postcss.config.js')
            }
          }]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/bundle.css')
  ]
}
