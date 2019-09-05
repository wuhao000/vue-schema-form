import {RouteConfig} from 'vue-router';

export default [
  {
    path: 'element/simple',
    component: () => import('@/views/demo/element/simple.vue'),
    meta: {tag: 'Element UI', name: '简单场景'}
  }, {
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
    path: 'desktop/list',
    component: () => import('@/views/demo/antd/list.vue'),
    meta: {tag: 'Ant Design Vue', name: '列表'}
  }, {
    path: 'layout/simple',
    component: () => import('@/views/demo/layout/simple.vue'),
    meta: {tag: '布局', name: '简单布局'}
  }, {
    path: 'layout/inline',
    component: () => import('@/views/demo/layout/inline.vue'),
    meta: {tag: '布局', name: '线性布局'}
  }, {
    path: 'layout/nested',
    component: () => import('@/views/demo/layout/nested.vue'),
    meta: {tag: '布局', name: 'Nested'}
  }, {
    path: 'desktop/subform/edit',
    component: () => import('@/views/demo/subform/edit.vue'),
    meta: {tag: '子表单', name: '编辑'}
  }, {
    path: 'desktop/subform/display',
    component: () => import('@/views/demo/subform/display.vue'),
    meta: {tag: '子表单', name: '详情'}
  }, {
    path: 'desktop/subform/mobile',
    component: () => import('@/views/demo/subform/mobile.vue'),
    meta: {tag: '子表单', name: '移动端'}
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
  }, {
    path: 'mobile/effects',
    component: () => import('@/views/demo/mobile/effects.vue'),
    meta: {tag: '移动端示例', name: '副作用函数'}
  }
] as RouteConfig[];
