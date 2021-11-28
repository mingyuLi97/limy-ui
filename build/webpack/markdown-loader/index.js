const loaderUtils = require('loader-utils');
const MarkdownIt = require('markdown-it');
const htmlToVue = require('./html-to-vue');

const markdownIt = new MarkdownIt({
  html: true
});

markdownIt.use(require('markdown-it-container'), 'demo', {
  validate(params) {
    return params.trim().match(/^demo\s*(.*)$/);
  },
  // 把demo代码放到div.kv-demo里面
  render(tokens, idx) {
    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
    if (tokens[idx].nesting === 1) {
      // opening tag
      return `<div class="limy-doc-markdown-card">`;
      return '<' + markdownIt.utils.escapeHtml(m[1]) + '</summary>\n';
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
