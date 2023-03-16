<template>
  <div class="flex flex-col">
    <highestLowestPrice
      :lowest-price="lowestPrice"
      :highest-price="highestPrice"
      :id="id"
    />
    <div class="flex flex-col -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="flex justify-between space-x-4 pb-1">
          <button
            v-if="page > 1"
            v-on:click="backPage"
            class="bg-gray-200 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-300 focus:bg-gray-300"
          >
            Voltar
          </button>
          <button
            v-if="assets.length == this.limit"
            v-on:click="nextPage"
            class="bg-gray-200 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-300 focus:bg-gray-300"
          >
            Avançar
          </button>
        </div>
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table
            class="table-auto divide-y divide-gray-200 w-full whitespace-no-wrap bg-white overflow-hidden sm:table"
          >
            <thead class="bg-gray-100">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Criptoativo
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Id do Ativo de Cotação
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Exchange
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Preço
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Volume (%)
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Volume (24h)
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                ></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr :key="fdata.id" v-for="fdata in this.assets">
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ fdata.baseId }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ fdata.baseSymbol }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-sm text-gray-500">
                  {{ fdata.quoteId }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-sm text-gray-500">
                  {{ fdata.exchangeId }}
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm text-gray-900">
                    ${{ Number(fdata.priceUsd).toFixed(2) }}
                  </div>
                  <div class="text-sm text-gray-500">USD</div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <span
                    :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800':
                        fdata.changePercent24Hr >= 0,
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800':
                        fdata.changePercent24Hr < 0,
                    }"
                  >
                    {{ Number(fdata.volumePercent).toFixed(2) }}%
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-sm text-gray-500">
                  ${{ Number(fdata.volumeUsd24Hr).toFixed(2) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../service/api";
import highestLowestPrice from "./highest-lowest-price.vue";
const MAX_LIMIT = 2000;

export default {
  data() {
    return {
      assets: [],
      lowestPrice: null,
      highestPrice: null,
      id: this.$route.params.id,
      page: 1,
      limit: 100,
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
      console.log(fullArr, "dsksakd");
      this.assets = fullArr;
    },

    async getAssets(page) {
      let offset = (page - 1) * MAX_LIMIT;
      const { data } = await api.get(
        `/assets/${this.id}/markets?limit=${MAX_LIMIT}&offset=${offset}`
      );

      return data.data;
    },
  },
  async mounted() {
    await this.loadFullAssets();
    this.lowestPrice = Math.min(
      ...this.assets.map((asset) => Number(asset.priceUsd))
    );
    this.highestPrice = Math.max(
      ...this.assets.map((asset) => Number(asset.priceUsd))
    );
    console.log(this.lowestPrice, this.highestPrice);
  },
};
</script>
