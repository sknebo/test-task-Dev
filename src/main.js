import Vue from "vue";
import YmapPlugin from "vue-yandex-maps";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

const settings = {
  apiKey: "efb7b8ce-e360-4990-a712-d647339d397c",
  lang: "ru_RU",
  coordorder: "latlong",
  version: "2.1"
};

Vue.use(YmapPlugin, settings);

new Vue({
  router,
  store,
  render: (h) => h(App),
  el: "#app"
});
