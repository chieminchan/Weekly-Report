import Vue from 'vue';
import * as type from './mutationTypes';
import * as api from '../../api/reports';

export default {
    namespaced: true,
    state: {
        members: [],
    },
    actions: {
        loadMembers: async ({ commit }) => {
            return await api.loadMembers().then((response) => {
                commit(type.LOAD_MEMBERS, response.data.records);
                return Promise.resolve(response);
            }).catch((error) => {
                return Promise.reject(error);
            })
        }

    },
    mutations: {
        [type.LOAD_MEMBERS](state, members) {
            Vue.set(state, 'members', members);
        }
    }
};