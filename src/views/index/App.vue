<template>
  <!-- <section class="labour_card"> -->
    <!-- <section class="aio_listen"> -->
      <div class="aio_listen_feed">
        <AudioBookItem

          title="测试的"
          intro="234 "
          img-src="http://p8.sinaimg.cn/1093935975/180/1"
          show-number="102w"
          @item-mounted="itemMounted"
        />
      </div>
    <!-- </section> -->
  <!-- </section> -->
</template>

<script lang="ts">
import { Vue, Component, Prop } from '@mfelibs/supercomp-property-decorator';
// import AudioBookItem from '~/components/audio-book-item';

@Component({
  components: {
    // AudioBookItem
  }
})
export default class App extends Vue {
  itemMounted(){
    console.log('itemMounted')
  }
}
</script>

<style scoped></style>
