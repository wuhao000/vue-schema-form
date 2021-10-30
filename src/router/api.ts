import {RouteRecordRaw} from 'vue-router';
import RootComponent from '../components/root.vue';

export default [{
  path: '/api/a',
  component: () => import('../generated/api/a/index.vue'),
  meta: {
    tags: [],
    name: 'a'
  },
  children: [
    
  ]
}] as RouteRecordRaw[];
