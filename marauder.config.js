/**
 * http://aio.sina.cn/09.%E9%85%8D%E7%BD%AE%E5%A4%A7%E5%85%A8/marax%E9%85%8D%E7%BD%AE.html
 */
const packageJSON = require('./package.json');

let baseConf = {
  title: '',            // 页面名称
  rank: 2,              // 离线包优先级，
  pm: '',               // 产品
  // 控制 js,css 文件名是否添加 MD5 后缀
  compiler: {
    splitSNC: true,
    splitChunks: false
  },
  disableHBInlineJsInHtml: false,
  hash: false,
  devServer: {
    https: false
  },
  hbInlineJsInHtml: true,
  // 出于性能考虑，babel 编译将忽略 node_modules 目录
  // 对于 es6 模块，通过 esm 配置，通知 babel 添加额外支持
  // 打包 dll(vendor) 文件
  vendor: [],
  // 静态资源 CDN 路径
  // publicPath: "./",
  publicPath: {
    // yarn build --ftp --env dev
    dev: 'http://wap_front.dev.sina.cn/marauder/xxx/web/{{view}}/',
    online:
      'https://mjs.sinaimg.cn/wap/project/xxx/{{version}}/{{view}}/'
  },
  // 生成 js 与 css source map
  sourceMap: false,
  debug: false,
  ciConfig: {
    enableBranchDepoly: true,
    disableHBInlineJsInHtml: false,
    zip: true,
    zip_config_name: 'sina_news'
  },
  // ftp 服务器配置
  ftp: {
    host: '172.16.142.74',
    port: 2121,
    user: 'www',
    password: '0ecd15a9fee9dea3',
    // 远程路径配置
    remotePath: {
      version: false
    }
  }
};

let wapConf = Object.assign({}, baseConf, {
  globalEnv: {
    jsbridgeBuildType: 'wap'
  },
  compiler: {
    splitSNC: true,
    splitChunks: false,
    externals: {
      ///排除依赖
      '@mfelibs/base-tools-nph': 'baseToolsNph',
      '@mfelibs/base-tools-nph-strategy': '_sinaCallStrategy'
    }
  }
});

let hbConf = Object.assign({}, baseConf, {
  globalEnv: {
    jsbridgeBuildType: 'app'
  },
  hybrid: {
    hb_frame_version: '0.8',
    app_version: '689',
    hb_pkg_info: ''
  }
});
// 注释， 用那个环境自己打开那个就行了， 不用总去修改配置了。 要疯了
module.exports = {
  ...wapConf
  // ...hbConf
};
