/*
 * @Description: 将 @vuese/parser 返回的 json 转换为 md
 * @Author: 李明宇
 * @Date: 2021-11-28 19:57:43
 */
import { ParserResult } from '@vuese/parser';

import { TABLE_MAP } from './table-map';

export type RenderKey = Extract<
  keyof ParserResult,
  'props' | 'slots' | 'events' | 'methods'
>;

function upper(word: string): string {
  return word[0].toUpperCase() + word.slice(1);
}

function renderTableRow(words: string[]): string {
  return words.map(word => `|${word}`).join('') + '|\n';
}

export function renderMarkdown(parserResult: ParserResult, title: string) {
  // 一级标题
  let md = `# ${title}\n\n`;

  // 描述
  const desc = parserResult.componentDesc;
  if (desc && desc.default.length) {
    md += `${desc.default.join(' ')}\n\n`;
  }

  md += '## API\n';
  // API  'props', 'slots', 'events', 'methods'
  (Object.keys(TABLE_MAP) as RenderKey[]).forEach(key => {
    const parserRes = parserResult[key];
    const val = TABLE_MAP[key];
    if (parserRes) {
      md += `::: API\n`;

      // 渲染 table
      md += `### ${upper(key)}\n`;

      /**
       * | Name     | Description | Type      | Required | Default |
       * | -------- | ----------- | --------- | -------- | ------- |
       * | type     | -           | `String`  | `false`  | default |
       * | disabled | -           | `Boolean` | `false`  | false   |
       * | shape    | -           | `String`  | `false`  | default |
       */
      md += renderTableRow(val.map(v => v.title));
      md += renderTableRow(val.map(v => '-'));

      parserRes.forEach(res => {
        md += renderTableRow(val.map(v => res[v.key] || '-'));
      });
      md += ':::\n\n';
    }
  });

  console.log(md);
  return md;
}
