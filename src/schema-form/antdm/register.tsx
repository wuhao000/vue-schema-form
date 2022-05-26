import {DeleteOutlined, DownOutlined, InfoCircleOutlined, PlusOutlined, UpOutlined} from '@ant-design/icons-vue';
import dayjs, {Dayjs} from 'dayjs';
import {config, FieldTypes, register, registerComponent, registerMobile, registerMobileLib} from '../';
import {ILibComponents} from '../../../types';
import {isNotNull} from '../utils/utils';
import Upload from './upload';
import NumberInput from './number';
import {Modal} from 'antd-mobile-vue-next';

const Slider = (props, ctx) => <m-slider {...props}
                                         v-slots={ctx.slots}/>;

const Button = (props, ctx) => <m-button {...props}
                                         v-slots={ctx.slots}/>;
const DatePickerItem = (props, ctx) => {
  const convertValue = (value: string) => {
    if (!value) {
      return undefined;
    }
    if (typeof value === 'string') {
      return dayjs(value, 'HH:mm' as string).toDate();
    } else {
      return dayjs(value).toDate();
    }
  };
  const convertValueBack = (value: Date) => {
    if (isNotNull(value)) {
      return dayjs(value).format('HH:mm');
    }
    return value;
  };
  return <m-date-picker-item
      {...props}
      value={convertValue(props.value)}
      onUpdate:value={v => {
        ctx.emit('update:value', convertValueBack(v));
      }}
      v-slots={ctx.slots}/>;
};
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

const ImagePicker = (props, ctx) => <m-image-picker {...props}
                                                    v-slots={ctx.slots}/>;
const CalendarItem = (props, ctx) => {
  let value = props.value;
  if (typeof value === 'string' && props.value !== '') {
    value = dayjs(value, props.format).toDate();
  } else if (Array.isArray(value)) {
    value = value.map(it => {
      if (typeof it === 'string' && it !== '') {
        return dayjs(it, props.format).toDate();
      } else {
        return it;
      }
    });
  }
  return <m-calendar-item {...props}
                          value={value}
                          onUpdate:value={v => {
                            ctx.emit('update:value', v);
                          }}
                          v-slots={ctx.slots}/>;
};

export const ComponentMap: Record<keyof ILibComponents, any> = {
  alert: null,
  col: null,
  content: null,
  empty: (props, ctx) => <m-empty
      {...props}
      v-slots={ctx.slots}/>,
  footer: null,
  header: null,
  layout: null,
  row: null,
  sider: null,
  card: (props, ctx) => {
    return <m-card {...props}
                   v-slots={{
                     ...ctx.slots,
                     default: () => {
                       if (props.title) {
                         return [
                           <m-card-header>{props.title}</m-card-header>,
                           <m-card-body>{ctx.slots.default?.()}</m-card-body>
                         ];
                       } else {
                         return <m-card-body>{ctx.slots.default?.()}</m-card-body>;
                       }
                     }
                   }}/>;
  },
  checkbox: Checkbox,
  button: Button,
  form: (props, ctx) => <m-list {...props}
                                v-slots={ctx.slots}/>,
  formItem: (props, ctx) => <m-list-item {...props}
                                         v-slots={ctx.slots}/>,
  popup: (props, ctx) => <m-popup {...props}
                                  v-slots={ctx.slots}/>,
  result: (props, ctx) => <m-result {...props}
                                    v-slots={ctx.slots}/>,
  popover: (props, ctx) => <m-popover {...props}
                                      v-slots={ctx.slots}/>,
  icons: {
    info: InfoCircleOutlined,
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
  registerMobile(DatePickerItem, FieldTypes.Time,
      'single', (definition) => ({mode: (definition.type as string).toLowerCase()}));
  registerMobile(CalendarItem, [FieldTypes.DateRange], 'single', () => ({type: 'range'}));
  registerMobile(CalendarItem, [FieldTypes.DateTimeRange], 'single', () => ({type: 'range', pickTime: true}));
  registerMobile(SwitchItem, FieldTypes.Checkbox, 'single');

  registerComponent({
    component: SwitchItem,
    types: FieldTypes.Boolean,
    platforms: 'mobile',
    valueProp: 'checked'
  });
  registerComponent({
    component: Upload,
    arrayMode: 'both',
    types: FieldTypes.File,
    platforms: 'mobile',
    getProps: definition => {
      return {multiple: definition.array};
    }
  });
  registerComponent({
    component: Upload,
    arrayMode: 'both',
    types: FieldTypes.Picture,
    platforms: 'mobile',
    getProps: definition => {
      return {multiple: definition.array, mode: 'picture'};
    }
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
    return {options: field.options, multiple: true};
  });
  registerMobile(RadioList, FieldTypes.ExpandSelect, 'single', field => {
    return {options: field.options};
  });
  registerMobile(PickerItem, FieldTypes.Transfer, 'single');
  registerMobile(CheckboxPopupList, FieldTypes.Select, 'array', field => {
    return {options: field.options, multiple: true};
  });
  registerMobile(RadioPopupList, FieldTypes.Select, 'single', field => {
    return {options: field.options};
  });
  register(Slider, 'mobile', FieldTypes.Range, 'single', () => {
    return {range: true};
  });
}
