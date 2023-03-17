<template>
  <div class="py-8">
    <p
      class="max-w-2xl text-center mx-auto px-4 sm:px-6 lg:px-8"
      v-if="!lowestPrice"
    >
      Carregando...
    </p>
    <div v-else class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-semibold text-gray-900 mb-4">
        {{ id }}
      </h1>
      <div class="bg-white rounded-lg shadow-lg p-6">
        <p class="text-gray-700 text-lg mb-2">
          Maior Preço:
          <span class="font-medium text-gray-900">
            $ {{ highestPrice | toNumberFixed }}</span
          >
        </p>
        <p class="text-gray-700 text-lg mb-2">
          Menor Preço:
          <span class="font-medium text-gray-900">
            $ {{ lowestPrice | toNumberFixed }}</span
          >
        </p>
        <p class="text-gray-700 text-lg">
          Percentual da diferença:
          <span class="text-green-600 font-medium">
            {{
              (((highestPrice - lowestPrice) / lowestPrice) * 100).toFixed(2)
            }}%
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lowestPrice: {
      required: true,
    },
    highestPrice: {
      required: true,
    },
    id: {
      required: true,
    },
  },
};
</script>
