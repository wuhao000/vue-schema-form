import {FormFields, SchemaFormField} from '@/types/bean';
import {SchemaFormComponent} from '@/types/form';
import {VNode} from 'vue';
import {IFormPathMatcher} from './form';
import {Path} from './path';
import {IRuleDescription} from './rule';
import {ISchema} from './schema';

export interface IField<V = any> {
  validate?: () => (boolean | Promise<unknown>);
  type?: string;
  component: SchemaFormComponent;
  array?: boolean;
  title?: string | VNode;
  enum: any[];
  definition: SchemaFormField;
  changeEditable?: (editable: boolean | ((name: string) => boolean)) => void;
  destructor?: () => void;
  processor?: {
    getValue: (parentValue: object, field: IField) => any;
    setValue: (parentValue: object, field: IField, fieldValue: any) => any;
  };
  dirty?: boolean;
  dirtyType?: string;
  display?: boolean;
  editable?: boolean;
  effectErrors?: string[];
  errors?: string[];
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
  plainPath?: string;
  destructPath?: {
    path: string,
    destruct: any
  };
  pathEqual?: (path: Path | IFormPathMatcher) => boolean;
  pristine?: boolean;
  props?: any;
  publishState?: () => IFieldState;
  required?: boolean;
  fields?: FormFields;
  rules?: IRuleDescription[];
  shownFromParent?: boolean;
  syncContextValue?: () => void;
  updateState?: (fn: (state: IFieldState) => void) => void;
  valid: boolean;
  value?: V;
  visible?: boolean;
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
