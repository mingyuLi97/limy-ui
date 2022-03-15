/*
 * @Description: 开发环境 webpack 配置 --example
 * @Author: 李明宇
 * @Date: 2021-10-20 21:46:13
 */
import path from 'path';
import { Configuration } from 'webpack';
import WebpackBar from 'webpackbar';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './webpack.base';

const context = process.cwd();

export const getExampleDevConfig = () => {
  const devConfig: Configuration = {
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
        name: 'SNUI Cli Serve'
      })
    ]
  };
  return merge(baseConfig, devConfig);
};