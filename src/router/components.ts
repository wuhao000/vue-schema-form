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
  path: '/components/xialakuang',
  component: () => import('../generated/components/xialakuang/index.vue'),
  meta: {
    tags: [],
    name: '下拉框'
  },
  children: [
    
  ]
}, {
  path: '/components/tupian',
  component: () => import('../generated/components/tupian/index.vue'),
  meta: {
    tags: [],
    name: '图片'
  },
  children: [
    
  ]
}, {
  path: '/components/fuxuankuang',
  component: () => import('../generated/components/fuxuankuang/index.vue'),
  meta: {
    tags: [],
    name: '复选框'
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
}, {
  path: '/components/wenjian',
  component: () => import('../generated/components/wenjian/index.vue'),
  meta: {
    tags: [],
    name: '文件'
  },
  children: [
    
  ]
}, {
  path: '/components/shijianxuanzeqi',
  component: () => import('../generated/components/shijianxuanzeqi/index.vue'),
  meta: {
    tags: [],
    name: '时间选择器'
  },
  children: [
    
  ]
}, {
  path: '/components/wangge',
  component: () => import('../generated/components/wangge/index.vue'),
  meta: {
    tags: [],
    name: '网格'
  },
  children: [
    
  ]
}, {
  path: '/components/biaodan',
  component: () => import('../generated/components/biaodan/index.vue'),
  meta: {
    tags: [],
    name: '表单'
  },
  children: [
    
  ]
}] as RouteRecordRaw[];
