import {IRuleDescription} from './rule';
import {ISchema} from './schema';

export interface IFieldState {
  editable: boolean;
  errors: string[];
  initialValue: any;
  invalid: boolean;
  loading: boolean;
  name: string;
  path: string[];
  pristine: boolean;
  props: ISchema;
  required: boolean;
  rules: IRuleDescription[];
  valid: boolean;
  value: any;
  visible: boolean;
}
