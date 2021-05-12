<!--
 * @Description: 听书 item
 * @design: https://svn.intra.sina.com.cn/cdc/ui/%E7%A7%BB%E5%8A%A8%E9%A1%B9%E7%9B%AE/%E6%96%B0%E9%97%BB%E5%AE%A2%E6%88%B7%E7%AB%AF/UI/phone/04%E6%AD%A3%E6%96%87/%E5%90%AC%E4%B9%A6/2021-4-7_%E5%90%AC%E4%B9%A6%E6%8E%A8%E8%8D%90tab%20/%e5%88%87%e5%9b%be%e6%a0%87%e6%b3%a8/index.html#artboard0
 * @Author: 李明宇
 * @Date: 2021-05-11 15:57:25
-->
<template>
  <div
    class="aio_listen_row"
    @click="handleClick"
    v-exposure="handleExposure"
  >
    <figure class="aio_listen_row_img">
      <img class="img_width" v-lazyload="imgSrc" />
    </figure>
    <div class="aio_listen_row_flex">
      <h2 class="aio_listen_row_tit">{{ title }}</h2>
      <p class="aio_listen_row_intro" v-if="intro">{{ intro }}</p>
      <span class="aio_listen_row_data" v-if="parseInt(showNumber)">
        {{ showNumber }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from '@mfelibs/supercomp-property-decorator';
import BaseComponent from '~/BaseComponent';
import '../css/AudioBookItem.css';

@Component({
  components: {}
})
export default class AudioBookItem extends BaseComponent {
  @Prop({
    required: true,
    type: String
  })
  title!: string;

  @Prop({
    required: false,
    type: String,
  })
  intro?: string;

  @Prop({
    required: true,
    type: String
  })
  imgSrc!: string;

  @Prop({
    required: false
  })
  showNumber?: string;

  handleClick() {
    this.$emit('item-click');
  }

  handleExposure() {
    this.$emit('item-exposure');
  }
}
</script>

<style >
.aio_listen_row_data::before {
  background-image: url('');
}
</style>