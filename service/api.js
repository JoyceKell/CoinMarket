import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coincap.io/v2",
});

export default api;
