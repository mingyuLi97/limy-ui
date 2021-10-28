/*
 * @Description: 开发环境 webpack 配置
 * @Author: 李明宇
 * @Date: 2021-10-20 21:46:13
 */
const path = require("path");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
// const limyConfig = require("./limy");
const baseConfig = require("./base");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const context = process.cwd()

module.exports = () => {
  const devConfig = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
      main: path.resolve(__dirname, '../site/demo/index.js')
    },
    output: {
      chunkFilename: '[name].js',
      filename: '[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../site/demo/index.html')
      })
    ]
  };
  return merge(baseConfig, devConfig);
};
