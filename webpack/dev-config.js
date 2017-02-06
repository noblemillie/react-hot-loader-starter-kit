const { resolve } = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const hmr = [
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?noInfo=false'
];

module.exports = {
  target: 'web',
  context: resolve(__dirname, '../'),
  entry: {
    main: hmr.concat(['./src/client/index.js']),
    // TODO consider externals here
    vendor: hmr.concat([
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux'
    ])
  },
  performance: { hints: false },
  devServer: {
    hot: true
  },
  output: {
    filename: '[name].js', // don't use chunkhash in dev
    path: resolve(__dirname, '../public'),
    pathinfo: true,
    publicPath: '/assets/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: /node_modules/
    }, {
      test: /\.js$/,
      use: [{
        loader: 'react-hot'
      }],
      include: resolve(__dirname, 'src')
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new AssetsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    })
  ]
};
