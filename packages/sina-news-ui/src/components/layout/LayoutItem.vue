<script lang="ts">
import { CreateElement } from 'vue';
import { Vue, Component, Prop } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';
import Layout from './Layout.vue';

@Component({
  components: {}
})
export default class LayoutItem extends Vue {
  /**
   * 渲染的标签名
   */
  @Prop({ default: 'div' }) tag!: keyof HTMLElementTagNameMap;

  @Prop({ required: true, type: Number }) span: number;

  @Prop({ required: false, type: Number, default: 0 }) offset: number;

  get b() {
    return createBEM('sn-layout');
  }
  get classes() {
    const { b, span, offset } = this;
    return [
      b('col', [
        {
          [span]: span,
          ['offset-' + offset]: offset
        }
      ])
    ];
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
}
</script>

<style scoped></style>
