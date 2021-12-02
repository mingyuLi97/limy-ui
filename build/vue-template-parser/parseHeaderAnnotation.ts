/*
 * @Description: 解析文件头部注释
 * @Author: 李明宇
 * @Date: 2021-12-02 21:23:02
 */

export interface IHeaderAnnotation {
  description?: string;
  author?: string;
  date?: string;
  [K: string]: string;
}

function format(s: string): string {
  return s ? s.toLowerCase().trim() : '';
}

export function parseHeaderAnnotation(source: string): IHeaderAnnotation {
  const obj: IHeaderAnnotation = {};
  // 获取头部注释
  const annotation = source.match(/<!--[\s\S]*?-->/g);
  if (annotation) {
    // 匹配 @Description: 按钮是颠三倒四说三道四
    const all = annotation[0].matchAll(/@(\w+):(.*?)\n/gi) || [];
    [...all].forEach(([_, key, val]) => {
      obj[format(key)] = format(val);
    });
  }
  return obj;
}
