<!--
 * @Description: 
 * @Wiki: 
 * @Author: 李明宇
 * @Date: 2021-11-14 17:32:27
-->
<template>
  <div :class="b()">
    <iframe src="example.html" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';

@Component
export default class Simulator extends Vue {
  get b() {
    return createBEM('limy-doc-simulator');
  }
}
</script>
