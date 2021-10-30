import {RouteRecordRaw} from 'vue-router';
import RootComponent from '../components/root.vue';

export default [{
  path: '/doc/jieshao',
  component: () => import('../generated/doc/jieshao/index.vue'),
  meta: {
    tags: [],
    name: '介绍'
  },
  children: [
    
  ]
}, {
  path: '/doc/anzhuangshiyong',
  component: () => import('../generated/doc/anzhuangshiyong/index.vue'),
  meta: {
    tags: [],
    name: '安装使用'
  },
  children: [
    
  ]
}, {
  path: '/doc/biaodanxiangleixingshuoming',
  component: () => import('../generated/doc/biaodanxiangleixingshuoming/index.vue'),
  meta: {
    tags: [],
    name: ' 表单项类型说明'
  },
  children: [
    
  ]
}, {
  path: '/doc/kuozhanguifan',
  component: () => import('../generated/doc/kuozhanguifan/index.vue'),
  meta: {
    tags: [],
    name: '扩展规范'
  },
  children: [
    
  ]
}, {
  path: '/doc/fuzuoyonghanshu',
  component: () => import('../generated/doc/fuzuoyonghanshu/index.vue'),
  meta: {
    tags: [],
    name: '副作用函数'
  },
  children: [
    
  ]
}, {
  path: '/doc/biangengjilu',
  component: () => import('../generated/doc/biangengjilu/index.vue'),
  meta: {
    tags: [],
    name: '变更记录'
  },
  children: [
    
  ]
}, {
  path: '/doc/neizhileixing',
  component: () => import('../generated/doc/neizhileixing/index.vue'),
  meta: {
    tags: [],
    name: '内置类型'
  },
  children: [
    
  ]
}, {
  path: '/doc/jiegoufuzhi',
  component: () => import('../generated/doc/jiegoufuzhi/index.vue'),
  meta: {
    tags: [],
    name: '解构赋值'
  },
  children: [
    
  ]
}, {
  path: '/doc/jiekou',
  component: () => import('../generated/doc/jiekou/index.vue'),
  meta: {
    tags: [],
    name: '接口'
  },
  children: [
    
  ]
}] as RouteRecordRaw[];
