<template>
  <div>
    <Tab :titles="['a', 'b', 'c', 'd', 'e', 'f']" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Tab from '../Tab.vue';
import '../index.scss';
@Component({ components: { Tab } })
export default class Index extends Vue {}
</script>
