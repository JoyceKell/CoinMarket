<template>
  <div>
    <CryptoList />
  </div>
</template>

<script>
import CryptoList from "../components/cripto-list.vue";
import "../filters";
export default {
  components: {
    CryptoList,
  },
};
</script>
