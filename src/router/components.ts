import {RouteRecordRaw} from 'vue-router';
import RootComponent from '../components/root.vue';

export default [{
  path: '/components/anniu',
  component: () => import('../generated/components/anniu/index.vue'),
  meta: {
    tags: [],
    name: '按钮'
  },
  children: [
    
  ]
}] as RouteRecordRaw[];
