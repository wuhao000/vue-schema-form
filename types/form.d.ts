import {Subject} from 'rxjs';
import {App, Component, Ref, VNode} from 'vue';
import {FieldDefinition, FormFields, Platform, SchemaFormField, SchemaFormStore} from './bean';
import {IFormPathMatcher, IRuleDescription, Path} from './uform';

export interface IValidateResponse {
  errors: string[];
  field: FieldDefinition;
  invalid: boolean;
  value: any;
}

export interface ISubscribers {
  [eventName: string]: Subject<any>;
}

export type Paths<Path extends any = any> = Array<Path | SchemaFormField>;

type PathTyp2<S> = {
  [K in Extract<keyof S, string>]: K | `${K}.${PathType<S[K]>}`
}[Extract<keyof S, string>]

export type PathType<T> = T extends { fields: infer S } ? (PathTyp2<S>) : never

export type IDType<T> = T extends { fields: infer S } ? {
  [K in Extract<keyof S, string>]: (S[K] extends SchemaFormField ? `#${S[K]['id']}` : never) | `#${IDType<S[K]>}`
}[Extract<keyof S, string>] : never;


interface SchemaContext {
  onOk: (forceValidate: boolean, callback?: (value) => any) => Promise<void>;
  store: SchemaFormStore;
  currentValue: Ref;
  matchFields: (paths: Paths) => FieldDefinition[];
}

export interface EffectsContext<Path extends any = any> {
  schema?: SchemaFormField;
  __context?: SchemaContext;
  getValue?: () => any;
  onValidate: (handler: (response: IValidateResponse[]) => any) => void;
  submit?: (forceValidate: boolean, callback: (value: any) => any) => any;
  subscribe?: (event: string, paths: string | SchemaFormField | Paths<Path> | ((...margs: any) => any), handler?: (...margs: any) => any) => any;
  subscribes?: ISubscribers;
  trigger?: (event: string, value?: any) => void;
  validate: (callback?: (errors: IValidateResponse[], context: EffectsContext<Path>) => any) => Promise<IValidateResponse[]>;

  (...path: Paths<Path>): EffectsHandlers;
}

declare function defineSchemaForm<T extends SchemaFormField>(schema: T): EffectsContext<PathType<T> | IDType<T>>;

export interface SchemaFormDefinition<T extends SchemaFormField> {
  $: EffectsContext<PathType<T> | IDType<T>>,
  schema: T;
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
                                mode: ArrayMode,
                                getProps?: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown })): void;

export function registerDisplay(options: DisplayComponentOptions): void;

export function register(component: string | Component,
                         platforms: Platform | Platform[],
                         types: string | string[],
                         mode: ArrayMode,
                         getProps?: ((definition: FieldDefinition, platform: Platform) => { [key: string]: unknown })): void;

export function registerComponent(options: SchemaFormComponentOptions): void;

export const DButton: any;
export const DTimePicker: any;
export const DRangePicker: any;
export const DDatePicker: any;
export const DForm: any;
export const DSelect: any;
export const CheckboxGroup: any;
export const RadioGroup: any;

export class SchemaForm {
  public static install: (app: App) => void;
}

export type ValidateHandler = (response: IValidateResponse[]) => void;

export interface SchemaFormFieldStates {
  enable?: boolean;
  editable?: boolean;
  visible?: boolean;
  required?: boolean;
  readonly?: boolean;
}

export interface EffectsHandlers {
  appendPath(path: string): EffectsHandlers;

  /**
   * 禁用
   * @returns {EffectsHandlers}
   * @deprecated 使用 setStates 代替
   */
  disable(disable?: boolean): EffectsHandlers;

  /**
   * 设置表单项是否可编辑
   *
   * @param {boolean} editable
   * @returns {EffectsHandlers}
   * @deprecated 使用 setStates 代替
   */
  editable(editable: boolean): EffectsHandlers;

  /**
   * 启用
   * @deprecated 使用 setStates 代替
   */
  enable(enable?: boolean): EffectsHandlers;

  fields: () => FieldDefinition[];
  field: () => FieldDefinition;
  /**
   * @param {boolean} hide
   * @return {EffectsHandlers}
   * @deprecated 使用 setStates 代替
   */
  hide: (hide?: boolean) => EffectsHandlers;

  isEnabled(): boolean;

  onFieldBlur: (cb: (this: EffectsHandlers, path: string, event?: Event) => any) => EffectsHandlers;
  onFieldChange: (cb: (this: EffectsHandlers, value: any, path?: string, field?: IField) => any) => EffectsHandlers;
  onFieldCreate: (cb: (this: EffectsHandlers, value: any, path?: string, field?: IField) => any) => EffectsHandlers;
  onFieldCreateOrChange: (cb: (this: EffectsHandlers, value: any, path?: string, field?: IField) => any) => EffectsHandlers;
  onFieldFocus: (cb: (this: EffectsHandlers, path: string, event?: Event) => any) => EffectsHandlers;
  paths: () => string[];

  /**
   * 设置表单项是否为只读
   *
   * @param {boolean} readonly
   * @returns {EffectsHandlers}
   * @deprecated 使用 setStates 代替
   */
  readonly(readonly: boolean): EffectsHandlers;

  replaceLastPath(...path: string[]): EffectsHandlers;

  /**
   *
   * @param {boolean} required
   * @return {EffectsHandlers}
   * @deprecated 使用 setStates 代替
   */
  required: (required: boolean) => EffectsHandlers;
  setDisplayValue?: (value: any | ((field: IField) => any)) => EffectsHandlers;
  setEnum: (options: any | ((field: IField) => any)) => EffectsHandlers;
  setFieldProps: (props: { [key: string]: unknown } | ((field: IField) => { [key: string]: unknown })) => EffectsHandlers;
  setTitle: (title: any | ((field: IField) => any)) => EffectsHandlers;
  setStates: (states: SchemaFormFieldStates) => EffectsHandlers;
  /**
   *
   * @param {boolean} show
   * @return {EffectsHandlers}
   * @deprecated 使用 setStates 代替
   */
  show: (show?: boolean) => EffectsHandlers;
  subscribe: (event: string, handler: (...args: any) => any) => EffectsHandlers;
  trigger: (event: string, value: any) => EffectsHandlers;

  takePath(number: number): EffectsHandlers;

  toggle: () => EffectsHandlers;
  value: (value?: unknown | ((field: IField) => any)) => any;
}

export type Effects = (context: EffectsContext<any>) => any;

export type WrapType = boolean | {
  desktop: boolean;
  mobile: boolean
};

export interface SchemaFormComponent {
  component: string | any;
  /**
   * 默认值 input
   */
  mode: ComponentMode;
  arrayMode: ArrayMode;
  layoutOptions?: LayoutOptions;
  getDefaultValue?: (field: FieldDefinition) => any;
  getProps: (field: FieldDefinition) => { [key: string]: unknown };
  platform: Platform;
  valueProp?: string;
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
  props?: { [key: string]: unknown };
  action?: () => any;
};

export interface IFieldMap {
  [name: string]: IField;
}

export interface IField<V = any> {
  array?: boolean;
  component: SchemaFormComponent;
  definition: SchemaFormField;
  destructPath?: {
    path: string,
    destruct: any
  };
  disabled: boolean;
  display?: boolean;
  displayValue?: any;
  editable?: boolean;
  enum: any[];
  errors?: string[];
  fields?: FormFields;
  focus?: () => any;
  id?: string;
  initialValue?: V;
  invalid?: boolean;
  loading?: boolean;
  match?: (path: Path | IFormPathMatcher) => boolean;
  name?: string;
  onChange?: (fn: () => void) => void;
  path?: string[];
  plainPath?: string;
  pristine?: boolean;
  processor?: {
    getValue: (parentValue: { [key: string]: unknown }, field: IField) => any;
    setValue: (parentValue: { [key: string]: unknown }, field: IField, fieldValue: any) => any;
  };
  props?: any;
  required?: boolean;
  rules?: IRuleDescription[];
  setGetValue?: (value?: any) => any;
  store?: SchemaFormStore;
  title?: string | VNode;
  type?: string;
  valid: boolean;
  validate?: () => (boolean | Promise<unknown>);
  value: V;
  visible?: boolean;
}

export interface LayoutOptions {
  /**
   * 布局组件忽略标题
   */
  noTitle?: boolean;
  /**
   * 布局组件不适用form-item组件包裹
   */
  noWrap?: boolean;
}

/**
 * display: 该组件可用于详情模式
 * input 该组件可用于输入模式
 * both 同时支持输入和详情显示
 * render 仅用于渲染，不影响表单值, 例如button类型组件
 * layout 该组件为布局组件，为布局组件时，以上值均无效
 *
 */
export type ComponentMode = 'display' | 'input' | 'both' | 'layout' | 'render';

export interface SchemaFormComponentOptions {
  /**
   * vue组件名称或vue组件对象
   */
  component: string | Component;
  /**
   * 组件模式
   * display: 该组件可用于详情模式
   * input 该组件可用于输入模式
   * both 同时支持输入和详情显示
   * render 仅用于渲染，不影响表单值, 例如button类型组件
   * layout 该组件为布局组件，为布局组件时，以上值均无效
   *
   * @default 默认值input
   */
  mode?: ComponentMode;
  /**
   * 是否支持数组输入
   *
   * array 仅支持数组 (例如CheckboxGroup)
   * single 仅支持单个值 (例如RadioGroup)
   * both 同时支持数组或者单个值 (例如Select)
   *
   * @default 默认值single
   */
  arrayMode?: ArrayMode;
  /**
   * 获取组件props
   * @param {FieldDefinition} definition
   * @param {Platform} platform
   * @return {{[p: string]: unknown}}
   */
  getProps?: (definition: FieldDefinition, platform: Platform) => { [key: string]: unknown };
  /**
   * 支持的平台，desktop表示pc端，mobile表示移动端
   */
  platforms: Platform | Platform[];
  /**
   * 组件的类型
   */
  types: string | string[];
  /**
   * 布局选项
   */
  layoutOptions?: LayoutOptions;
  /**
   * 输入值的属性名称，默认为value
   */
  valueProp?: string;
  /**
   * 是否使用form-item包裹，可以按平台配置
   */
  wrap?: WrapType;
}

export type Actions = Action[];

export type ArrayMode = 'array' | 'single' | 'both';

export interface DisplayComponentOptions {
  component: string | Component;
  arrayMode?: ArrayMode;
  getProps?: (definition: FieldDefinition, platform: Platform) => { [key: string]: unknown };
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
  formProps: (props: CommonFormProps) => { [key: string]: unknown };
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

declare function createSchemaForm(schema: SchemaFormField, effects: ($: EffectsContext<any>) => void): VNode;
