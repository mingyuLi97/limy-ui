/*
 * @Description: 处理命令行参数
 * @Author: 李明宇
 * @Date: 2021-11-14 15:24:22
 * @example
 *
 * "--name=xiaoming": 参数名为 name，参数值为 xiaoming
 * "--save-dev": 参数名为 save-dev，参数值为 true
 * "--age 20"：参数名为 age，参数值为 20
 */

function parseArgs(key) {
  const args = process.argv.splice(2);
  const argObj = {};
  let lastKey;

  args.forEach(arg => {
    if (arg.startsWith('--')) {
      if (lastKey && typeof argObj[lastKey] === 'undefined') {
        argObj[lastKey] = true;
      }
      const [key, value] = arg.substring(2).split('=');
      argObj[key] = value;
      lastKey = key;
    } else {
      if (lastKey && typeof argObj[lastKey] === 'undefined') {
        argObj[lastKey] = arg;
      } else {
        argObj[arg] = true;
        lastKey = arg;
      }
    }
  });
  return argObj[key];
}

module.exports = parseArgs;
