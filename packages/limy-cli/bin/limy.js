#! /usr/bin/env node

const inquirer = require("inquirer");
const program = require("commander");
const chalk = require("chalk");
const ora = require("ora");

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});

program
  .version(require("../package.json").version)
  .usage("<command> [option]")
  .on("--help", () => {
    // 新增说明信息
    console.log(
      `\r\nRun ${chalk.cyan(
        `limy-cli <command> --help`
      )} for detailed usage of given command\r\n`
    );
  });

// 创建一个项目
program
  .command("create <name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    require("../lib/create")(name, options);
  });

program
  .command("dev")
  .description("run dev")
  .action((a, b) => {
    require('../lib/serve')()
  });

program.parse(process.argv);

// inquirer
//   .prompt([
//     {
//       type: "input",
//       name: "name",
//       message: "Your name",
//       default: "my-node-cli",
//     },
//   ])
//   .then((answers) => {
//     // 打印互用输入结果
//     console.log(answers);
//   });

// // 自定义文本信息
// const message = "Loading unicorns";
// // 初始化
// const spinner = ora(message);
// // 开始加载动画
// spinner.start();

// setTimeout(() => {
//   // 修改动画样式

//   // Type: string
//   // Default: 'cyan'
//   // Values: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
//   spinner.color = "red";
//   spinner.text = "Loading rainbows";

//   setTimeout(() => {
//     // 加载状态修改
//     spinner.stop(); // 停止
//     spinner.succeed("Loading succeed"); // 成功 ✔
//     // spinner.fail(text?);  失败 ✖
//     // spinner.warn(text?);  提示 ⚠
//     // spinner.info(text?);  信息 ℹ
//   }, 2000);
// }, 2000);
