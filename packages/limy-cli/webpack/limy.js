/*
 * @Description: 获取外部 limy.config.js 配置信息
 * @Author: 李明宇
 * @Date: 2021-10-21 22:39:40
 */

const fs = require("fs-extra");
const path = require("path");

const DEFAULT_CONFIG_FILE = "limy.config.js";
let limyConfig = {};

try {
  const configFilePath = path.resolve(process.cwd(), DEFAULT_CONFIG_FILE);
  fs.accessSync(configFilePath);
  limyConfig = require(configFilePath);
} catch (err) {
  console.log();
  console.log("未找到配置文件", err.message);
  console.log();
}

module.exports = limyConfig;
