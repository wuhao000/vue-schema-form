import SchemaForm from './schema-form';
import './styles/fix.less';
import './schema-form/display/register';
import './schema-form/layout/register';

if (window.Vue) {
  window.Vue.use(SchemaForm);
}

export default SchemaForm;
