import {FormFields, SchemaFormField} from '@/types/bean';
import {SchemaFormComponent} from '@/types/form';
import {VNode} from 'vue';
import {IFormPathMatcher} from './form';
import {Path} from './path';
import {IRuleDescription} from './rule';
import {ISchema} from './schema';

export interface IField<V = any> {
  array?: boolean;
  changeEditable?: (editable: boolean | ((name: string) => boolean)) => void;
  component: SchemaFormComponent;
  definition: SchemaFormField;
  destructPath?: {
    path: string,
    destruct: any
  };
  destructor?: () => void;
  dirty?: boolean;
  dirtyType?: string;
  display?: boolean;
  editable?: boolean;
  effectErrors?: string[];
  enum: any[];
  errors?: string[];
  fields?: FormFields;
  hiddenFromParent?: boolean;
  initialValue?: V;
  initialize?: (options: IFieldOptions) => void;
  invalid?: boolean;
  lastValidateValue?: V;
  loading?: boolean;
  match?: (path: Path | IFormPathMatcher) => boolean;
  name?: string;
  notify?: (forceUpdate?: boolean) => void;
  onChange?: (fn: () => void) => void;
  path?: string[];
  pathEqual?: (path: Path | IFormPathMatcher) => boolean;
  plainPath?: string;
  pristine?: boolean;
  processor?: {
    getValue: (parentValue: object, field: IField) => any;
    setValue: (parentValue: object, field: IField, fieldValue: any) => any;
  };
  props?: any;
  publishState?: () => IFieldState;
  required?: boolean;
  rules?: IRuleDescription[];
  setGetValue?: (value?: any) => any;
  shownFromParent?: boolean;
  syncContextValue?: () => void;
  title?: string | VNode;
  type?: string;
  updateState?: (fn: (state: IFieldState) => void) => void;
  valid: boolean;
  validate?: () => (boolean | Promise<unknown>);
  value: V;
  visible?: boolean;
  focus?: () => any;
}

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

export interface IFieldMap {
  [name: string]: IField;
}
