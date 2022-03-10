import fs from 'fs';
import { parser } from '@vuese/parser';
import path from 'path';
import { renderMarkdown } from './render-markdown';
import { parseHeaderAnnotation } from './parse-header-annotation';
import prettier from 'prettier';

/**
 * 给定文件的绝对路径，相同目录下生成 README.md
 * @param abs 绝对路径
 */
export function generateMarkdown(abs: string) {
  const source = fs.readFileSync(abs).toString();
  const parserRes = parser(source, {
    basedir: path.dirname(abs),
    jsFile: abs.endsWith('.js')
  });

  const mdContent = renderMarkdown(
    {
      ...parserRes,
      header: parseHeaderAnnotation(source)
    },
    path.basename(abs, '.vue')
  );
  const mdPath = path.dirname(abs) + '/README.md';
  const mdContentBeautify = prettier.format(mdContent, {
    parser: 'markdown'
  });
  fs.writeFileSync(mdPath, mdContentBeautify, {
    encoding: 'utf-8'
  });
}
