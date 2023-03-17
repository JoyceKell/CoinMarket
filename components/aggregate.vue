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
import api from "../service/api";

const MAX_LIMIT = 2000;
const MAX_MARKETCAP_USD = 10000000000;

export default {
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
    async loadFullAssets(page = 1, previousData = []) {
      if (page > 1 && previousData.length < MAX_LIMIT) return [];
      const currentAssets = await this.getAssets(page);
      const previousAssets = await this.loadFullAssets(++page, currentAssets);
      return [...previousAssets, ...currentAssets];
    },
    async getAssets(page) {
      const offset = (page - 1) * MAX_LIMIT;
      const RESOURCE = "/assets";
      const {
        data: { data },
      } = await api.get(`${RESOURCE}?limit=${MAX_LIMIT}&offset=${offset}`);
      return data;
    },
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
      this.fullAssets = await this.loadFullAssets();
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
