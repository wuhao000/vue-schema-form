import SchemaFormField from '@/schema-form/internal/field';
import SchemaForm from '@/schema-form/form';
import '../styles/style.less';

SchemaForm.Field = SchemaFormField;

SchemaForm.install = (Vue) => {
  Vue.component('VSchemaForm', SchemaForm);
  Vue.component('VSchemaFormField', SchemaForm.Field);
};

export default SchemaForm;
