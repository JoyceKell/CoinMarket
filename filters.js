import vue from "vue";

vue.filter("toNumberFixed", (value) => {
  return Number(value).toFixed(2);
});
