import { h } from 'hastscript';
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
      addClassToHast(node, 'sr-pre-code');
    },
  },
  {
    name: 'sr:add-code-class',
    code(node) {
      addClassToHast(node, 'sr-code');
    },
  },
];
let count = 0;
export const createFileName = () => {
  count++;
  const fileName = `V_demo_vue_${count}.vue`;
  return fileName;
};

export const createBaseCodeHast = (codeText: string, lang: string) => {
  const vueHast = highlighter.codeToHast(codeText, {
    transformers,
    lang,
    themes: { light: 'github-light', dark: 'github-dark' },
  });
  const code = encodeURIComponent(codeText);
  const [childItem] = vueHast.children;
  const properties = (childItem as any).properties || {};
  /**替换默认背景色*/
  if (properties && /^background-color:#fff;/.test(properties.style)) {
    properties.style = properties.style.replace(/^background-color:#fff;/, 'background-color:#f6f6f7;');
  }
  return {
    child: h('base-code', { ...properties, code, lang }, vueHast.children),
    code,
  };
};

export const getCodePreview = (codeText: string, componentName: string) => {
  const { code, child } = createBaseCodeHast(codeText, 'vue');
  const temp = h('code-preview', { code, lang: 'vue' }, [
    h(componentName),
    h('template', { '#code': 'itemData' }, [child]),
  ]);
  return temp;
};

export const getMetaData = (metaData: string) => {
  const [lang, meta] = (metaData || '').split(':::');
  return {
    lang,
    meta,
  };
};
