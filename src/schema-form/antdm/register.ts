import {DeleteOutlined, DownOutlined, InfoCircleFilled, PlusOutlined, UpOutlined} from '@ant-design/icons-vue';
import {
  Button,
  Calendar,
  Card,
  Checkbox,
  DatePicker,
  ImagePicker,
  Input,
  List,
  Modal,
  Picker,
  Popover,
  Radio,
  Slider,
  Switch,
  Textarea
} from 'antd-mobile-vue-next';
import {ILibComponents, SchemaFormField} from '../../../types';
import {config, FieldTypes, register, registerComponent, registerMobile, registerMobileLib, resolveOptions} from '../';

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
  card: Card,
  checkbox: Checkbox,
  button: Button,
  form: List,
  formItem: List.Item,
  popover: Popover,
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
    props.help = field.errors.join('、');
    if (props.help) {
      props.hasFeedback = true;
      props.validateStatus = 'error';
    }
    if (field.definition?.wrapperProps?.noTitle || !field?.definition?.title) {
      props.colon = false;
      props.required = false;
    }
    return props;
  };
  registerMobile(ImagePicker, [FieldTypes.Picture, FieldTypes.File]);
  registerMobile(Input, [FieldTypes.String, FieldTypes.Url], false,
    () => ({textAlign: 'right'}));
  registerMobile(Input, [FieldTypes.Number, FieldTypes.Integer], false,
    () => ({type: 'number', textAlign: 'right'}));
  registerMobile(Input, [FieldTypes.Double], false,
    () => ({type: 'digit', textAlign: 'right'}));
  registerMobile(Input, [FieldTypes.Password], false,
    () => ({type: 'password'}));
  registerMobile(Range, [FieldTypes.Range], false);
  registerMobile(Textarea, [FieldTypes.Text], false);
  registerMobile(DatePicker.Item, [FieldTypes.Date, FieldTypes.Year, FieldTypes.Month, FieldTypes.Datetime], false, (definition) => ({mode: (definition.type as string).toLowerCase()}));
  registerMobile(Calendar.Item, [FieldTypes.DateRange], false, def => ({type: 'range'}));
  registerMobile(Calendar.Item, [FieldTypes.DateTimeRange], false, def => ({type: 'range', pickTime: true}));
  registerMobile(Checkbox, FieldTypes.Checkbox, false);

  registerComponent({
    component: Switch.Item,
    types: FieldTypes.Boolean,
    forArray: false,
    forDisplay: false,
    platforms: 'mobile',
    valueProp: 'checked'
  });
  registerComponent({
    component: Button,
    types: FieldTypes.Button,
    platforms: 'mobile',
    forDisplay: false,
    forInput: false,
    forArray: null,
    getProps: field => {
      return {title: field.title};
    },
    wrap: false
  });
  registerMobile(Checkbox.List, FieldTypes.ExpandSelect, true, field => {
    return {options: resolveOptions(field), multiple: true};
  });
  registerMobile(Radio.List, FieldTypes.ExpandSelect, false, field => {
    return {options: resolveOptions(field)};
  });
  registerMobile(Picker.Item, FieldTypes.Transfer, false);
  registerMobile(Checkbox.PopupList, FieldTypes.Select, true, field => {
    return {options: resolveOptions(field), multiple: true};
  });
  registerMobile(Radio.PopupList, FieldTypes.Select, false, field => {
    return {options: resolveOptions(field)};
  });
  register(Slider, 'mobile', FieldTypes.Range, false, () => {
    return {range: true};
  });
}
