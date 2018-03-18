const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const commonConfig = merge(
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
      new webpack.DefinePlugin({
        __GIPHY_API_KEY__: JSON.stringify(process.env.GIPHY_API_KEY),
      }),
    ],
  },
);

// Additional config for production env
const prodConfig = merge({
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});

// Additional config for dev env
const devConfig = merge({
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
});


module.exports = (env) => {
  if (env.production) {
    return merge(commonConfig, prodConfig);
  }

  return merge(commonConfig, devConfig);
};
