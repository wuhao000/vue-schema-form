import DemoIndex from '@/views/demo/index.vue';
import VueRouter, {RouteConfig} from 'vue-router';

export const demoRoutes: RouteConfig[] = [
  {
    path: 'element/display',
    component: () => import('@/views/demo/element/display.vue'),
    meta: {tag: 'Element UI', name: '详情'}
  }, {
    path: 'element/edit',
    component: () => import('@/views/demo/element/edit.vue'),
    meta: {tag: 'Element UI', name: '编辑'}
  }, {
    path: 'element/effects',
    component: () => import('@/views/demo/element/effects.vue'),
    meta: {tag: 'Element UI', name: '副作用函数'}
  }, {
    path: 'desktop/subform/display',
    component: () => import('@/views/demo/subform/display.vue'),
    meta: {tag: '子表单', name: '详情'}
  }, {
    path: 'desktop/subform/edit',
    component: () => import('@/views/demo/subform/edit.vue'),
    meta: {tag: '子表单', name: '编辑'}
  }, {
    path: 'desktop/simple',
    component: () => import('@/views/demo/antd/simple.vue'),
    meta: {tag: 'Ant Design Vue', name: '简单场景'}
  }, {
    path: 'desktop/display',
    component: () => import('@/views/demo/antd/display.vue'),
    meta: {tag: 'Ant Design Vue', name: '详情'}
  }, {
    path: 'desktop/edit',
    component: () => import('@/views/demo/antd/edit.vue'),
    meta: {tag: 'Ant Design Vue', name: '编辑'}
  }, {
    path: 'desktop/layout',
    component: () => import('@/views/demo/antd/layout.vue'),
    meta: {tag: 'Ant Design Vue', name: '布局'}
  }, {
    path: 'desktop/validate',
    component: () => import('@/views/demo/antd/validate.vue'),
    meta: {tag: 'Ant Design Vue', name: '表单校验'}
  }, {
    path: 'desktop/effects',
    component: () => import('@/views/demo/antd/effects.vue'),
    meta: {tag: 'Ant Design Vue', name: '副作用函数'}
  }, {
    path: 'desktop/destruct',
    component: () => import('@/views/demo/antd/destruct.vue'),
    meta: {tag: 'Ant Design Vue', name: '解构'}
  }, {
    path: 'mobile/display',
    component: () => import('@/views/demo/mobile/display.vue'),
    meta: {tag: '移动端示例', name: '详情模式'}
  }, {
    path: 'mobile/edit',
    component: () => import('@/views/demo/mobile/edit.vue'),
    meta: {tag: '移动端示例', name: '编辑模式'}
  }
];
export default new VueRouter({
  routes: [{
    path: '/doc',
    component: () => import('@/views/readme.vue')
  }, {
    path: '/demo',
    name: 'demo',
    component: DemoIndex,
    children: demoRoutes
  }]
});
