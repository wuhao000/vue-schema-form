import InternalForm from "../internal/internal-form";
import { addComponent, register, registerDisplay } from "../utils/register";
import { DESKTOP, getOptions, MOBILE, TYPES } from "../utils/utils";
import MobileDisplayField from "./mobile-display-field";
import PlainDisplayField from "./plain-display-field";
import SelectDisplayField from "./select-display-field";
import TimeDisplayField from "./time-display-field";
export var registerCommonDisplay = function registerCommonDisplay() {
  registerDisplay(TimeDisplayField, [DESKTOP, MOBILE], [TYPES.datetime, TYPES.date, TYPES.year, TYPES.month, TYPES.daterange, TYPES.time]);
  registerDisplay(PlainDisplayField, DESKTOP, [TYPES.string, TYPES.text, TYPES.url, TYPES.integer, TYPES.double, TYPES.number], false);
  addComponent({
    component: MobileDisplayField,
    platforms: [MOBILE],
    types: [TYPES.string, TYPES.text, TYPES.url, TYPES.integer, TYPES.double, TYPES.number],
    forArray: false,
    forDisplay: true
  });
  registerDisplay(SelectDisplayField, [DESKTOP, MOBILE], [TYPES.select, TYPES.expandSelect], null, function (field) {
    return {
      options: getOptions(field),
      field: field
    };
  });
  register(InternalForm, [DESKTOP, MOBILE], TYPES.object, false, function (definition, platform) {
    return {
      platform: platform,
      definition: {
        fields: definition.fields
      }
    };
  });
  registerDisplay(InternalForm, [DESKTOP, MOBILE], TYPES.object, false, function (definition, platform) {
    return {
      platform: platform,
      definition: {
        fields: definition.fields
      }
    };
  });
};