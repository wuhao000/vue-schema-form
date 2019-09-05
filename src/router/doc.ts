import {RouteConfig} from 'vue-router';

export default [{
  path: 'api',
  component: () => import('../../generated/doc/api.vue')
}, {
  path: 'readme',
  component: () => import('../../generated/doc/readme.vue')
}, {
  path: 'effects',
  component: () => import('../../generated/doc/effects.vue')
}, {
  path: 'install',
  component: () => import('../../generated/doc/install.vue')
}, {
  path: 'destruct',
  component: () => import('../../generated/doc/destruct.vue')
}, {
  path: 'types',
  component: () => import('../../generated/doc/types.vue')
}] as RouteConfig[];
