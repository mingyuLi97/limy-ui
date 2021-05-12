/*
 * @Description: 曝光组件（指令版）
 * @Author: 李明宇
 * @Date: 2021-05-10 18:19:08
 */
import { DirectiveBinding } from 'vue/types/options';
import 'intersection-observer';

const DATASET_KEY = '__exposure_key';
const EXPOSURE_SUCCESS_CLASS = '__isExposed';

class Exposure {
  static instance: Exposure;
  _observer: IntersectionObserver | null = null; // 全局只存在一个监听对象
  _elToMeta: { [propName: string]: DirectiveBinding } = {};
  _suffix: string = '';
  _index: number = 0;
  constructor() {
    if (Exposure.instance) {
      return Exposure.instance;
    }
    this._suffix = (+new Date()).toString(36);
    this._observer = null;
    this.createIntersectionObserver();
    return (Exposure.instance = this);
  }

  private generateUniqueKey(): string {
    return `exposure_${this._index++}_${this._suffix}`;
  }

  private getDatasetKey(el: Element | HTMLElement): string {
    return (el as HTMLElement).dataset[DATASET_KEY] || '';
  }

  createIntersectionObserver() {
    if (!window.IntersectionObserver) {
      return;
    }
    this._observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const { target, intersectionRatio } = entry;
        const binding = this._elToMeta[this.getDatasetKey(target)];
        if (binding && intersectionRatio) {
          const { visibility, height, width } = window.getComputedStyle(
            target,
            null
          );
          if (
            visibility !== 'hidden' &&
            parseInt(height) * parseInt(width) !== 0
          ) {
            const cb = binding.value;
            const args = binding.arg ? binding.arg.split(',') : [];
            typeof cb === 'function' && cb(...args);
            (target as HTMLElement).classList.add(EXPOSURE_SUCCESS_CLASS);
            this.unObserve(target);
          }
        }
      });
    });
  }

  observe(el: HTMLElement, binding: DirectiveBinding) {
    const key = this.generateUniqueKey();
    el.dataset[DATASET_KEY] = key;
    this._elToMeta[key] = binding;
    this._observer && this._observer.observe(el);
  }

  unObserve(el: Element) {
    const key = this.getDatasetKey(el);
    if (this._elToMeta[key] && this._observer) {
      delete this._elToMeta[key];
      this._observer.unobserve(el);
    }
  }
}
export default new Exposure();
