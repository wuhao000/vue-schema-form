import {IRuleDescription} from '../../../../../types';
import {isNotNull} from '../../../utils/utils';


const batchValidate = (
    value: any,
    rule: IRuleDescription,
    values: any,
    name: string
) => {
  if (isNotNull(rule.min)) {
    if (typeof value === 'number' && value < rule.min) {
      return rule.message || `${name}不能小于${rule.min}`;
    }
    if (typeof value === 'string' && value.length < rule.min) {
      return rule.message || `${name}长度不能小于${rule.min}`;
    }
    if (Array.isArray(value) && value.length < rule.min) {
      return rule.message || `${name}长度不能小于${rule.min}`;
    }
  }
  if (isNotNull(rule.max)) {
    if (typeof value === 'number' && value > rule.max) {
      return rule.message || `${name}不能大于${rule.max}`;
    }
    if (typeof value === 'string' && value.length > rule.max) {
      return rule.message || `${name}长度不能大于${rule.max}`;
    }
    if (Array.isArray(value) && value.length > rule.max) {
      return rule.message || `${name}长度不能大于${rule.max}`;
    }
  }
  return '';
};

export default (
    value: any,
    rule: IRuleDescription,
    values: any,
    name: string
) => {
  return batchValidate(value, rule, values, name);
};
