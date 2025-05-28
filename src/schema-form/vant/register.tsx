import { config, FieldTypes, registerComponent, registerMobileLib } from '../';
import { ILibComponents } from '../../../types';
import { pick } from '../utils/pick';
import Upload from './upload';
import NumberInput from './number';
import { Dialog } from 'vant';
import omit from 'omit.js';
import RadioList from './radio-list';
import CheckboxList from './checkbox-list';
import CheckboxPopupList from './checkbox-popup-list';
import SwitchItem from './switch-item';
import DatePickerItem from './date-picker-item';
import DateRangePicker from './date-range-picker';
import TimeRangePicker from './time-range-picker';
import TimePicker from './time-picker';
import BaseField from './base-field';

const platform = 'mobile';

const Rate = (props, ctx) => <BaseField {...props}>
  <van-rate
    {...(omit(props, ['title', 'value', 'onUpdate:value']))}
    modelValue={props.value}
    onUpdate:modelValue={v => {
      ctx.emit('update:value', v);
    }}
  />
</BaseField>;

const Slider = (props, ctx) => <van-slider
  {...props}
  v-slots={ctx.slots} />;

const Button = (props, ctx) => {
  const { icon, ...extraProps } = props;
  const slots = ctx.slots;
  if (icon && !slots.icon) {
    slots.icon = () => icon;
  }
  return <van-button
    {...extraProps}
    v-slots={slots} />;
};
const Input = (props, ctx) => <van-field
  {...props}
  modelValue={props.value}
  onUpdate:modelValue={v => {
    ctx.emit('update:value', v);
  }}
  v-slots={ctx.slots} />;

const Range = (props, ctx) => <BaseField
  {...props}
>
  <van-range
    {...props}
    modelValue={props.value}
    onUpdate:modelValue={v => {
      ctx.emit('update:value', v);
    }}
    v-slots={ctx.slots} />
</BaseField>;

const Textarea = (props, ctx) => <van-field
  {...props}
  modelValue={props.value}
  onUpdate:modelValue={v => {
    ctx.emit('update:value', v);
  }}
  type="textarea"
  v-slots={ctx.slots} />;
const Checkbox = (props, ctx) => <BaseField
  {...props}
>
  <van-checkbox {...props}
                v-slots={ctx.slots} />
</BaseField>;

export const ComponentMap: Record<keyof ILibComponents, any> = {
  collapse: (props, ctx) => {
    const collapsePropKeys = ['accordion',
      'activeKey',
      'openAnimation',
      'accordion',
      'onUpdate:activeKey'
    ];
    return <m-accordion {...pick(props, collapsePropKeys)}>
      <m-accordion-panel
        {...omit(props, collapsePropKeys)}
        key={'panel'}
        v-slots={ctx.slots}
      />
    </m-accordion>;
  },
  alert: null,
  col: null,
  content: null,
  empty: (props, ctx) => <m-empty
    {...props}
    v-slots={ctx.slots} />,
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
                   }} />;
  },
  checkbox: Checkbox,
  button: Button,
  form: (props, ctx) => <van-form
    {...props}
    v-slots={ctx.slots} />,
  formItem: (props, ctx) => <van-field
    {...props}
    v-slots={{
      ...ctx.slots,
      label: ctx.slots.title ?? (() => props.title),
      input: ctx.slots.default
    }}
  />,
  popup: (props, ctx) => <m-popup {...props}
                                  v-slots={ctx.slots} />,
  result: (props, ctx) => <m-result {...props}
                                    v-slots={ctx.slots} />,
  popover: (props, ctx) => <m-popover {...props}
                                      v-slots={ctx.slots} />,
  icons: {
    info: () => <van-icon name={'info-o'} />,
    up: () => <van-icon name={'arrow-up'} />,
    down: () => <van-icon name={'arrow-down'} />,
    delete: () => <van-icon name={'close'} />,
    plus: () => <van-icon name={'plus'} />
  },
  input: Input,
  select: null
};


export function registerVant() {
  console.debug('注册Ant Design Mobile Vue表单组件');
  registerMobileLib(ComponentMap);
  config.confirm.mobile = (content: string, title?: string) => {
    return new Promise((resolve, reject) => {
      Dialog.confirm(
        {
          title,
          message: content
        }
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

  registerComponent({
    component: Input,
    types: [FieldTypes.String, FieldTypes.Url],
    arrayMode: 'single',
    getProps: () => ({ textAlign: 'right' }),
    mode: 'input',
    platforms: platform
  });

  registerComponent({
    component: NumberInput,
    types: [FieldTypes.Number, FieldTypes.Integer],
    arrayMode: 'single',
    getProps: () => ({ textAlign: 'right', type: 'number' }),
    mode: 'input',
    platforms: platform
  });

  registerComponent({
    component: NumberInput,
    types: [FieldTypes.Double],
    arrayMode: 'single',
    getProps: () => ({ textAlign: 'right', type: 'digit' }),
    mode: 'input',
    platforms: platform
  });

  registerComponent({
    component: Input,
    types: [FieldTypes.Password],
    arrayMode: 'single',
    getProps: () => ({ type: 'password' }),
    mode: 'input',
    platforms: platform
  });

  registerComponent({
    component: Range,
    types: [FieldTypes.Range],
    arrayMode: 'single',
    platforms: platform
  });

  registerComponent({
    component: Textarea,
    types: [FieldTypes.Text],
    arrayMode: 'single',
    platforms: platform
  });

  registerComponent({
    component: DatePickerItem,
    types: [FieldTypes.Date, FieldTypes.Year, FieldTypes.Month, FieldTypes.Datetime],
    arrayMode: 'single',
    platforms: platform,
    getProps: (definition) => ({ mode: (definition.type as string).toLowerCase() })
  });

  registerComponent({
    component: TimePicker,
    types: [FieldTypes.Time],
    arrayMode: 'single',
    platforms: platform,
    getProps: (definition) => ({ mode: (definition.type as string).toLowerCase() })
  });

  registerComponent({
    component: SwitchItem,
    types: FieldTypes.Checkbox,
    arrayMode: 'single',
    platforms: platform
  });

  registerComponent({
    component: DateRangePicker,
    types: FieldTypes.DateRange,
    arrayMode: 'single',
    platforms: platform,
    getProps: () => ({ type: 'range' })
  });

  registerComponent({
    component: TimeRangePicker,
    types: FieldTypes.TimeRange,
    arrayMode: 'single',
    getProps: () => ({ type: 'range', pickTime: true }),
    platforms: platform
  });

  registerComponent({
    component: SwitchItem,
    types: FieldTypes.Boolean,
    platforms: platform
  });
  registerComponent({
    component: Upload,
    arrayMode: 'both',
    types: FieldTypes.File,
    platforms: platform,
    getProps: definition => {
      return { multiple: definition.array };
    }
  });
  registerComponent({
    component: Upload,
    arrayMode: 'both',
    types: FieldTypes.Picture,
    platforms: platform,
    getProps: definition => {
      return { multiple: definition.array, mode: 'picture' };
    }
  });
  registerComponent({
    component: Button,
    types: FieldTypes.Button,
    mode: 'render',
    platforms: platform,
    getProps: field => {
      return { title: field.title };
    },
    wrap: false
  });

  registerComponent({
    component: RadioList,
    types: FieldTypes.ExpandSelect,
    arrayMode: 'single',
    platforms: platform,
    getProps: field => {
      return { options: field.options };
    }
  });

  registerComponent({
    component: CheckboxList,
    types: FieldTypes.ExpandSelect,
    arrayMode: 'array',
    platforms: platform,
    getProps: field => {
      return { options: field.options, multiple: true };
    }
  });

  registerComponent({
    component: CheckboxPopupList,
    types: FieldTypes.Select,
    arrayMode: 'single',
    platforms: platform,
    getProps: field => {
      return { options: field.options, multiple: false };
    }
  });

  registerComponent({
    component: CheckboxPopupList,
    types: FieldTypes.Select,
    arrayMode: 'array',
    platforms: platform,
    getProps: field => {
      return { options: field.options, multiple: true };
    }
  });

  // registerMobile(PickerItem, FieldTypes.Transfer, 'single');

  registerComponent({
    component: Rate,
    types: FieldTypes.Rate,
    arrayMode: 'single',
    platforms: platform
  });

  registerComponent({
    component: Slider,
    types: FieldTypes.Range,
    arrayMode: 'single',
    platforms: platform,
    getProps: () => ({ range: true })
  });

}
