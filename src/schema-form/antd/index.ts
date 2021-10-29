import {DeleteOutlined, DownOutlined, InfoCircleFilled, PlusOutlined, UpOutlined} from '@ant-design/icons-vue';
import {
  Alert,
  AutoComplete,
  Card,
  Cascader,
  Checkbox,
  Col,
  Empty,
  Input,
  InputNumber,
  Layout,
  Modal,
  Popover,
  Rate,
  Row,
  Slider,
  Switch
} from 'ant-design-vue';
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
import {ILibComponents, SchemaFormField} from '../../../types';
import DUrl from '../common/url';
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
import {createComponentProxy} from './utils';

const ComponentMap: Record<keyof ILibComponents, any> = {
  card: Card,
  checkbox: Checkbox,
  empty: Empty,
  select: Select,
  input: Input,
  button: Button,
  row: Row,
  col: Col,
  form: Form,
  formItem: Item,
  alert: Alert,
  layout: Layout,
  header: Layout.Header,
  footer: Layout.Footer,
  sider: Layout.Sider,
  content: Layout.Content,
  popover: Popover,
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

const transferPropsTransform = (def: SchemaFormField) => {
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
  registerDesktop(createComponentProxy(Input.Password), [FieldTypes.Password], false);
  registerComponent({
    component: AntdUpload,
    types: FieldTypes.Picture,
    platforms: 'desktop',
    forDisplay: false,
    getProps: definition => {
      return {multiple: definition.array, mode: 'picture'};
    }
  });
  registerDesktop(createComponentProxy(TimePicker), [FieldTypes.Time], false, (definition) => ({mode: (definition.type as string).toLowerCase()}));
  registerComponent({
    component: AutoComplete,
    forDisplay: false,
    platforms: 'desktop',
    types: [FieldTypes.AutoComplete],
    forArray: false
  });
  registerComponent({
    component: TimePicker.RangePicker,
    forDisplay: false,
    platforms: 'desktop',
    types: [FieldTypes.TimeRange],
    forArray: false
  });
  registerComponent({
    component: AntdUpload,
    types: FieldTypes.File,
    platforms: 'desktop',
    forDisplay: false,
    getProps: definition => {
      return {multiple: definition.array};
    }
  });
  registerDesktop(createComponentProxy(RangePicker), [FieldTypes.DateRange], false);
  registerDesktop(createComponentProxy(InputField), [FieldTypes.String], false);
  registerDesktop(createComponentProxy(Input.TextArea), [FieldTypes.Text], false);
  registerDesktop(createComponentProxy(DatePicker), [FieldTypes.Date, FieldTypes.Year, FieldTypes.Month, FieldTypes.Datetime], false, (definition) => ({mode: (definition.type as string).toLowerCase()}));
  registerDesktop(createComponentProxy(TimePicker), [FieldTypes.Time], false, (definition) => ({mode: (definition.type as string).toLowerCase()}));
  registerDesktop(createComponentProxy(InputNumber), [FieldTypes.Double, FieldTypes.Integer, FieldTypes.Number], false);
  registerComponent({
    component: createComponentProxy(Checkbox),
    types: FieldTypes.Checkbox,
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'checked'
  });
  registerComponent({
    component: createComponentProxy(Switch),
    types: FieldTypes.Boolean,
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'checked'
  });
  registerDesktop(createComponentProxy(DUrl), FieldTypes.Url, false, (def, platform) => {
    return {
      platform
    };
  });
  registerDesktop(createComponentProxy(Select), FieldTypes.Select, null, field => {
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
    forInput: false,
    forDisplay: false,
    forArray: null,
    getProps: field => {
      return {title: field.title};
    },
    wrap: false
  });

  registerDesktop(createComponentProxy(Cascader), FieldTypes.Cascader, false, field => {
    return {options: resolveOptions(field)};
  });
  registerDesktop(createComponentProxy(CheckboxGroup), FieldTypes.ExpandSelect, true, field => {
    return {options: resolveOptions(field), multiple: true};
  });
  registerDesktop(createComponentProxy(RadioGroup), FieldTypes.ExpandSelect, false, field => {
    return {options: resolveOptions(field)};
  });
  registerDesktop(createComponentProxy(Rate), FieldTypes.Rate);
  registerDesktop(createComponentProxy(Transfer), FieldTypes.Transfer, false, transferPropsTransform);
  register(createComponentProxy(Slider), 'desktop', FieldTypes.Range, false, () => {
    return {range: true};
  });
}

export default (app: App) => {
  app.component(Form.name, Form);
  app.component(Item.name, Item);
}
