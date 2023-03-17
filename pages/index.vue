<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <CryptoList />
  </div>
</template>

<script>
import CryptoList from "../components/cripto-list-component.vue";
import "../filters";
export default {
  components: {
    CryptoList,
  },
};
</script>
