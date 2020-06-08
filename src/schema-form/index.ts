import SchemaFormField from './internal/field';
import SchemaForm from './form';
import '../styles/style.less';

SchemaForm.Field = SchemaFormField;

SchemaForm.install = (app) => {
  app.component('VSchemaForm', SchemaForm);
  app.component('VSchemaFormField', SchemaForm.Field);
};

export default SchemaForm;
