export interface IRuleDescription {
  required?: boolean;
  type?: 'boolean' | 'date' | 'enum' | 'float' | 'function' | 'array'
      | 'integer' | 'null' | 'number' | 'object' | 'regexp' | 'string'
  message?: string;
  pattern?: RegExp | string;
  validator?: Validator;
  format?: DefaultPatternRule;
  min?: number;
  max?: number;
}

export type Validator = (
  value: any,
  rule: IRuleDescription,
  values: any,
  name: string
) => string | Promise<string>;

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
