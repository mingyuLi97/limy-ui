/**
 * 图片懒加载
 *
 * 使用方法 - 必须使用在 img 标签上
 * <img class="img_width" v-lazyload="realSrc" />
 */
import { DirectiveBinding } from 'vue/types/options';
import 'intersection-observer';

// 图片懒加载结束后 根据图片的加载状态添加对应的类名
enum LazyloadState {
  SUCCESS = 'v-lazyload-success',
  ERROR = 'v-lazyload-error'
}

const DATASET_KEY = '__lazyload_key';

const DEFAULT_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACAQMAAACnuvRZAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjAAIAAAQAASDSLW8AAAAASUVORK5CYII=';

class Lazyload {
  static instance: Lazyload;
  _observer: IntersectionObserver | null = null; // 全局只存在一个监听对象
  _elToMeta: { [propName: string]: DirectiveBinding } = {}; // dom 元素 与 自定义指令 binding 的映射
  _opts: IntersectionObserverInit | undefined;
  _suffix: string = '';
  _index: number = 0;
  constructor(opts?: IntersectionObserverInit) {
    if (Lazyload.instance) {
      return Lazyload.instance;
    }
    this._observer = null;
    this._opts = opts;
    this.createIntersectionObserver();
    return (Lazyload.instance = this);
  }

  private generateUniqueKey(): string {
    return `exposure_${this._index++}_${this._suffix}`;
  }

  private getDatasetKey(el: Element | HTMLElement): string {
    return (el as HTMLElement).dataset[DATASET_KEY] || '';
  }

  createIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    this._observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const { target, intersectionRatio } = entry;
          const binding = this._elToMeta[this.getDatasetKey(target)];
          if (binding && intersectionRatio > 0) {
            const imgEl: HTMLImageElement = target as HTMLImageElement;

            const oImg = new Image();
            oImg.src = binding.value;

            oImg.onload = () => {
              imgEl.src = binding.value;
              imgEl.classList.add(LazyloadState.SUCCESS);
            };
            oImg.onerror = () => {
              imgEl.classList.add(LazyloadState.ERROR);
            };
            this.unObserve(target);
          }
        });
      },
      this._opts
    );
  }

  observe(el: HTMLElement, binding: DirectiveBinding) {
    // 检测是否为 img 标签
    if (el.tagName.toLowerCase() !== 'img') {
      throw new Error(`${binding.name} 必须在 img 标签上使用`);
    }
    // 设置默认图片
    const imgEl = el as HTMLImageElement;
    if (!imgEl.src) {
      imgEl.src = DEFAULT_SRC;
    }
    if (!binding.value || typeof binding.value !== 'string') {
      throw new Error(`${binding.value} 必须是字符串且不能为空`);
    }

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

export default new Lazyload();
