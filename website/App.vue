<template>
  <div class="limy-doc">
    <DocHeader />
    <NavBar />
    <DocContainer />
    <Simulator />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import DocHeader from './components/DocHeader.vue';
import NavBar from './components/NavBar.vue';
import Simulator from './components/Simulator.vue';
import DocContainer from './components/DocContainer.vue';
@Component({
  components: {
    DocHeader,
    NavBar,
    DocContainer,
    Simulator
  }
})
export default class App extends Vue {}
</script>
