<!--
* @Author: limy <mingyuli1997@gmail.com>
* @Description: 标签页
-->
<template>
  <div :class="classes">
    <Swiper ref="SwiperRef" :options="swiperOptions">
      <SwiperSlide
        v-for="(item, index) in titles"
        :key="index"
        :class="b('content', { active: activeIndex === index })"
        @click.native="onClickSlide(index, item)"
      >
        <span>{{ item }}</span>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import SwiperClass, { SwiperOptions } from 'swiper';
import { createBEM } from '~/utils/create/bem';
import 'swiper/css/swiper.css';
@Component({
  components: {
    Swiper,
    SwiperSlide
  }
})
export default class Tab extends Vue {
  @Prop({ required: true, type: Array }) titles: string[];

  get classes() {
    const { b } = this;
    return [b([])];
  }

  get b() {
    return createBEM('limy-tab');
  }

  activeIndex: number = 0;

  swiper: SwiperClass | null = null;

  swiperOptions: SwiperOptions = {
    slidesPerView: 'auto'
  };

  mounted() {
    this.swiper = (this.$refs.SwiperRef as any).$swiper;
  }

  onClickSlide(index: number, content: string) {
    this.activeIndex = index;
    this.swiper.slideTo(index);
    this.$emit('slide-change', index, content);
  }
}
</script>
