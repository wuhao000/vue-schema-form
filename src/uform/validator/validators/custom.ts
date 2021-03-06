import { isFn } from '../utils';
import { IRuleDescription } from '../../types';
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
