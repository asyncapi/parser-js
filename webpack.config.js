/* eslint-disable */
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'web',
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'browser'),
    filename: 'index.js',
    globalObject: '(typeof self !== \'undefined\' ? self : this)',
    library: {
      name: 'AsyncAPIParser',
      type: 'umd',
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: 'tsconfig.json',
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {
      fs: false,
      path: false,
      util: false,
      buffer: require.resolve('buffer/'),
    }
  },

  plugins: [
    /**
     * Uncomment plugin when you wanna see dependency map of bundled package
     */
    // (require('webpack-bundle-analyzer').BundleAnalyzerPlugin()),
  ],
};
