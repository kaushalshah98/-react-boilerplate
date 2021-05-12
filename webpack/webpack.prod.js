const webpack = require('webpack')
const paths = require('./paths')
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map', //false
  output: {
    path: paths.outputPath,
    publicPath: '/',
    // filename: 'js/[name].[contenthash].bundle.js',
    filename: `${paths.jsFolder}/[name].[hash].js`,
  },
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new Dotenv({
      path: './.env.production',
    }),
    new webpack.DefinePlugin({
      'process.env.name': JSON.stringify('Codevolution'),
    }),


    //   new webpack.optimize.UglifyJsPlugin({
    //     compress: { warnings: false },
    //     comments: false,
    //     mangle: false,
    //     minimize: false
    // })

    //   new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor',
    //     filename: 'vendor.[chunkhash].js',
    //     minChunks: Infinity
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //    name: 'meta',
    //     chunks: ['vendor'], 
    //     filename: 'meta.[hash].js' 
    //   }),

  ],
  optimization: {
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: true,
      }),
      new CssMinimizerPlugin(),
    ],
    // Automatically split vendor and commons
    // https://twitter.com/wSokra/status/969633336732905474
    // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'initial',
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          name: 'async',
          chunks: 'async',
          minChunks: 4,
        },
      },
    },
    // splitChunks: {
    //       chunks: "all",
    // minSize: 1000 * 600
    //     },
    // Keep the runtime chunk seperated to enable long term caching
    // The following configuration creates an additional chunk for the runtime code, 
    // so it's cheap to generate:
    // https://twitter.com/wSokra/status/969679223278505985
    runtimeChunk: true,
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
}
