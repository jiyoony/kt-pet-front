import { createStore } from 'vuex';

const store = createStore({
  state: {
    userRole: null,  // 로그인 상태에서 관리하는 사용자 역할
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role;
    },
    clearUserRole(state) {
      state.userRole = null;
    },
  },
  actions: {
    login({ commit }, role) {
      commit('setUserRole', role);
    },
    logout({ commit }) {
      commit('clearUserRole');
    }
  },
  getters: {
    getUserRole(state) {
      return state.userRole;
    }
  }
});

export default store;
