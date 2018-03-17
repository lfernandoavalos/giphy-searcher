const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
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
    ],
  },
);

// Additional config for production env
const prodConfig = merge({

});

// Additional config for dev env
const devConfig = merge({
  plugins: [
    new webpack.DefinePlugin({
      __GIPHY_API_KEY__: JSON.stringify(process.env.GIPHY_API_KEY),
    }),
  ],
});


module.exports = (env) => {
  if (env.production) {
    return merge(commonConfig, prodConfig);
  }

  return merge(commonConfig, devConfig);
};
