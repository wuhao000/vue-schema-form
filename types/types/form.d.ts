import {Subject} from 'rxjs';
import {VNode} from 'vue';
import {FormFields, Platform, SchemaFormField, SchemaFormStore} from './bean';
import {IFieldOptions, IFieldState, IFormPathMatcher, IRuleDescription, Path} from './uform';

export interface ISubscribers {
  [eventName: string]: Subject<any>;
}

export type Paths = Array<string | SchemaFormField>;

export interface EffectsContext {
  getValue?: () => any;
  onValidate: (handler: (response: IValidateResponse[]) => any) => void;
  submit: (forceValidate: boolean, callback: (value: any) => any) => any;
  subscribe?: (event: string, paths: string | SchemaFormField | Paths | ((...margs: any) => any), handler?: (...margs: any) => any) => any;
  subscribes: ISubscribers;
  trigger: (event: string, value?: any) => void;
  validate: (callback?: (errors: IValidateResponse[], context: EffectsContext) => any) => Promise<IValidateResponse[]>;

  (...path: Paths): EffectsHandlers
}

export interface IValidateResponse {
  errors: string[];
  field: IField;
  invalid: boolean;
  name: string;
  valid: boolean;
  value: any;
}

export interface SchemaForm {
  install: (Vue) => void;
  registerAntd: () => void;
  registerAntdMobile: () => void;
  registerElement: () => void;
  register: (options: {
    component: string | object,
    platforms: Platform | Platform[],
    types: string | string[],
    forDisplay: boolean,
    forArray?: boolean,
    getProps?: (definition: IField, platform: Platform) => object,
    layout?: boolean,
    wrap?: WrapType
  }) => void;
  registerResponsiveComponent: (component: string | object,
                                types: string | string[],
                                forArray?: boolean,
                                getProps?: ((definition: IField, platform: Platform) => object)) => void;
  registerComponent: (component: string | object,
                      platforms: Platform | Platform[],
                      types: string | string[],
                      forArray?: boolean,
                      getProps?: ((definition: IField, platform: Platform) => object)) => void;
  registerLayout: (options: {
    component: string | object,
    platforms: Platform | Platform[],
    types: string | string[],
    getProps?: ((definition: IField, platform: Platform) => object)
  }) => void;
  registerDisplayComponent: (component: string | object,
                             platforms: Platform | Platform[],
                             types: string | string[],
                             forArray?: boolean,
                             getProps?: ((definition: IField, platform: Platform) => object),
                             layout?: boolean) => void;
}

export type ValidateHandler = (response: IValidateResponse[]) => void;

export interface EffectsHandlers {
  fields: () => IField[];
  hide: () => EffectsHandlers;
  onFieldBlur: (cb: (path: string) => any) => EffectsHandlers;
  onFieldChange: (cb: (value: any, path?: string, field?: IField) => any) => EffectsHandlers;
  onFieldCreate: (cb: (value: any, path?: string, field?: IField) => any) => EffectsHandlers;
  onFieldCreateOrChange: (cb: (value: any, path?: string, field?: IField) => any) => EffectsHandlers;
  onFieldFocus: (cb: (path?: string) => any) => EffectsHandlers;
  paths: () => string[];
  setDisplayValue?: (value: any | ((field: IField) => any)) => EffectsHandlers;
  setEnum: (options: any | ((field: IField) => any)) => EffectsHandlers;
  setFieldProps: (props: object | ((field: IField) => object)) => EffectsHandlers;
  setTitle: (title: any | ((field: IField) => any)) => EffectsHandlers;
  show: () => EffectsHandlers;
  subscribe: (event: string, handler: (...args: any) => any) => EffectsHandlers;
  toggle: () => EffectsHandlers;
  value: (value?: any | ((field: IField) => any)) => any;

  appendPath(path: string): EffectsHandlers;

  disable(): void;

  enable(): void;

  replaceLastPath(...path: string[]): EffectsHandlers;

  takePath(number: number): EffectsHandlers;
}

export type Effects = (context: EffectsContext) => any;

export type WrapType = boolean | {
  desktop: boolean;
  mobile: boolean
};

export interface SchemaFormComponent {
  component: string | object;
  forArray: boolean | null;
  getDefaultValue?: (field: IField) => any;
  getProps: (field: IField) => object;
  layout: boolean;
  platform: Platform;
  type: string;
  wrap?: WrapType;
}


export interface IIcons {
  down: string;
  info: string;
  up: string;
}

export interface ILibComponents {
  alert: string;
  button: string;
  col: string;
  confirm: string;
  content: string;
  footer: string;
  form: string;
  formItem: string;
  header: string;
  icon: string;
  icons: IIcons;
  layout: string;
  popover: string;
  row: string;
  sider: string;
}

type BuiltInActions = 'submit' | 'cancel' | 'reset';

type Action = BuiltInActions | {
  name: BuiltInActions | string;
  text: string;
  props?: object;
  action?: () => any;
};

export interface IFieldMap {
  [name: string]: IField;
}

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
  disabled: boolean;
  display?: boolean;
  displayValue?: any;
  editable?: boolean;
  effectErrors?: string[];
  enum: any[];
  errors?: string[];
  fields?: FormFields;
  focus?: () => any;
  hiddenFromParent?: boolean;
  id?: string;
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
  store?: SchemaFormStore;
  title?: string | VNode;
  type?: string;
  updateState?: (fn: (state: IFieldState) => void) => void;
  valid: boolean;
  validate?: () => (boolean | Promise<unknown>);
  value: V;
  visible?: boolean;
}

export type Actions = Action[];
