const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const paths = require('./paths')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',  //'inline-source-map'
  output: {
    filename: '[name].js',
    path: paths.outputPath,
    chunkFilename: '[name].js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: paths.outputPath,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './.env.development',
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Vishwas'),
    }),
  ],
}
