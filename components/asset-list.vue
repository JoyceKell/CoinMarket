<template>
  <div class="flex flex-col">
    <highestLowestPrice
      :lowest-price="lowestPrice"
      :highest-price="highestPrice"
      :id="id"
    />
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
              <!-- More rows... -->
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
export default {
  data() {
    return {
      assets: [],
      lowestPrice: null,
      highestPrice: null,
      id: this.$route.params.id,
    };
  },

  async mounted() {
    try {
      const { data } = await api.get(`/assets/${this.id}/markets`);
      this.assets = data.data;
      this.lowestPrice = Math.min(
        ...this.assets.map((asset) => asset.priceUsd)
      );
      this.highestPrice = Math.max(
        ...this.assets.map((asset) => asset.priceUsd)
      );
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
