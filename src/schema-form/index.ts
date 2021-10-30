import {App} from 'vue';
import {CheckboxGroup, Form, FormItem, RadioGroup} from './antd/components';
import DUrl from './common/url';
import {config} from './config';
import './display/register';
import SchemaForm from './form';
import SchemaFormField from './internal/field';
import './layout/register';
import './styles/fix.less';
import './styles/style.less';

SchemaForm.Field = SchemaFormField;

SchemaForm.install = (app) => {
  app.component('VSchemaForm', SchemaForm);
  app.component('VSchemaFormField', SchemaForm.field);
};

SchemaForm.config = config;

export {
  Button as DButton,
  CheckboxGroup,
  RadioGroup,
  TimePicker as DTimePicker,
  RangePicker as DRangePicker,
  DatePicker as DDatePicker,
  TimeRangePicker as DTimeRangePicker,
  Form as DForm,
  FormItem as DFormItem,
  Select as DSelect
} from './antd/components';

export {SchemaFormStoreKey} from './utils/key';

export {registerAntdMobile} from './antdm/register';
export {registerAntd} from './antd';
export {registerDesktopLib, resolveOptions, FieldTypes, registerMobileLib} from './utils/utils';
export {MobileDisplayField} from './display/mobile-display-field';
export {
  registerDesktop, register, registerDisplay, registerMobile, registerResponsiveComponent
} from './utils/register';
export {registerComponent} from './config';
export * from './common/base-button';
export * from './common/base-url';
export * from './common/base-upload';
export * from './config';
export * from './mixins';
export {SchemaFormEvents} from './internal/utils';

SchemaForm.install = (app: App) => {
  app.component(Form.name, Form);
  app.component(FormItem.name, FormItem);
  app.component(CheckboxGroup.name, CheckboxGroup);
  app.component(RadioGroup.name, RadioGroup);
  app.component(SchemaForm.name, SchemaForm);
  app.component(DUrl.name, DUrl);
};

export default SchemaForm;
