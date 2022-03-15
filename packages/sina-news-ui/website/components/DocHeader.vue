<template>
  <div :class="b()">
    <span>sn ui</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';

@Component
export default class DocHeader extends Vue {
  get b() {
    return createBEM('sn-doc-header');
  }
}
</script>
