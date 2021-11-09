<!--
* @Author: limy <mingyuli1997@gmail.com>
* @Description: 弹窗组件
-->
<template>
  <div :class="classes" :style="hideTransiton">
    <img v-if="icon" :src="icon" />
    <span> {{ message }} </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';
import { ToastPosition } from '.';

@Component
export default class Toast extends Vue {
  visible: boolean = false;
  duration: number = 1000;
  position: ToastPosition = 'center';
  message: string = '';
  icon: string = '';
  transitionDuration: number = 200; // 动画执行时间（ms）默认 500

  get classes() {
    const { b, position, visible } = this;
    return [
      b([
        position,
        {
          hide: !visible
        }
      ])
    ];
  }

  get b() {
    return createBEM('limy-toast');
  }

  get hideTransiton() {
    return `transition: opacity ${this.transitionDuration}ms linear;`;
  }

  mounted() {
    this.visible = true;
    setTimeout(() => {
      this.close();
    }, this.duration);
  }

  close() {
    if (!this.visible) return;
    this.visible = false;
    // 动画执行结束后移除当前的 dom
    setTimeout(() => {
      this.$destroy();
      this.$el.parentNode?.removeChild(this.$el);
    }, this.transitionDuration);
  }

  /**
   * 直接关闭，无动画
   */
  forceClose() {
    this.$destroy();
    this.$el.parentNode?.removeChild(this.$el);
  }
}
</script>
