import MobileDisplayField from '@/schema-form/display/mobile-display-field';
import {registerMobile} from '@/schema-form/mobile/register';
import {registerDisplay} from '@/schema-form/utils/register';
import {ComponentMap, LibName, MOBILE, MobileLibComponents, TYPES} from '@/schema-form/utils/utils';
import DatePicker from './date-picker.vue';
import DateRange from './date-range.vue';

export function registerVant() {
  console.debug('注册Vant表单组件');
  LibName.mobile = 'vant';
  Object.keys(ComponentMap).forEach(key => {
    MobileLibComponents[key] = ComponentMap[key].vant;
  });
  registerMobile(DateRange, [TYPES.daterange, TYPES.datetimerange], false, (field) => {
    const props = {type: null};
    if (field.type === TYPES.daterange) {
      props.type = 'date';
    } else if (field.type === TYPES.datetimerange) {
      props.type = 'datetime';
    }
    return props;
  });
  registerMobile('van-checkbox', [TYPES.checkbox], false);
  registerMobile(DatePicker, [TYPES.date, TYPES.time, TYPES.month, TYPES.datetime], false, (definition) => {
    const props: any = {
      label: definition.title
    };
    if ([TYPES.date, TYPES.datetime, TYPES.time].includes(definition.type as any)) {
      props.type = definition.type;
    } else if (definition.type === TYPES.month) {
      props.type = 'year-month';
    }
    return props;
  });
  registerMobile('van-field', [TYPES.string,
    TYPES.integer, TYPES.double,
    TYPES.number, TYPES.url, TYPES.text], false, (definition) => {
    const props: any = {
      label: definition.title
    };
    if (definition.type === TYPES.text) {
      props.type = 'textarea';
    } else if ([TYPES.number, TYPES.integer, TYPES.double].includes(definition.type as any)) {
      props.type = 'number';
    }
    return props;
  });
  registerDisplay(MobileDisplayField, MOBILE, [TYPES.string, TYPES.text, TYPES.url, TYPES.integer, TYPES.double, TYPES.number], false);
}
