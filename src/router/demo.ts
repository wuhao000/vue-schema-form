import {RouteConfig} from 'vue-router';

export default [{
  path: 'element/default',
  component: () => import('@/views/demo/element/default.vue'),
  meta: {tag: 'Element UI', name: '默认值'}
}, {
  path: 'element/destruct',
  component: () => import('@/views/demo/element/destruct.vue'),
  meta: {tag: 'Element UI', name: '解构'}
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
  path: 'element/methods',
  component: () => import('@/views/demo/element/methods.vue'),
  meta: {tag: 'Element UI', name: '表单项操作'}
}, {
  path: 'element/simple',
  component: () => import('@/views/demo/element/simple.vue'),
  meta: {tag: 'Element UI', name: '简单场景'}
}, {
  path: 'element/slot',
  component: () => import('@/views/demo/element/slot.vue'),
  meta: {tag: 'Element UI', name: '插槽'}
}, {
  path: 'element/value',
  component: () => import('@/views/demo/element/value.vue'),
  meta: {tag: 'Element UI', name: '赋值'}
}, {
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
  path: 'mobile/destruct',
  component: () => import('@/views/demo/mobile/destruct.tsx'),
  meta: {tag: 'Antd Mobile Vue', name: '解构'}
}, {
  path: 'mobile/display',
  component: () => import('@/views/demo/mobile/display.vue'),
  meta: {tag: 'Antd Mobile Vue', name: '详情'}
}, {
  path: 'mobile/edit',
  component: () => import('@/views/demo/mobile/edit.vue'),
  meta: {tag: 'Antd Mobile Vue', name: '编辑'}
}, {
  path: 'mobile/effects',
  component: () => import('@/views/demo/mobile/effects.vue'),
  meta: {tag: 'Antd Mobile Vue', name: '副作用函数'}
}, {
  path: 'vant/basic',
  component: () => import('@/views/demo/vant/basic.vue'),
  meta: {tag: 'Vant', name: '基本'}
}, {
  path: 'vant/destruct',
  component: () => import('@/views/demo/vant/destruct.tsx'),
  meta: {tag: 'Vant', name: '解构'}
}, {
  path: 'vant/display',
  component: () => import('@/views/demo/vant/display.vue'),
  meta: {tag: 'Vant', name: '详情'}
}, {
  path: 'vant/edit',
  component: () => import('@/views/demo/vant/edit.vue'),
  meta: {tag: 'Vant', name: '编辑'}
}, {
  path: 'vant/effects',
  component: () => import('@/views/demo/vant/effects.vue'),
  meta: {tag: 'Vant', name: '副作用函数'}
}, {
  path: 'layout/array',
  component: () => import('@/views/demo/layout/array.vue'),
  meta: {tag: '布局', name: '数组'}
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
  path: 'layout/text-box',
  component: () => import('@/views/demo/layout/text-box.vue'),
  meta: {tag: '布局', name: '文本插值'}
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
}, {
  path: 'feature/complex',
  component: () => import('@/views/demo/feature/complex.vue'),
  meta: {tag: '特性', name: '复杂对象'}
}, {
  path: 'feature/default-value',
  component: () => import('@/views/demo/feature/default-value.vue'),
  meta: {tag: '特性', name: '默认值'}
}, {
  path: 'feature/depends',
  component: () => import('@/views/demo/feature/depends.vue'),
  meta: {tag: '特性', name: '关联显示'}
}, {
  path: 'feature/dynamic',
  component: () => import('@/views/demo/feature/dynamic.vue'),
  meta: {tag: '特性', name: '动态表单'}
}, {
  path: 'feature/login',
  component: () => import('@/views/demo/feature/login.vue'),
  meta: {tag: '特性', name: '登录框'}
}, {
  path: 'feature/title',
  component: () => import('@/views/demo/feature/title.vue'),
  meta: {tag: '特性', name: '修改标题'}
}] as RouteConfig[];
