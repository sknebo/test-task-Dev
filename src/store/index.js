import Vue from 'vue';
import Vuex from 'vuex';
import addStore from './address';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        addStore,
    },
});

export default store;
