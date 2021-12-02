<template>
  <div class="layout-container">
    <Layout>
      <LayoutItem :span="6">
        <div style="background: red">span:6</div>
      </LayoutItem>
      <LayoutItem :span="6">
        <div style="background: red">span:6</div>
      </LayoutItem>
      <LayoutItem :span="6">
        <div style="background: red">span:6</div>
      </LayoutItem>
      <LayoutItem :span="6">
        <div style="background: red">span:6</div>
      </LayoutItem>
    </Layout>
    <Layout>
      <LayoutItem :span="4">span:4</LayoutItem>
      <LayoutItem :span="8">span:8</LayoutItem>
      <LayoutItem :span="4" :offset="4">span:4;offset:4</LayoutItem>
      <LayoutItem :span="4"> span:4</LayoutItem>
    </Layout>

    <Layout>
      <LayoutItem :span="8">span:4</LayoutItem>
      <LayoutItem :span="8">span:8</LayoutItem>
      <LayoutItem :span="4" :offset="4">span:4;offset:4</LayoutItem>
      <LayoutItem :span="4"> span:4</LayoutItem>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Layout from '../Layout.vue';
import LayoutItem from '../LayoutItem.vue';
import '../index.scss';
@Component({ components: { Layout, LayoutItem } })
export default class Index extends Vue {}
</script>

<style lang="scss" scoped>
.limy-layout__col {
  // background-color: skyblue;
  overflow: hidden;
  word-break: break-all;
  text-align: center;
  border: 1px solid blue;
}
</style>
