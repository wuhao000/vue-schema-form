import {Path} from './path';
import {IRuleDescription} from './rule';
import {ISchema} from './schema';

export interface IFieldOptions {
  initialValue?: any;
  name?: string;
  onChange?: (...args: any[]) => void;
  path: Path;
  props: any;
  value?: any;
}

export interface IFieldState {
  editable: boolean;
  errors: string[];
  initialValue: any;
  invalid: boolean;
  loading: boolean;
  name: string;
  path: string[];
  props: ISchema;
  required: boolean;
  rules: IRuleDescription[];
  valid: boolean;
  value: any;
  visible: boolean;
}
