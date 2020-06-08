import {register, registerDesktop} from '../utils/register';
import {
  ComponentMap,
  DESKTOP,
  getOptions,
  LibComponents,
  TYPES
} from '../utils/utils';
import {IField} from 'v-schema-form-types';
import AntdButton from './button';
import AntdUrlInput from './url';
import AntdUpload from '../antd/upload.vue';

export function registerAntd() {
  console.debug('注册Ant Design Vue表单组件');
  Object.keys(ComponentMap).forEach(key => {
    LibComponents[key] = ComponentMap[key].antd;
  });
  registerDesktop('a-range-picker', [TYPES.daterange], false);
  registerDesktop('a-input', [TYPES.string], false);
  registerDesktop(AntdUrlInput, TYPES.url, false);
  registerDesktop('a-textarea', [TYPES.text], false);
  registerDesktop('a-date-picker', [TYPES.date, TYPES.year, TYPES.month, TYPES.datetime], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
  registerDesktop('a-time-picker', [TYPES.time], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
  registerDesktop('a-input-number', [TYPES.double, TYPES.integer, TYPES.number], false);
  registerDesktop('a-checkbox', TYPES.checkbox, false);
  registerDesktop('a-switch', TYPES.boolean);
  registerDesktop('a-select', TYPES.select, null, field => {
    return {dropdownMatchSelectWidth: false, multiple: field.array, options: getOptions(field)};
  });
  registerDesktop(AntdButton, TYPES.button, null, field => {
    return {title: field.title};
  });
  registerDesktop(AntdUpload, TYPES.upload, null, def => {
    return {multiple: def.array};
  });
  registerDesktop('a-cascader', TYPES.cascader, false, def => {
    return {options: def.enum};
  });
  registerDesktop('a-checkbox-group', TYPES.expandSelect, true, field => {
    return {options: getOptions(field), multiple: true};
  });
  registerDesktop('a-radio-group', TYPES.expandSelect, false, field => {
    return {options: getOptions(field)};
  });
  registerDesktop('a-color-picker', 'color');
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
