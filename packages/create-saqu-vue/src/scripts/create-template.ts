import path from 'node:path';
import FS from 'fs-extra';
import { getLib_text } from '../utils/template-lib_text';
import { getWebsite_text } from './../utils/template-website_text';
import { getRoot_text } from '../utils/template-root_text';

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
    const libData = getLib_text(name);
    const websiteData = getWebsite_text(name);
    const rootData = getRoot_text(name);
    Object.entries({ ...rootData, ...libData, ...websiteData }).map(([paths, value]) => {
      createFileSync(path.resolve(root, paths), value);
    });
    console.log('✅ 生成vue组件库成功');
  } catch (err) {
    console.error(err);
    process.exit();
  }
};
