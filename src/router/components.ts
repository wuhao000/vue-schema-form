export default [{
  path: 'picture',
  component: () => import('../generated/demo/components/picture.vue'),
  meta: {tag: '组件',
    name: '图片'}
}, {
  path: 'file',
  component: () => import('../generated/demo/components/file.vue'),
  meta: {tag: '组件',
    name: '文件'}
}, {
  path: 'checkbox',
  component: () => import('../generated/demo/components/checkbox.vue'),
  meta: {tag: '组件',
    name: '复选框'}
}, {
  path: 'button',
  component: () => import('../generated/demo/components/button.vue'),
  meta: {tag: '组件',
    name: '按钮'}
}, {
  path: 'select',
  component: () => import('../generated/demo/components/select.vue'),
  meta: {tag: '组件',
    name: '选择'}
}, {
  path: 'time-picker',
  component: () => import('../generated/demo/components/time-picker.vue'),
  meta: {tag: '组件',
    name: '时间选择器'}
}, {
  path: 'form',
  component: () => import('../generated/demo/components/form.vue'),
  meta: {tag: '组件',
    name: '表单'}
}, {
  path: 'grid',
  component: () => import('../generated/demo/components/grid.vue'),
  meta: {tag: '组件',
    name: '栅格'}
}];
