import {IRuleDescription} from '../../../../../types';
import { isFn } from '../utils';
export default (
  value: any,
  rule: IRuleDescription,
  values: any,
  name: string
) => {
  if (isFn(rule.validator)) {
    return rule.validator(value, rule, values, name);
  }
};
