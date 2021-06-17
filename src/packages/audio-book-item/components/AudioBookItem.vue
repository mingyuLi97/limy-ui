<template>
  <div class="aio_listen_row" @click="handleClick" v-exposure="handleExposure">
    <figure class="aio_listen_row_img">
      <aio-lazy-img :src="imgSrc" />
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AioPluginExposure } from '@mfelibs/aio-plugins';
import AioLazyImg from '../../lazy-img';
import '../style/index.css';

const vExp = new AioPluginExposure();

@Component({
  name: 'AioAudioBookItem',
  components: {
    AioLazyImg
  },
  directives: {
    exposure: {
      inserted: vExp.observe.bind(vExp),
      unbind: vExp.unObserve.bind(vExp)
    }
  }
})
export default class AudioBookItem extends Vue {
  // 标题
  @Prop({
    required: true,
    type: String
  })
  title!: string;

  @Prop({
    required: false,
    type: String
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
