import AudioBookItem from './components/AudioBookItem.vue';

AudioBookItem.install = function (Vue) {
  Vue.component(AudioBookItem.name, AudioBookItem);
};

export default AudioBookItem;
