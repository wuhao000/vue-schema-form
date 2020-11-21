import '@/styles/github-markdown.less';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import Vue from 'vue';
import VSchemaForm from '../src/schema-form/index';
import router from './router';
import store from './store';
import './styles/index.less';
import App from './views/index.vue';

export const SchemaForm = VSchemaForm;
Vue.use(VSchemaForm);
Vue.use(Vant);

Vue.directive('hljs', el => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');