export const getPackageJSON_text = (name: string) => `
{
  "name": "${name}",
  "version": "0.0.0",
  "description": "",
  "main": "lib/index.js",
  "module": "esm/index.mjs",
  "types": "lib/index.d.ts",
  "scripts": {
    "build": "saqu-vue build",
    "watch": "saqu-vue build --watch"
  },
  "publishConfig": {
    "access": "public"
  },
  "files": [
    "src",
    "lib",
    "esm"
  ],
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@saqu-vue/core": "^0.0.2"
  },
  "dependencies": {
    "vue": "^3.2.36"
  }
}
`;
export const getTsConfig_text = () => `
{
  "extends": "@saqu-vue/core/ts_config/tsconfig.json"
}
`;
export const getUtils_Index_text = () => `
export * from './withInstall';
`;
export const getUtils_withInstall_text = () => `
import type { Plugin, App } from 'vue';
export type SFCWithInstall<T> = T & Plugin;
export const withInstall = <T, E extends Record<string, any> = Record<string, any>, K extends Record<string, any> = Record<string, any>>(
  main: T,
  extra?: E,// 挂 hooks 之类的
  childComponents?: K,// 挂子组件
) => {
  ; (main as SFCWithInstall<T>).install = (app: App): void => {
    for (const comp of [main, ...Object.values(childComponents ?? {})]) {
      // 当组件是 script setup 的形式时，会自动以为文件名注册，会挂载到组件的__name 属性上
      // 所以要加上这个条件
      const name = (comp as any).name || (comp as any).__name;
      app.component(name, comp)
    }
  }
  if (childComponents) {
    for (const [key, comp] of Object.entries(childComponents)) {
      ; (main as any)[key] = comp
    }
  }
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ; (main as any)[key] = comp
    }
  }

  return main as SFCWithInstall<T> & E & K
}

`;
export const getExample_button_vue = () =>
  `
<template>
  <button class="button" :class="buttonStyle">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({ name: 'button' });

type ButtonProps = {
  type?: string;
  size?: string;
};
const buttonProps = defineProps<ButtonProps>();

const buttonStyle = computed(() => {
  return { [` +
  '`button--${buttonProps.type}`' +
  `]: buttonProps.type };
});

</script>
<style scoped>
button {
  color: red;
}
</style>
`;
export const getExample_button_index = () => `
import _Button from './button.vue';
import { withInstall } from '../utils';
export const Button = withInstall(_Button);
`;
export const getComponent_text = () => `
export * from './button';
`;
export const getIndex_text = () => `
import * as components from './component';
export * from './component';
export * from './utils';
import { App } from 'vue';
export default {
  install: (app: App) => {
    for (const c in components) {
      app.use((components as any)[c]);
    }
  },
};
`;
