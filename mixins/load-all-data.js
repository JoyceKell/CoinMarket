import api from "../service/api";
const MAX_LIMIT = 2000;

export default {
  methods: {
    async loadFull(resources, page = 1, previousData = []) {
      if (page > 1 && previousData.length < MAX_LIMIT) return [];
      const currentAssets = await this.getData(page, resources);
      const previousAssets = await this.loadFull(
        resources,
        ++page,
        currentAssets
      );
      return [...currentAssets, ...previousAssets];
    },

    async getData(page, resources) {
      const offset = (page - 1) * MAX_LIMIT;

      const {
        data: { data },
      } = await api.get(`${resources}?limit=${MAX_LIMIT}&offset=${offset}`);
      return data;
    },
  },
};
