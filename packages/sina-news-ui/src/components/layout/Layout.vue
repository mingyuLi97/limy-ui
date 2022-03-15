<!--
* @Author: mingyu6 <mingyu6@staff.sina.com.cn>
* @Description: 布局组件
-->
<script lang="ts">
import { CreateElement } from 'vue';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';
import LayoutItem from './LayoutItem.vue';

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

  /**
   * 两个组件的间距，默认每一行的第一个没有 padding
   */
  @Prop({ default: 20, type: Number }) gutter!: number;

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

  mounted() {
    this.initGutter();
  }

  render(h: CreateElement) {
    return h(
      this.tag,
      {
        class: `${this.classes}`
      },
      this.$slots.default
    );
  }

  initGutter() {
    const gutter = this.gutter;
    if (!gutter) {
      return;
    }
    const spaces: { left?: number; right: number }[] = [];
    const groups: number[][] = [[]];

    let totalSpan = 0;

    (this.$children as LayoutItem[]).forEach((item, index) => {
      // @ts-ignore
      totalSpan += item.span;

      // 说明已经超出了一行
      if (totalSpan > 24) {
        totalSpan -= 24;
        groups.push([index]);
      } else {
        groups[groups.length - 1].push(index);
      }
    });
    groups.forEach(group => {
      const averagePadding = (gutter * (group.length - 1)) / group.length;

      group.forEach((item, index) => {
        if (index === 0) {
          spaces.push({ right: averagePadding });
        } else {
          const left = gutter - spaces[item - 1].right;
          const right = averagePadding - left;
          spaces.push({ left, right });
        }
      });
    });

    (this.$children as LayoutItem[]).forEach((item, index) => {
      const { left = 0, right } = spaces[index];
      (item.$el as HTMLElement).style.paddingLeft = left + 'px';
      (item.$el as HTMLElement).style.paddingRight = right + 'px';
    });
  }
}
</script>
