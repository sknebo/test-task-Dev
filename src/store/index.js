import Vue from "vue";
import Vuex from "vuex";
import mapModule from "./mapModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showCardDialog: false,
  },
  mutations: {
    SET_SHOW_CARD_DIALOG(state, isShow) {
      state.showCardDialog = isShow;
    }
  },
  actions: {
    showCardDialog({ commit }, isShow) {
      commit("SET_SHOW_CARD_DIALOG", isShow);
    }
  },
  modules: {
    mapModule
  }
});
