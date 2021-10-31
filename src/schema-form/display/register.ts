import InternalForm from '../internal/form';
import {register, registerDisplay} from '../utils/register';
import {DESKTOP, resolveOptions, MOBILE, FieldTypes} from '../utils/utils';
import MobileDisplayField from './mobile-display-field';
import PlainDisplayField from './plain-display-field';
import RangeDisplayField from './range-display-field';
import SelectDisplayField from './select-display-field';
import SwitchDisplayField from './switch-display-field';
import TimeDisplayField from './time-display-field';

registerDisplay({
  component: RangeDisplayField,
  platforms: [DESKTOP, MOBILE],
  types: FieldTypes.Range
});
registerDisplay({
  component: TimeDisplayField,
  platforms: [DESKTOP, MOBILE],
  types: [FieldTypes.Datetime, FieldTypes.Date, FieldTypes.Year, FieldTypes.Month, FieldTypes.DateRange,
    FieldTypes.Time, FieldTypes.TimeRange]
});
registerDisplay({
  component: SwitchDisplayField,
  platforms: [DESKTOP, MOBILE],
  types: FieldTypes.Boolean
});
registerDisplay({
  component: PlainDisplayField,
  platforms: DESKTOP,
  mode: 'single',
  types: [FieldTypes.String, FieldTypes.Text, FieldTypes.Url, FieldTypes.Integer, FieldTypes.Double, FieldTypes.Number],
});
registerDisplay({
  component: MobileDisplayField,
  platforms: MOBILE,
  mode: 'single',
  types: [FieldTypes.String, FieldTypes.Text, FieldTypes.Url, FieldTypes.Integer, FieldTypes.Double, FieldTypes.Number],
});
registerDisplay({
  component: SelectDisplayField,
  platforms: [DESKTOP, MOBILE],
  types: [FieldTypes.Select, FieldTypes.ExpandSelect],
  arrayMode: 'singleOrArray',
  getProps: field => {
    return {options: resolveOptions(field), field};
  }
});
register(InternalForm, [DESKTOP, MOBILE], FieldTypes.Object, 'single', (definition, platform) => {
  return {
    platform,
    definition: {fields: definition.fields}
  };
});
registerDisplay({
  component: InternalForm,
  platforms: [DESKTOP, MOBILE],
  types: FieldTypes.Object,
  mode: 'single',
  getProps: (definition, platform) => {
    return {
      platform,
      definition: {fields: definition.fields}
    };
  }
});
