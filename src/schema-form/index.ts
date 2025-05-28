import { App } from 'vue';
import { CheckboxGroup, Form, FormItem, RadioGroup } from './antd/components';
import DUrl from './common/url';
import { config } from './config';
import './display/register';
import SchemaForm from './form';
import SchemaFormField from './internal/field';
import './layout/register';
import './styles/fix.less';
import './styles/style.less';
import MobileDisplayField from './display/mobile-display-field.vue';
import VForm from './vform/v-form';
import VFormItem from './vform/v-form-item';

SchemaForm.Field = SchemaFormField;

SchemaForm.install = (app) => {
  app.component('VSchemaForm', SchemaForm);
  app.component('VSchemaFormField', SchemaForm.field);
};

SchemaForm.config = config;

export {
  VForm,
  VFormItem,
  DUrl,
  MobileDisplayField
};

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

export { SchemaFormStoreKey } from './utils/key';
export { FieldStore } from './internal/utils';
export { registerAntdMobile } from './antdm/register';
export { registerVant } from './vant/register';
export { registerAntd } from './antd';
export { registerDesktopLib, resolveOptions, FieldTypes, registerMobileLib } from './utils/utils';
export {
  registerDesktop,
  register,
  registerDisplay,
  registerMobile,
  registerResponsiveComponent
} from './utils/register';
export { registerComponent } from './config';
export * from './common/base-button';
export * from './common/base-url';
export * from './common/base-upload';
export * from './config';
export * from './mixins';
export * from './create';
export { SchemaFormEvents } from './internal/utils';

SchemaForm.install = (app: App) => {
  app.component(Form.name, Form);
  app.component(FormItem.name, FormItem);
  app.component(CheckboxGroup.name, CheckboxGroup);
  app.component(RadioGroup.name, RadioGroup);
  app.component(DUrl.name, DUrl);
  app.component(SchemaForm.name, SchemaForm);
  app.component(VForm.name, VForm);
  app.component(VFormItem.name, VFormItem);
};

export default SchemaForm as typeof SchemaForm & {
  install: (app) => void;
};
