#!/usr/bin/env node
import { program } from 'commander';
import serve from './commands/serve';
import create from './commands/create';
// import generateMarkdown from '../build/lib/gen-md';
// import buildComponent from '../build/lib/build-component';
// import buildWebsite from '../build/lib/build-website';
type BuildTarget = 'markdown' | 'component' | 'website';

program
  .version(require('../package.json').version)
  .usage('<command> [options]');

program.command('create').description('创建一个组件').action(create);

program
  .command('serve <target>')
  .description('启动本地服务，运行目标<target>: example | website')
  .action(serve);

// program
//   .command('build <target>')
//   .option('--markdown', '代码生成 markdown 文件')
//   .option('--component', '打包组件')
//   .option('--website', '打包文档页面')
//   .action((target: BuildTarget) => {
//     const map: { [K in BuildTarget]: Function } = {
//       markdown: generateMarkdown,
//       component: buildComponent,
//       website: buildWebsite
//     };
//     map[target]();
//   });

program.parse(process.argv);
