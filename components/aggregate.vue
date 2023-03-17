<template>
  <div class="py-8">
    <div class="text-center" v-if="isLoading"><p>Carregando...</p></div>
    <div v-else>
      <h1 class="text-3xl font-bold mb-4 text-center mx-auto">
        Valores Agregados do Mercado
      </h1>
      <ul
        class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-lg p-6"
      >
        <li class="mb-4 text-lg">
          Número de ativos: <span class="font-bold">{{ numAssets }}</span>
        </li>
        <li class="mb-4 text-lg">
          Número de ativos com capital de mercado superior a $10bn:
          <span class="font-bold">{{ numAssetsOver10bn }}</span>
        </li>
        <li class="mb-4 text-lg">
          Supply agregado:
          <span class="font-bold">{{ agregatted.supply }}</span>
        </li>
        <li class="mb-4 text-lg">
          Capital de mercado agregado:
          <span class="font-bold">{{ agregatted.marketCapUsd }}</span>
        </li>
        <li class="mb-4 text-lg">
          Diferença percentual em 24h agregada:
          <span
            :class="[
              agregatted.changePercent24Hr > 0
                ? 'text-green-500'
                : 'text-red-500',
              'font-bold',
            ]"
            >{{ agregatted.changePercent24Hr }}%</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LoadAllData from "../mixins/load-all-data";
const MAX_MARKETCAP_USD = 10000000000;

export default {
  mixins: [LoadAllData],
  data() {
    return {
      numAssets: 0,
      numAssetsOver10bn: 0,
      agregatted: {
        supply: 0,
        marketCapUsd: 0,
        changePercent24Hr: 0,
      },
      fullAssets: [],
      isLoading: true,
    };
  },
  methods: {
    sumDataAssetsFromKey(key) {
      const sum = (total, asset) => total + Number(asset[key]);
      const totalSum = this.fullAssets.reduce(sum, 0);
      return totalSum.toFixed(2);
    },
    sumDataAssets() {
      const assetKeys = ["supply", "marketCapUsd", "changePercent24Hr"];

      assetKeys.forEach((key) => {
        this.agregatted[key] = this.sumDataAssetsFromKey(key);
      });
    },
  },
  async mounted() {
    try {
      this.fullAssets = await this.loadFull("/assets");
      this.numAssets = this.fullAssets.length;
      this.numAssetsOver10bn = this.fullAssets.filter(
        (asset) => asset.marketCapUsd > MAX_MARKETCAP_USD
      ).length;
      this.sumDataAssets();
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
