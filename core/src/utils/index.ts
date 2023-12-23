import { GlobalCLIOptions } from '../interface';
export const filterDuplicateOptions = <T extends object>(options: T) => {
  for (const [key, value] of Object.entries(options)) {
    if (Array.isArray(value)) {
      options[key as keyof T] = value[value.length - 1];
    }
  }
};
/**
 * removing global flags before passing as command specific sub-configs
 */
export function cleanOptions<Options extends GlobalCLIOptions>(
  options: Options,
): Omit<Options, keyof GlobalCLIOptions> {
  const ret = { ...options };
  delete ret['--'];
  delete ret.c;
  delete ret.config;
  delete ret.base;
  delete ret.l;
  delete ret.logLevel;
  delete ret.clearScreen;
  delete ret.d;
  delete ret.debug;
  delete ret.f;
  delete ret.filter;
  delete ret.m;
  delete ret.mode;
  delete ret.input;
  delete ret.external;

  // convert the sourcemap option to a boolean if necessary
  if ('sourcemap' in ret) {
    const sourcemap = ret.sourcemap as `${boolean}` | 'inline' | 'hidden';
    ret.sourcemap = sourcemap === 'true' ? true : sourcemap === 'false' ? false : ret.sourcemap;
  }
  return ret;
}

const getExternalItem = (item: string) => {
  if (/^\^/.test(item)) {
    return new RegExp(item);
  }
  return item;
};

export const handleExternal = (value: string, index: number, list: string[] | string) => {
  if (typeof list === 'string') {
    return [getExternalItem(list)];
  }
  if (Array.isArray(list)) {
    return list.filter((ite) => typeof ite !== 'boolean').map(getExternalItem);
  }
  return [];
};
