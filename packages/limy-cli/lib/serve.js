/*
 * @Description: run dev
 * @Author: 李明宇
 * @Date: 2021-10-20 21:34:30
 */
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../webpack/dev")();

// const chalk = require('chalk')
const ora = require('ora')

const spinner = ora('Starting development server...')


function serve() {
  spinner.start()
  const compiler = Webpack(webpackConfig);

  const devServer = new WebpackDevServer(
    {
      hot: true,
      open: true,
      ...(webpackConfig.devServer || {}),
    },
    compiler
  );

  // Ctrl + C 触发
  ["SIGINT", "SIGTERM"].forEach((sig) => {
    process.on(sig, () => {
      devServer.stop();
      process.exit();
    });
  });

  return devServer.startCallback(() => {
    spinner.stop()
    console.log("Starting server on http://localhost:8080");
  });
}

module.exports = serve;
