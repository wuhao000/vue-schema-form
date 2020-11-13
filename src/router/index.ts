import DemoIndex from '@/views/demo/index.vue';
import DemoNav from '@/views/demo/nav.vue';
import {createRouter, createWebHistory} from 'vue-router';
import demoRoutes from './demo';
import docRoutes from './doc';


export default createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    redirect: '/doc/readme'
  }, {
    path: '/doc',
    components: {
      default: DemoIndex as any,
      nav: () => import('@/doc/nav.vue')
    },
    children: docRoutes
  }, {
    path: '/demo',
    name: 'demo',
    components: {
      default: DemoIndex as any,
      nav: DemoNav as any
    },
    redirect: '/demo/element/simple',
    children: demoRoutes
  }]
});
