const loaderUtils = require('loader-utils');
import MarkdownIt from 'markdown-it';
import MarkdownItContainer from 'markdown-it-container';

const markdownIt = new MarkdownIt({ html: true });
const DEFAULT_WRAPPER: ITag = {
  opening: '<section class="md-doc-container">',
  closing: '</section>'
};
const DEFAULT_CARD: ICardItem = {
  marker: 'card',
  tag: { opening: '<div class="md-doc-card">', closing: '</div>\n' }
};

interface ITag {
  opening: string;
  closing: string;
}
interface ICardItem {
  marker: string;
  tag: ITag;
}
/**
 * rootTag: vue template 根元素
 * cards: 每个卡片的配置  e.g. ::: card
 *  - marker 渲染的标记
 *  - tag 开闭标签
 */
export interface IMd2VueLoaderOptions {
  rootTag?: ITag;
  cards?: ICardItem[];
}

function usePlugin(card: ICardItem) {
  MarkdownItContainer(markdownIt, card.marker, {
    validate(params) {
      return params.trim() === card.marker;
    },
    render(tokens, idx) {
      return tokens[idx].nesting === 1 ? card.tag.opening : card.tag.closing;
    }
  });
}

// 导出一个函数，source为webpack传递给loader的文件源内容
export default function (source: string) {
  // 获取该loader的配置项
  const options: IMd2VueLoaderOptions = loaderUtils.getOptions(this) ?? {};
  const wrapper = options.rootTag || DEFAULT_WRAPPER;
  const cards = options.cards?.length ? options.cards : [DEFAULT_CARD];

  cards.forEach(usePlugin);

  const html = markdownIt.render(source);
  // 一些转换处理，最终返回处理后的结果。
  return `<template>
  ${wrapper.opening}
  ${html}
  ${wrapper.closing}
  </template>`;
}
