import {DeleteOutlined, DownOutlined, InfoCircleFilled, PlusOutlined, UpOutlined} from '@ant-design/icons-vue';
import {config, FieldTypes, register, registerComponent, registerMobile, registerMobileLib, resolveOptions} from '../';
import {ILibComponents} from '../../../types';
import NumberInput from './number';
import {Modal} from 'antd-mobile-vue-next';

const Slider = (props, ctx) => <m-slider {...props}
                                         v-slots={ctx.slots}/>;

const Button = (props, ctx) => <m-button {...props}
                                         v-slots={ctx.slots}/>;
const DatePickerItem = (props, ctx) => <m-date-picker-item {...props}
                                                           v-slots={ctx.slots}/>;
const Input = (props, ctx) => <m-input {...props}
                                       v-slots={ctx.slots}/>;
const PickerItem = (props, ctx) => <m-picker-item {...props}
                                                  v-slots={ctx.slots}/>;
const Textarea = (props, ctx) => <m-textarea {...props}
                                             v-slots={ctx.slots}/>;
const RadioList = (props, ctx) => <m-radio-list {...props}
                                                v-slots={ctx.slots}/>;
const RadioPopupList = (props, ctx) => <m-radio-popup-list {...props}
                                                           v-slots={ctx.slots}/>;
const SwitchItem = (props, ctx) => <m-switch-item {...props}
                                                  v-slots={ctx.slots}/>;
const Checkbox = (props, ctx) => <m-checkbox {...props}
                                             v-slots={ctx.slots}/>;
const CheckboxPopupList = (props, ctx) => <m-checkbox-popup-list {...props}
                                                                 v-slots={ctx.slots}/>;
const CheckboxList = (props, ctx) => <m-checkbox-list {...props}
                                                      v-slots={ctx.slots}/>;
const CalendarItem = (props, ctx) => <m-calendar-item {...props}
                                                      v-slots={ctx.slots}/>;

export const ComponentMap: Record<keyof ILibComponents, any> = {
  alert: null,
  col: null,
  content: null,
  empty: null,
  footer: null,
  header: null,
  layout: null,
  row: null,
  sider: null,
  card: (props, ctx) => <m-card {...props}
                                v-slots={ctx.slots}/>,
  checkbox: Checkbox,
  button: Button,
  form: (props, ctx) => <m-list {...props}
                                v-slots={ctx.slots}/>,
  formItem: (props, ctx) => <m-list-item {...props}
                                         v-slots={ctx.slots}/>,
  popover: (props, ctx) => <m-popover {...props}
                                      v-slots={ctx.slots}/>,
  icons: {
    info: InfoCircleFilled,
    up: UpOutlined,
    down: DownOutlined,
    delete: DeleteOutlined,
    plus: PlusOutlined
  },
  input: Input,
  select: null
};


export function registerAntdMobile() {
  console.debug('注册Ant Design Mobile Vue表单组件');
  registerMobileLib(ComponentMap);
  config.confirmFn.mobile = (content: string, title?: string) => {
    return new Promise((resolve, reject) => {
      Modal.confirm(
        title, content
      ).then(value => {
        resolve(value);
      }).catch(err => {
        reject(err);
      });
    });
  };
  config.formItemPropTransform.mobile = (component, field) => {
    const props: any = {};
    props.errorMessage = field.errors.join('、');
    if (props.errorMessage) {
      props.hasFeedback = true;
      props.error = true;
    }
    if (field.definition?.wrapperProps?.noTitle || !field?.definition?.title) {
      props.colon = false;
      props.required = false;
    }
    return props;
  };
  // todo
  // registerMobile(ImagePicker, [FieldTypes.Picture, FieldTypes.File]);
  registerMobile(Input, [FieldTypes.String, FieldTypes.Url], 'single',
    () => ({textAlign: 'right'}));
  registerMobile(NumberInput, [FieldTypes.Number, FieldTypes.Integer], 'single',
    () => ({type: 'number', textAlign: 'right'}));
  registerMobile(NumberInput, [FieldTypes.Double], 'single',
    () => ({type: 'digit', textAlign: 'right'}));
  registerMobile(Input, [FieldTypes.Password], 'single',
    () => ({type: 'password'}));
  // registerMobile(Range, [FieldTypes.Range], 'single');
  registerMobile(Textarea, [FieldTypes.Text], 'single');
  registerMobile(DatePickerItem, [
      FieldTypes.Date,
      FieldTypes.Year,
      FieldTypes.Month,
      FieldTypes.Datetime],
    'single', (definition) => ({mode: (definition.type as string).toLowerCase()}));
  registerMobile(CalendarItem, [FieldTypes.DateRange], 'single', () => ({type: 'range'}));
  registerMobile(CalendarItem, [FieldTypes.DateTimeRange], 'single', () => ({type: 'range', pickTime: true}));
  registerMobile(Checkbox, FieldTypes.Checkbox, 'single');

  registerComponent({
    component: SwitchItem,
    types: FieldTypes.Boolean,
    platforms: 'mobile',
    valueProp: 'checked'
  });
  registerComponent({
    component: Button,
    types: FieldTypes.Button,
    mode: 'render',
    platforms: 'mobile',
    getProps: field => {
      return {title: field.title};
    },
    wrap: false
  });
  registerMobile(CheckboxList, FieldTypes.ExpandSelect, 'array', field => {
    return {options: resolveOptions(field), multiple: true};
  });
  registerMobile(RadioList, FieldTypes.ExpandSelect, 'single', field => {
    return {options: resolveOptions(field)};
  });
  registerMobile(PickerItem, FieldTypes.Transfer, 'single');
  registerMobile(CheckboxPopupList, FieldTypes.Select, 'array', field => {
    return {options: resolveOptions(field), multiple: true};
  });
  registerMobile(RadioPopupList, FieldTypes.Select, 'single', field => {
    return {options: resolveOptions(field)};
  });
  register(Slider, 'mobile', FieldTypes.Range, 'single', () => {
    return {range: true};
  });
}