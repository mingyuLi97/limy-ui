<template>
  <div class="red">
    l-button
    <!-- <l-button></l-button> -->
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Button from "../Button.vue";
import { createBEM } from "~/utils/create/bem";

@Component({
  components: {
    Button,
  },
})
export default class index extends Vue {
  get bem() {
    return createBEM("button");
  }

  created() {
    console.log(`[index] `);
    const b = this.bem;
    console.log(
      b() + "\n",
      b("text") + "\n",
      b({ disabled: true }) + "\n",
      b("text", { disabled: true, abc: false, def: true })
    );
  }
}
</script>

<style scoped>
.red {
  background-color: red;
}
</style>
