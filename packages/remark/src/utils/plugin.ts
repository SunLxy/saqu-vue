import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { getMetaData, getCodePreview, createFileName, createBaseCodeHast } from './utils.js';
export const handleMeta = () => {
  return (tree: Node) => {
    visit(tree, 'code', (node: any) => {
      node.meta = `${node.lang}:::${node.meta}`;
    });
  };
};
export const convertMeta = () => {
  return (tree: Node) => {
    visit(tree, (node: any) => {
      if (node?.data?.meta) {
        const metaData = getMetaData(node?.data?.meta);
        node.properties['meta'] = metaData.meta;
        node.properties['lang'] = metaData.lang;
      }
    });
  };
};

export const codePreviewPlugin = (options: any) => {
  const { filePathToText, importCodes } = options || {};
  let count = 0;
  return (tree: Node) => {
    visit(tree, 'element', (node: any, index, parent) => {
      const childData = node.children;
      if (Array.isArray(childData) && childData.length && node.tagName === 'pre') {
        const [childItem] = childData;
        if (
          node.tagName === 'pre' &&
          childItem?.properties?.lang === 'vue' &&
          childItem?.properties?.meta === 'preview'
        ) {
          // 对代码块进行保存
          count++;
          const line = childItem?.position?.line;
          const filePathName = createFileName();
          const codeText = childItem.children[0].value;
          const htmlName = `demos${line}aq${count}uv`;
          const componentName = `Demos${line}aq${count}uv`;
          filePathToText[filePathName] = codeText;
          importCodes.push(`import ${componentName} from "${filePathName}"`);
          /**
           * 1. 把code代码进行转换高亮 传递给组件
           * */
          /**子集代码块进行渲染*/
          parent.children.splice(index, 1, getCodePreview(codeText, htmlName));
        }
      }
    });
  };
};

export const baseCodePlugin = () => {
  return (tree: Node) => {
    visit(tree, 'element', (node: any, index, parent) => {
      const childData = node.children;
      if (Array.isArray(childData) && childData.length && node.tagName === 'pre') {
        const [childItem] = childData;
        if (node.tagName === 'pre' && childItem) {
          const lang = childItem?.properties?.lang || 'text';
          const codeText = childItem.children[0].value;
          const { child } = createBaseCodeHast(codeText, lang);
          parent.children.splice(index, 1, child);
        }
      }
    });
  };
};
