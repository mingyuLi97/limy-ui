<template>
  <div>
    <LimyTab v-if="!isIframe" :titles="titles" @slide-change="onSlideChange" />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { RouteConfig } from 'vue-router';

@Component({
  components: {}
})
export default class App extends Vue {
  get paths(): string[] {
    return (this.$router.options.routes as RouteConfig[]).map(
      route => route.path
    );
  }

  get titles(): string[] {
    return this.paths.map(path => (path === '/' ? 'home' : path.substr(1)));
  }

  get isIframe(): boolean {
    return self !== top;
  }

  onSlideChange(index: number, content: string) {
    this.$router.replace(this.paths[index]);
  }
}
</script>

<style scoped></style>
