import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(YmapPlugin, {
  version: '2.1',
  coordorder: 'latlong',
  apiKey: '0e82ad20-9e17-44ae-a0c5-7ededca45d22',
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
