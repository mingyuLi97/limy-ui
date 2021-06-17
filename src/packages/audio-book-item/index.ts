import AioAudioBookItem from './components/AudioBookItem.vue';

// @ts-ignore
AioAudioBookItem.install = function(Vue) {
  Vue.component(AioAudioBookItem.name, AioAudioBookItem);
};

export default AioAudioBookItem;

export { AioAudioBookItem };
