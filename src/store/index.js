import Vue from "vue";
import Vuex from "vuex";
import mapModule from "./mapModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    mapModule
  }
});
