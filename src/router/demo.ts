import {RouteRecordRaw} from 'vue-router';

export default [{
  path: 'antd/destruct',
  component: () => import('@/views/demo/antd/destruct.vue'),
  meta: {tag: 'Ant Design Vue', name: '解构'}
}, {
  path: 'antd/display',
  component: () => import('@/views/demo/antd/display.vue'),
  meta: {tag: 'Ant Design Vue', name: '详情'}
}, {
  path: 'antd/dynamic',
  component: () => import('@/views/demo/antd/dynamic.vue'),
  meta: {tag: 'Ant Design Vue', name: '动态'}
}, {
  path: 'antd/edit',
  component: () => import('@/views/demo/antd/edit.vue'),
  meta: {tag: 'Ant Design Vue', name: '编辑'}
}, {
  path: 'antd/effects',
  component: () => import('@/views/demo/antd/effects.vue'),
  meta: {tag: 'Ant Design Vue', name: '副作用函数'}
}, {
  path: 'antd/list',
  component: () => import('@/views/demo/antd/list.vue'),
  meta: {tag: 'Ant Design Vue', name: '列表'}
}, {
  path: 'antd/simple',
  component: () => import('@/views/demo/antd/simple.vue'),
  meta: {tag: 'Ant Design Vue', name: '简单场景'}
}, {
  path: 'antd/validate',
  component: () => import('@/views/demo/antd/validate.vue'),
  meta: {tag: 'Ant Design Vue', name: '校验'}
}, {
  path: 'layout/inline',
  component: () => import('@/views/demo/layout/inline.vue'),
  meta: {tag: '布局', name: '线性布局'}
}, {
  path: 'layout/nested',
  component: () => import('@/views/demo/layout/nested.vue'),
  meta: {tag: '布局', name: '组合布局'}
}, {
  path: 'layout/simple',
  component: () => import('@/views/demo/layout/simple.vue'),
  meta: {tag: '布局', name: '简单布局'}
}, {
  path: 'subform/display',
  component: () => import('@/views/demo/subform/display.vue'),
  meta: {tag: '子表单', name: '详情'}
}, {
  path: 'subform/edit',
  component: () => import('@/views/demo/subform/edit.vue'),
  meta: {tag: '子表单', name: '编辑'}
}, {
  path: 'subform/mobile',
  component: () => import('@/views/demo/subform/mobile.vue'),
  meta: {tag: '子表单', name: '移动端'}
}] as RouteRecordRaw[];
