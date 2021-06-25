<!--
 * @Description: 集成裁图和懒加载的图片
 * @Author: 李明宇
 * @Date: 2021-06-25 13:29:03
-->
<template>
  <img
    :alt="alt"
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
export default class AioLazyImg extends Vue {
  @Prop({
    required: true,
    type: String
  })
  src!: string;

  @Prop({
    required: false,
    type: String,
    default: ''
  })
  alt!: string;

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
  ioConfig?: IntersectionObserverInit;

  /**
   * 裁图服务配置，false时为不裁图
   */
  @Prop({
    required: false,
    type: Object,
    default: false
  })
  cutConfig!: ICutPicOpts | boolean;

  /**
   * 加载成功添加的类名
   */
  @Prop({
    required: false,
    type: String,
    default: 'v-lazyload-success'
  })
  successClass!: string;

  /**
   * 加载失败添加的类名
   */
  @Prop({
    required: false,
    type: String,
    default: 'v-lazyload-error'
  })
  errorClass!: string;

  realSrc: string = '';

  _observer: IntersectionObserver = null; // 全局只存在一个监听对象

  mounted() {
    this.realSrc = this.cutConfig
      ? getCutPicUrl(this.src, this.cutConfig as ICutPicOpts)
      : this.src;
    this.createIntersectionObserver();
    this._observer && this._observer.observe(this.$refs.img as HTMLElement);
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

            const oImg = new Image();
            const src = this.realSrc;
            oImg.src = src;

            oImg.onload = () => {
              imgEl.src = src;
              imgEl.classList.remove(this.errorClass);
              imgEl.classList.add(this.successClass);
              this._observer.unobserve(target);
              this._observer.disconnect();
            };
            oImg.onerror = () => {
              imgEl.classList.add(this.errorClass);
            };
          }
        });
      },
      this.ioConfig
    );
  }
}
</script>
