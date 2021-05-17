import Vue from 'vue'
import App from './App.vue'
import YmapPlugin from "vue-yandex-maps";

Vue.use(YmapPlugin, {
  apiKey: '9d2a2e5b-bb06-4413-ae44-0d8b6c7dc163',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
});
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app') 