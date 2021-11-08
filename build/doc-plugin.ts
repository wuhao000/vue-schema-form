import {Plugin} from 'vite';
import {createDemoRoutes} from './routes-util';
import {createDoc} from './utils';
import _ from 'lodash'

export interface DocPluginOptions {
  highLightLanguages: string[];
}

const doUpdate = _.debounce((id, options, updateRoutes: boolean) => {
  createDoc(id, options);
  if (updateRoutes) {
    createDemoRoutes();
  }
}, 500);

export default (options: DocPluginOptions): Plugin => {
  return {
    enforce: 'pre',
    name: 'Doc',
    transform(source, id) {
      if (id.toLowerCase().endsWith('.md')) {
        doUpdate(id, options, true);
      }
      return source;
    },
    async handleHotUpdate(ctx) {
      if (ctx.file.toLowerCase().endsWith('.md')) {
        doUpdate(ctx.file, options, false);
      }
    }
  };
};
