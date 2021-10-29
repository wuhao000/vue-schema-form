import {createRouter, createWebHistory} from 'vue-router';
import DemoIndex from '../views/demo/index.vue';
import DemoNav from '../views/demo/nav.vue';
import demoRoutes from './demo';
import docRoutes from './doc';
import components from './components';

export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    redirect: '/doc/readme'
  }, {
    path: '/doc',
    components: {
      default: DemoIndex,
      nav: () => import('../doc/nav.vue')
    },
    children: docRoutes
  }, {
    path: '/demo',
    name: 'demo',
    components: {
      default: DemoIndex,
      nav: DemoNav
    },
    redirect: '/demo/' + demoRoutes[0].path,
    children: demoRoutes
  }, {
    path: '/components',
    name: 'components',
    components: {
      default: DemoIndex,
      nav: DemoNav
    },
    redirect: '/components/grid',
    children: components
  }]
});
