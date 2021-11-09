import Vue from 'vue';
import _Toast from './Toast.vue';

export type ToastPosition = 'top' | 'center' | 'bottom';

export interface IToastOptions {
  message: string;
  position?: ToastPosition;
  duration?: number;
  transitionDuration?: number;
  icon?: string;
}

const ToastConstructor = Vue.extend(_Toast);

export function show(options: IToastOptions) {
  const instance = new ToastConstructor({
    data: options
  });
  instance.$mount();
  document.body.appendChild(instance.$el);
}

export default {
  install: () => {
    Vue.prototype.$Toast = show;
  }
};
