/*
 * @Description: 通过源码注释生成 md 文档
 * @Author: 李明宇
 * @Date: 2021-11-24 21:47:43
 */
import fs from 'fs';
import path from 'path';
import uppercamelcase from 'uppercamelcase';
// 导入 parser 函数
// import { parser } from '../vue-template-parser';
// import { renderMarkdown } from '../markdown-render';
import { generateMarkdown } from '@mfelibs/vue-to-markdown';

export default function generate() {
  const cwd = process.cwd();
  const componentsPath = path.join(cwd, 'src/components');
  const files: string[] = [];

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

  files.forEach(p => {
    const abs = path.resolve(p);
    generateMarkdown(abs);
  });
}
