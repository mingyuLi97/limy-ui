/*
 * @Description: 整个项目的命令
 * @Author: 李明宇
 * @Date: 2021-12-12 19:14:32
 */

import program from 'commander';
import serve from '../build/lib/serve';
import create from '../build/lib/create';
import generateMarkdown from '../build/lib/gen-md';
import buildComponent from '../build/lib/build-component';
import buildWebsite from '../build/lib/build-website';
type BuildTarget = 'markdown' | 'component' | 'website';

program
  .version(require('../package.json').version)
  .usage('<command> [options]');

program.command('create').description('创建一个组件').action(create);

program
  .command('serve <target>')
  .description('启动本地服务，运行目标<target>: example | website')
  .action(serve);

program
  .command('build <target>')
  .option('--markdown', '代码生成 markdown 文件')
  .option('--component', '打包组件')
  .option('--website', '打包文档页面')
  .action((target: BuildTarget) => {
    const map: { [K in BuildTarget]: Function } = {
      markdown: generateMarkdown,
      component: buildComponent,
      website: buildWebsite
    };
    map[target]();
  });

program.parse(process.argv);

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  });
  return args;
}
