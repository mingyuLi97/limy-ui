<!--
 * @Description: 小视频卡 item 组件
 * @Author: 李明宇
 * @Date: 2021-06-21 11:16:17
-->
<template>
  <figure
    class="video_con_fig i_bg"
    @click="handleClick"
    v-exposure="handleExposure"
  >
    <aio-img :src="itemInfo.cover" :cutConfig="coverCutConfig" />
    <div class="video_con_info">
      <span class="video_con_info_txt">{{ itemInfo.content }}</span>
      <div class="video_con_info_row">
        <aio-img class="video_con_info_img" :src="avatar" />
        <b class="video_con_info_id">{{ itemInfo.userName }}</b>
        <span class="video_con_info_num">{{
          itemInfo.playCount | numFilter
        }}</span>
      </div>
    </div>
    <i class="ic_play"></i>
  </figure>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { IMiniVideoOptions } from '../index';
import AioImg from '@mfelibs/aio-img';
import { formatNumber, ICutPicOpts,  VueExposure } from '@mfelibs/aio-plugins';
Vue.use(VueExposure, {
  name: 'exposure',
  
  ioConfig: <IntersectionObserverInit>{}
})

@Component({
  components: {
    AioImg
  },
  filters: {
    numFilter(res: number) {
      return res ? formatNumber(res) + '次播放' : '';
    }
  }
})
export default class MiniVideo extends Vue {
  @Prop({
    required: true,
    type: Object
  })
  itemInfo!: IMiniVideoOptions;

  get avatar(): string {
    return this.itemInfo.avatar;
  }

  get coverCutConfig(): ICutPicOpts {
    return {
      width: 165 * 2,
      height: 220 * 2
    };
  }

  handleExposure() {
    this.$emit('item-exposure');
  }

  handleClick() {
    this.$emit('item-click');
  }
}
</script>
