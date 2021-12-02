/*
 * @Description: table 与 @vuese/parser 的转换
 * @Author: 李明宇
 * @Date: 2021-11-28 21:07:53
 */
import { RenderKey } from '.';

/**
 * | Name     | Description | Type      | Required | Default |
 * | -------- | ----------- | --------- | -------- | ------- |
 * | type     | -           | `String`  | `false`  | default |
 * | disabled | -           | `Boolean` | `false`  | false   |
 * | shape    | -           | `String`  | `false`  | default |
 */

/**
 * @param title 表头 - Name
 * @param key 获取 vuese/parser 返回值
 * @param code 是否标记为代码段  String => `String`
 * @param defaultVal vuese/parser 没有返回值时的默认, 不设置为 '-'
 */
export interface ITableItem {
  title: string;
  key: string;
  code?: boolean;
  defaultVal?: any;
}

type ITableMap = {
  [P in RenderKey]: ITableItem[];
};

export const TABLE_MAP: ITableMap = {
  props: [
    {
      key: 'name',
      title: '参数'
    },
    {
      key: 'describe',
      title: '说明'
    },
    {
      key: 'type',
      title: '类型',
      code: true
    },
    {
      key: 'default',
      title: '默认值'
    },
    {
      key: 'Required',
      title: '必要的',
      defaultVal: 'false'
    }
  ],
  events: [
    {
      key: 'name',
      title: '事件名'
    },
    {
      key: 'describe',
      title: '说明'
    },
    {
      key: 'argumentsDesc',
      title: '回调参数'
    }
  ],
  methods: [
    {
      key: 'name',
      title: '方法名'
    },
    {
      key: 'argumentsDesc',
      title: '参数'
    }
  ],
  slots: [
    {
      key: 'name',
      title: '名称'
    },

    {
      key: 'backerDesc',
      title: '说明'
    }
  ]
};
