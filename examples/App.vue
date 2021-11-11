<template>
  <div>
    <LimyTab :titles="routes" />
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
  get routes(): string[] {
    return this.$router.options.routes.map(route => {
      const path = route.path;
      return path === '/' ? 'home' : path.substr(1);
    });
  }
}
</script>

<style scoped></style>
