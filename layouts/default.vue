<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<script>
import Navbar from "@/components/nav-bar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>
