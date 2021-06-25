<template>
  <div>
    <p>snackbar 测试</p>
    <button @click="isShowSnackbar = !isShowSnackbar">{{ btnText }}</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import SnackBar, { IOptions } from '../../../../packages/snack-bar';

@Component({
  components: {}
})
export default class SnackBarTest extends Vue {
  isShowSnackbar: boolean = false;

  get btnText(): string {
    return this.isShowSnackbar ? '收起' : '展示';
  }

  @Watch('isShowSnackbar')
  onChange(val) {
    if (val) {
      SnackBar.show(<IOptions>{
        content: '测试的content',
        btnText: '关注',
        icon:
          'https://img2.baidu.com/it/u=1954131356,3549453457&fm=26&fmt=auto&gp=0.jpg'
      });
    } else {
      SnackBar.close();
    }
  }
  mounted() {}
}
</script>

<style scoped></style>
