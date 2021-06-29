import MiniVideo from './src/MiniVideo.vue';
// @ts-ignore
MiniVideo.install = function(Vue) {
  Vue.component(MiniVideo.name, MiniVideo);
};

export interface IMiniVideoOptions {
  avatar: string;
  userName: string;
  content: string;
  playCount: number;
  cover: string;
}

export default MiniVideo;
