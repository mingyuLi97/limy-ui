import Vue from 'vue';
import SnackBar from './src/SnackBar.vue';
import { IOptions } from './types';

const SnackBarConstructor = Vue.extend(SnackBar);

export const SnackBarShow = function(options: IOptions) {
  const instance = new SnackBarConstructor({
    data: options
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
};

export default {
  install: () => {
    console.log(`[SnackBar] 注册 SnackBar`);
    Vue.prototype.$SnackBar = SnackBarShow;
  }
};
