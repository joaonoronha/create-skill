<template>
  <div class="hello-world-wrapper d-bs-sm" :style="{ backgroundColor: bgColor }">
    <div class="d-d-flex d-jc-center d-ai-center">
      <h1 class="d-fs48">Hello World!</h1>
    </div>
    <div class="d-d-flex d-jc-center d-ai-center">
      <DialpadSVG />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import store from "../store";
import DialpadSVG from '@/assets/dialpad.vue';

export default defineComponent({
  components: {
    DialpadSVG
  },
  store: store,
  props: {
    bgColor: {
      required: true,
      type: String as PropType<string>
    }
  },
  computed: {},
});
</script>