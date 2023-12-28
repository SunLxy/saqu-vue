export function help() {
  const pkg = require('../package.json');
  console.log();
  console.log(` Usage:\x1b[34;1m create-saqu-vue\x1b[0m <command>`);
  console.log(` Version ${pkg.version}`);
  console.log();
  console.log(' Commands:');
  console.log();
  console.log('  \x1b[35;1m create-saqu-vue \x1b[0m [create|lib] [options].');
  console.log();
  console.log(` Options:[create]`);
  console.log();
  console.log(`   \x1b[35;1m--name \x1b[0m                创建vue组件包名称.`);

  console.log();
  console.log(` Options:[lib]`);
  console.log();
  console.log(`   \x1b[35;1m--name \x1b[0m                创建单个vue组件名称.`);

  console.log();

  console.log(` Examples:`);
  console.log();
  console.log(`   $\x1b[35;1m create-saqu-vue\x1b[0m create  --name=vue-lib            创建vue组件包.`);
  console.log(`   $\x1b[35;1m create-saqu-vue\x1b[0m lib  --name=button                创建单个vue组件.`);

  console.log();

  console.log();
  console.log(' Copyright 2023');
  console.log();
}
