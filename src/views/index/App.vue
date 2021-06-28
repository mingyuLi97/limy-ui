<template>
  <!-- <section class="labour_card"> -->
  <!-- <section class="aio_listen"> -->
  <div class="aio_listen_feed">
    <div style="width: 100%; height:100vh; background-color: red;"></div>
  <AioImgTest />
    <AioAudioBookItem
      title="测试的"
      intro="234 "
      img-src="http://p8.sinaimg.cn/1093935975/180/1"
      show-number="102w"
      @item-mounted="itemMounted"
    />
  <SnackBarTest />
  </div>
  <!-- </section> -->
  <!-- </section> -->
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AioAudioBookItem } from '~/index';
import SnackBarTest from './components/SnackBar.vue'
import AioImgTest from './test-pages/AioImgTest.vue'
@Component({
  components: {
    AioAudioBookItem,
    SnackBarTest,
    AioImgTest
  }
})
export default class App extends Vue {
  itemMounted() {
    console.log('itemMounted');
  }

}
</script>

<style scoped></style>
