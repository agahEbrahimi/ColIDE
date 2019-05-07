const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const defaultPath = path.resolve(__dirname, 'src')
const serverPath = path.resolve(__dirname, 'server')

const monacoPath = path.resolve(__dirname, './node_modules/monaco-editor');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: defaultPath,
        use: [{loader: 'style-loader',}, {loader: 'css-loader', options: { modules: true, namedExport: true,},}],
      }, 
      {
        test: /\.css$/,
        include: monacoPath,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
        include: defaultPath
      },
      {
        test: /\.js?$/,
        use: [{ loader: 'babel-loader' }],
        include: serverPath
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultPath
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
        include: defaultPath
      }
    ]
  },
  target: 'electron-renderer',
  plugins: [
    new MonacoWebpackPlugin({
      // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
      languages: ['json']
    }),
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new BabiliPlugin()
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
}
