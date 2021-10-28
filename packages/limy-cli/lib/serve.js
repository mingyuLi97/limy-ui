/*
 * @Description: run dev
 * @Author: 李明宇
 * @Date: 2021-10-20 21:34:30
 */
const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");

function serve() {
  const webpackConfig = require("../webpack/dev")();
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
    console.log("Starting server on http://localhost:8080");
  });
}

module.exports = serve;
