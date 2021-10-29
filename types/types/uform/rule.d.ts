export interface IRuleDescription {
  required?: boolean;
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
  | Validator
  | Array<Validator | IRuleDescription | DefaultPatternRule>
  | DefaultPatternRule
  | IRuleDescription;
