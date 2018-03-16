const HtmlWebPackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

module.exports = merge(
  parts.loadJS(),
  parts.loadHTML(),
  parts.loadCSS(),
  {
    optimization: {
      splitChunks: {
        cacheGroups: {
          default: false,
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
  },
  {
    plugins: [
      new HtmlWebPackPlugin({
        title: 'Giphy Searcher! :)',
        template: './src/index.html',
        filename: './index.html',
      }),
    ],
  },
);
