import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from './App.vue';
import SchemaForm from './index';


SchemaForm.registerAntd();
SchemaForm.registerAntdMobile();


new Vue({
  render: h => h(App)
}).$mount('#app');
