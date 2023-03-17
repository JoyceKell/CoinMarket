<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Navbar />
    <div class="container mx-auto">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/nav-bar-component.vue";

export default {
  components: {
    Navbar,
  },
};
</script>
