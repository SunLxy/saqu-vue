import rehypeStringify from 'rehype-stringify';
import rehypeFormat from 'rehype-format';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import { unified } from 'unified';
import { handleMeta, codePreviewPlugin, baseCodePlugin } from './plugin.js';

export const transformMd = async (mdCode: string) => {
  const filePathToText: Record<string, string> = {};
  const importCodes: string[] = [];
  const file = await unified()
    .use(handleMeta)
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(codePreviewPlugin, { filePathToText, importCodes })
    .use(baseCodePlugin)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(mdCode);
  importCodes.unshift(`import BaseLayout from "@saqu-vue/plugin-remark/src/components/Layout/base-Index.vue"`);
  importCodes.unshift(`import BaseCode from "@saqu-vue/plugin-remark/src/components/base-code.vue"`);
  if (importCodes.length) {
    importCodes.unshift(`import CodePreview from "@saqu-vue/plugin-remark/src/components/code-preview.vue"`);
  }
  return {
    html: `
    <template>
      <base-layout>
        ${String(file)}
      </base-layout>
    </template>
    <script setup >
    ${importCodes.join(`\n`)}
    </script>
    `,
    codes: filePathToText,
  };
};
