/*
 * @Description: 公共的 webpack 环境配置
 * @Author: 李明宇
 * @Date: 2021-10-20 21:46:08
 */
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const path = require("path");

const context = process.cwd();
module.exports = {
  resolve: {
    extensions: [".js", ".vue", ".ts"],
    alias: {
      "~": path.resolve(context, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              esModule: false, // css-loader 在解析 css文件的 url 时会当作 require，因为 css文件中不能使用 default 所以需要配置
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
          {
            loader: "sass-loader"
          }
        ],
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        use: [
          {
            loader: "url-loader", // 可以把图片转换为 base64，不在limit限制的自动调用 file-loader
            options: {
              limit: 1024 * 4,
              name: "img/[name].[hash:6].[ext]", // 设置输出文件的名称
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              // 处理 .vue 文件中的 <script lang="ts">
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false,
    }),
  ],
};
