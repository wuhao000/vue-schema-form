import {Subject} from 'rxjs';
import {App, Component, VNode} from 'vue';
import {FieldDefinition, FormFields, Platform, SchemaFormField, SchemaFormStore} from './bean';
import {IFieldOptions, IFieldState, IFormPathMatcher, IRuleDescription, Path} from './uform';

export interface IValidateResponse {
  errors: string[];
  field: FieldDefinition;
  invalid: boolean;
  name: string;
  valid: boolean;
  value: any;
}

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

  (...path: Paths): EffectsHandlers;
}

export function registerAntd();

export function registerAntdMobile();

export interface AntdRegisterOptions {
  confirm: (...args: any[]) => any;
}

export function registerDesktopLib(map: Record<keyof ILibComponents, any>): void;

export function registerMobileLib(map: Record<keyof ILibComponents, any>): void;

export function registerDesktop(component: string | Component,
                                types: string | string[],
                                forArray?: boolean,
                                getProps?: ((definition: FieldDefinition, platform: Platform) => {[key: string]: unknown})): void;

export function registerDisplay(options: DisplayComponentOptions): void;

export function register(component: string | Component,
                         platforms: Platform | Platform[],
                         types: string | string[],
                         forArray?: boolean,
                         getProps?: ((definition: FieldDefinition, platform: Platform) => {[key: string]: unknown})): void;

export function registerComponent(options: SchemaFormComponentOptions): void;

export const DButton;
export const DTimePicker;
export const DRangePicker;
export const DDatePicker;
export const DForm;
export const DSelect;

export class SchemaForm {
  public static install: (app: App) => void;
  public static registerComponent: (component: string | Component,
                                    platforms: Platform | Platform[],
                                    types: string | string[],
                                    forArray?: boolean,
                                    getProps?: ((definition: IField, platform: Platform) => {[key: string]: unknown})) => void;
  public static registerLayout: (options: {
    component: string | Component,
    platforms: Platform | Platform[],
    types: string | string[],
    getProps?: ((definition: IField, platform: Platform) => {[key: string]: unknown})
  }) => void;
  public static registerResponsiveComponent: (component: string | Component,
                                              types: string | string[],
                                              forArray?: boolean,
                                              getProps?: ((definition: IField, platform: Platform) => {[key: string]: unknown})) => void;
}

export type ValidateHandler = (response: IValidateResponse[]) => void;

export interface EffectsHandlers {
  fields: () => FieldDefinition[];
  field: () => FieldDefinition;
  hide: (hide?: boolean) => EffectsHandlers;
  onFieldBlur: (cb: (path: string, event?: Event) => any) => EffectsHandlers;
  onFieldChange: (cb: (value: any, path?: string, field?: IField) => any) => EffectsHandlers;
  onFieldCreate: (cb: (value: any, path?: string, field?: IField) => any) => EffectsHandlers;
  onFieldCreateOrChange: (cb: (value: any, path?: string, field?: IField) => any) => EffectsHandlers;
  required: (required: boolean) => EffectsHandlers;
  onFieldFocus: (cb: (path: string, event?: Event) => any) => EffectsHandlers;
  paths: () => string[];
  setDisplayValue?: (value: any | ((field: IField) => any)) => EffectsHandlers;
  setEnum: (options: any | ((field: IField) => any)) => EffectsHandlers;
  setFieldProps: (props: {[key: string]: unknown} | ((field: IField) => {[key: string]: unknown})) => EffectsHandlers;
  setTitle: (title: any | ((field: IField) => any)) => EffectsHandlers;
  show: (show?: boolean) => EffectsHandlers;
  subscribe: (event: string, handler: (...args: any) => any) => EffectsHandlers;
  trigger: (event: string, value: any) => EffectsHandlers;
  toggle: () => EffectsHandlers;
  value: (value?: any | ((field: IField) => any)) => any;

  appendPath(path: string): EffectsHandlers;

  /**
   * 禁用
   * @returns {EffectsHandlers}
   */
  disable(disable?: boolean): EffectsHandlers;

  /**
   * 设置表单项是否可编辑
   *
   * @param {boolean} editable
   * @returns {EffectsHandlers}
   */
  editable(editable: boolean): EffectsHandlers;

  /**
   * 启用
   */
  enable(enable?: boolean): EffectsHandlers;

  /**
   * 设置表单项是否为只读
   *
   * @param {boolean} readonly
   * @returns {EffectsHandlers}
   */
  readonly(readonly: boolean): EffectsHandlers;


  replaceLastPath(...path: string[]): EffectsHandlers;

  takePath(number: number): EffectsHandlers;
}

export type Effects = (context: EffectsContext) => any;

export type WrapType = boolean | {
  desktop: boolean;
  mobile: boolean
};

export interface SchemaFormComponent {
  component: string | any;
  forArray: boolean | null;
  forInput: boolean;
  layoutOptions: LayoutOptions;
  getDefaultValue?: (field: FieldDefinition) => any;
  getProps: (field: FieldDefinition) => {[key: string]: unknown};
  layout: boolean;
  platform: Platform;
  type: string;
  valueProp: string;
  wrap?: WrapType;
}


export interface IIcons {
  delete: any;
  down: any;
  info: any;
  plus: any;
  up: any;
}

export interface ILibComponents {
  alert?: any;
  button: any;
  card?: any;
  checkbox: any;
  col?: any;
  content?: any;
  empty?: any;
  footer?: any;
  form: any;
  formItem: any;
  header?: any;
  icons: { [key in Platform]: IIcons };
  layout?: any;
  popover: any;
  row?: any;
  sider?: any;
  select?: any;
  input?: any;
}

type BuiltInActions = 'submit' | 'cancel' | 'reset';

type Action = BuiltInActions | {
  name: BuiltInActions | string;
  text: string;
  props?: {[key: string]: unknown};
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
    getValue: (parentValue: {[key: string]: unknown}, field: IField) => any;
    setValue: (parentValue: {[key: string]: unknown}, field: IField, fieldValue: any) => any;
  };
  props?: any;
  publishState?: () => IFieldState;
  required?: boolean;
  rules?: IRuleDescription[];
  setGetValue?: (value?: any) => any;
  shownFromParent?: boolean;
  store?: SchemaFormStore;
  syncContextValue?: () => void;
  title?: string | VNode;
  type?: string;
  updateState?: (fn: (state: IFieldState) => void) => void;
  valid: boolean;
  validate?: () => (boolean | Promise<unknown>);
  value: V;
  visible?: boolean;
}

export interface LayoutOptions {
  noTitle?: boolean;
  noWrap?: boolean;
}

export interface SchemaFormComponentOptions {
  component: string | Component;
  forArray?: boolean;
  forDisplay: boolean;
  /**
   * 是否输入组件，默认true
   */
  forInput?: boolean;
  getProps?: (definition: FieldDefinition, platform: Platform) => {[key: string]: unknown};
  layout?: boolean;
  platforms: Platform | Platform[];
  types: string | string[];
  layoutOptions?: LayoutOptions;
  valueProp?: string;
  wrap?: WrapType;
}

export type Actions = Action[];


export interface DisplayComponentOptions {
  component: string | Component;
  forArray?: boolean;
  getProps?: (definition: FieldDefinition, platform: Platform) => {[key: string]: unknown};
  layout?: boolean;
  platforms: Platform | Platform[];
  types: string | string[];
}


export interface CommonFormProps {
  disabled: boolean;
  inline: boolean;
  labelCol: any;
  labelWidth: any;
  title: any;
  wrapperCol: any;

  [key: string]: any;
}

interface Transformers {
  formProps: (props: CommonFormProps) => {[key: string]: unknown};
}

export type PropsTransformer = {
  [key in Platform]: Transformers;
}

export const resolveOptions: (field: FieldDefinition) => any;

export enum FieldTypes {
  File = 'file',
  Checkbox = 'checkbox',
  Picture = 'picture',
  Button = 'button',
  Cascader = 'cascader',
  Transfer = 'transfer',
  Rate = 'rate',
  Upload = 'upload',
  DateRange = 'daterange',
  Url = 'url',
  String = 'string',
  Datetime = 'datetime',
  Year = 'year',
  Month = 'month',
  Time = 'time',
  Select = 'select',
  Date = 'date',
  DateTimeRange = 'datetimerange',
  Integer = 'integer',
  Number = 'number',
  Double = 'double',
  Boolean = 'boolean',
  ExpandSelect = 'expand-select',
  Range = 'range',
  Empty = 'empty',
  Text = 'text',
  Object = 'object',
  Password = 'password',
  TimeRange = 'timerange',
}
