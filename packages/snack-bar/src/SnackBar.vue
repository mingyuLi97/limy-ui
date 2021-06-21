<!--
 * @Description: hb 模拟 native snackbar 弹窗
 * @Author: 李明宇
 * @Date: 2021-06-17 10:35:51
-->
<template>
  <div
    class="aio-snack-bar"
    :style="`transition: all ${transitionDuration}ms;${visibleStyle}`"
  >
    <div class="aio-snack-bar__wrapper">
      <div class="aio-snack-bar__icon">
        <img class="img_width" :src="icon" />
      </div>

      <span class="aio-snack-bar__content">{{ content }}</span>

      <div class="aio-snack-bar__button" @click="handleBottonClick">
        {{ btnText }}
      </div>
      <div class="aio-snack-bar__close" @click="onClickClose" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import './index.css';

@Component({
  components: {}
})
export default class SnackBar extends Vue {
  onClose: () => void = null; // 当弹窗关闭
  onClickButton: () => void = null; // 点击按钮回调
  onUserClickClose: () => void = null; // 当用户点击关闭按钮
  icon: string = null;
  content: string = null;
  btnText: string = null;
  duration: number = 3000; // 显示多长时间（ms） 默认为 3000，传 0 则不消失
  transitionDuration: number = 500; // 动画执行时间（ms）默认 500
  commentBarHeight: number = 0; // 因为 ios 和 android webview 不一样 需要通过该参数纠正
  timer: any = null;
  visible: boolean = false;

  get visibleStyle(): string {
    return this.visible
      ? `transform: translate(0, -${this.remToPx(1.64) +
          this.commentBarHeight}px);`
      : `opacity: 0;`;
  }

  mounted() {
    // 如果直接把 visible 设置为 true，第一次渲染不会出现动画
    setTimeout(() => {
      this.visible = true;
    }, 100);
    this.startTimer();
  }

  remToPx(rem: number): number {
    return rem * parseInt(document.querySelector('html').style.fontSize);
  }

  startTimer() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.visible) {
          this.close();
        }
      }, this.duration);
    }
  }

  handleBottonClick() {
    console.log(`[SnackBar] 点击了按钮`);
    this.onClickButton();
  }

  onClickClose() {
    if (typeof this.onUserClickClose === 'function') {
      console.log(`[SnackBar] 执行用户关闭方法`);
      this.onUserClickClose();
    }
    this.close()
  }

  close() {
    if(!this.visible) return
    this.visible = false;
    if (typeof this.onClose === 'function') {
      this.onClose();
    }
    // 动画执行结束后移除当前的 dom
    setTimeout(() => {
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    }, this.transitionDuration);
  }
}
</script>
