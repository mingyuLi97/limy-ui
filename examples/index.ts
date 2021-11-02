import Vue from 'vue'
import router from './router'
import App from './App.vue'
import LimyUI from "~/components"

Vue.use(LimyUI)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
