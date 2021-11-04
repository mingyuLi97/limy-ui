/*
 * @Description: 创建一个新的组件
 * @Author: 李明宇
 * @Date: 2021-11-04 21:32:18
 */

const fs = require("fs");
const path = require("path");
const uppercamelcase = require("uppercamelcase");
const inquirer = require("inquirer");
const { execSync } = require("child_process");
const context = process.cwd();

const componentsPath = path.resolve(context, "src/components");

(async function() {
  const components = fs.readdirSync(componentsPath);
  const promptList = [
    {
      type: "input",
      message: "请输入组件名称 用英文横线连接（mini-card）:",
      name: "dirName",
      default: "mini-card",
      validate: (val) => {
        if (components.includes(val)) {
          return "❌ 组件名已存在！";
        }
        return true;
      },
    },
    {
      type: "input",
      message: "请对组件进行简单描述:",
      name: "description",
      default: "",
    },
  ];

  const { dirName, description } = await inquirer.prompt(promptList);
  // 创建包文件夹
  const PackagePath = path.resolve(context, "src/components", dirName);

  // 大写名称 MiniVideo
  const componentName = uppercamelcase(dirName);

  let author = "";
  try {
    const name = execSync("git config user.name")
      .toString()
      .trim()
      .replace(/[\r\n]/g, "");
    const email = execSync("git config user.email")
      .toString()
      .trim()
      .replace(/[\r\n]/g, "");
    author = `${name} <${email}>`;
  } catch (error) {
    console.log(`❌ 未获取到用户名`, error);
  }

  const Files = [
    {
      filePath: "index.ts",
      content: getIndexTsContent(componentName),
    },
    {
      filePath: "README.md",
      content: `# ${dirName}\n`,
    },
    {
      filePath: `${componentName}.vue`,
      content: getMainVueContent(componentName, dirName, description, author),
    },
    {
      filePath: "index.scss",
      content: "\n",
    },
    {
      filePath: "demo/index.vue",
      content: getDemoContent(componentName),
    },
  ];

  fs.mkdirSync(PackagePath);
  fs.mkdirSync(path.join(PackagePath, "demo"));
  fs.mkdirSync(path.join(PackagePath, "test"));
  Files.forEach((file) => {
    fs.writeFileSync(path.resolve(PackagePath, file.filePath), file.content);
  });
  console.log("done.");
  console.log();
})();

/**
 * index.ts 模版
 * @param {*} componentName
 */
function getIndexTsContent(componentName) {
  return `import _${componentName} from './${componentName}.vue';
import { withInstall } from "~/utils/withInstall";

const ${componentName} = withInstall(_${componentName});

export { ${componentName} };

export default ${componentName};\n`;
}

function getDemoContent(componentName) {
  return `<template>
  <div>
    ${componentName}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ${componentName} from "../${componentName}.vue";
import "../index.scss";
@Component({ components: { ${componentName} } })
export default class Index extends Vue {}
</script>
`;
}

/**
 * Vue 组件入口文件模版
 * @param {*} componentName 组建名称 MiniVideo
 * @param PackagePath 文件夹名 mini-video
 * @param description 描述信息
 * @param author 作者信息
 */
function getMainVueContent(componentName, PackagePath, description, author) {
  return `<!--
* @Author: ${author}
* @Description: ${description}
-->
<template>
  <div>
    ${componentName}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { createBEM } from "~/utils/create/bem";

@Component
export default class ${componentName} extends Vue {
  get classes() {
    const { b } = this;
    return [b([

    ])];
  }

  get b() {
    return createBEM("limy-${PackagePath}");
  }
}
</script>\n`;
}
