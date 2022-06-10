import {SyncValidateResult} from 'async-validator';
import {InternalRuleItem, ValidateOption, Value, Values} from 'async-validator/dist-types/interface';

export type TriggerType = 'blur' | 'change' | 'focus';

export interface IRuleDescription {
  required?: boolean;
  type?: 'boolean' | 'date' | 'enum' | 'float' | 'function' | 'array'
      | 'integer' | 'null' | 'number' | 'object' | 'regexp' | 'string';
  message?: string;
  pattern?: RegExp | string;
  asyncValidator?: (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void, source: Values, options: ValidateOption) => void | Promise<void>;
  validator?: Validator;
  format?: DefaultPatternRule;
  trigger?: TriggerType[] | TriggerType;
  min?: number;
  max?: number;
}

export type Validator = (rule: InternalRuleItem, value: Value, callback: (error?: string | Error) => void, source: Values, options: ValidateOption) => SyncValidateResult | void;

export type DefaultPatternRule =
    | 'url'
    | 'email'
    | 'ipv6'
    | 'ipv4'
    | 'number'
    | 'integer'
    | 'qq'
    | 'phone'
    | 'idcard'
    | 'taodomain'
    | 'money'
    | 'zh'
    | 'date'
    | 'zip';

export type Rule =
    | Array<IRuleDescription | DefaultPatternRule>
    | DefaultPatternRule
    | IRuleDescription;
