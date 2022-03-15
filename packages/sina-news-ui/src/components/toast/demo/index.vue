<template>
  <div>
    <button @click="onClick">默认</button>
    <button @click="onClick1">5秒消失</button>
    <button @click="onClick2">顶部展示</button>
    <button @click="onClick3">底部展示</button>
    <button @click="onClick4">带有图标</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Toast from '../Toast.vue';
import '../index.scss';
@Component({ components: { Toast } })
export default class Index extends Vue {
  onClick() {
    this.$Toast({
      message: '我是 toast',
      duration: 1000
    });
  }

  onClick1() {
    this.$Toast({
      message: '5s 消失',
      duration: 5000
    });
  }
  onClick2() {
    this.$Toast({
      message: '顶部展示',
      position: 'top'
    });
  }

  onClick3() {
    this.$Toast({
      message: '底部展示',
      position: 'bottom'
    });
  }

  onClick4() {
    this.$Toast({
      message: '带有 icon',
      icon: 'https://img01.yzcdn.cn/vant/logo.png'
    });
  }
}
</script>
