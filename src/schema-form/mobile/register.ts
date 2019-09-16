import MobileImagePicker from '@/schema-form/mobile/image-picker';
import {register} from '@/schema-form/utils/register';
import {getOptions, MOBILE, TYPES} from '@/schema-form/utils/utils';
import {IField, Platform} from 'v-schema-form-types';
import MButton from './button';
import StepperItem from '../mobile/stepper-item.vue';

const registerMobile = (component: string | object,
                        types: string | string[],
                        forArray: boolean = null,
                        getProps: ((definition: IField, platform: Platform) => object) = null) => {
  register(component, MOBILE, types, forArray, getProps);
};


export function registerAntdMobile() {
  console.debug('注册Ant Design Mobile表单组件');
  const components = [{
    component: 'm-input',
    types: [TYPES.string, TYPES.url],
    array: false
  }];
  registerMobile('m-input', [TYPES.string, TYPES.url], false);
  registerMobile('m-date-picker-item', [TYPES.date, TYPES.datetime, TYPES.month, TYPES.year, TYPES.time], false,
    (definition: IField) => ({mode: definition.type.toLowerCase()}));
  registerMobile('m-input', [TYPES.double, TYPES.number], false,
    (definition: IField) => {
      return {type: definition.type.toLowerCase() === TYPES.double ? 'digit' : 'number', textAlign: 'right'};
    });
  // registerMobile(MobileUpload, [TYPES.file], null, field => {
  //   return {multiple: field.array, title: field.title};
  // });
  registerMobile(StepperItem, [TYPES.integer], false, field => {
    return {title: field.title};
  });
  registerMobile('m-textarea', [TYPES.text], false);
  registerMobile(MobileImagePicker, [TYPES.picture, TYPES.file], null, (def) => {
    return {multiple: def.array};
  });
  registerMobile(MButton, TYPES.button);
  registerMobile('m-switch-item', [TYPES.boolean], false);
  registerMobile('m-checkbox-popup-list', [TYPES.select], true, field => {
    return {options: getOptions(field)};
  });
  registerMobile('m-radio-popup-list', [TYPES.select], false, field => {
    return {options: getOptions(field)};
  });
  registerMobile('m-checkbox-list', [TYPES.expandSelect], true, field => {
    return {options: getOptions(field)};
  });
  registerMobile('m-radio-list', [TYPES.expandSelect], false, field => {
    return {options: getOptions(field)};
  });
  registerMobile('m-calendar-item', TYPES.daterange, false);
}
