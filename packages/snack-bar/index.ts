import Vue from 'vue';
//@ts-ignore
import SnackBar from './src/SnackBar.vue';

export interface IOptions {
  content: string;
  btnText: string;
  icon: string; // 使用线上地址或者, require(‘相对路径’)
  duration?: number; // 显示多长时间（ms） 默认为 3000，传 0 则不消失
  transitionDuration?: number; // 动画执行时间（ms）默认 500
  commentBarHeight: number; // 因为 ios 和 android webview 不一样 需要通过该参数纠正
  onClickButton?: () => void; // 点击按钮回调
  onClose?: () => void; // 关闭 snackBar 回调
}

declare module 'vue/types/vue' {
  interface Vue {
    $SnackBar: typeof SnackBarShow;
  }
}

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
