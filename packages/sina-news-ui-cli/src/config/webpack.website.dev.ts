/*
 * @Description: 开发环境 webpack 配置 -- website
 * @Author: 李明宇
 * @Date: 2021-10-20 21:46:13
 */
import path from 'path';
import WebpackBar from 'webpackbar';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './webpack.base';

const context = process.cwd();

export const getWebsiteDevConfig = () => {
  const devConfig: Configuration = {
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
    cache: {
      type: 'filesystem'
    },
    stats: 'errors-warnings', // 只显示警告和错误信息
    module: {
      rules: [
        {
          test: /\.md$/,
          use: [require.resolve('vue-loader'), require.resolve('@mfelibs/markdown-to-vue-loader')]
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
  return merge(baseConfig, devConfig);
};
