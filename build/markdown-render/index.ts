/*
 * @Description: 将 @vuese/parser 返回的 json 转换为 md
 * @Author: 李明宇
 * @Date: 2021-11-28 19:57:43
 */

import { ParserResult } from '../vue-template-parser';
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

function toCard(title: string, content: string): string {
  let card = '::: card\n';
  card += `### ${upper(title)}\n`;
  card += content;
  card += '\n:::\n\n';
  return card;
}

export function renderMarkdown(parserResult: ParserResult, title: string) {
  // 一级标题
  let md = `# ${title}\n\n`;

  // 描述
  const desc = parserResult.header.description;
  if (desc) {
    md += toCard('介绍', desc);
  }

  md += '## API\n';
  // API  'props', 'slots', 'events', 'methods'
  (Object.keys(TABLE_MAP) as RenderKey[]).forEach(key => {
    const parserRes = parserResult[key];
    const val = TABLE_MAP[key];
    if (parserRes) {
      md += `::: card\n`;

      // 类型  ### Props
      md += `### ${upper(key)}\n`;

      // thead
      md += renderTableRow(val.map(v => v.title));
      md += renderTableRow(val.map(v => '-'));

      // tbody
      parserRes.forEach(res => {
        md += renderTableRow(
          val.map(({ key, code = false, defaultVal = '-' }) => {
            const _res = res[key];
            if (Array.isArray(_res)) {
              return _res.length ? _res.join(', ') : defaultVal;
            }
            return _res ? (code ? '`' + _res + '`' : _res) : defaultVal;
          })
        );
      });
      md += ':::\n\n';
    }
  });
  return md;
}
