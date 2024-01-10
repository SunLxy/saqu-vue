import rehypeStringify from 'rehype-stringify';
import rehypeFormat from 'rehype-format';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { handleMeta, codePreviewPlugin, convertMeta, baseCodePlugin } from './plugin.js';

export const transformMd = async (mdCode: string) => {
  const filePathToText: Record<string, string> = {};
  const importCodes: string[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(handleMeta)
    .use(remarkRehype)
    .use(convertMeta)
    .use(codePreviewPlugin, { filePathToText, importCodes })
    .use(baseCodePlugin)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(mdCode);
  importCodes.unshift(`import BaseCode from "@saqu-vue/plugin-remark/src/components/BaseCode.vue"`);
  if (importCodes.length) {
    importCodes.unshift(`import CodePreview from "@saqu-vue/plugin-remark/src/components/CodePreview.vue"`);
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
