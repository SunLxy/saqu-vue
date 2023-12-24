import { OutputOptions } from 'rollup';
import path from 'node:path';
import FS from 'fs-extra';
export function removeStyle() {
  return {
    name: 'saqu:remove-style',
    writeBundle(options: OutputOptions, bundle: any) {
      if (bundle && bundle['style.css']) {
        if (/^export default undefined;/.test(bundle['style.css'].source) || !bundle['style.css'].source) {
          const stylePath = path.resolve(process.cwd(), options.dir, 'style.css');
          if (FS.existsSync(stylePath)) {
            FS.removeSync(stylePath);
          }
        }
      }
    },
  };
}
