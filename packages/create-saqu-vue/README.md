
## 快速上手

这里是通过 [`create-saqu-vue`](https://github.com/SunLxy/saqu-vue) 命令快捷创建vue组件库开发。

## 环境准备

首先得有 [nodejs](https://nodejs.org/en)，并确保 [nodejs](https://nodejs.org/en) 版本是 14 或以上。（推荐用 [n](https://github.com/tj/n) 来管理 node 版本，windows 下推荐用 [nvm-windows](https://github.com/coreybutler/nvm-windows)）

```bash
# 🚧 注意：不适用于 Microsoft Windows 上的本机 shell
# 适用于 Linux 的 Windows 子系统和各种其他类 unix 系统
npm install -g n 
```

## 初始化一个项目

```shell
$ yarn create saqu-vue [create|lib]
# or npm
$ npm create saqu-vue create --name=my-app
# or npx
$ npx create-saqu-vue  create --name=my-app
```

## 帮助

你可以通过`--help | h`来查看帮助. 

```bash
Usage: create-saqu-vue [create|lib] <app-name> [options] [--help|h]

Options:

  --help, -h      帮助
  --name          名称

Example:

  yarn create saqu-vue create --name=app-name
  npx create-saqu-vue --name=my-app
  npm create saqu-vue create --name=my-app

Copyright 2023
```

### License

Licensed under the MIT License.
