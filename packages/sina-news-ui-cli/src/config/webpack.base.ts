/*
 * @Description: 公共的 webpack 环境配置
 * @Author: 李明宇
 * @Date: 2021-10-20 21:46:08
 */
import path from 'path';
import Webpack from 'webpack';
import VueLoaderPlugin from 'vue-loader/lib/plugin-webpack5';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

const context = process.cwd();
const baseConfig: Webpack.Configuration = {
  resolve: {
    extensions: ['.js', '.vue', '.ts', '.d.ts'],
    alias: {
      '~': path.resolve(context, 'src'),
      '@types': path.resolve(context, 'types')
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              esModule: false // css-loader 在解析 css文件的 url 时会当作 require，因为 css文件中不能使用 default 所以需要配置
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env']
              }
            }
          },
          {
            loader: require.resolve('sass-loader')
          }
        ]
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        use: [
          {
            loader: require.resolve('url-loader'), // 可以把图片转换为 base64，不在limit限制的自动调用 file-loader
            options: {
              limit: 1024 * 4,
              name: 'img/[name].[hash:6].[ext]' // 设置输出文件的名称
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader')
          }
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              // 处理 .vue 文件中的 <script lang="ts">
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: [require.resolve('vue-loader')]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin({
      clearConsole: false
    })
  ]
};

export default baseConfig;
