exports.loadJS = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
});

exports.loadHTML = () => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
    ],
  },
});

exports.loadCSS = () => ({
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: true, // default is false
            sourceMap: true,
            importLoaders: 1,
            localIdentName: '[name]--[local]--[hash:base64:8]',
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: () => [
              // eslint-disable-next-line
              require('postcss-extend'),
              // eslint-disable-next-line
              require('postcss-cssnext')({
                features: {
                  customProperties: {
                    variables: {

                    },
                  },
                },
              }),
            ],
          },
        },
      ],
    }],
  },
});
