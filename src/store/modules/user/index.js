import Vue from 'vue';
import * as api from '@/store/api/user';
import * as types from './mutationTypes';

export default {
    namespaced: true,
    state: {
        userInfo: {}
    },
    actions: {
        loadUserInfo: ({ commit }, params) => {
            api.loadUserInfo(params).then((response) => {
                commit(types.GET_USER_INFO, response.data);
                Promise.resolve(response);
            }).catch((error) => {
                Promise.reject(error);
            })
        },
    },
    mutations: {
        [types.GET_USER_INFO](state, payload) {
            Vue.set(state, 'userInfo', payload);
        }
    }
}