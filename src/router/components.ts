import {RouteRecordRaw} from 'vue-router';
import RootComponent from '../components/root.vue';

export default [{
  path: '/components/URL',
  component: () => import('../generated/components/URL/index.vue'),
  meta: {
    tags: [],
    name: 'URL'
  },
  children: [
    
  ]
}, {
  path: '/components/anniu',
  component: () => import('../generated/components/anniu/index.vue'),
  meta: {
    tags: [],
    name: '按钮'
  },
  children: [
    
  ]
}] as RouteRecordRaw[];
