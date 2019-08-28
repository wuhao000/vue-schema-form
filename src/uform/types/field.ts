import {IFormPathMatcher} from './form';
import {Path} from './path';
import {IRuleDescription} from './rule';
import {ISchema} from './schema';

export interface IField<V = any> {
  changeEditable: (editable: boolean | ((name: string) => boolean)) => void;
  destructor: () => void;
  dirty: boolean;
  dirtyType: string;
  display: boolean;
  editable: boolean;
  effectErrors: string[];
  errors: string[];
  hiddenFromParent: boolean;
  initialValue: V;
  initialize: (options: IFieldOptions) => void;
  invalid: boolean;
  lastValidateValue: V;
  loading: boolean;
  match: (path: Path | IFormPathMatcher) => boolean;
  name: string;
  notify: (forceUpdate?: boolean) => void;
  onChange: (fn: () => void) => void;
  path: string[];
  pathEqual: (path: Path | IFormPathMatcher) => boolean;
  pristine: boolean;
  props: ISchema;
  publishState: () => IFieldState;
  required: boolean;
  rules: IRuleDescription[];
  shownFromParent: boolean;
  syncContextValue: () => void;
  updateState: (fn: (state: IFieldState) => void) => void;
  valid: boolean;
  value: V;
  visible: boolean;
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
