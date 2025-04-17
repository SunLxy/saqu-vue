import { build, BuildOptions } from 'vite';
import { createLogger } from 'vite';
import colors from 'picocolors';
import { cac } from 'cac';
import type { GlobalCLIOptions } from './interface';
import { filterDuplicateOptions, cleanOptions, handleExternal } from './utils/index.js';
import { initialConfig, initialConfigOptions } from './config/default.js';
const cli = cac('saqu-vue');

export const run = () => {
  cli
    .command('build [root]', 'build for production')
    .option('--input <input>', `[string] 入口文件 (default:'src/index.ts')`)
    .option('--external <external>', `[string[]] 排除包 (default:['vue'])`, { type: [handleExternal] })
    .option('--target <target>', `[string] transpile target (default: 'modules')`)
    .option('--outDir <dir>', `[string] output directory (default: dist)`)
    .option('--assetsDir <dir>', `[string] directory under outDir to place assets in (default: assets)`)
    .option('--assetsInlineLimit <number>', `[number] static asset base64 inline threshold in bytes (default: 4096)`)
    .option('--ssr [entry]', `[string] build specified entry for server-side rendering`)
    .option('--sourcemap [output]', `[boolean | "inline" | "hidden"] output source maps for build (default: false)`)
    .option(
      '--minify [minifier]',
      `[boolean | "terser" | "esbuild"] enable/disable minification, ` +
        `or specify minifier to use (default: esbuild)`,
    )
    .option('--manifest [name]', `[boolean | string] emit build manifest json`)
    .option('--ssrManifest [name]', `[boolean | string] emit ssr manifest json`)
    .option('--force', `[boolean] force the optimizer to ignore the cache and re-bundle (experimental)`)
    .option('--emptyOutDir', `[boolean] force empty outDir when it's outside of root`)
    .option('-w, --watch', `[boolean] rebuilds when modules have changed on disk`)
    .action(async (root: string, options: BuildOptions & GlobalCLIOptions) => {
      filterDuplicateOptions(options);
      const buildOptions: BuildOptions = cleanOptions(options);
      const initOptions: initialConfigOptions = {};
      if (options.input) {
        initOptions.input = options.input;
      }
      if (options.external) {
        initOptions.external = options.external;
      }
      const init = initialConfig(initOptions);
      try {
        await build({
          ...init,
          root,
          base: options.base,
          mode: options.mode,
          configFile: options.config,
          logLevel: options.logLevel,
          clearScreen: options.clearScreen,
          optimizeDeps: { force: options.force },
          build: { ...init.build, ...buildOptions },
        });
      } catch (e) {
        createLogger(options.logLevel).error(colors.red(`error during build:\n${e.stack}`), { error: e });
        process.exit(1);
      }
    });
  cli.help();
  cli.parse();
};
