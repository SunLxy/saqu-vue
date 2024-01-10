import rehypeStringify from 'rehype-stringify';
import rehypeFormat from 'rehype-format';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import remarkHtml from 'remark-html'
import fs from "fs"


const mdCode = fs.readFileSync('./a.md')

const transformMd = async () => {
  const file = await unified()
    .use(remarkParse)
    // .use(remarkRehype)
    .use(() => {
      return (tree) => {
        console.log('tree', tree)
      }
    })
    // .use(rehypeFormat)
    .use(remarkHtml)
    // .use(rehypeStringify)
    .process(mdCode);
  console.log(String(file))
};

transformMd()