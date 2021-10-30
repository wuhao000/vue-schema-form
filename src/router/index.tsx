import {createRouter, createWebHistory} from 'vue-router';
import DemoIndex from '../docs/demo/index.vue';
import createNav from '../views/nav';
import demoRoutes from './demo';
import docRoutes from './doc';
import components from './components';

export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    redirect: docRoutes[0].path
  }, {
    path: '/doc',
    redirect: docRoutes[0].path,
    components: {
      default: DemoIndex,
      nav: createNav(docRoutes)
    },
    children: docRoutes
  }, {
    path: '/demo',
    name: 'demo',
    components: {
      default: DemoIndex,
      nav: createNav(demoRoutes)
    },
    redirect: demoRoutes[0].path,
    children: demoRoutes
  }, {
    path: '/components',
    name: 'components',
    components: {
      default: DemoIndex,
      nav: createNav(components)
    },
    redirect: '/components/grid',
    children: components
  }]
});
