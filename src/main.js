import Vue from 'vue'
import App from './App.vue'
import ymapPlugin from 'vue-yandex-maps';
import Notifications from 'vue-notification'



const settings = {
  apiKey: 'ea83aee9-5073-407d-8ebb-a9bc2770cd09',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}



Vue.use(ymapPlugin, settings)
Vue.use(Notifications)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
