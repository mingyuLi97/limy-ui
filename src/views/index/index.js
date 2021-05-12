import Vue from "vue";
import App from './App.vue';
import '@mfelibs/base-css'

import AudioBookItem from '~/packages/audio-book-item'
Vue.use(AudioBookItem)

new Vue({
  el: '#app',
  render: h => h(App)
});
