/*
 * @Description:
 * @Wiki:
 * @Author: 李明宇
 * @Date: 2021-05-11 16:16:27
 */

import { Vue, Component } from '@mfelibs/supercomp-property-decorator';
import { VExposure, VLazyload } from '~/tools';

@Component({
  components: {},
  directives: {
    exposure: {
      inserted: VExposure.observe.bind(VExposure),
      unbind: VExposure.unObserve.bind(VExposure)
    },
    lazyload: {
      inserted: VLazyload.observe.bind(VLazyload),
      unbind: VLazyload.unObserve.bind(VLazyload)
    }
  }
})
export default class BaseComponent extends Vue {
  mounted() {
    console.log(this.$options.name);
    this.$emit('item-mounted');
  }
}
