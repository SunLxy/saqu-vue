import type { Plugin } from 'vite';
import { transformMd } from './utils/index.js';
import { Options } from './interface.js';

export const saquVitePluginRemark = (options: Options = {}): Plugin => {
  const { isOnlyMd = false } = options;

  const mdMap = new Map<string, Record<string, string>>([]);
  const childToParent = new Map<string, string>([]);
  /**
   * 1. 可以增加标题模糊查询的数据存储 (怎么处理路由关系？)
   */
  return {
    name: 'saqu:vite:plugin:remark',
    enforce: 'pre',
    resolveId(id) {
      if (/^V\_demo\_vue/.test(id) && /\.vue$/.test(id)) {
        return id;
      }
    },
    load(id) {
      if (/^V\_demo\_vue/.test(id) && /\.vue$/.test(id)) {
        // 根据id取父级id数据
        const parentId = childToParent.get(id);
        /**判断父级是否存在*/
        if (parentId) {
          const data = mdMap.get(parentId) || {};
          const text = data[id];
          /**移除加载过的数据*/
          delete data[id];
          childToParent.delete(id);
          return text;
        }
        return '';
      }
    },
    async transform(code, id) {
      return new Promise(async (resolve, reject) => {
        if (/\.md$/.test(id)) {
          mdMap.delete(id);
          try {
            // 这个地方在加一个标题解析的数据
            const result = await transformMd(code, options);
            /**存储子集对应的父级*/
            Object.entries(result.codes).forEach(([key]) => {
              childToParent.set(key, id);
            });
            /**存储数据*/
            mdMap.set(id, result.codes);
            if (isOnlyMd) {
              resolve(result.mdVue);
            } else {
              resolve(result.html);
            }
          } catch (err) {
            reject(err);
          }
        }
        resolve();
      });
    },
    watchChange(id, change) {
      if (change.event === 'delete') {
        // 可以在这个地方进行标题数据移除
      }
    },
  };
};
