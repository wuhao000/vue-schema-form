import {parseDesturctPath} from '@/uform/utils';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import SchemaForm from './index';
import router from './router';
import store from './store';
import './styles/index.less';
import App from './views/index.vue';

const path = '[a, b]';

const dPath = parseDesturctPath(path).destruct || path;

console.log(dPath);
console.log(parseDesturctPath(path).path);


SchemaForm.registerAntdMobile();


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
