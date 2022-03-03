<template>
  <div class="home d-d-flex d-fd-column d-fw-wrap d-jc-center d-ai-center">
    <HelloWorld :bg-color="bgColor" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type {  PropType } from "vue";
import HelloWorld from "@/components/HelloWorld.ce.vue";

export default defineComponent({
  name: "Home",
  props: {
    bgColor: {
      required: false,
      default: "#f2f2f6",
      type: String as PropType<string>
    }
  },
  components: {
    HelloWorld,
  },
  methods: {},
  computed: {},
});
</script>
