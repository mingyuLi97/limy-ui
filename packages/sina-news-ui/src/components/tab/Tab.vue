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
  @Prop({ type: Number, default: 0, validator: v => v >= 0 })
  initialSlide: number;

  get classes() {
    const { b } = this;
    return [b([])];
  }

  get b() {
    return createBEM('sn-tab');
  }

  activeIndex: number = 0;

  swiper: SwiperClass | null = null;

  swiperOptions: SwiperOptions = {
    slidesPerView: 'auto'
  };

  created() {
    let initialSlide = this.initialSlide;
    if (initialSlide >= this.titles.length) {
      console.error(`[Tab] initialSlide 的值必须小于 titles 的数量`);
      initialSlide = 0;
    }
    this.activeIndex = this.swiperOptions.initialSlide = initialSlide;
  }

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
