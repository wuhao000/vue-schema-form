import {registerCommonDisplay} from './display/register';
import {registerCommonLayout} from './layout/register';
import SchemaFormField from './internal/field';
import SchemaForm from './form';
import './styles/style.less';

SchemaForm.Field = SchemaFormField;

SchemaForm.install = vue => {
  registerCommonLayout();
  registerCommonDisplay();
  vue.component('VSchemaForm', SchemaForm);
  vue.component('VSchemaFormField', SchemaForm.Field);
};

export default SchemaForm;
