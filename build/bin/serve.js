/*
 * @Description: run dev
 * @Author: 李明宇
 * @Date: 2021-10-20 21:34:30
 */
const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { getFreePort, getLocalIp } = require('../utils/get-free-port');
const clearConsole = require('../utils/clear-console');
const chalk = require('chalk');
const parseArgs = require('../utils/parse-args');

// const chalk = require('chalk')
const ora = require('ora');

const target = parseArgs('target') || 'example';
const webpackConfig =
  target === 'example'
    ? require('../webpack/example.dev')()
    : require('../webpack/website.dev')();

const spinner = ora('Starting development server...');

function printInstructions(urls) {
  console.log(`  App ${target} running at:`);
  console.log();

  console.log(`  - ${chalk.bold('Local:')}    ${chalk.cyan(urls.local)}`);
  console.log(`  - ${chalk.bold('Network:')}  ${chalk.cyan(urls.network)}`);

  console.log();
}

async function serve() {
  const port = await getFreePort(8888);
  spinner.start();
  const compiler = Webpack(webpackConfig);

  const devServer = new WebpackDevServer(
    {
      port,
      hot: true,
      open: false,
      host: '0.0.0.0',
      client: {
        logging: 'error'
      },
      ...(webpackConfig.devServer || {})
    },
    compiler
  );
  const urls = {
    local: `http://localhost:${port}`,
    network: `http://${getLocalIp()}:${port}`
  };

  compiler.hooks.done.tap('done', () => {
    clearConsole();
    printInstructions(urls);
  });

  // Ctrl + C 触发
  ['SIGINT', 'SIGTERM'].forEach(sig => {
    process.on(sig, () => {
      devServer.stop();
      process.exit();
    });
  });

  return devServer.startCallback(() => {
    spinner.stop();
  });
}

serve();
