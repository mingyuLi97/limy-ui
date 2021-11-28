/*
 * @Description: 开发环境 webpack 配置 -- website
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
  const demoDevConfig = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
      main: path.resolve(context, 'website/index.ts'),
      simulator: path.resolve(context, 'examples/index.ts')
    },
    output: {
      chunkFilename: '[name].js',
      filename: '[name].js'
    },
    stats: 'errors-warnings', // 只显示警告和错误信息
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [
            'vue-loader',
            path.resolve(__dirname, 'markdown-loader/index.js')
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(context, 'website/public/index.html'),
        filename: 'index.html',
        chunks: ['main']
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(context, 'examples/index.html'),
        filename: 'example.html',
        chunks: ['simulator']
      }),
      // 进度条插件
      new WebpackBar({
        name: 'Limy Cli Serve'
      })
    ]
  };
  return merge(baseConfig, demoDevConfig);
};
