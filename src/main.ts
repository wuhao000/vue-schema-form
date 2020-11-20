import '@/styles/github-markdown.less';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import SchemaForm from '../es/index';
import router from './router';
import store from './store';
import './styles/index.less';
import App from './views/index.vue';
import Vant from 'vant';

Vue.use(Vant);

Vue.directive('hljs', el => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
});

SchemaForm.registerAntdMobile();
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
