import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { headingRank } from 'hast-util-heading-rank';
import { getCodePreview, createFileName, createBaseCodeHast } from './utils.js';

export const handleMeta = () => {
  return (tree: Node) => {
    visit(tree, 'code', (node: any) => {
      const meta = (node.meta || '').trim();
      const lang = (node.lang || '').trim();
      const data = node.data || (node.data = {});
      data.meta = meta;
      data.lang = lang;
      const props = data.hProperties || (data.hProperties = {});
      props.meta = meta;
      props.lang = lang;
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

/**获取子标题数据*/
export const baseHeadingPlugin = (options: any = {}) => {
  const { subMenusData = [] } = options;
  return (tree: Node) => {
    visit(tree, 'element', (node: any, index, parent) => {
      if (headingRank(node)) {
        const text = node.children[1]?.value;
        if (text) {
          subMenusData.push({ type: node.tagName, id: node.properties.id, text });
        }
      }
    });
  };
};
