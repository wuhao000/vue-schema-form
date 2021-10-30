import {Plugin} from 'vite';
import {createDemoRoutes} from './routes-util';
import {createDoc} from './utils';

export interface DocPluginOptions {
  highLightLanguages: string[];
}

export default (options: DocPluginOptions): Plugin => {
  return {
    enforce: 'pre',
    name: 'Doc',
    transform(source, id) {
      if (id.toLowerCase().endsWith('.md')) {
        createDoc(id, options);
        createDemoRoutes();
      }
      return source;
    },
    async handleHotUpdate(ctx) {
      if (ctx.file.toLowerCase().endsWith('.md')) {
        createDoc(ctx.file, options);
        createDemoRoutes();
      }
    }
  };
};
