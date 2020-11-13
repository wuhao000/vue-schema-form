import '@/styles/github-markdown.less';
import 'element-ui/lib/theme-chalk/index.css';
import {createApp} from 'vue';
import router from './router';
import store from './store';
import './styles/index.less';
import App from './views/index.vue';
import plugins from '@/plugins';

const app = createApp(App as any);
app.use(store);
app.use(plugins);
// app.directive('hljs', el => {
//   const blocks = el.querySelectorAll('pre code');
//   blocks.forEach(block => {
//     hljs.highlightBlock(block);
//   });
// });
app.use(router);
app.mount('#app');
