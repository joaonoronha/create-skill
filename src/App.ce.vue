<script lang="ts">
import { defineComponent, h } from "vue";
import type { PropType } from "vue";
import Home from "@/views/Home.ce.vue";
import "@dialpad/dialtone/lib/dist/css/dialtone.min.css";

export default defineComponent({
  name: "App",
  props: {
    background: {
      required: false,
      type: String as PropType<string>
    }
  },
  render(props: any, context: any) {
    if (props.background)
      return h(Home, { bgColor: props.background });
    else
      return h(Home);
  }
});
</script>

<style lang="less">
/* FOR CUSTOM ELEMENTS ALL STYLES MUST BE DEFINED HERE SO THEY ARE INJECTED IN THE SHADOW DOM */
@import "@dialpad/dialtone/lib/dist/css/dialtone.min.css";

.home {
  height: 100%;
  width: 100%;
  overflow: auto;
  color: var(--black-600);
  .hello-world-wrapper {
    background-color: var(--black-025);
    padding: var(--su32);
    margin: var(--su8);
    border-radius: var(--su12);
  }
}
</style>
