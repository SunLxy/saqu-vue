import rehypeStringify from 'rehype-stringify';
import rehypeFormat from 'rehype-format';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypeShikiji from 'rehype-shikiji';
import { h } from 'hastscript';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';
import { addClassToHast, bundledLanguages, getHighlighter } from 'shikiji';
import type { ShikijiTransformer } from 'shikiji';

const highlighter = await getHighlighter({
  themes: ['github-light', 'github-dark'],
  langs: [...Object.keys(bundledLanguages)],
});

const transformers: ShikijiTransformer[] = [
  {
    name: 'sr:add-class',
    pre(node) {
      addClassToHast(node, 'sr-code');
    },
  },
  {
    name: 'sr:clean-up',
    pre(node) {
      delete node.properties.tabindex;
      delete node.properties.style;
    },
  },
];

let count = 0;
const createFileName = () => {
  count++;
  const fileName = `V_demo_vue_${count}.vue`;
  return fileName;
};

const getCodePreview = (codeText: string, componentName: string) => {
  const vueHast = highlighter.codeToHast(codeText, {
    transformers,
    lang: 'vue',
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  });
  const code = encodeURIComponent(codeText);
  const temp = h('code-preview', { code }, [
    h(componentName),
    h('template', { '#code': 'itemData' }, [h('base-code', { code }, vueHast.children)]),
  ]);
  return temp;
};

const getMetaData = (metaData: string) => {
  const [lang, meta] = (metaData || '').split(':::');
  return {
    lang,
    meta,
  };
};

export const transformMd = async (mdCode: string) => {
  const filePathToText: Record<string, string> = {};
  const importCodes: string[] = [];
  let count = 0;
  const treeHooks = () => {
    return (tree: Node) => {
      visit(tree, 'element', (node: any, index, parent) => {
        const childData = node.children;
        if (Array.isArray(childData) && childData.length && node.tagName === 'pre') {
          const [preItem] = childData;
          if (node.tagName === 'pre' && preItem?.properties?.['data-meta'] === 'preview') {
            // 对代码块进行保存
            count++;
            const line = preItem?.position?.line;
            const filePathName = createFileName();
            const codeText = preItem.children[0].value;
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

  const treeHooks2 = () => {
    return (tree: Node) => {
      visit(tree, (node: any) => {
        if (node?.data?.meta) {
          const metaData = getMetaData(node?.data?.meta);
          node.properties['data-meta'] = metaData.meta;
          node.properties['data-lang'] = metaData.lang;
        }
      });
    };
  };

  const treeMetaHooks = () => {
    return (tree: Node) => {
      visit(tree, 'code', (node: any) => {
        node.meta = `${node.lang}:::${node.meta}`;
      });
    };
  };

  const treePreHooks = () => {
    return (tree: Node) => {
      visit(tree, 'element', (node: any, index, parent) => {
        if (node.tagName === 'pre') {
          console.log('cdsacdsacdsa===>', node.children[0].properties.lang);
          parent.children.splice(index, 1, h('div', { class: 'sr-adaptive-theme' }, [node]));
        }
      });
    };
  };

  const file = await unified()
    .use(remarkParse)
    .use(treeMetaHooks)
    .use(remarkRehype)
    .use(treeHooks2)
    .use(treeHooks)
    // .use(rehypeShikiji, {
    //   themes: {
    //     light: 'github-light',
    //     dark: 'github-dark',
    //   },
    //   transformers
    // })
    .use(treePreHooks)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(mdCode);

  if (importCodes.length) {
    importCodes.unshift(`import CodePreview from "@saqu-vue/plugin-remark/src/components/CodePreview.vue"`);
    importCodes.unshift(`import BaseCode from "@saqu-vue/plugin-remark/src/components/BaseCode.vue"`);
  }
  return {
    html: `
    <template>
      ${String(file)}
    </template>
    <script setup >
    ${importCodes.join(`\n`)}
    </script>
    `,
    codes: filePathToText,
  };
};
