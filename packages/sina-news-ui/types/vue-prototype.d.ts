/*
 * @Description: vue 原型上挂载的一些方法
 * @Author: 李明宇
 * @Date: 2021-11-08 20:45:51
 */

import { show } from '~/components/toast/index';

declare module 'vue/types/vue' {
  interface Vue {
    $Toast: typeof show;
  }
}
