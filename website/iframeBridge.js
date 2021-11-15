/*
 * @Description: 与 simulate（iframe） 通信
 * @Author: 李明宇
 * @Date: 2021-11-15 18:44:50
 */

import router from './router';

window.iframePathChange = path => {
  console.log(`[iframeBridge] iframePathChange`, path);
  router.replace(path);
};
