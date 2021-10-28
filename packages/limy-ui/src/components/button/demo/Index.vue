<template>
  <div class="red">
    l-button
    <!-- <l-button></l-button> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
})
export default class index extends Vue {}
</script>

<style scoped>
.red {
  background-color: red;
}
</style>
