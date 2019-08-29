import {getDefault} from '@/uform/builder/utils/lang';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import SchemaForm from './index';
import router from './router';
import store from './store';
import './styles/index.less';
import App from './views/index.vue';

SchemaForm.registerAntdMobile();


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
