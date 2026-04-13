/* eslint-disable */
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'web',
  mode: 'production',

  output: {
    path: path.resolve(__dirname, 'browser'),
    filename: 'index.js',
    globalObject: '(typeof self !== \'undefined\' ? self : typeof globalThis !== \'undefined\' ? globalThis : this)',
    library: {
      name: 'AsyncAPIParser',
      type: 'umd',
      export: 'default',
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
    // (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)(),
  ],

  externals: {
    // node-fetch is Node.js-only; in browser/GraalVM environments the global
    // fetch API (or a polyfill) should be used instead.
    'node-fetch': 'commonjs2 null',
  },
};
