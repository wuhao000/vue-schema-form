import '@/styles/github-markdown.less';
import 'element-ui/lib/theme-chalk/index.css';
import {createApp} from 'vue';
import SchemaForm from './index';
import router from './router';
import store from './store';
import './styles/index.less';
import App from './views/index.vue';
import 'antd-vue3/lib/antd-vue3.css';
import AntdVue3 from 'antd-vue3/lib/antd-vue3.common';



const app = createApp(App);
app.use(SchemaForm);
app.use(AntdVue3);
app.directive('hljs', el => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });
});
app.use(router).use(store).mount('#app');
