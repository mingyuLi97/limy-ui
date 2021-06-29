import MiniVideo from './src/main.vue';

export interface IMiniVideoOptions {
  avatar: string;
  userName: string;
  content: string;
  playCount: number;
  cover: string;
}

// @ts-ignore
MiniVideo.install = function(Vue) {
  Vue.component(MiniVideo.name, MiniVideo);
};

export default MiniVideo;
