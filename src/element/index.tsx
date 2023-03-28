import {
  ElAlert,
  ElAside,
  ElButton,
  ElCard,
  ElResult,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElDatePicker,
  ElEmpty,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElMain,
  ElMessageBox,
  ElPopover,
  ElRate,
  ElRow,
  ElSlider,
  ElSwitch,
  ElTransfer,
  ElUpload
} from 'element-plus';
import 'element-plus/dist/index.css';
import {Component} from 'vue';
import {ILibComponents} from '../../types';
import {
  config,
  FieldTypes,
  registerComponent,
  registerDesktop,
  registerDesktopLib
} from '../schema-form';
import CheckboxGroup from './components/checkbox-group';
import RadioGroup from './components/radio-group';
import Select from './components/select';

const ComponentMap: Record<keyof ILibComponents, any> = {
  result: ElResult,
  card: ElCard,
  checkbox: ElCheckbox,
  empty: ElEmpty,
  button: ElButton,
  row: ElRow,
  col: ElCol,
  form: ElForm,
  formItem: ElFormItem,
  alert: ElAlert,
  select: Select,
  input: ElInput,
  layout: ElContainer,
  header: ElHeader,
  footer: ElFooter,
  sider: ElAside,
  content: ElMain,
  popup: ElPopover,
  popover: ElPopover,
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
    if (field.definition?.wrapperProps?.noTitle || !field?.definition?.title) {
      props.required = false;
    }
    return props;
  };
  registerComponent({
    component: ElInput,
    types: [FieldTypes.String, FieldTypes.Url],
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElSwitch,
    types: FieldTypes.Boolean,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElButton,
    types: FieldTypes.Button,
    platforms: 'desktop',
    mode: 'render',
    wrap: false
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
    component: ElInputNumber,
    types: [FieldTypes.Double, FieldTypes.Integer, FieldTypes.Number],
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElDatePicker,
    types: [FieldTypes.Date,
      FieldTypes.DateRange,
      FieldTypes.Year, FieldTypes.Month, FieldTypes.Datetime],
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: definition => ({type: (definition.type as string).toLowerCase()})
  });
  registerComponent({
    component: ElRate,
    types: [FieldTypes.Rate],
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElSlider,
    types: [FieldTypes.Range],
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElTransfer,
    types: [FieldTypes.Transfer],
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElUpload,
    types: [FieldTypes.Picture],
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: () => {
      return {
        listType: 'picture'
      };
    }
  });
  registerComponent({
    component: ElUpload,
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
    component: ElInput,
    types: [FieldTypes.Text],
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: () => {
      return {
        type: 'textarea'
      };
    }
  });

}
