<template>
  <div>
    <p>snackbar 测试</p>
    <button @click="show">展示</button>
    <button @click="hide">隐藏</button>
    <button @click="check">检查是否存在</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SnackBar, { IOptions } from '@mfelibs/aio-snack-bar';

@Component({
  components: {}
})
export default class SnackBarTest extends Vue {
  show() {
    SnackBar.show(<IOptions>{
      content: '测试的content',
      btnText: '关注',
      icon:
        'https://img2.baidu.com/it/u=1954131356,3549453457&fm=26&fmt=auto&gp=0.jpg',
      distance: 200,
      duration: 2000,
      transitionDuration: 500,
      iconBorderRadius: '10px',
      onClickButton: () => {
        console.log(`[SnackBar] onClickButton cb`);
      },
      onClose: () => {
        console.log(`[SnackBar] onClose cb`);
      },
      onUserClickClose: () => {
        console.log(`[SnackBar] onUserClickClose cb`);
      }
    });
  }
  hide() {
    SnackBar.close();
  }

  check() {
    console.log(`[SnackBar] `, SnackBar.checkExist());
  }
}
</script>
