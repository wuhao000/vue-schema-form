import SchemaFormField from './internal/field';
import SchemaForm from './form';
import './styles/style.less';
SchemaForm.Field = SchemaFormField;

SchemaForm.install = function (Vue) {
  Vue.component('VSchemaForm', SchemaForm);
  Vue.component('VSchemaFormField', SchemaForm.Field);
};

export default SchemaForm;