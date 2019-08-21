import Element from 'element-ui';
import Vue from 'vue';
import App from './App.vue';
import SchemaForm from './index';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(Element);
SchemaForm.registerElement();

Vue.use(SchemaForm);

new Vue({
  render: h => h(App)
}).$mount('#app');
