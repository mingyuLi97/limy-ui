<template>
  <div>
    SnackBarTest
    <SnackBarTest />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import SnackBarTest from './components/SnackBar.vue'

@Component({
  components: {
    SnackBarTest
  }
})
export default class App extends Vue {}
</script>

<style scoped></style>
