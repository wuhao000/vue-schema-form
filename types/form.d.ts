import {Subject} from 'rxjs';
import {App, Component, Ref, VNode} from 'vue';
import {DefaultSchemaFormField, FieldDefinition, FormFields, Platform, SchemaFormField, SchemaFormStore} from './bean';
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

export type Paths<Path = any> = Array<Path | SchemaFormField>;

type PathTyp2<S> = {
  [K in Extract<keyof S, string>]: K | `${K}.${PathType<S[K]>}`
}[Extract<keyof S, string>]

export type PathType<T> = T extends { fields: infer S } ? (PathTyp2<S>) : never

export type IDType<T> = T extends { fields: infer S } ? {
  [K in Extract<keyof S, string>]: (S[K] extends DefaultSchemaFormField ? `#${S[K]['id']}` : never) | `#${IDType<S[K]>}`
}[Extract<keyof S, string>] : never;


interface SchemaContext {
  onOk: (forceValidate: boolean, callback?: (value) => any) => Promise<void>;
  store: SchemaFormStore;
  currentValue: Ref;
  matchFields: (paths: Paths) => FieldDefinition[];
}

type FormValue = {[key: string]: unknown};

/**
 * 副作用函数上下文
 */
export interface EffectsContext<Path = any, V = FormValue | FormValue[]> {
  __schema?: SchemaFormField;
  __context?: SchemaContext;
  /**
   * 获取表单值
   * @return {any}
   */
  initialized(): boolean;
  callStack: Array<() => void>;
  afterInitialized: (callback: () => void) => void;
  getValue?: () => V;
  onValidate: (handler: (response: IValidateResponse[]) => any) => void;
  /**
   * 提交表单， 会触发submit事件，提交前会自动调用validate方法进行表单校验
   * @param {boolean} forceValidate
   * @param {(value: any) => any} callback
   * @return {any}
   */
  submit?: (forceValidate: boolean, callback: (value: any) => any) => any;
  subscribe?: (event: string, paths: string | SchemaFormField | Paths<Path> | ((...margs: any) => any), handler?: (...margs: any) => any) => any;
  subscribes?: ISubscribers;
  trigger?: (event: string, value?: any) => void;
  /**
   * 校验表单，异步返回表单校验失败的的提示列表，如果为空则表示校验通过
   * 如果提供了回调函数参数，则不返回Promise，通过调用回调函数返回校验结果
   * @param {(errors: IValidateResponse[], context: EffectsContext<Path>) => any} callback
   * @return {Promise<string[]>}
   */
  validate: (callback?: (errors: IValidateResponse[], context: EffectsContext<Path>) => any) => Promise<IValidateResponse[]>;

  (...path: Paths<Path>): EffectsHandlers<V>;
}

declare function defineSchemaForm<V = unknown, T extends SchemaFormField<V> = SchemaFormField<V>>(schema: T): EffectsContext<PathType<T> | IDType<T> | string, V>;
declare function defineActions<T extends Action[] = Action[]>(actions: T): T;

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
export const DTimeRangePicker: any;
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

export interface EffectsHandlers<V> {
  appendPath(path: string): EffectsHandlers<V>;

  /**
   * 禁用
   * @returns {EffectsHandlers}
   */
  disable(disable?: boolean): EffectsHandlers<V>;

  /**
   * 设置表单项是否可编辑
   *
   * @param {boolean} editable
   * @returns {EffectsHandlers}
   */
  editable(editable: boolean): EffectsHandlers<V>;

  /**
   * 启用
   */
  enable(enable?: boolean): EffectsHandlers<V>;

  fields: () => FieldDefinition[];
  field: () => FieldDefinition;
  /**
   * @param {boolean} hide
   * @return {EffectsHandlers}
   */
  hide: (hide?: boolean) => EffectsHandlers<V>;

  isEnabled(): boolean;

  onFieldBlur: (cb: (this: EffectsHandlers<V>, path: string, event?: Event) => any) => EffectsHandlers<V>;
  onFieldChange: (cb: (this: EffectsHandlers<V>, value: any, path?: string, field?: IField) => any) => EffectsHandlers<V>;
  onFieldCreate: (cb: (this: EffectsHandlers<V>, value: any, path?: string, field?: IField) => any) => EffectsHandlers<V>;
  onFieldCreateOrChange: (cb: (this: EffectsHandlers<V>, value: any, path?: string, field?: IField) => any) => EffectsHandlers<V>;
  onFieldFocus: (cb: (this: EffectsHandlers<V>, path: string, event?: Event) => any) => EffectsHandlers<V>;
  paths: () => string[];

  /**
   * 设置表单项是否为只读
   *
   * @param {boolean} readonly
   * @returns {EffectsHandlers}
   */
  readonly(readonly: boolean): EffectsHandlers<V>;

  replaceLastPath(...path: string[]): EffectsHandlers<V>;

  /**
   *
   * @param {boolean} required
   * @return {EffectsHandlers}
   */
  required: (required: boolean) => EffectsHandlers<V>;
  setDisplayValue?: (value: any | ((field: IField) => any)) => EffectsHandlers<V>;
  setEnum: (options: any | ((field: IField) => any)) => EffectsHandlers<V>;
  setFieldProps: (props: { [key: string]: unknown } | ((field: IField) => { [key: string]: unknown })) => EffectsHandlers<V>;
  setTitle: (title: any | ((field: IField) => any)) => EffectsHandlers<V>;
  setStates: (states: SchemaFormFieldStates) => EffectsHandlers<V>;
  /**
   *
   * @param {boolean} show
   * @return {EffectsHandlers}
   */
  show: (show?: boolean) => EffectsHandlers<V>;
  subscribe: (event: string, handler: (...args: any) => any) => EffectsHandlers<V>;
  trigger: (event: string, value: any) => EffectsHandlers<V>;

  takePath(number: number): EffectsHandlers<V>;

  toggle: () => EffectsHandlers<V>;
  /**
   * 获取或设置字段值（该方法模拟jQuery的value方法思路）
   * 当value为undefined时，该方法将返回匹配的字段值
   * 如果value不是undefined，则将匹配到的字段的值修改为value的值
   * 当字段为详情模式（即editable=false）时，修改值的操作是无效的，请使用setDisplayValue方法
   * @param {unknown} value 要修改的值，如果为undefined则表示获取值
   * @return {any}
   */
  value: (value?: unknown | ((field: IField) => any)) => any;
}

/**
 * 副作用函数
 */
export type Effects = (context: EffectsContext) => void;

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
  result: any;
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
  popup?: any;
  row?: any;
  sider?: any;
  select?: any;
  input?: any;
}

type BuiltInActions = 'submit' | 'cancel' | 'reset';

type Action = BuiltInActions | {
  name?: BuiltInActions | string;
  text?: string;
  props?: { [key: string]: unknown };
  action?: ($: EffectsContext, ...args: any[]) => any;
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
  loading?: boolean;
  match?: (path: Path | IFormPathMatcher) => boolean;
  name?: string;
  onChange?: (fn: () => void) => void;
  path?: string[];
  plainPath?: string;
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
