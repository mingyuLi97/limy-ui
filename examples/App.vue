<template>
  <div>
    <LimyTab :titles="titles" @slide-change="onSlideChange" />
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
export default class App extends Vue {
  get paths(): string[] {
    return this.$router.options.routes.map(route => route.path);
  }

  get titles(): string[] {
    return this.paths.map(path => (path === '/' ? 'home' : path.substr(1)));
  }

  onSlideChange(index: number, content: string) {
    this.$router.replace(this.paths[index]);
  }
}
</script>

<style scoped></style>
