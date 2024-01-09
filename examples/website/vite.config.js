import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { saquVitePluginRemark } from '@saqu-vue/plugin-remark';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    saquVitePluginRemark(),
  ],
});
