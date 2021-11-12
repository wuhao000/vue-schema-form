import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Antdm from 'antd-mobile-vue-next';
import 'default-passive-events';
import vant from 'vant';
import 'vant/lib/index.css';
import {createApp} from 'vue';
import CodeContainer from './components/code-container.vue';
import CodeEditor from './components/code-editor.vue';
import DemoWrapper from './components/demo-wrapper.vue';
import router from './router';
import SchemaForm from './schema-form';
import './styles';
import './styles/github-markdown.less';
import App from './views/index.vue';
import ShowValue from './views/show-value.vue';
import 'tinymce';


const app = createApp(App);
app.config.warnHandler = () => {
  // do not show
};
app.use(Antdm);
app.use(router);
app.use(vant);
app.use(antd);
app.use(SchemaForm);
app.component('DemoWrapper', DemoWrapper);
app.component('CodeContainer', CodeContainer);
app.component('CodeEditor', CodeEditor);
app.component('ShowValue', ShowValue);
app.mount('#app');
