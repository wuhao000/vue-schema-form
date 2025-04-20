import {registerComponent} from '../config';
import InternalForm from '../internal/form';
import {registerDisplay} from '../utils/register';
import {DESKTOP, FieldTypes, MOBILE} from '../utils/utils';
import MobileDisplayField from './mobile-display-field.vue';
import PlainDisplayField from './plain-display-field.vue';
import RangeDisplayField from './range-display-field.vue';
import SelectDisplayField from './select-display-field.vue';
import SwitchDisplayField from './switch-display-field.vue';
import TimeDisplayField from './time-display-field.vue';
import NumberDisplay from './number.vue';
import TextDisplay from './text-display-field.vue';
import HtmlDisplayField from './html-display-field.vue';

registerDisplay({
  component: RangeDisplayField,
  platforms: [DESKTOP, MOBILE],
  types: FieldTypes.Range
});
registerDisplay({
  component: TimeDisplayField,
  platforms: [DESKTOP, MOBILE],
  types: [FieldTypes.Datetime, FieldTypes.Date, FieldTypes.Year, FieldTypes.Month, FieldTypes.DateRange,
    FieldTypes.Time, FieldTypes.TimeRange],
  getProps: field => {
    return {
      definition: field.definition
    };
  }
});
registerDisplay({
  component: SwitchDisplayField,
  platforms: [DESKTOP, MOBILE],
  types: FieldTypes.Boolean
});
registerDisplay({
  component: PlainDisplayField,
  platforms: DESKTOP,
  types: [FieldTypes.String, FieldTypes.Url]
});
registerDisplay({
  component: TextDisplay,
  platforms: [DESKTOP, MOBILE],
  types: [FieldTypes.Text]
});
registerDisplay({
  component: HtmlDisplayField,
  platforms: [DESKTOP, MOBILE],
  types: [FieldTypes.Html]
});
registerDisplay({
  component: NumberDisplay,
  platforms: [DESKTOP, MOBILE],
  types: [FieldTypes.Integer, FieldTypes.Double, FieldTypes.Number]
});
registerDisplay({
  component: MobileDisplayField,
  platforms: MOBILE,
  types: [FieldTypes.String, FieldTypes.Url]
});
registerDisplay({
  component: SelectDisplayField,
  platforms: [DESKTOP, MOBILE],
  types: [FieldTypes.Select, FieldTypes.ExpandSelect],
  arrayMode: 'both',
  getProps: field => {
    return {options: field.options, field};
  }
});
registerComponent({
  component: InternalForm,
  platforms: [DESKTOP, MOBILE],
  types: FieldTypes.Object,
  arrayMode: 'single',
  getProps: (definition, platform) => {
    return {
      platform,
      definition
    };
  }
});
registerDisplay({
  component: InternalForm,
  platforms: [DESKTOP, MOBILE],
  types: FieldTypes.Object,
  arrayMode: 'single',
  getProps: (definition, platform) => {
    return {
      platform,
      definition
    };
  }
});
