import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Import the Vuex store

createApp(App)
  .use(store) // Register the Vuex store
  .mount('#app'); 