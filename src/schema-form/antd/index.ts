import {DeleteOutlined, DownOutlined, InfoCircleFilled, PlusOutlined, UpOutlined} from '@ant-design/icons-vue';
import {App, Component} from 'vue';
import {
  config,
  FieldTypes,
  register,
  registerComponent,
  registerDesktop,
  registerDesktopLib,
  registerDisplay,
  resolveOptions
} from '../';
import {FieldDefinition, ILibComponents} from '../../../types';
import DUrl from '../common/url';
import {isNotNull} from '../utils/utils';
import Button from './components/button';
import CheckboxGroup from './components/checkbox-group';
import DatePicker from './components/date-picker';
import Form from './components/form/form';
import Item from './components/form/item';
import RadioGroup from './components/radio-group';
import RangePicker from './components/range-picker';
import Select from './components/select';
import TimePicker from './components/time-picker';
import FileDisplay from './display/file';
import RateDisplay from './display/rate';
import TransferDisplay from './display/transfer';
import InputField from './input';
import Transfer from './transfer';
import AntdUpload from './upload';
import {
  createCard,
  createCascader,
  createCheckbox, createCol, createComponentProxy, createEmpty, createInput, createInputNumber, createLayout,
  createLayoutContent,
  createLayoutFooter,
  createLayoutHeader, createLayoutSider, createPassword, createPopover,
  createRate,
  createRow,
  createSlider,
  createSwitch,
  createTextarea
} from './utils';
const Alert = window.antd.Alert;
const Modal = window.antd.Modal;

const ComponentMap: Record<keyof ILibComponents, any> = {
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
  select: Select,
  button: Button,
  form: Form,
  formItem: Item,
  alert: Alert,
  icons: {
    info: InfoCircleFilled,
    up: UpOutlined,
    down: DownOutlined,
    delete: DeleteOutlined,
    plus: PlusOutlined
  }
};


function getTransferOptions(array) {
  return array.map((item: any) => {
    if (typeof item === 'string') {
      return {key: item, title: item};
    } else {
      return {
        key: (item.key || item.value).toString(),
        title: item.title || item.label,
        description: item.description || item.label,
        disabled: !!item.disabled
      };
    }
  });
}

const transferPropsTransform = (def: FieldDefinition) => {
  if (typeof def.enum === 'function') {
    const result = def.enum();
    if (Array.isArray(result)) {
      return {dataSource: getTransferOptions(result), render: (item) => item.title};
    }
    if (result.then) {
      result.then(data => {
        def.props.dataSource = getTransferOptions(data);
      });
    }
    return {render: (item) => item.title};
  } else if (typeof def.enum === 'object' && def.enum['then']) {
    def.enum['then'](data => {
      def.props.dataSource = getTransferOptions(data);
    });
    return {render: (item) => item.title};
  }
  const dataSource = def.props?.dataSource || getTransferOptions(def.enum || []);
  return {dataSource, render: (item) => item.title};
};

export function registerAntd() {
  console.debug('注册Ant Design Vue表单组件');
  registerDesktopLib(ComponentMap);
  config.confirmFn.desktop = (content: string, title?: string) => {
    return new Promise((resolve, reject) => {
      Modal.confirm({
        content,
        title,
        onCancel: () => {
          reject();
        },
        onOk: () => {
          resolve(undefined);
        }
      });
    });
  };
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
      return {multiple: definition.array, mode: 'picture'};
    }
  });
  registerDesktop(createComponentProxy(TimePicker),
      [FieldTypes.Time],
      'single', (definition) => ({mode: (definition.type as string).toLowerCase()}));
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
      return {multiple: definition.array};
    }
  });
  registerDesktop(createComponentProxy(RangePicker), [FieldTypes.DateRange], 'single');
  registerDesktop(createComponentProxy(InputField), [FieldTypes.String], 'single');
  registerDesktop(createTextarea(), [FieldTypes.Text], 'single');
  registerDesktop(createComponentProxy(DatePicker),
      [FieldTypes.Date, FieldTypes.Year, FieldTypes.Month, FieldTypes.Datetime],
      'single', (definition) => ({mode: (definition.type as string).toLowerCase()}));
  registerDesktop(createComponentProxy(TimePicker), [FieldTypes.Time], 'single',
      (definition) => ({mode: (definition.type as string).toLowerCase()}));
  registerDesktop(createInputNumber(), [FieldTypes.Double, FieldTypes.Integer, FieldTypes.Number], 'single', field => {
    const props: any = {};
    if (isNotNull(field.min)) {
      props.min = field.min
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
  registerDesktop(createComponentProxy(DUrl), FieldTypes.Url, 'single', (def, platform) => {
    return {
      platform
    };
  });
  registerDesktop(createComponentProxy(Select), FieldTypes.Select, 'both', field => {
    return {
      dropdownMatchSelectWidth: false,
      mode: field.array ? 'multiple' : field.props?.mode,
      options: resolveOptions(field as any)
    };
  });
  registerComponent({
    component: createComponentProxy(Button),
    types: FieldTypes.Button,
    platforms: 'desktop',
    mode: 'render',
    getProps: field => {
      return {title: field.title};
    },
    wrap: false
  });

  registerDesktop(createCascader(), FieldTypes.Cascader, 'single', field => {
    return {options: resolveOptions(field)};
  });
  registerDesktop(createComponentProxy(CheckboxGroup), FieldTypes.ExpandSelect, 'array', field => {
    return {options: resolveOptions(field)};
  });
  registerDesktop(createComponentProxy(RadioGroup), FieldTypes.ExpandSelect, 'single', field => {
    return {options: resolveOptions(field)};
  });
  registerDesktop(createRate(), FieldTypes.Rate);
  registerDesktop(createComponentProxy(Transfer), FieldTypes.Transfer, 'single', transferPropsTransform);
  register(createSlider(), 'desktop',
      FieldTypes.Range, 'single', () => {
    return {range: true};
  });
}

export default (app: App) => {
  app.component(Form.name, Form);
  app.component(Item.name, Item);
}
