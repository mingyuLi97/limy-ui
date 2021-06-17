import AioLazyImg from './components/LazyImg.vue';

// @ts-ignore
AioLazyImg.install = function(Vue) {
  Vue.component(AioLazyImg.name, AioLazyImg);
};

export default AioLazyImg;

export { AioLazyImg };
