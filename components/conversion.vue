<template>
  <div class="p-4 md:p-8">
    <h2 class="text-2xl font-bold mb-4">Conversor de Moedas</h2>
    <div class="flex flex-col md:flex-row md:space-x-4">
      <div class="w-full md:w-1/3 mb-4 md:mb-0">
        <label
          for="amount"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Quantidade:
        </label>
        <input
          type="number"
          v-model="amount"
          id="amount"
          class="border border-gray-300 rounded-md p-2 w-full"
        />
      </div>
      <div class="w-full md:w-1/3 mb-4 md:mb-0">
        <label
          for="base-currency"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Moeda Base:
        </label>
        <select
          v-model="baseCurrency"
          id="base-currency"
          class="border border-gray-300 rounded-md p-2 w-full"
        >
          <option
            v-for="currency in currencies"
            :key="currency.rank"
            :value="currency"
          >
            {{ currency.name }} ({{ currency.symbol }})
          </option>
        </select>
      </div>
      <div class="w-full md:w-1/3">
        <label
          for="target-currency"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Moeda de Destino:
        </label>
        <select
          v-model="targetCurrency"
          id="target-currency"
          class="border border-gray-300 rounded-md p-2 w-full"
        >
          <option
            v-for="currency in currencies"
            :key="currency.rank"
            :value="currency"
          >
            {{ currency.name }} ({{ currency.symbol }})
          </option>
        </select>
      </div>
    </div>
    <div class="mt-4">
      <button
        @click="convertCurrency"
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4"
        :disabled="!this.targetCurrency || !this.baseCurrency"
      >
        Converter
      </button>
    </div>
    <div
      v-if="conversion"
      class="mt-4 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg p-6"
    >
      <p class="text-lg">
        {{ this.conversion.value }} {{ this.conversion.baseSymbol }} equivale à
        {{ this.conversion.result }}
        {{ this.conversion.targetSymbol }}
      </p>
    </div>
  </div>
</template>

<script>
import api from "../service/api";
const MAX_LIMIT = 2000;

export default {
  data() {
    return {
      amount: 1,
      baseCurrency: null,
      targetCurrency: null,
      currencies: [],
      result: null,
      conversion: null,
    };
  },

  async mounted() {
    this.loadFullAssets();
  },
  methods: {
    async getAssets(page) {
      let offset = (page - 1) * MAX_LIMIT;
      const { data } = await api.get(
        `/assets?limit=${MAX_LIMIT}&offset=${offset}`
      );

      return data.data;
    },
    async loadFullAssets() {
      let fullArr = [];
      let page = 1;

      let assets = await this.getAssets(page);

      fullArr = [...assets];

      page++;

      while (assets.length === MAX_LIMIT) {
        assets = await this.getAssets(page);

        fullArr = [...fullArr, ...assets];
        page++;
      }

      this.currencies = fullArr;
    },

    async convertCurrency() {
      this.result = (
        (this.amount * Number(this.baseCurrency.priceUsd)) /
        Number(this.targetCurrency.priceUsd)
      ).toFixed(2);
      this.conversion = {
        value: this.amount,
        baseSymbol: this.baseCurrency.symbol,
        result: this.result,
        targetSymbol: this.targetCurrency.symbol,
      };
    },
  },
};
</script>
