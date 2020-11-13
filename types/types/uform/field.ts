import {FormFields, SchemaFormField} from '../bean';
import {SchemaFormComponent} from '../form';
import {VNode} from 'vue';
import {IFormPathMatcher} from './form';
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
  pristine: boolean;
  props: ISchema;
  required: boolean;
  rules: IRuleDescription[];
  valid: boolean;
  value: any;
  visible: boolean;
}
