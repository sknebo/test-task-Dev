import Vue from 'vue';
import App from './App.vue';
import ymaps from './ymap';

Vue.use(ymaps);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
