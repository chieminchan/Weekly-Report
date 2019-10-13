import Vue from "vue";
import Vuex from "vuex";

import user from './modules/user';
import reports from './modules/reports';

Vue.use(Vuex);
export default new Vuex.Store({

    // 初始状态。提供响应式数据，通过this.$store.state.xxx取值
    state: {
        layout: {
            collapsed: false
        }
    },

    // 数据过滤缓存，通过this.$store.getter.xxx取值
    getters: {

    },

    // 同步，payload:页面事件交互传过来的参数值
    // 通过this.$store.commit("mutation-name", param)调用对应的mutation方法，修改state状态
    mutations: {

    },

    // 异步，通过this.$store.dispatch("action-name", param)分发对应的action方法,执行异步操作
    // 异步操作完成后,如需更新数据状态,可通过this.$store.commit("mutation-name", param)调用对应的mutation方法
    actions: {

    },

    modules: {
        user,
        reports
    }

})