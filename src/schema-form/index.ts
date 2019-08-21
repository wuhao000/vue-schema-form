import SchemaFormField from '@/schema-form/field';
import SchemaForm from '@/schema-form/form';

SchemaForm.Field = SchemaFormField;

SchemaForm.install = (Vue) => {
  Vue.component('SchemaForm', SchemaForm);
  Vue.component('SchemaFormField', SchemaForm.Field);
};

export default SchemaForm;
