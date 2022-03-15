import Vue from 'vue';
import router from './router';
import App from './App.vue';
import SNUI from '~/components';
import './css/reset.css';

Vue.use(SNUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
