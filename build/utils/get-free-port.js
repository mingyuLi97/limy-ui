/*
 * @Description: 获取空闲的端口号
 * @Author: 李明宇
 * @Date: 2021-10-28 20:48:38
 */
const devIp = require("dev-ip");
const portscanner = require("portscanner");

function getLocalIp() {
  const ip = devIp();
  // vpn 下 ip 为数组，第一个元素为本机局域网 ip
  // 第二个元素为 vpn 远程局域网 ip
  return ip ? (Array.isArray(ip) ? ip[0] : ip) : "0.0.0.0";
}

async function getFreePort(startPort) {
  const endPort = startPort + 20;
  return portscanner.findAPortNotInUse(startPort, endPort, getLocalIp());
}

module.exports = {
  getFreePort,
  getLocalIp,
};
