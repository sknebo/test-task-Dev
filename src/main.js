import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import YmapPlugin from 'vue-yandex-maps';

Vue.config.productionTip = false;

const ymapSettings = {
    apiKey:'f0656bb3-0ce5-4a6c-98e9-b746f06b6765'
};

Vue.use(YmapPlugin, ymapSettings);

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
