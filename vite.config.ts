import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {defineConfig, Plugin} from 'vite';
import Markdown from 'vite-plugin-md';
import vitePluginString from 'vite-plugin-string';
import {createDoc} from './build/utils';

const proxyTarget = 'http://localhost:9210';

const docPlugin = (): Plugin => {
  return {
    enforce: 'pre',
    name: 'Doc',
    transform(source, id) {
      if (id.toLowerCase().endsWith('.md')) {
        createDoc(id);
      }
      return source;
    },
    async handleHotUpdate(ctx) {
      if (ctx.file.toLowerCase().endsWith('.md')) {
        createDoc(ctx.file);
      }
      return;
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    docPlugin(),
    vitePluginString(
        {
          include: [
            '**/*.txt'
          ],
          compress: false
        }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  optimizeDeps: {
    include: ['warning']
  },
  server: {
    proxy: {
      '/api': {
        changeOrigin: true,
        rewrite: (path) => {
          return path.substr(4);
        },
        target: proxyTarget
      }
    }
  }
});
