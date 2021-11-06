<template>
  <div>
    <h1>Limy ui</h1>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class App extends Vue {}
</script>

<style scoped></style>
