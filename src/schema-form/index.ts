import SchemaFormField from '@/schema-form/field';
import SchemaForm from '@/schema-form/form';

SchemaForm.Field = SchemaFormField;

SchemaForm.install = (Vue) => {
  Vue.component('ASchemaForm', SchemaForm);
  Vue.component('ASchemaFormField', SchemaForm.Field);
};

export default SchemaForm;
