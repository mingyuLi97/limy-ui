<template>
  <div>
    <Field></Field>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Field from '../Field.vue';
import '../index.scss';
@Component({ components: { Field } })
export default class Index extends Vue {}
</script>
