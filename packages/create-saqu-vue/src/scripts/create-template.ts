import path from 'node:path';
import FS from 'fs-extra';

import {
  getPackageJSON_text,
  getTsConfig_text,
  getUtils_Index_text,
  getUtils_withInstall_text,
  getExample_button_vue,
  getExample_button_index,
  getComponent_text,
  getIndex_text,
} from '../utils/template_text';

const createFileSync = (path: string, content: string) => {
  FS.ensureFileSync(path);
  FS.writeFileSync(path, content, 'utf-8');
};

/**对输入的名称进行转换*/
const getDirName = (name: string) => {
  // 替换 '@' 符号和 '/'
  let newName = name.replace(/\@/g, '').replace(/\//, '-');
  /**驼峰转换下划线*/
  newName = newName.replace(/[A-Z]/g, (match) => {
    return '-' + match.toLowerCase();
  });
  /**去除开头的下划线*/
  return newName.replace(/^\-/, '');
};

export const createVueTemplate = (name: string) => {
  const dirName = getDirName(name);

  const root = path.resolve(process.cwd(), dirName);
  if (FS.existsSync(root)) {
    console.log(`${dirName} 文件夹已存在`);
    process.exit();
  }

  try {
    createFileSync(path.resolve(root, 'package.json'), getPackageJSON_text(name));
    createFileSync(path.resolve(root, 'tsconfig.json'), getTsConfig_text());
    createFileSync(path.resolve(root, 'src', 'utils', 'index.ts'), getUtils_Index_text());
    createFileSync(path.resolve(root, 'src', 'utils', 'withInstall.ts'), getUtils_withInstall_text());
    createFileSync(path.resolve(root, 'src', 'button', 'button.vue'), getExample_button_vue());
    createFileSync(path.resolve(root, 'src', 'button', 'index.ts'), getExample_button_index());
    createFileSync(path.resolve(root, 'src', 'component.ts'), getComponent_text());
    createFileSync(path.resolve(root, 'src', 'index.ts'), getIndex_text());

    console.log('✅ 生成vue组件库成功');
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
