<!--
 * @Description: 按钮
 * @Author: 李明宇
 * @Date: 2021-10-20 20:59:51
-->
<template>
  <button :class="classes">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';

@Component({
  components: {}
})
export default class Button extends Vue {
  /**
   * 类型
   * 可选值为：'default' | 'primary' | 'info' | 'warning' | 'danger'
   */
  @Prop({
    type: String,
    default: 'default',
    validator: (v: string) =>
      ['default', 'primary', 'info', 'warning', 'danger'].includes(v)
  })
  type!: 'default' | 'primary' | 'info' | 'warning' | 'danger';

  /**
   * 是否禁用按钮
   */
  @Prop({
    type: Boolean,
    default: false
  })
  disabled!: boolean;

  /**
   * 按钮形状
   * 可选值为：'square' | 'round' | 'default';
   */
  @Prop({
    type: String,
    default: 'default',
    validator: (v: string) => ['default', 'round', 'square'].includes(v)
  })
  shape!: 'square' | 'round' | 'default';

  get classes() {
    const { b, type, disabled, shape } = this;
    return [
      b([
        type,
        'shape-' + shape,
        {
          disabled
        }
      ])
    ];
  }

  get b() {
    return createBEM('sn-button');
  }
}
</script>

<style scoped></style>
