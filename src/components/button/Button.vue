<!--
 * @Description: 按钮
 * @Author: 李明宇
 * @Date: 2021-10-20 20:59:51
-->
<template>
  <button :class="classes">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { createBEM } from "~/utils/create/bem";

@Component({
  components: {},
})
export default class Button extends Vue {
  @Prop({
    type: String,
    default: "default",
    validator: (v) =>
      ["default", "primary", "info", "warning", "danger"].includes(v),
  })
  type!: "default" | "primary" | "info" | "warning" | "danger";

  @Prop({
    type: Boolean,
    default: false,
  })
  disabled!: boolean;

  @Prop({
    type: String,
    default: "default",
    validator: (v) => ["default", "round", "square"].includes(v),
  })
  shape!: "square" | "round" | "default";
  
  get classes() {
    const { b, type, disabled, shape } = this;
    return [
      b([
        type,
        "shape-" + shape,
        {
          disabled,
        },
      ]),
    ];
  }

  get b() {
    return createBEM("limy-button");
  }

  created() {
    console.log(this.b("text"));
  }
}
</script>

<style scoped></style>
