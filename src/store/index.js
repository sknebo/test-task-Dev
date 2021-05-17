import Vue from 'vue';
import Vuex from 'vuex';
import map from './modules/map';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        noticeShow: false,
        data: {
            points: [],
        },
        errors: [],
    },
    mutations: {
        SET_SHOW_NOTICE(state, isShow) {
            state.noticeShow = isShow;
        },
        ADD_ERROR(state, error) {
            state.errors.push(error);
        },
        ADD_POINT(state, point) {
            state.data.points.push(point);
        }
    },
    actions: {
        showNotice({commit}, isShow){
            commit('SET_SHOW_NOTICE', isShow);
        },
        addErrors({commit}, error) {
            commit('ADD_ERROR', error);
        },
        addPoint({commit}, point) {
            localStorage.setItem('lastPoint', JSON.stringify(point));
            commit('ADD_POINT', point);
        }
    },
    modules: {
        map
    }
});
