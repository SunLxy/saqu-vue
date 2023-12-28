import parser, { Arguments } from 'yargs-parser';
import { help } from './help';
import { createVueTemplate } from './scripts/create-template';
import { createVueLibTemplate } from './scripts/create_vue_lib';

interface ArgvArguments extends Partial<Arguments> {}

const argv: Partial<ArgvArguments> = parser(process.argv.slice(2), {
  alias: {
    help: ['h'],
  },
});

const ci = async () => {
  if (argv.h || argv.help) {
    help();
    return;
  }

  const scriptName = argv._[0];
  if (scriptName === 'create') {
    const packageName = argv.name;
    if (packageName) {
      createVueTemplate(packageName);
    } else {
      console.error('请输入包名称');
      process.exit();
    }
  } else if (scriptName === 'lib') {
    const vueLibName = argv.name;
    if (vueLibName) {
      createVueLibTemplate(vueLibName);
    } else {
      console.error('请输入生成组件名称');
      process.exit();
    }
  } else {
    help();
  }
};
ci();
