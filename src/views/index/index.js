import Vue from "vue";
import App from './App.vue';
import '@mfelibs/base-css'

import AudioBookItem from '~/packages/audio-book-item'
import AioImg from '@mfelibs/aio-img'
Vue.use(AudioBookItem)
Vue.use(AioImg)

new Vue({
  el: '#app',
  render: h => h(App)
});
