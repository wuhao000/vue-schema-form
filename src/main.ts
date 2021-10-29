import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Antdm from 'antd-mobile-vue-next';
import 'default-passive-events';
import vant from 'vant';
import 'vant/lib/index.css';
import {createApp} from 'vue';
import SchemaForm from './schema-form';
import router from './router';
import './styles';
import './styles/github-markdown.less';
import App from './views/index.vue';
import DemoWrapper from './components/demo-wrapper.vue';
import CodeContainer from './components/code-container.vue';

const app = createApp(App);
app.config.warnHandler = () => {
  // do not show
};
app.use(Antdm as any);
app.use(router);
app.use(vant as any);
app.use(antd);
app.use(SchemaForm as any);
app.component('DemoWrapper', DemoWrapper);
app.component('CodeContainer', CodeContainer);
app.mount('#app');
