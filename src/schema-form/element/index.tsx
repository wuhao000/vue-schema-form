import TimePicker from './components/time-picker';
import Upload from './components/upload';
import Transfer from './components/transfer';
import {
  ElIcon,
  ElMessageBox,
} from 'element-plus';
import 'element-plus/dist/index.css';
import {Component} from 'vue';
import {ILibComponents} from '../../../types';
import {
  config,
  FieldTypes,
  registerComponent,
  registerDesktopLib, registerDisplay
} from '../index';
import CheckboxGroup from './components/checkbox-group';
import RadioGroup from './components/radio-group';
import Select from './components/select';
import Button from './components/button';
import {
  createAlert,
  createAside,
  createCard,
  createCheckbox,
  createPassword,
  createCol,
  createContainer, createDatePicker, createEmpty, createFooter,
  createForm,
  createFormItem, createHeader,
  createInput,
  createInputNumber, createMain, createPopover, createRate,
  createResult,
  createRow, createSlider, createSwitch, createCascader
} from "./utils";
import {FieldDefinition} from "../bean/field-definition";
import {getTransferOptions} from "../utils/utils";
import RateDisplay from "./components/display/rate";
import PasswordDisplay from "./components/display/password";

const ComponentMap: Record<keyof ILibComponents, any> = {
  result: createResult(),
  card: createCard(),
  checkbox: createCheckbox(),
  empty: createEmpty(),
  button: Button,
  row: createRow(),
  col: createCol(),
  form: createForm(),
  formItem: createFormItem(),
  alert: createAlert(),
  select: Select,
  input: createInput(),
  layout: createContainer(),
  header: createHeader(),
  footer: createFooter(),
  sider: createAside(),
  content: createMain(),
  popup: createPopover(),
  popover: createPopover(),
  icons: {
    info: <ElIcon class="el-info"/>,
    up: <ElIcon class="el-up"/>,
    down: <ElIcon class="el-down"/>,
    delete: <ElIcon class="el-delete"/>,
    plus: <ElIcon class="el-plus"/>
  }
};

export function registerElement() {
  console.debug('注册Element Plus表单组件');
  registerDesktopLib(ComponentMap);
  config.confirmFn.desktop = ElMessageBox.confirm;
  config.formItemPropTransform.desktop = (component: Component, field) => {
    const props: any = {};
    if (field.errors.length) {
      props.error = field.errors.join('、');
      props.showMessage = true;
    }
    if (field.definition?.wrapperProps?.noTitle || !field?.definition?.title) {
      props.required = false;
    }
    return props;
  };
  registerComponent({
    component: createInput(),
    types: [FieldTypes.String, FieldTypes.Url],
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: createSwitch(),
    types: FieldTypes.Boolean,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: Button,
    types: FieldTypes.Button,
    platforms: 'desktop',
    mode: 'render',
    wrap: false,
    getProps(definition, platform) {
      return {
        title: definition.title
      }
    },
  });
  registerComponent({
    component: Select,
    types: FieldTypes.Select,
    arrayMode: 'both',
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: field => {
      return {
        multiple: field.array,
        options: field.options
      };
    }
  });
  registerComponent({
    component: TimePicker,
    types: FieldTypes.Time,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: TimePicker.RangePicker,
    types: FieldTypes.TimeRange,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: createPassword(),
    types: FieldTypes.Password,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: CheckboxGroup,
    types: FieldTypes.ExpandSelect,
    arrayMode: 'array',
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: field => {
      return {options: field.options, multiple: true};
    }
  });
  registerComponent({
    component: RadioGroup,
    types: FieldTypes.ExpandSelect,
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: field => {
      return {options: field.options, multiple: true};
    }
  });
  registerComponent({
    component: createInputNumber(),
    types: [FieldTypes.Double, FieldTypes.Integer, FieldTypes.Number],
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: createDatePicker(),
    types: [FieldTypes.Date,
      FieldTypes.DateRange,
      FieldTypes.Year, FieldTypes.Month, FieldTypes.Datetime],
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: definition => ({type: (definition.type as string).toLowerCase()})
  });
  registerComponent({
    component: createRate(),
    types: [FieldTypes.Rate],
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: createCascader(),
    types: [FieldTypes.Cascader],
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: (field) => {
      return {options: field.options};
    },
  });
  registerComponent({
    component: createSlider(),
    types: [FieldTypes.Range],
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: Transfer,
    types: [FieldTypes.Transfer],
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: (def: FieldDefinition) => {
      if (def.options) {
        return {data: def.options, render: (item) => item.title};
      }
      const dataSource = def.props?.dataSource || getTransferOptions(def.enum || []);
      return {data: dataSource, render: (item) => item.title};
    }
  });
  registerComponent({
    component: Upload,
    types: [FieldTypes.Picture],
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: () => {
      return {
        mode: 'card'
      };
    }
  });
  registerComponent({
    component: Upload,
    types: [FieldTypes.File],
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: () => {
      return {
        listType: 'text'
      };
    }
  });
  registerComponent({
    component: createInput(),
    types: [FieldTypes.Text],
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: () => {
      return {
        type: 'textarea'
      };
    }
  });
  registerDisplay({
    component: RateDisplay,
    platforms: 'desktop',
    types: FieldTypes.Rate
  });
  registerDisplay({
    component: PasswordDisplay,
    platforms: 'desktop',
    types: FieldTypes.Password
  });
}
