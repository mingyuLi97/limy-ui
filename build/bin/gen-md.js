/*
 * @Description: 通过源码注释生成 md 文档
 * @Author: 李明宇
 * @Date: 2021-11-24 21:47:43
 */

// 导入 parser 函数
const { parser } = require('../vue-template-parser');
const path = require('path');
const fs = require('fs');
const uppercamelcase = require('uppercamelcase');
const prettier = require('prettier');
const { renderMarkdown } = require('../markdown-render/index.ts');

const cwd = process.cwd();
const componentsPath = path.join(cwd, 'src/components');
const files = [];

console.log('Start creating markdown files...');

fs.readdirSync(componentsPath).forEach(folderName => {
  const folderPath = path.resolve(componentsPath, folderName);
  if (fs.statSync(folderPath).isDirectory()) {
    const fileName = uppercamelcase(folderName) + '.vue';
    const filePath = path.join(folderPath, fileName);
    if (fs.statSync(filePath).isFile()) {
      files.push(filePath);
    }
  }
});

files.forEach(async p => {
  const abs = path.resolve(p);
  const source = fs.readFileSync(abs).toString();
  const parserRes = parser(source, {
    basedir: path.dirname(abs),
    jsFile: abs.endsWith('.js')
  });

  const mdContent = renderMarkdown(parserRes, path.basename(abs, '.vue'));
  const mdPath = path.dirname(abs) + '/README.md';
  const mdContentBeautify = prettier.format(mdContent, {
    parser: 'markdown'
  });
  fs.writeFileSync(mdPath, mdContentBeautify, {
    encoding: 'utf-8'
  });

  console.log(`Successfully created: ${mdPath}`);
});
