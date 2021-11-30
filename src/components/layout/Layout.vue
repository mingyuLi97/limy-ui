<!--
* @Author: mingyu6 <mingyu6@staff.sina.com.cn>
* @Description: 布局组件
-->
<script lang="ts">
import { CreateElement } from 'vue';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';

@Component
export default class Layout extends Vue {
  /**
   * 渲染的标签名
   */
  @Prop({ default: 'div' }) tag!: keyof HTMLElementTagNameMap;

  /**
   * Flex布局主轴对其方式
   */
  @Prop({
    default: 'start',
    validator: v =>
      ['end', 'center', 'space-around', 'space-between', 'start'].includes(v)
  })
  justify!: string;

  /**
   * Flex布局交叉轴对齐方式
   */
  @Prop({
    default: 'center',
    validator: v => ['start', 'center', 'end'].includes(v)
  })
  align!: string;

  get classes() {
    const { b, justify, align } = this;
    return [
      b('row', [
        {
          ['justify-' + justify]: justify,
          ['align-' + align]: align
        }
      ])
    ];
  }

  get b() {
    return createBEM('limy-layout');
  }

  created() {}

  render(h: CreateElement) {
    return h(
      this.tag,
      {
        class: `${this.classes}`
      },
      this.$slots.default
    );
  }
}
</script>
