import { isFn } from "../utils";
export default (function (value, rule, values, name) {
  if (isFn(rule.validator)) {
    return rule.validator(value, rule, values, name);
  }
});