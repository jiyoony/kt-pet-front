import { createStore } from 'vuex';

const store = createStore({
  state: {
    userRole: null, // 초기값 설정
    // 다른 상태...
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role; // 역할 설정
    },
    // 다른 뮤테이션...
  },
  actions: {
    // 액션...
  },
  getters: {
    // 게터...
  }
});

export default store; 