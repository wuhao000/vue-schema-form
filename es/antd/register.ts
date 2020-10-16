import {registerMobile} from '../mobile/register';
import {IField} from 'v-schema-form-types';
import AntdUpload from '../antd/upload.vue';
import Plain from '../common/plain.vue';
import {register, registerDesktop} from '../utils/register';
import {ComponentMap, DESKTOP, getOptions, LibComponents, LibName, TYPES} from '../utils/utils';
import AntdButton from './button';
import AntdUrlInput from './url';

export function registerAntd() {
  console.debug('注册Ant Design Vue表单组件');
  LibName.desktop = 'antd';
  Object.keys(ComponentMap).forEach(key => {
    LibComponents[key] = ComponentMap[key].antd;
  });
  LibComponents.confirm = window.aegis.AeModal.confirm;
  registerDesktop('d-range-picker', [TYPES.daterange], false);
  registerDesktop(Plain, TYPES.plain, false);
  registerMobile(Plain, TYPES.plain, false);
  registerDesktop('d-input', [TYPES.string], false);
  registerDesktop(AntdUrlInput, TYPES.url, false);
  registerDesktop('d-textarea', [TYPES.text], false);
  registerDesktop('d-date-picker', [TYPES.date, TYPES.year, TYPES.month, TYPES.datetime], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
  registerDesktop('d-time-picker', [TYPES.time], false, (definition: IField) => ({mode: definition.type.toLowerCase()}));
  registerDesktop('d-input-number', [TYPES.double, TYPES.integer, TYPES.number], false);
  registerDesktop('d-checkbox', TYPES.checkbox, false);
  registerDesktop('d-switch', TYPES.boolean);
  registerDesktop('d-select', TYPES.select, null, field => {
    return {dropdownMatchSelectWidth: false, multiple: field.array, options: getOptions(field)};
  });
  registerDesktop(AntdButton, TYPES.button, null, field => {
    return {title: field.title};
  });
  registerDesktop(AntdUpload, TYPES.upload, null, def => {
    return {multiple: def.array};
  });
  registerDesktop('d-cascader', TYPES.cascader, false, def => {
    return {options: def.enum};
  });
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
}
