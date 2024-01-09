import rehypeStringify from 'rehype-stringify';
import rehypeFormat from 'rehype-format';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypeShikiji from 'rehype-shikiji';
import { getHighlighter } from 'shikiji';
import { h } from 'hastscript';
import { Node } from 'unist';
import { visit } from 'unist-util-visit';

const highlighter = await getHighlighter({
  themes: ['nord', 'min-light'],
  langs: ['vue'],
});

let count = 0;
const createFileName = () => {
  count++;
  const fileName = `V_demo_vue_${count}.vue`;
  return fileName;
};

const getCodePreview = (codeText: string, componentName: string) => {
  const vueHast = highlighter.codeToHast(codeText, {
    lang: 'vue',
    themes: {
      light: 'min-light',
      dark: 'nord',
    },
  });
  const temp = h(
    'code-preview',
    {
      code: encodeURIComponent(codeText),
    },
    [h(componentName), h('template', { '#code': 'itemData' }, vueHast.children)],
  );
  return temp;
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
          const data = preItem?.data || {};
          if (node.tagName === 'pre' && data.meta === 'preview') {
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

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(treeHooks)
    .use(rehypeShikiji, {
      themes: {
        light: 'min-light',
        dark: 'nord',
      },
    })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(mdCode);

  if (importCodes.length) {
    importCodes.unshift(`import CodePreview from "@saqu-vue/plugin-remark/src/CodePreview.vue"`);
  }
  console.log('String(file)', String(file));

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
