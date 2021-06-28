import Vue from 'vue';
//@ts-ignore
import SnackBar from './src/SnackBar.vue';
const SnackBarConstructor = Vue.extend(SnackBar);

export interface IOptions {
  content: string;
  btnText: string;
  icon: string; // 使用线上地址或者, require(‘相对路径’)
  iconBorderRadius?: string;
  duration?: number; // 显示多长时间（ms） 默认为 3000，传 0 则不消失
  distance?: number; // 弹出的高度 单位 px，默认为 1.64 rem
  transitionDuration?: number; // 动画执行时间（ms）默认 500
  commentBarHeight: number; // 因为 ios 和 android webview 不一样 需要通过该参数纠正
  onClickButton?: () => void; // 点击按钮回调
  onClose?: () => void; // snackBar 关闭回调
  onUserClickClose?: () => void; // 用户点击关闭 snackBar 回调
}

declare module 'vue/types/vue' {
  interface Vue {
    $SnackBar: {
      show: typeof show;
      close: typeof close;
    };
  }
}

let instance = null;

function show(options: IOptions) {
  if (instance?.visible) {
    console.error(`[snackBar] 已存在一个弹层`);
    instance.forceClose();
  }
  instance = new SnackBarConstructor({
    data: options
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
}

function close() {
  instance && instance.$options.methods.close.bind(instance)();
}

function checkExist(): boolean{
  return !!instance?.visible
}

export default {
  install: () => {
    console.log(`[SnackBar] 注册 SnackBar`);
    Vue.prototype.$SnackBar = show;
  },
  show,
  close,
  checkExist
};
