import Plain from '../common/plain.vue';
import {IField} from '../../../types';
import Vue from 'vue';
import ElExtCheckbox from '../element/checkbox-group';
import ElExtIcon from '../element/el-ext-icon';
import ElExtRadio from '../element/radio-group';
import ElExtSelect from '../element/select';
import {registerDesktop} from '../utils/register';
import {ComponentMap, getOptions, LibComponents, LibName, TYPES} from '../utils/utils';
import ElButton from './button';
import ElementUpload from './upload.vue';
import ElUrlInput from './url.vue';


export function registerElement() {
  console.debug('注册ElementUI表单组件');
  LibName.desktop = 'element';
  Vue.component('ElExtIcon', ElExtIcon);
  Object.keys(ComponentMap).forEach(key => {
    LibComponents[key] = ComponentMap[key].element;
  });
  // @ts-ignore
  LibComponents.confirm = ELEMENT.MessageBox.confirm;
  Vue.component('el-ext-select', ElExtSelect);
  Vue.component('el-ext-checkbox', ElExtCheckbox);
  Vue.component('el-ext-radio', ElExtRadio);
  registerDesktop(Plain, [TYPES.plain], false);
  registerDesktop('el-transfer', TYPES.transfer, false, field => {
    const data = (field.enum || []).map(item => ({
      key: item.value,
      label: item.label,
      disabled: item.disabled
    }));
    return {data};
  });
  registerDesktop(ElButton, TYPES.button, null, field => {
    return {title: field.title};
  });
  registerDesktop(ElementUpload, TYPES.upload, null, (field) => {
    return {multiple: field.array};
  });
  registerDesktop('el-input', TYPES.string, false);
  registerDesktop(ElUrlInput, TYPES.url, false);
  registerDesktop('el-input', [TYPES.text], false, () => {
    return {type: 'textarea'};
  });
  registerDesktop('el-time-picker', TYPES.time, false);
  registerDesktop('el-rate', TYPES.rate, false);
  registerDesktop('el-date-picker', [TYPES.date, TYPES.datetimerange, TYPES.daterange, TYPES.year, TYPES.month, TYPES.datetime], false,
    (definition: IField) => ({type: definition.type.toLowerCase()}));
  registerDesktop('el-input-number', [TYPES.double, TYPES.integer, TYPES.number], false);
  registerDesktop('el-switch', [TYPES.boolean], false);
  registerDesktop('el-ext-select', [TYPES.select], null, definition => {
    return {multiple: definition.array, options: getOptions(definition)};
  });
  registerDesktop('el-checkbox', TYPES.checkbox, false);
  registerDesktop('el-slider', TYPES.range, false, (field) => {
    const props: any = {range: true};
    if (field.props && field.props.marks) {
      if (Array.isArray(field.props.marks)) {
        props.marks = field.props.marks.map(it => {
          if (typeof it === 'number') {
            return it.toString();
          } else {
            return it;
          }
        });
      } else if (typeof field.props.marks === 'object') {
        const marks: any = {};
        Object.keys(field.props.marks).forEach(key => {
          const value = (field.props as any).marks[key];
          if (typeof value === 'number') {
            marks[key] = value.toString();
          } else {
            marks[key] = value;
          }
        });
        props.marks = marks;
      }
    }
    return props;
  });
  registerDesktop('el-ext-radio', [TYPES.expandSelect], false, field => {
    return {options: getOptions(field)};
  });
  registerDesktop('el-ext-checkbox', [TYPES.expandSelect], true, field => {
    return {options: getOptions(field), multiple: true};
  });
}
