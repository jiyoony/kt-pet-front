import { createStore } from 'vuex';

const store = createStore({
  state: {
    userRole: null, // Initial value
    // 다른 상태...
  },
  mutations: {
    setUserRole(state, role) {
      state.userRole = role; // Set the user role
      console.log('Mutation: User Role Set to', role); // Log the role being set
    },
    // 다른 뮤테이션...
  },
  actions: {
    // Define actions if needed
  },
  getters: {
    // Define getters if needed
  }
});

export default store; 