<!--
* @Author: limy <mingyuli1997@gmail.com>
* @Description: 标签页
-->
<template>
  <div :class="classes">
    <Swiper ref="SwiperRef" :options="swiperOptions">
      <SwiperSlide v-for="(item, index) in arr" :key="index">
        <div>
          {{ item }}
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { createBEM } from '~/utils/create/bem';
import 'swiper/css/swiper.css';
@Component({
  components: {
    Swiper,
    SwiperSlide
  }
})
export default class Tab extends Vue {
  @Ref('SwiperRef') readonly SwiperRef!: any;
  get classes() {
    const { b } = this;
    return [b([])];
  }

  get b() {
    return createBEM('limy-tab');
  }

  get swiper() {
    return this.SwiperRef;
  }

  swiperOptions = {};

  arr: string[] = [
    'vant',
    'vue',
    'react',
    'limy-ui',
    'webpack-dev-server',
    'marax'
  ];
}
</script>
