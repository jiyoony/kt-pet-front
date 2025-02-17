import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Vuex 스토어 가져오기

createApp(App)
  .use(store) // Vuex 스토어 사용
  .mount('#app'); 