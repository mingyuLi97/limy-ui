/*
 * @Description: 创建一个组件
 * @Author: 李明宇
 * @Date: 2021-05-07 19:31:55
 */

const fs = require('fs');
const path = require('path');
const uppercamelcase = require('uppercamelcase');
const inquirer = require('inquirer');

const promptList = [
  {
    type: 'input',
    message: '请输入组件名称 用下划线连接（mini-card）:',
    name: 'dirName',
    default: 'mini-card',
    validate: function(val) {
      if (/\-/.test(val)) {
        return true;
      }
      return '❌ 组件名称不合格！';
    }
  },
  {
    type: 'input',
    message: '请对组件进行简单描述:',
    name: 'description',
    default: ''
  },
  {
    type: 'input',
    message: '请输入项目维护者名称，不可为空（mingyu6）:',
    name: 'maintainer',
    default: ''
  }
];

inquirer.prompt(promptList).then(answers => {
  console.log('answers:', answers);
  const { dirName, description, maintainer } = answers;
  // 创建包文件夹
  const PackagePath = path.resolve(__dirname, '../packages', dirName);
  // 大写名称 MiniVideo
  const componentName = uppercamelcase(dirName);

  if (fs.existsSync(PackagePath)) {
    console.error('❌ 文件夹已存在,请确认组件名称');
    process.exit(1);
  }
  fs.mkdirSync(PackagePath);
  fs.mkdirSync(path.join(PackagePath, 'src'));
  fs.mkdirSync(path.join(PackagePath, 'style'));

  console.log(path.resolve(PackagePath, 'src/index.ts'));
  const Files = [
    {
      filePath: 'index.ts',
      content: getIndexTsContent(componentName)
    },
    {
      filePath: 'package.json',
      content: getPackageJsonContent(
        dirName,
        componentName,
        description,
        maintainer
      )
    },
    {
      filePath: 'README.md',
      content: `# ${dirName}`
    },
    {
      filePath: `src/${componentName}.vue`,
      content: getMainVueContent(componentName, description, maintainer)
    },
    {
      filePath: 'style/main.css',
      content: '\n'
    },
    {
      filePath: 'style/index.js',
      content: 'import "./main.css"\n'
    }
  ];

  Files.forEach(file => {
    fs.writeFileSync(path.resolve(PackagePath, file.filePath), file.content);
  });
  console.log('done.');
});

/**
 * index.ts 模版
 * @param {*} componentName
 */
function getIndexTsContent(componentName) {
  return `import ${componentName} from './src/${componentName}.vue';
// @ts-ignore
${componentName}.install = function(Vue) {
  Vue.component(${componentName}.name, ${componentName});
};

export interface I${componentName}Options {

}

export default ${componentName};\n`;
}
/**
 * package.json 模版
 * @param {*} dirName  文件夹名称 mini-video
 * @param {*} componentName 组建名称 MiniVideo
 * @param {*} description 组件描述
 * @param {*} maintainer 维护者，没有 npm publish 会出现错误
 */
function getPackageJsonContent(
  dirName,
  componentName,
  description,
  maintainer
) {
  return `{
  "name": "@mfelibs/${dirName}",
  "version": "0.0.1",
  "description": "${description}",
  "scripts": {
    "build:tsc": "npx tsc index.ts -d --emitDeclarationOnly"
  },
  "dependencies": {
  },
  "license": "ISC",
  "module": "index.ts",
  "types": "index.d.ts",
  "keywords": [
    "${componentName}"
  ],
  "maintainers": [
    "${maintainer}"
  ],
  "publishConfig": {
    "registry": "http://registry.cnpm.sina.com.cn/",
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "ssh://git@gitlab.weibo.cn:2222/SINA_MFE_COMPONENTS/sina-aio-components.git"
  }
}\n`;
}

/**
 * Vue 组件入口文件模版
 * @param {*} componentName 组建名称 MiniVideo
 */
function getMainVueContent(componentName, description, maintainer) {
  return `<!--
  * @Description: ${description}
  * @Author: ${maintainer}
-->
<template>
  <div>
       
  </div>
</template>
 
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class ${componentName} extends Vue {

}
</script>\n`;
}
