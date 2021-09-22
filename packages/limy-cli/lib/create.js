/*
 * @Description: 创建项目的文件
 * @Author: 李明宇
 * @Date: 2021-09-17 23:18:39
 */

const path = require("path");
const fs = require("fs-extra");

module.exports = async (name, options) => {
  console.log(`[create] `, name, options);
  const cwd = process.cwd();
  const targetDir = path.join(cwd, name);
  console.log(`[create] `, targetDir)
  // 目录是否已经存在？
  if (fs.existsSync(targetDir)) {
    // 是否为强制创建？
    if (options.force) {
      console.log(`[create] sss`)
      await fs.remove(targetDir);
    } else {
      // TODO：询问用户是否确定要覆盖
    }
  }
};
