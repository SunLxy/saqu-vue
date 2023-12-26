import path from 'node:path';
import FS from 'fs-extra';
import type { Plugin } from 'vite';

export function removeStyle(): Plugin {
  return {
    name: 'saqu:remove-style',
    writeBundle(options, bundle) {
      if (bundle && bundle['style.css'] && (bundle['style.css'] as any).source) {
        const content = (bundle['style.css'] as any).source;
        if (/^export default undefined;/.test(content) || !content) {
          delete bundle['style.css'];
          const stylePath = path.resolve(process.cwd(), options.dir, 'style.css');
          if (FS.existsSync(stylePath)) {
            FS.removeSync(stylePath);
          }
        }
      }
    },
  };
}
