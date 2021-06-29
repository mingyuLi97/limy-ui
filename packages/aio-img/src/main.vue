<!--
 * @Description: 集成裁图和懒加载的图片
 * @Author: 李明宇
 * @Date: 2021-06-25 13:29:03
-->
<template>
  <img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAACAQMAAACnuvRZAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjAAIAAAQAASDSLW8AAAAASUVORK5CYII="
    ref="img"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getCutPicUrl, ICutPicOpts } from '@mfelibs/aio-plugins';

@Component({
  components: {}
})
export default class AioImg extends Vue {
  @Prop({
    required: true,
    type: String
  })
  src!: string;
  
  /**
   * 懒加载，默认开启
   */
  @Prop({
    required: false,
    type: Boolean,
    default: true
  })
  lazy!: boolean;

  /**
   * IntersectionObserverInit 配置
   */
  @Prop({
    required: false,
    type: Object,
    default: () => {
      return {
        threshold: [0],
        root: null,
        rootMargin: '0px 0px -50px 0px'
      };
    }
  })
  ioConfig!: IntersectionObserverInit;

  /**
   * 裁图服务配置
   */
  @Prop({
    required: false,
    type: Object
  })
  cutConfig?: ICutPicOpts;

  /**
   * 加载成功添加的类名
   */
  @Prop({
    required: false,
    type: String,
    default: 'aio-img-lazy-success'
  })
  successClass!: string;

  /**
   * 加载失败添加的类名
   */
  @Prop({
    required: false,
    type: String,
    default: 'aio-img-lazy-error'
  })
  errorClass!: string;

  _observer: IntersectionObserver = null; // 全局只存在一个监听对象

  mounted() {
    this.createIntersectionObserver();
    if (this.lazy) {
      this._observer && this._observer.observe(this.$refs.img as HTMLElement);
    } else {
      (this.$refs.img as HTMLImageElement).src = this.realSrc;
    }
  }

  get realSrc(): string {
    return this.cutConfig
      ? getCutPicUrl(this.src, this.cutConfig as ICutPicOpts)
      : this.src;
  }

  createIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    this._observer = new IntersectionObserver(
      (entries: Array<IntersectionObserverEntry>) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          const { target, intersectionRatio } = entry;
          if (intersectionRatio > 0) {
            const imgEl: HTMLImageElement = target as HTMLImageElement;
            const { visibility, height, width } = window.getComputedStyle(
              target,
              null
            );
            if (
              visibility !== 'hidden' &&
              parseInt(height) * parseInt(width) !== 0
            ) {
              imgEl.src = this.realSrc;
              imgEl.onload = () => {
                imgEl.classList.remove(this.errorClass);
                imgEl.classList.add(this.successClass);
                this._observer.unobserve(target);
                this._observer.disconnect();
              };
              imgEl.onerror = () => {
                imgEl.classList.add(this.errorClass);
              };
            }
          }
        });
      },
      this.ioConfig
    );
  }
}
</script>
