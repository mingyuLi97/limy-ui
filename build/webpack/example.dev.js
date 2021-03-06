/*
 * @Description: 开发环境 webpack 配置 --example
 * @Author: 李明宇
 * @Date: 2021-10-20 21:46:13
 */
const path = require('path');
const WebpackBar = require('webpackbar');
const { merge } = require('webpack-merge');
const baseConfig = require('./base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = process.cwd();

module.exports = () => {
  const devConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
      main: path.resolve(context, 'examples/index.ts')
    },
    output: {
      chunkFilename: '[name].js',
      filename: '[name].js'
    },
    stats: 'errors-warnings', // 只显示警告和错误信息
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(context, 'examples/index.html')
      }),
      // 进度条插件
      new WebpackBar({
        name: 'Limy Cli Serve'
      })
    ]
  };
  return merge(baseConfig, devConfig);
};
