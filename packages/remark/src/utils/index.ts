import rehypeStringify from 'rehype-stringify';
import rehypeFormat from 'rehype-format';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { unified } from 'unified';
import { handleMeta, codePreviewPlugin, baseCodePlugin, baseHeadingPlugin } from './plugin.js';

export const transformMd = async (mdCode: string) => {
  const filePathToText: Record<string, string> = {};
  const importCodes: string[] = [
    `import BaseLayout from "@saqu-vue/plugin-remark/src/components/Layout/base-Index.vue"`,
    `import BaseCode from "@saqu-vue/plugin-remark/src/components/base-code.vue"`,
    `import CodePreview from "@saqu-vue/plugin-remark/src/components/code-preview.vue"`,
    `import { ref } from "vue"`,
  ];
  const subMenusData: { type: string; id: string; text: string }[] = [];

  const file = await unified()
    .use(handleMeta)
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { headingProperties: { class: ['sr-heading'] } })
    .use(rehypeRaw)
    .use(codePreviewPlugin, { filePathToText, importCodes })
    .use(baseCodePlugin)
    .use(baseHeadingPlugin, { subMenusData })
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(mdCode);
  importCodes.push(`const subMenus = ref(${JSON.stringify(subMenusData)}) `);
  return {
    html: `
    <template>
      <base-layout :subMenus="subMenus" >
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
