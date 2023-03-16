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
          Supply agregado: <span class="font-bold">{{ supplyAgregado }}</span>
        </li>
        <li class="mb-4 text-lg">
          Capital de mercado agregado:
          <span class="font-bold">{{ capitalAgregado }}</span>
        </li>
        <li class="mb-4 text-lg">
          Diferença percentual em 24h agregada:
          <span
            :class="[
              diff24hAgregada > 0 ? 'text-green-500' : 'text-red-500',
              'font-bold',
            ]"
            >{{ diff24hAgregada }}%</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "../service/api";

const MAX_LIMIT = 2000;

export default {
  data() {
    return {
      numAssets: 0,
      numAssetsOver10bn: 0,
      supplyAgregado: 0,
      capitalAgregado: 0,
      diff24hAgregada: 0,
      fullAssets: [],
      isLoading: true,
    };
  },
  methods: {
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

      this.fullAssets = fullArr;
    },
    async getAssets(page) {
      let offset = (page - 1) * MAX_LIMIT;
      const { data } = await api.get(
        `/assets?limit=${MAX_LIMIT}&offset=${offset}`
      );

      return data.data;
    },
  },
  async mounted() {
    await this.loadFullAssets();
    this.isLoading = false;
    this.numAssets = this.fullAssets.length;
    this.numAssetsOver10bn = this.fullAssets.filter(
      (asset) => asset.marketCapUsd > 10000000000
    ).length;
    this.supplyAgregado = this.fullAssets
      .reduce((total, asset) => total + Number(asset.supply), 0)
      .toFixed(2);
    this.capitalAgregado = this.fullAssets
      .reduce((total, asset) => total + Number(asset.marketCapUsd), 0)
      .toFixed(2);
    this.diff24hAgregada = this.fullAssets
      .reduce((total, asset) => total + Number(asset.changePercent24Hr), 0)
      .toFixed(2);
  },
};
</script>
