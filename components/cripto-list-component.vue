<template>
  <div class="flex flex-col">
    <div
      v-if="isLoading"
      class="text-center"
    >
      <p>Carregando...</p>
    </div>
    <div v-else>
      <div class="flex justify-between space-x-4 pb-1">
        <button
          v-if="page > 1"
          class="bg-gray-200 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-300 focus:bg-gray-300"
          @click="backPage"
        >
          Voltar
        </button>
        <button
          v-if="cryptos.length == 100"
          class="bg-gray-200 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-300 focus:bg-gray-300"
          @click="nextPage"
        >
          Avançar
        </button>
      </div>

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
                    Preço
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Variação (24h)
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Volume (24h)
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  />
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr
                  v-for="fdata in cryptos"
                  :key="fdata.rank"
                >
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ fdata.name }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ fdata.symbol }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="text-sm text-gray-900">
                      ${{ toNumberFixed(fdata.priceUsd) }}
                    </div>
                    <div class="text-sm text-gray-500">
                      USD
                    </div>
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
                      {{ toNumberFixed(fdata.changePercent24Hr) }}%
                    </span>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm text-gray-500"
                  >
                    ${{ toNumberFixed(fdata.volumeUsd24Hr) }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-sm text-gray-500"
                  >
                    <NuxtLink
                      :to="`/asset/${fdata.id}`"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Ver Mercado
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../service/api";
import FormatNumber from "../mixins/format-number";
export default {
  mixins: [FormatNumber],
  data() {
    return {
      cryptos: [],
      page: 1,
      limit: 100,
      isLoading: true,
    };
  },
  async mounted() {
    this.loadPage();
  },

  methods: {
    backPage() {
      if (this.page > 0) {
        this.page--;
        this.loadPage();
      }
    },
    nextPage() {
      this.page++;
      this.loadPage();
    },
    async loadPage() {
      this.isLoading = true;
      const offset = (this.page - 1) * this.limit;
      const { data } = await api.get(
        `/assets?limit=${this.limit}&offset=${offset}`
      );

      this.cryptos = data.data;
      this.isLoading = false;
    },
  },
};
</script>
