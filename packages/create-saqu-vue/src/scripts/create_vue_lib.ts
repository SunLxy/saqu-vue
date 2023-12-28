import fs from 'fs-extra';
import path from 'path';

const toUpperCase = (fileName: string) => {
  const listName = fileName.split('-');
  return listName
    .map((str) => {
      return str.replace(/^\S/, (s) => s.toUpperCase());
    })
    .join('');
};

const getTsText = (name: string, fileName: string) => `
import _${name} from './${fileName}.vue';
import { withInstall } from '../utils';
export const ${name} = withInstall(_${name});
`;

const getVueText = (name: string) => `
<script lang="ts" setup>
import { defineProps, defineOptions, withDefaults } from "vue";
import { ${name}Props } from "./interface";
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<${name}Props>(),{})
</script>

<template>
  <div>内容</div>
</template>
`;

const getInterfaceText = (name: string) => `
export interface ${name}Props {

}
`;

export const createVueLibTemplate = (fileName: string) => {
  // 文件名转大写
  const name = toUpperCase(fileName);
  const addr = path.join(process.cwd(), fileName);
  if (fs.existsSync(addr)) {
    // 文件夹已存在
    console.error(`${fileName} 已存在`);
    process.exit();
  } else {
    fs.ensureDirSync(addr);
    const indexTS = path.join(process.cwd(), fileName, 'index.ts');
    const indexVue = path.join(process.cwd(), fileName, fileName + '.vue');
    const interfaceTS = path.join(process.cwd(), fileName, 'interface.ts');
    const indexTS_Text = getTsText(name, fileName);
    const indexVue_Text = getVueText(name);
    const interfaceTS_Text = getInterfaceText(name);
    fs.writeFileSync(indexTS, indexTS_Text, { flag: 'w+', encoding: 'utf-8' });
    fs.writeFileSync(indexVue, indexVue_Text, { flag: 'w+', encoding: 'utf-8' });
    fs.writeFileSync(interfaceTS, interfaceTS_Text, { flag: 'w+', encoding: 'utf-8' });
    console.log(`✅ ${name} 生成成功`);
    const enterPath = path.resolve(process.cwd(), 'component.ts');
    if (fs.existsSync(enterPath)) {
      let content = fs.readFileSync(enterPath, 'utf8');
      const newReg = new RegExp(`^\.\/${fileName}$`);
      if (!newReg.test(content)) {
        content += `\nexport * from "./${fileName}";`;
        fs.writeFileSync(enterPath, content, { flag: 'w+', encoding: 'utf-8' });
        console.log(`✅ 在 component.ts 文件自动引入成功`);
      }
    }
  }
};
