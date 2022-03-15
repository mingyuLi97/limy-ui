import Vue from 'vue';
import router from './router';
import App from './App.vue';
import SNUI from '~/components';
import './css/reset.css';
import './css/index.scss';
import './css/nav-bar.scss';
import './css/doc-container.scss';
Vue.use(SNUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
