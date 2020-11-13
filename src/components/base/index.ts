import {App} from 'vue';
import antDirective from '../_util/antDirective';

export default {
  install: (app: App) => {
    app.use(antDirective);
  }
};
