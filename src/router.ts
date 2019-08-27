import VueRouter from 'vue-router';

export default new VueRouter({
  routes: [{
    path: '/doc',
    component: () => import('@/views/readme.vue')
  }, {
    path: '/demo/element/display',
    component: () => import('@/views/demo/element-display.vue')
  }, {
    path: '/demo/element/edit',
    component: () => import('@/views/demo/element-edit.vue')
  }, {
    path: '/demo/desktop/subform/display',
    component: () => import('@/views/demo/subform-display.vue')
  }, {
    path: '/demo/desktop/validate',
    component: () => import('@/views/demo/desktop-validate.vue')
  }, {
    path: '/demo/desktop/display',
    component: () => import('@/views/demo/desktop-display.vue')
  }, {
    path: '/demo/desktop/edit',
    component: () => import('@/views/demo/desktop-edit.vue')
  }, {
    path: '/demo/mobile/display',
    component: () => import('@/views/demo/mobile-display.vue')
  }, {
    path: '/demo/mobile/edit',
    component: () => import('@/views/demo/mobile-edit.vue')
  }]
});
