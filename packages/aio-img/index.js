import AioImg from './src/main.vue';

AioImg.install = function(Vue) {
  Vue.component(AioImg.name, AioImg);
};

export default AioImg;
