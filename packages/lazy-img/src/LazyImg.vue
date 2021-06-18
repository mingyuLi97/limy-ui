<template>
  <img :alt="alt" v-aio-lazyload="src" :class="_classes" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AioPluginLazyload } from '@mfelibs/aio-plugins';
const vLazy = new AioPluginLazyload();

@Component({
  name: 'AioLazyImg',
  directives: {
    'aio-lazyload': {
      inserted: vLazy.observe.bind(vLazy),
      unbind: vLazy.unObserve.bind(vLazy)
    }
  },
  components: {}
})
export default class AioLazyImg extends Vue {
  @Prop({ required: true, type: String }) src!: string;

  @Prop({ required: false, type: String, default: '' }) alt!: string;

  @Prop({
    required: false,
    type: [String, Array],
    default: () => []
  })
  classes!: string | string[];

  defaultClass: string = 'img_width';

  get _classes() {
    return typeof this.classes === 'string'
      ? [this.defaultClass, this.classes]
      : [this.defaultClass, ...this.classes];
  }
}
</script>
