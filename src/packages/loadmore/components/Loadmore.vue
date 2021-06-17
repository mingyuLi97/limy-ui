<!--
 * @Description: 加载更多
 * @Author: 李明宇
 * @Date: 2021-05-26 18:59:56
-->

<template>
  <div
    v-show="isShow"
    class="aio_loading"
    :class="{ loading: isLoading }"
    ref="loadmore"
    @click="handleClick"
  >
    <span>{{ _text }}</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import '../style/index.css';
import { AioLoadmoreState } from '../index';

@Component({
  name: 'AioLoadmore'
})
export default class AioLoadmore extends Vue {
  // 页面的状态
  @Prop({ required: true, type: String }) loadmoreState!: AioLoadmoreState;

  // 到底了加载文案
  @Prop({ type: String, default: '没有更多了' }) endText!: string;

  // 加载中文案
  @Prop({ type: String, default: '加载中...' }) loadingText!: string;

  // 网络错误时文案
  @Prop({ type: String, default: '点击加载更多' }) errorText!: string;

  // 配置
  @Prop({ type: Object }) options?: IntersectionObserverInit;

  observer: IntersectionObserver | null = null;

  get isShow(): boolean {
    return this.loadmoreState !== 'hide';
  }

  get isLoading(): boolean {
    return this.loadmoreState === 'loading';
  }

  get isEnd(): boolean {
    return this.loadmoreState === 'end';
  }

  get isError(): boolean {
    return this.loadmoreState === 'error'
  }

  get _text(): string {
    let text: string;
    switch (this.loadmoreState) {
      case 'loading':
        text = this.loadingText;
        break;
      case 'end':
        text = this.endText;
        break;
      case 'error':
        text = this.errorText;
        break;
      default:
        text = '';
        break;
    }
    return text;
  }

  get obeserveDom(): Element {
    return this.$refs.loadmore as Element;
  }

  created() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio) {
          if (this.isLoading || this.isEnd || this.isError) return;
          this.$emit('loadmore');
        }
      });
    }, this.options);
  }

  mounted() {
    this.observer && this.observer.observe(this.obeserveDom);
  }

  beforeDestroy() {
    if (this.observer) {
      this.observer.unobserve(this.obeserveDom);
      this.observer.disconnect();
      this.observer = null;
    }
  }

  handleClick() {
    if (this.loadmoreState === 'error') {
      this.$emit('loadmore');
    }
  }
}
</script>
