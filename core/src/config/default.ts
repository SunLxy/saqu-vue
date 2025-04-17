import { InlineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts, { PluginOptions as DtsPluginOptions } from 'vite-plugin-dts';
import path from 'node:path';
import FS from 'fs-extra';
import ts from 'typescript';
import DefineOptions from 'unplugin-vue-define-options/vite';

const tsConfig_CompilerOptions: ts.CompilerOptions = {
  baseUrl: '.',
  jsx: ts.JsxEmit.Preserve,
  strict: true,
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  skipLibCheck: true,
  esModuleInterop: true,
  moduleResolution: ts.ModuleResolutionKind.NodeNext,
  lib: ['esnext', 'dom'],
  resolveJsonModule: true,
  types: ['unplugin-vue-define-options/macros-global'],
};

export interface initialConfigOptions {
  input?: string;
  external?: (string | RegExp)[];
}

const getExternal = (packageData: any) => {
  const dependencies = packageData.dependencies;
  const devDependencies = packageData.devDependencies;
  const peerDependencies = packageData.peerDependencies;
  const list = Array.from(
    new Set([
      ...Object.keys(dependencies || {}),
      ...Object.keys(devDependencies || {}),
      ...Object.keys(peerDependencies || {}),
    ]),
  );
  return list.map((value) => new RegExp(`^${value}`));
};

export const initialConfig = (options: initialConfigOptions = {}): InlineConfig => {
  const { input = 'src/index.ts', external = [] } = options;
  // 入口文件默认 src/index.ts
  // 读取排除编译项
  const packagePath = path.resolve(process.cwd(), 'package.json');
  const packageData = FS.readJSONSync(packagePath, { encoding: 'utf8' });

  const entryRoot = input ? path.dirname(input) : '.';
  const dtsOptions: DtsPluginOptions = {};
  if (FS.existsSync(path.resolve(process.cwd(), 'tsconfig.json'))) {
    dtsOptions.tsconfigPath = path.resolve(process.cwd(), 'tsconfig.json');
  }

  return {
    build: {
      //压缩
      minify: false,
      rollupOptions: {
        //忽略不需要打包的文件
        external: ['vue', ...getExternal(packageData), ...external],
        input: input || 'src/index.ts',
        output: [
          {
            //打包格式
            format: 'es',
            // 打包后文件名
            entryFileNames: '[name].mjs',
            //让打包目录和我们目录对应
            preserveModules: true,
            exports: 'named',
            //配置打包根目录
            dir: './esm',
          },
          {
            //打包格式
            format: 'cjs',
            //打包后文件名
            entryFileNames: '[name].js',
            //让打包目录和我们目录对应
            preserveModules: true,
            exports: 'named',
            //配置打包根目录
            dir: './lib',
          },
        ],
      },
      lib: { entry: input },
    },
    plugins: [
      vue(),
      vueJsx(),
      dts({
        entryRoot,
        outDir: ['lib', 'esm'],
        compilerOptions: tsConfig_CompilerOptions,
        // 指定使用的 tsconfig.json
        ...dtsOptions,
      }),
      DefineOptions(),
    ],
  };
};
