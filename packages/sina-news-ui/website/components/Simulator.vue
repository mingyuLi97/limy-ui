<!--
 * @Description: 
 * @Wiki: 
 * @Author: 李明宇
 * @Date: 2021-11-14 17:32:27
-->
<template>
  <div :class="b()">
    <iframe :src="iframeSrc" frameborder="0" name="simulate"></iframe>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';

@Component
export default class Simulator extends Vue {
  path: string = '/';

  get iframeSrc(): string {
    return `example.html#${this.path}`;
  }

  get b() {
    return createBEM('sn-doc-simulator');
  }

  @Watch('$route')
  onRouteChange(to, from) {
    this.path = to.path;
  }
}
</script>
