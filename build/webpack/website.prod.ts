/*
 * @Description: 文档系统的生产环境配置
 * @Author: 李明宇
 * @Date: 2021-12-12 16:17:44
 */
const path = require('path');
const WebpackBar = require('webpackbar');
const { merge } = require('webpack-merge');
const baseConfig = require('./base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const context = process.cwd();

module.exports = () => {
  const devConfig = {
    mode: 'production',
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
