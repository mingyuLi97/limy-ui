<!--
* @Author: limy <mingyuli1997@gmail.com>
* @Description: 输入框组件
-->
<template>
  <div :class="classes">
    <div :class="titleClasses">文本</div>
    <div :class="valueClasses">
      <input v-model.trim="msg" type="text" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';

@Component
export default class Field extends Vue {
  @Prop({ default: '请输入文本' }) placeholder!: any;

  msg: string = '';

  get classes() {
    const { b } = this;
    return [b([])];
  }

  get titleClasses() {
    const { b } = this;
    return [b('title', [])];
  }

  get valueClasses() {
    const { b } = this;
    return [b('value', [])];
  }

  get b() {
    return createBEM('limy-field');
  }
}
</script>
