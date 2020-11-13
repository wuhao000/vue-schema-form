import Layout from '@/components/layout';
import {App} from 'vue';

export default {
  install: (app: App) => {
    app.use(Layout);
  }
};
