const path = require('path');
const baseWebpackConfig = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  ...baseWebpackConfig,
  devtool: 'inline-source-map',
  mode: 'development',
  watchOptions: {
    poll: true,
  },
  stats: 'errors-warnings',
  devServer: {
    open: false,
    hot: false,
    watchFiles: [],
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
    host: 'localhost',
    port: 9001,
    static: "./src/",
    proxy: [
      {
        context: ['/api'],
        // target: 'http://192.168.8.56:8081',
        target: 'http://supplier.onmouse.cn/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    ],
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
      logging: 'info',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, "./index.html"),
      inject: "body"
    }),
    new CaseSensitivePathsWebpackPlugin(),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, './src'),
      extensions: ['ts', 'tsx', 'js', 'jsx'],
    }),
  ],
};
