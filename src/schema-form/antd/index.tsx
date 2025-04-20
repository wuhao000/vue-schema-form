import { App, Component, h } from 'vue';
import {
  config, ConfirmFn,
  FieldTypes, MessageInstance,
  register,
  registerComponent,
  registerDesktop,
  registerDesktopLib,
  registerDisplay
} from '../';
import { ILibComponents } from '../../../types';
import { FieldDefinition } from '../bean/field-definition';
import { getTransferOptions, isNotNull } from '../utils/utils';
import Button from './components/button';
import CheckboxGroup from './components/checkbox-group';
import DatePicker from './components/date-picker';
import Form from './components/form';
import RadioGroup from './components/radio-group';
import RangePicker from './components/range-picker';
import Select from './components/select';
import TimePicker from './components/time-picker';
import FileDisplay from './display/file.vue';
import RateDisplay from './display/rate.vue';
import TransferDisplay from './display/transfer.vue';
import InputField from './input';
import Transfer from './transfer';
import AntdUpload from './upload';
import {
  createAlert,
  createCard,
  createCascader,
  createCheckbox,
  createCol,
  createCollapse,
  createComponentProxy,
  createEmpty,
  createInput,
  createInputNumber,
  createLayout,
  createLayoutContent,
  createLayoutFooter,
  createLayoutHeader,
  createLayoutSider,
  createPassword,
  createPopover,
  createPopup,
  createRate,
  createResult,
  createRow,
  createSlider,
  createSwitch,
  createTextarea
} from './utils';

const ComponentMap: Record<keyof ILibComponents, any> = {
  collapse: createCollapse(),
  card: createCard(),
  checkbox: createCheckbox(),
  empty: createEmpty(),
  input: createInput(),
  row: createRow(),
  col: createCol(),
  layout: createLayout(),
  header: createLayoutHeader(),
  footer: createLayoutFooter(),
  sider: createLayoutSider(),
  content: createLayoutContent(),
  popover: createPopover(),
  popup: createPopup(),
  result: createResult(),
  select: Select,
  button: Button,
  form: Form,
  formItem: Form.Item,
  alert: createAlert(),
  icons: {
    info: (props) => <info-circle-outlined {...props} />,
    up: (props) => <up-outlined {...props} />,
    down: (props) => <down-outlined {...props} />,
    delete: (props) => <delete-outlined {...props} />,
    plus: (props) => <plus-outlined {...props} />,
    upload: (props) => <upload-outlined {...props} />,
    camera: (props) => <camera-outlined {...props} />,
  }
};

const transferPropsTransform = (def: FieldDefinition) => {
  if (def.options) {
    return { dataSource: def.options, render: (item) => item.title };
  }
  const dataSource = def.props?.dataSource || getTransferOptions(def.enum || []);
  return { dataSource, render: (item) => item.title };
};

export function registerAntd(registerConfig?: {
  message: MessageInstance,
  confirm: ConfirmFn
}) {
  console.debug('注册Ant Design Vue表单组件');
  if (!registerConfig?.message) {
    console.warn('没有注册antd的message方法');
  }
  if (!registerConfig?.confirm) {
    console.warn('没有注册antd的confirm方法');
  }
  registerDesktopLib(ComponentMap);
  config.message.desktop = registerConfig?.message;
  config.confirm.desktop = registerConfig?.confirm;
  config.formItemPropTransform.desktop = (component: Component, field) => {
    const props: any = {};
    if (field.errors.length) {
      props.help = field.errors.join('、');
      props.validateStatus = 'error';
    } else if (field.description) {
      props.help = field.description;
    }
    if (props.help) {
      props.hasFeedback = true;
    }
    if (field.definition?.wrapperProps?.noTitle || !field?.definition?.title) {
      props.colon = false;
      props.required = false;
    }
    return props;
  };
  registerDisplay({
    component: FileDisplay,
    platforms: 'desktop',
    types: [FieldTypes.File, FieldTypes.Picture]
  });
  registerDisplay({
    component: TransferDisplay,
    platforms: 'desktop',
    types: FieldTypes.Transfer,
    getProps: transferPropsTransform
  });
  registerDisplay({
    component: RateDisplay,
    platforms: 'desktop',
    types: FieldTypes.Rate
  });
  registerDesktop(createPassword(), [FieldTypes.Password], 'single');
  registerComponent({
    component: AntdUpload,
    arrayMode: 'both',
    types: FieldTypes.Picture,
    platforms: 'desktop',
    getProps: definition => {
      return { multiple: definition.array, mode: 'picture' };
    }
  });
  registerDesktop(createComponentProxy(TimePicker),
      [FieldTypes.Time],
      'single', (definition) => ({ mode: (definition.type as string).toLowerCase() }));
  registerComponent({
    component: 'a-auto-complete',
    platforms: 'desktop',
    types: [FieldTypes.AutoComplete]
  });
  registerComponent({
    component: TimePicker.RangePicker,
    platforms: 'desktop',
    types: [FieldTypes.TimeRange]
  });
  registerComponent({
    component: AntdUpload,
    arrayMode: 'both',
    types: FieldTypes.File,
    platforms: 'desktop',
    getProps: definition => {
      return { multiple: definition.array };
    }
  });
  registerDesktop(createComponentProxy(RangePicker), [FieldTypes.DateRange], 'single');
  registerDesktop(createComponentProxy(RangePicker), [FieldTypes.DateTimeRange], 'single', _ => {
    return {
      showTime: true
    };
  });
  registerDesktop(createComponentProxy(InputField), [FieldTypes.String, FieldTypes.Url], 'single');
  registerDesktop(createTextarea(), [FieldTypes.Text], 'single');
  registerDesktop(createComponentProxy(DatePicker),
      [FieldTypes.Date, FieldTypes.Year, FieldTypes.Month, FieldTypes.Datetime],
      'single', (definition) => ({ mode: (definition.type as string).toLowerCase() }));
  registerDesktop(createComponentProxy(TimePicker), [FieldTypes.Time], 'single',
      (definition) => ({ mode: (definition.type as string).toLowerCase() }));
  registerDesktop(createInputNumber(), [FieldTypes.Double, FieldTypes.Integer, FieldTypes.Number], 'single', field => {
    const props: any = {};
    if (isNotNull(field.min)) {
      props.min = field.min;
    }
    if (isNotNull(field.max)) {
      props.max = field.max;
    }
    props.errorDisplayType = 'toast';
    return props;
  });
  registerComponent({
    component: createCheckbox(),
    types: FieldTypes.Checkbox,
    platforms: 'desktop',
    valueProp: 'checked'
  });
  registerComponent({
    component: createSwitch(),
    types: FieldTypes.Boolean,
    platforms: 'desktop',
    valueProp: 'checked'
  });
  registerDesktop(createComponentProxy(Select), FieldTypes.Select, 'both', field => {
    return {
      dropdownMatchSelectWidth: false,
      mode: field.array ? 'multiple' : field.props?.mode,
      options: field.options
    };
  });
  registerComponent({
    component: createComponentProxy(Button),
    types: FieldTypes.Button,
    platforms: 'desktop',
    mode: 'render',
    getProps: field => {
      return { title: field.title };
    },
    wrap: false
  });

  registerDesktop(createCascader(), FieldTypes.Cascader, 'single', field => {
    return { options: field.options };
  });
  registerDesktop(createComponentProxy(CheckboxGroup), FieldTypes.ExpandSelect, 'array', field => {
    return { options: field.options };
  });
  registerDesktop(createComponentProxy(RadioGroup), FieldTypes.ExpandSelect, 'single', field => {
    return { options: field.options };
  });
  registerDesktop(createRate(), FieldTypes.Rate);
  registerDesktop(createComponentProxy(Transfer), FieldTypes.Transfer, 'single', transferPropsTransform);
  register(createSlider(), 'desktop',
      FieldTypes.Range, 'single', () => {
        return { range: true };
      });
}

export default (app: App) => {
  app.component(Form.name, Form);
  app.component(Form.Item.name, Form.Item);
}
