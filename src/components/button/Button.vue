<!--
 * @Description: 按钮
 * @Author: 李明宇
 * @Date: 2021-10-20 20:59:51
-->
<template>
  <button>button</button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { createBEM } from '~/utils/create/bem';


@Component({
  components:{
  }
})
export default class Button extends Vue{

  get b(){
    return createBEM(this.$options.name)
  }

  created() {
    console.log(this.b('text'));
  }
}
</script>

<style scoped>
</style>