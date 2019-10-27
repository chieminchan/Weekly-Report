import Vue from "vue";
import Vuex from "vuex";
import * as api from '@/store/api/user';
import reports from './modules/reports';

Vue.use(Vuex);

const INITSTATE = "INITSTATE";
const GET_USER_INFO = "GET_USER_INFO";

const initState = {
    isNavCollapsed: false,
    userInfo: {},
    reports: {
        members: [],
    }
};

export default new Vuex.Store({

    // 初始状态。提供响应式数据，通过this.$store.state.xxx取值
    state: {
        isNavCollapsed: false,
        userInfo: {}
    },

    // 数据过滤缓存，通过this.$store.getter.xxx取值
    getters: {

    },

    // 同步，payload:页面事件交互传过来的参数值
    // 通过this.$store.commit("mutation-name", param)调用对应的mutation方法，修改state状态
    mutations: {
        [INITSTATE](state) {
            state = Object.assign(state, initState);
        },
        [GET_USER_INFO](state, payload) {
            Vue.set(state, 'userInfo', payload);
        }
    },

    // 异步，通过this.$store.dispatch("action-name", param)分发对应的action方法,执行异步操作
    // 异步操作完成后,如需更新数据状态,可通过this.$store.commit("mutation-name", param)调用对应的mutation方法
    actions: {
        initState: ({ commit }) => {
            commit(INITSTATE);
        },
        loadUserInfo: async ({ commit }, params) => {
            return await api.loadUserInfo(params).then((response) => {
                commit(GET_USER_INFO, response.data);
                return Promise.resolve(response);
            }).catch((error) => {
                return Promise.reject(error);
            })
        },
    },

    modules: {
        reports
    }

})