/**
 * 神秘代码，用来清空命令行，参考自
 *
 * https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/clearConsole.js
 */
export default function clearConsole() {
  process.stdout.write(
    process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  );
}
