import MobileDisplayField from '@/schema-form/display/mobile-display-field';
import PlainDisplayField from '@/schema-form/display/plain-display-field';
import SelectDisplayField from '@/schema-form/display/select-display-field';
import TimeDisplayField from '@/schema-form/display/time-display-field';
import InternalForm from '@/schema-form/internal/form';
import {register, registerDisplay} from '@/schema-form/utils/register';
import {DESKTOP, getOptions, MOBILE, TYPES} from '@/schema-form/utils/utils';

registerDisplay(TimeDisplayField, [DESKTOP, MOBILE], [TYPES.datetime, TYPES.date, TYPES.year, TYPES.month, TYPES.daterange, TYPES.time]);
registerDisplay(PlainDisplayField, DESKTOP, [TYPES.string, TYPES.text, TYPES.url, TYPES.integer, TYPES.double, TYPES.number], false);
registerDisplay(MobileDisplayField, MOBILE, [TYPES.string, TYPES.text, TYPES.url, TYPES.integer, TYPES.double, TYPES.number], false);
registerDisplay(SelectDisplayField, [DESKTOP, MOBILE], [TYPES.select, TYPES.expandSelect], null, field => {
  return {options: getOptions(field), field};
});
register(InternalForm, [DESKTOP, MOBILE], TYPES.object, false, (definition, platform) => {
  return {
    platform,
    definition: {fields: definition.fields}
  };
});
registerDisplay(InternalForm, [DESKTOP, MOBILE], TYPES.object, false, (definition, platform) => {
  return {
    platform,
    definition: {fields: definition.fields}
  };
});
