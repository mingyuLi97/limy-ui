/*
 * @Description: run dev
 * @Author: 李明宇
 * @Date: 2021-10-20 21:34:30
 */
import ora from 'ora';
import chalk from 'chalk';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import clearConsole from '../utils/clear-console';
import { getFreePort, getLocalIp } from '../utils/get-free-port';
import { getWebsiteDevConfig } from '../webpack/website.dev';
import { getExampleDevConfig } from '../webpack/example.dev';

interface IUrls {
  local: string;
  network: string;
}
export type ServeTarget = 'example' | 'website';

const spinner = ora('Starting development server...');

function printInstructions(urls: IUrls, target: ServeTarget) {
  console.log(`  App ${target} running at:`);
  console.log();

  console.log(`  - ${chalk.bold('Local:')}    ${chalk.cyan(urls.local)}`);
  console.log(`  - ${chalk.bold('Network:')}  ${chalk.cyan(urls.network)}`);

  console.log();
}

export default async function serve(target: ServeTarget) {
  const webpackConfig =
    target === 'example' ? getExampleDevConfig() : getWebsiteDevConfig();
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
    printInstructions(urls, target);
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
