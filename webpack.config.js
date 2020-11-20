// const path = require('path');
const webpack = require('webpack');
const slsw = require('serverless-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternal = require('webpack-node-externals');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'production' === process.env.NODE_ENV ? 'production' : 'none',
  optimization: {
    // We no not want to minimize our code.
    minimizer: [new TerserPlugin({
      test: /\.js(\?.*)?$/i,
      cache: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            // drop_console: true,
            pure_funcs: ['console.log', 'console.info', 'console.warn'],
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false
        }
    })]
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  devtool: 'none',
  externals: [nodeExternal()],
  plugins: [
    // new webpack.IgnorePlugin(/^encoding$/, /node-fetch/),
    // new webpack.IgnorePlugin(/aws-sdk/),
  ],
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.mjs$/,
        use: []
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [[
                "@babel/preset-env",
                {
                  "targets": {
                    "node": "12.14.1"
                  },
                  // "debug": true,
                  "useBuiltIns": "entry",
                  "corejs": 3
                }]],
              plugins: ['@babel/plugin-proposal-class-properties'],
              cacheDirectory: true,
            },
          }
        ],
      }
    ]
  }
};
