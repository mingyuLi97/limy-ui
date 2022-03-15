<template>
  <div>
    <ul>
      <li>
        <h2>按钮类型</h2>
        <limy-button>默认按钮</limy-button>
        <limy-button type="danger">危险按钮</limy-button>
        <limy-button type="warning">警告按钮</limy-button>
        <limy-button type="info">信息按钮</limy-button>
        <limy-button type="primary">主要按钮</limy-button>
      </li>
      <li>
        <h2>禁用状态</h2>
        <limy-button type="primary" disabled>禁用按钮</limy-button>
        <limy-button type="info" disabled>禁用按钮</limy-button>
      </li>
      <li>
        <h2>按钮形状</h2>
        <limy-button type="primary" shape="default">默认按钮</limy-button>
        <limy-button type="primary" shape="square">方形按钮</limy-button>
        <limy-button type="primary" shape="round">圆角按钮</limy-button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Button from '../Button.vue';
import '../index.scss';

@Component({
  components: {
    Button
  }
})
export default class index extends Vue {}
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}
li {
  margin-bottom: 10px;
  list-style: none;
}
h2 {
  margin: 20px 0 10px 0;
  padding: 32 px 16 px 16 px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
}
</style>
