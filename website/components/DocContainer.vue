<!--
 * @Description: 文档内容区域
 * @Author: 李明宇
 * @Date: 2021-11-14 17:36:44
-->
<template>
  <div :class="b()">
    <section>
      <keep-alive>
        <router-view />
      </keep-alive>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';

@Component
export default class DocContainer extends Vue {
  get b() {
    return createBEM('limy-doc-container');
  }
}
</script>
