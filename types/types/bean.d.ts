import {Slot} from '@vue/runtime-core';
import {ComponentInternalInstance, VNode} from 'vue';
import {ValidateRules} from './async-validator';
import {Effects, EffectsContext, SchemaFormComponent, SchemaFormComponentOptions} from './form';
import {DefaultPatternRule, IFieldOptions, IFieldState, IFormPathMatcher, IRuleDescription, Path, Rule} from './uform';

export type Mode = 'edit' | 'display';

export class FieldDefinition<V = any> {
  public id: string;
  public definition: SchemaFormField;
  public disabled: boolean;
  public enum: any[] | (() => any[] | Promise<any[]>) | Promise<any[]>;
  public slot?: string;
  public title: any;
  public default?: V;
  public array: boolean;
  public events?: { [key: string]: (...args: any[]) => any };
  public type: string | SchemaFormComponentOptions | SchemaFormComponentOptions[];
  public processor: ValueProcessor;
  public changeEditable?: (editable: boolean | ((name: string) => boolean)) => void;
  public destructPath?: {
    path: string,
    destruct: any
  };
  public destructor?: () => void;
  public dirty?: boolean;
  public dirtyType?: string;
  public display: boolean;
  public displayValue?: any;
  public editable: boolean;
  public effectErrors?: string[];
  public errors?: string[];
  public fields?: FormFields;
  public focus?: (event?: boolean) => any;
  public hiddenFromParent?: boolean;
  public initialize?: (options: IFieldOptions) => void;
  public description?: string | VNode;
  public invalid?: boolean;
  public lastValidateValue?: V;
  public loading: boolean;
  public match?: (path: Path | IFormPathMatcher) => boolean;
  public name?: string;
  public notify?: (forceUpdate?: boolean) => void;
  public onChange?: (fn: () => void) => void;
  public path?: string[];
  public pathEqual?: (path: Path | IFormPathMatcher) => boolean;
  public plainPath?: string;
  public pristine?: boolean;
  public props?: any;
  public publishState?: () => IFieldState;
  public required: boolean;
  public min?: number;
  public max?: number;
  public rules?: IRuleDescription[];
  public setGetValue?: (value?: any) => any;
  public shownFromParent?: boolean;
  public syncContextValue?: () => void;
  public store?: SchemaFormStore;
  public updateState?: (fn: (state: IFieldState) => void) => void;
  public valid: boolean;
  public validate?: (trigger?: string) => (boolean | Promise<unknown>);
  public value: V;
  public visible: boolean;
  public xType: string | SchemaFormComponentOptions;
  public forInput?: boolean;

  constructor(definition: SchemaFormField,
              store: SchemaFormStore,
              pathPrefix: string[], currentValue: any)

  public getComponent(): SchemaFormComponent;

  public getRules(): IRuleDescription[];

  public generateEvents(): { [key: string]: (...args: any[]) => any }
}

export class ComponentStore {
  public display: { [key in 'desktop' | 'mobile']: any };
  public edit: {
    desktop: any;
    mobile: any;
  };

  public addComponent(options: SchemaFormComponentOptions): void;

  public search(mode: Mode, platform: Platform, type: string, array?: boolean): any;
}


export type Platform = 'desktop' | 'mobile';

export interface SchemaFormField {
  arrayComponent?: any;
  arrayProps?: { [key: string]: unknown };
  /**
   * 字段值是否数组类型
   */
  array?: boolean;
  /**
   * 依赖显示的条件，支持条件选项或函数，当函数返回false时不显示该字段
   */
  depends?: ShowFieldCondition[] | ((value: any) => boolean);
  /**
   * 描述信息
   */
  description?: string | VNode;
  /**
   * 当表单模式为详情模式时显示的内容
   */
  displayValue?: any | VNode | ((value: any) => any);
  /**
   * 默认值
   */
  default?: any;
  editable?: boolean;
  /**
   * 枚举选项
   */
  enum?: any[] | (() => any[] | Promise<any[]>) | Promise<any[]>;
  events?: { [key: string]: (...args: any[]) => any };
  /**
   * 当字段类型为object时，子表单的字段列表
   */
  fields?: FormFields;
  id?: string;
  layoutType?: string | { [key: string]: unknown };
  layoutProps?: { [key: string]: unknown };
  layout?: any;
  /**
   * 数值输入组件的最小值
   */
  min?: number;
  /**
   * 数值输入组件的最大值
   */
  max?: number;
  /**
   * 提示信息
   */
  tip?: string | VNode;
  /**
   * 表单属性名称
   */
  property?: string;
  /**
   * 表单项校验规则（async-validator）
   */
  rules?: Rule;
  /**
   * 字段是否为必填
   */
  required?: boolean;
  /**
   * 输入内容为空时的占位文字
   */
  placeholder?: string;
  /**
   * 表单输入组件的自定义属性
   */
  props?: SchemaFormFieldProps;
  /**
   * 栅格布局下的栅格数
   */
  span?: number;
  /**
   * 表单项渲染使用插槽，当指定插槽时，字段的类型无效
   */
  slot?: string;
  /**
   * 表单输入组件的插槽
   */
  slots?: Record<string, string | Slot>;
  /**
   * 表单项名称
   */
  title?: string | VNode;
  /**
   * 校验的格式，支持：
   * url 链接
   * email 邮箱
   * ipv6 IPV6
   * ipv4 IPV4
   * number 数值
   * integer 整数
   * phone 电话号码
   * idcard 身份证号
   * money 金额
   * zh 中文
   * date 日期
   * zip 邮编
   */
  format?: DefaultPatternRule;
  /**
   * 表单项类型
   */
  type?: string | SchemaFormComponentOptions | SchemaFormComponentOptions[];
  /**
   * 表单项的属性
   */
  wrapperProps?: any;
  /**
   * 指定额外的组件类型
   */
  xType?: string | SchemaFormComponentOptions;
  /**
   * 是否可见
   */
  visible?: boolean;
  /**
   * 自定数据转换器
   */
  processor?: ValueProcessor;
}

interface ValueProcessor {
  getValue: (parentValue: { [key: string]: unknown }, field: FieldDefinition) => any;
  setValue: (parentValue: { [key: string]: unknown }, field: FieldDefinition, fieldValue: any) => any;
}

interface SchemaFormFieldProps {
  /**
   * 单选或多选时选项列表中用于显示的属性名称
   */
  labelProperty?: string;
  name?: string;
  /**
   * 单选或多选的选项列表
   */
  options?: any[] | ((...args: any[]) => any[]);
  placeholder?: string;
  required?: boolean;
  /**
   * 单选或多选时选项列表中用于选项值的属性名称
   */
  valueProperty?: string;

  [key: string]: any;
}


export interface ShowFieldCondition {
  operator?: string;
  property?: string;
  value?: any;
}

export interface SchemaFormStore {
  id?: number;
  fields: { [key: string]: FieldDefinition };
  effects?: Effects;
  props?: FormProps;
  disabled?: boolean;
  platform?: Platform;
  readonly?: boolean;
  loading?: boolean;
  inline?: boolean;
  editable?: boolean;
  context?: EffectsContext | null;
  root: ComponentInternalInstance;
  components: ComponentStore;
}

export type FormFields = SchemaFormField[] | { [key: string]: SchemaFormField };

export interface FormDescriptor {
  array?: boolean;
  fields: FormFields;
}

interface FormProps {
  labelWidth?: number | string;
  rules?: ValidateRules;

  [key: string]: any;
}
