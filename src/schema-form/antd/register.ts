import Vue from 'vue';
import {AntdRegisterOptions, IField} from '../../../types';
import AntdUpload from '../antd/upload.vue';
import Plain from '../common/plain.vue';
import {registerMobile} from '../mobile/register';
import {addComponent, register, registerDesktop} from '../utils/register';
import {ComponentMap, DESKTOP, getOptions, LibComponents, LibName, TYPES} from '../utils/utils';
import AntdButton from './button';
import Cascader from './cascader';
import DatePicker from './date-picker';
import Form from './form';
import FormItem from './form-item';
import Input from './input';
import InputNumber from './input-number';
import RangePicker from './range-picker';
import Select from './select';
import TimePicker from './time-picker';
import TimeRangePicker from './time-range-picker.vue';
import AntdUrlInput from './url';

export function registerAntd(options?: AntdRegisterOptions) {
  console.debug('注册Ant Design Vue表单组件');
  LibName.desktop = 'antd';
  Object.keys(ComponentMap).forEach(key => {
    LibComponents[key] = ComponentMap[key].antd;
  });
  registerDesktop(RangePicker, [TYPES.daterange], false);
  registerDesktop(Cascader, TYPES.cascader, false, def => {
    return {options: def.enum};
  });
  registerDesktop(DatePicker, [TYPES.date, TYPES.year, TYPES.month, TYPES.datetime], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
  registerDesktop(Select, TYPES.select, null, field => {
    return {dropdownMatchSelectWidth: false, multiple: field.array, options: getOptions(field)};
  });
  registerDesktop(Plain, TYPES.plain, false);
  registerMobile(Plain, TYPES.plain, false);
  registerDesktop(Input, [TYPES.string], false);
  registerDesktop(AntdUrlInput, TYPES.url, false);
  registerDesktop(Input.TextArea, [TYPES.text], false);
  registerDesktop(Input.Password, [TYPES.password], false);
  registerDesktop(InputNumber, [TYPES.double, TYPES.integer, TYPES.number], false);
  registerDesktop(TimePicker, [TYPES.time], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
  addComponent({
    component: TimeRangePicker,
    forDisplay: false,
    platforms: 'desktop',
    types: [TYPES.timerange],
    forArray: false,
    modelEvent: 'change'
  });
  if (window.aegis) {
    LibComponents.confirm = window.aegis['AeModal'].confirm;
    registerDesktop('d-time-picker', [TYPES.time], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
    registerDesktop('d-checkbox', TYPES.checkbox, false);
    registerDesktop('d-switch', TYPES.boolean);
    registerDesktop('d-checkbox-group', TYPES.expandSelect, true, field => {
      return {options: getOptions(field), multiple: true};
    });
    registerDesktop('d-radio-group', TYPES.expandSelect, false, field => {
      return {options: getOptions(field)};
    });
    registerDesktop('d-color-picker', 'color');
    registerDesktop('d-rate', TYPES.rate);
    registerDesktop('d-transfer', TYPES.transfer, false, def => {
      const data = (def.props && def.props.dataSource) || def.enum || [];
      const dataSource = data.map((item: any) => {
        if (typeof item === 'string') {
          return {key: item, title: item};
        } else {
          return {
            key: (item.key || item.value).toString(),
            title: item.title || item.label,
            description: item.description || item.label,
            disabled: item.disabled || false
          };
        }
      });
      return {dataSource};
    });
    register('d-slider', DESKTOP, TYPES.range, false, () => {
      return {range: true};
    });
  } else {
    Vue.component(Form.name, Form);
    Vue.component(FormItem.name, FormItem);
    Vue.component('d-form', Form);
    Vue.component('d-form-item', FormItem);
    if (options) {
      LibComponents.confirm = options.confirm;
    } else if (window.antd) {
      LibComponents.confirm = window.antd['Modal'].confirm;
    }
    registerDesktop('a-checkbox', TYPES.checkbox, false);
    addComponent({
      component: 'a-switch',
      forDisplay: false,
      platforms: 'desktop',
      types: TYPES.boolean,
      forArray: false,
      modelProp: 'checked',
      modelEvent: 'change'
    });
    registerDesktop('a-checkbox-group', TYPES.expandSelect, true, field => {
      return {options: getOptions(field), multiple: true};
    });
    registerDesktop('a-radio-group', TYPES.expandSelect, false, field => {
      return {options: getOptions(field)};
    });
    registerDesktop('a-rate', TYPES.rate);
    registerDesktop('a-transfer', TYPES.transfer, false, def => {
      const data = (def.props && def.props.dataSource) || def.enum || [];
      const dataSource = data.map((item: any) => {
        if (typeof item === 'string') {
          return {key: item, title: item};
        } else {
          return {
            key: (item.key || item.value).toString(),
            title: item.title || item.label,
            description: item.description || item.label,
            disabled: item.disabled || false
          };
        }
      });
      return {dataSource};
    });
    register('a-slider', DESKTOP, TYPES.range, false, () => {
      return {range: true};
    });
  }
  registerDesktop(AntdButton, TYPES.button, null, field => {
    return {title: field.title};
  });
  registerDesktop(AntdUpload, TYPES.upload, null, def => {
    return {multiple: def.array};
  });
}
