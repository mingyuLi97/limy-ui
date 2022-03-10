/*
 * @Description: 将 @vuese/parser 返回的 json 转换为 md
 * @Author: 李明宇
 * @Date: 2021-11-28 19:57:43
 */

import { ParserResult as BaseParserResult } from '@vuese/parser';
import { IHeaderAnnotation } from './parse-header-annotation';
import { TABLE_MAP, Typeface } from './table-map';

/**
 * 原数据结构上扩展页面的头部注释字段
 */
interface ParserResult extends BaseParserResult {
  header: IHeaderAnnotation;
}

export type RenderKey = Extract<
  keyof ParserResult,
  'props' | 'slots' | 'events' | 'methods'
>;

type TypefaceMapValue = string | { prefix: string; suffix: string };

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

/**
 * 转换文字的字体 加粗 ｜ 斜体 等等
 * @param text 输入的文本
 * @param type 接收的类型
 * @returns 格式化后的文本
 */
function transformTypeface(text: string, type: Typeface): string {
  // 每一种类型包含前缀和后缀，如果是字符串相当于 前缀和后缀是一样的
  const map: { [K in Typeface]: TypefaceMapValue } = {
    bold: '**',
    italic: '_'
  };
  const val: TypefaceMapValue = map[type];

  return typeof val === 'string'
    ? val + text + val
    : val.prefix + text + val.suffix;
}

function toCode(text: string) {
  return `\`${text}\``;
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
          val.map(({ key, code = false, defaultVal = '-', typeface }) => {
            let result: string = defaultVal;

            const _res = res[key];
            if (Array.isArray(_res)) {
              result = _res.length ? _res.join(', ') : defaultVal;
            } else if (_res) {
              let text = _res;
              // 一定要先 toCode 然后在转换字体 不然 md 解析会失败
              if (code) {
                text = toCode(text);
              }
              if (typeface) {
                text = transformTypeface(text, typeface);
              }
              result = text;
            }
            return (
              result
                // 防止返回的数据里有 ｜，该符号会与 md 表格冲突
                .replace(/\|/gi, ' ')
                .replace(/[\'\"]/g, '`')
            );
          })
        );
      });
      md += ':::\n\n';
    }
  });
  return md;
}
