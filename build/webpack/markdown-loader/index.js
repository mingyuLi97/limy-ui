const loaderUtils = require('loader-utils');
const MarkdownIt = require('markdown-it');
const htmlToVue = require('./html-to-vue');

const markdownIt = new MarkdownIt({
  html: true
});

markdownIt.use(require('markdown-it-container'), 'card', {
  validate(params) {
    return params.trim().match(/^card\s*(.*)$/);
  },
  render(tokens, idx) {
    if (tokens[idx].nesting === 1) {
      // opening tag
      return `<div class="limy-doc-markdown-card">`;
    } else {
      // closing tag
      return '</div>\n';
    }
  }
});

// 导出一个函数，source为webpack传递给loader的文件源内容
module.exports = function (source) {
  // 获取该loader的配置项
  const options = loaderUtils.getOptions(this);
  const html = markdownIt.render(source);
  // 一些转换处理，最终返回处理后的结果。
  return htmlToVue(html);
};
