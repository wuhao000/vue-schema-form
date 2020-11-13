import {App} from 'vue';
import Base from '../base';
import Layout from './layout';
import Sider from './sider';

Layout.Sider = Sider;

/* istanbul ignore next */
Layout.install = (app: App) => {
  app.use(Base);
  app.component(Layout.name, Layout);
  app.component(Layout.Header.name, Layout.Header);
  app.component(Layout.Footer.name, Layout.Footer);
  app.component(Layout.Sider.name, Layout.Sider);
  app.component(Layout.Content.name, Layout.Content);
};
export default Layout;
