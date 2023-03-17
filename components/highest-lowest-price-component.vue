<template>
  <div class="py-8">
    <p
      v-if="isLoading"
      class="max-w-2xl text-center mx-auto px-4 sm:px-6 lg:px-8"
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
            $ {{ toNumberFixed(highestPrice) }}
          </span>
        </p>
        <p class="text-gray-700 text-lg mb-2">
          Menor Preço:
          <span class="font-medium text-gray-900">
            $ {{ toNumberFixed(lowestPrice) }}
          </span>
        </p>
        <p class="text-gray-700 text-lg">
          Percentual da diferença:
          <span class="text-green-600 font-medium"> {{ percentDiff }}% </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import FormatNumber from "../mixins/format-number";
export default {
  mixins: [FormatNumber],
  props: {
    lowestPrice: {
      type: Number,
      required: true,
    },
    highestPrice: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    percentDiff() {
      return (
        ((this.highestPrice - this.lowestPrice) / this.lowestPrice) *
        100
      ).toFixed(2);
    },
  },
};
</script>
