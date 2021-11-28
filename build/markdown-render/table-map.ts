/*
 * @Description: table 与 @vuese/parser 的转换
 * @Author: 李明宇
 * @Date: 2021-11-28 21:07:53
 */
import { RenderKey } from '.';

export interface ITableItem {
  key: string;
  title: string;
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
      title: '类型'
    },
    {
      key: 'default',
      title: '默认值'
    },
    {
      key: 'Required',
      title: '必要的'
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
