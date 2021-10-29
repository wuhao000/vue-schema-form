import {
  ElAlert,
  ElAside,
  ElButton,
  ElCard,
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
  registerDesktopLib,
  resolveOptions
} from '../schema-form';
import {createComponentProxy} from '../schema-form/antd/utils';
import DUrl from '../schema-form/common/url';
import CheckboxGroup from './components/checkbox-group';
import RadioGroup from './components/radio-group';
import Select from './components/select';
import TimePicker from './components/time-picker';

const ComponentMap: Record<keyof ILibComponents, any> = {
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
    types: [FieldTypes.String],
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElSwitch,
    types: FieldTypes.Boolean,
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElButton,
    types: FieldTypes.Button,
    platforms: 'desktop',
    forInput: false,
    forDisplay: false,
    forArray: null,
    wrap: false
  });
  registerComponent({
    component: Select,
    types: FieldTypes.Select,
    forArray: null,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: field => {
      return {
        multiple: field.array,
        options: resolveOptions(field as any)
      };
    }
  });
  registerComponent({
    component: CheckboxGroup,
    types: FieldTypes.ExpandSelect,
    forArray: true,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: field => {
      return {options: resolveOptions(field as any), multiple: true};
    }
  });
  registerComponent({
    component: RadioGroup,
    types: FieldTypes.ExpandSelect,
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: field => {
      return {options: resolveOptions(field as any), multiple: true};
    }
  });
  registerComponent({
    component: ElInputNumber,
    types: [FieldTypes.Double, FieldTypes.Integer, FieldTypes.Number],
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElDatePicker,
    types: [FieldTypes.Date,
      FieldTypes.DateRange,
      FieldTypes.Year, FieldTypes.Month, FieldTypes.Datetime],
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: definition => ({type: (definition.type as string).toLowerCase()})
  });
  // registerComponent({
  //   component: TimePicker,
  //   types: [FieldTypes.Time],
  //   forArray: false,
  //   forDisplay: false,
  //   platforms: 'desktop',
  //   valueProp: 'modelValue'
  // });
  // registerComponent({
  //   component: TimePicker.RangePicker,
  //   types: [FieldTypes.TimeRange],
  //   forArray: false,
  //   forDisplay: false,
  //   platforms: 'desktop',
  //   valueProp: 'modelValue'
  // });
  registerComponent({
    component: ElRate,
    types: [FieldTypes.Rate],
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElSlider,
    types: [FieldTypes.Range],
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerDesktop(createComponentProxy(DUrl), FieldTypes.Url, false, (def, platform) => {
    return {
      platform, valueProp: 'modelValue'
    };
  });
  registerComponent({
    component: ElTransfer,
    types: [FieldTypes.Transfer],
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue'
  });
  registerComponent({
    component: ElUpload,
    types: [FieldTypes.Picture],
    forArray: false,
    forDisplay: false,
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
    forArray: false,
    forDisplay: false,
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
    forArray: false,
    forDisplay: false,
    platforms: 'desktop',
    valueProp: 'modelValue',
    getProps: () => {
      return {
        type: 'textarea'
      };
    }
  });

}
