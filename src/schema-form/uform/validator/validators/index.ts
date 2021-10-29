import {IRuleDescription, Rule} from '../../../../../types';
import {isFn, isObj, isStr} from '../utils';
import customValidate from './custom';
import formatValidate from './format';
import lengthValidate from './length';
import patternValidate from './pattern';
import requiredValidate from './required';
/*
 * rule : {
     format:"",
 *   required:true,
 *   message:"",
 *   pattern:"",
 *   validator(value,rule,callback,values){
 *   }
 * }
 *
**/

const batchInvoke = (...fns: Array<(...args: any[]) => void>) => {
  return (...args: any[]) => {
    return fns.map(fn => Promise.resolve(fn(...args)));
  };
};

const batchValidate = (
    value: any,
    rule: IRuleDescription,
    values: any,
    name: string
) => {
  return Promise.all(
      batchInvoke(
          formatValidate,
          requiredValidate,
          patternValidate,
          customValidate,
          lengthValidate
      )(value, rule, values, name)
  );
};

export const validate = (value: any, rule: Rule, values: any, name: string) => {
  const newRule = isObj(rule)
      ? rule
      : isStr(rule)
          ? {format: rule}
          : isFn(rule)
              ? {validator: rule}
              : {};
  return batchValidate(value, newRule as IRuleDescription, values, name);
};
