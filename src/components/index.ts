/*
 * @Description: 导出所有组件
 * @Author: 李明宇
 * @Date: 2021-11-02 21:45:14
 */
const components = [];

const RequireContext = require.context(
  '~',
  true,
  /components\/[^/]*\/index\.ts$/i
);
RequireContext.keys().forEach(path => {
  components.push(RequireContext(path).default);
});

export default {
  install: Vue => {
    components.forEach(c => Vue.use(c));
  }
};
