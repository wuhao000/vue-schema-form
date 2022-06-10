import {Slot} from '@vue/runtime-core';
import {Component, ComponentInternalInstance, VNode} from 'vue';
import {ValidateRules} from './async-validator';
import {Effects, EffectsContext, SchemaFormComponent, SchemaFormComponentOptions} from './form';
import {DefaultPatternRule, IFormPathMatcher, IRuleDescription, Path, Rule, TriggerType} from './uform';

export type Mode = 'edit' | 'display';

export type FieldDefinitionEnum =
    any[]
    | ((formValue: any, field: FieldDefinition) => any[] | Promise<any[]>)
    | Promise<any[]>

export class FieldDefinition<V = any> {
  public array: boolean;
  public default?: V;
  public definition: SchemaFormField;
  public options: any;
  public description?: string | VNode;
  public destructPath?: {
    path: string,
    destruct: any
  };
  public disabled: boolean;
  public display: boolean;
  public displayValue?: any;
  public editable: boolean;
  public enum: FieldDefinitionEnum;
  public errors?: string[];
  public events?: { [key: string]: (...args: any[]) => any };
  public fields?: FormFields;
  public focus?: (event?: boolean) => any;
  public id: string;
  public loading: boolean;
  public match?: (path: Path | IFormPathMatcher) => boolean;
  public max?: number;
  public min?: number;
  public name?: string;
  public onChange?: (fn: () => void) => void;
  public path?: string[];
  public plainPath?: string;
  public inputRef?: any;
  public processor: ValueProcessor;
  public props?: { [key: string]: any };
  public required: boolean;
  public rules?: IRuleDescription[];
  public setGetValue?: (value?: any) => any;
  public slot?: string;
  public store?: SchemaFormStore;
  public title: any;
  public type: string | Component | SchemaFormComponentOptions | SchemaFormComponentOptions[];
  public valid: boolean;
  public validate?: (trigger?: TriggerType) => (boolean | Promise<unknown>);
  public value: V;
  public visible: boolean;
  public xType: SchemaFormFieldType;
  public layoutType?: string | { [key: string]: unknown };
  public layoutProps?: { [key: string]: unknown };
  public placeholder?: string;

  constructor(definition: SchemaFormField,
              store: SchemaFormStore,
              pathPrefix: string[], currentValue: any)

  public generateEvents(): { [key: string]: (...args: any[]) => any }

  public getComponent(): SchemaFormComponent;

  public getRules(): IRuleDescription[];
}


export interface StorePlatformComponents {
  desktop: {
    [key: string]: SchemaFormComponent[]
  };
  mobile: {
    [key: string]: SchemaFormComponent[]
  };
}

export class ComponentStore {
  public store: StorePlatformComponents;

  public addComponent(options: SchemaFormComponentOptions): void;

  public search(mode: Mode, platform: Platform, type: string, array?: boolean): any;
}


export type Platform = 'desktop' | 'mobile';

export type SchemaFormFieldType =
    Exclude<string, 'grid' | 'steps'>
    | Component
    | SchemaFormComponentOptions
    | SchemaFormComponentOptions[]
    | (() => VNode | VNode[]);

interface BaseSchemaFormField<V = any> {
  /**
   * 字段值是否数组类型
   */
  array?: boolean;
  rowKey?: string | ((value) => string);
  arrayComponent?: any;
  arrayProps?: { [key: string]: unknown };
  /**
   * 默认值
   */
  default?: any;
  /**
   * 描述信息
   */
  description?: string | VNode;
  /**
   * 当表单模式为详情模式时显示的内容
   */
  displayValue?: any | VNode | ((value: V) => any);
  editable?: boolean | ((value: V, field?: FieldDefinition<V>) => boolean);
  /**
   * 枚举选项
   */
  enum?: any[] | ((value: V, field?: FieldDefinition<V>) => any[] | Promise<any[]>) | Promise<any[]>;
  events?: { [key: string]: (...args: any[]) => any };
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
  id?: string;
  layoutProps?: { [key: string]: unknown };
  layoutType?: string | { [key: string]: unknown };
  /**
   * 数值输入组件的最大值
   */
  max?: number;
  /**
   * 数值输入组件的最小值
   */
  min?: number;
  /**
   * 输入内容为空时的占位文字
   */
  placeholder?: string;
  /**
   * 自定数据转换器
   */
  processor?: ValueProcessor;
  /**
   * 表单属性名称
   */
  property?: string;

  /**
   * 字段是否为必填
   */
  required?: boolean;
  /**
   * 表单项校验规则（async-validator）
   */
  rules?: Rule;
  /**
   * 表单项渲染使用插槽，当指定插槽时，字段的类型无效
   * @deprecated
   */
  slot?: string;
  /**
   * 表单输入组件的插槽
   */
  slots?: Record<string, string | ((...args: any[]) => VNode[] | VNode)>;
  /**
   * 栅格布局下的栅格数
   */
  span?: number;
  /**
   * 提示信息
   */
  tip?: string | VNode;
  /**
   * 表单项名称
   */
  title?: string | VNode | ((value: V, field?: FieldDefinition<V>) => string | VNode);
  /**
   * 是否可见
   */
  visible?: boolean | ShowFieldCondition[] | ((value: V, field?: FieldDefinition<V>) => boolean);
  /**
   * 表单项的属性
   */
  wrapperProps?: { [key: string]: unknown };
  /**
   * 指定额外的组件类型
   */
  xType?: SchemaFormFieldType;
}

type GridLayoutType = number[] | Array<number | number[]> | Array<GridLayoutType>;

type ClassType = string | string[] | { [key: string]: boolean };


export interface StepsField<V = any> extends DefaultSchemaFormField<V> {
  /**
   * 每个步骤包含的组件数量
   */
  layout: number[];
  type: 'steps';
  props?: SchemaFormFieldProps;
  xProps: {
    /**
     * 步骤标题，和步骤数保持一致
     */
    titles: Array<string | VNode>;
    currentStep?: number;
  };
}

export interface GridField<V = any> extends DefaultSchemaFormField<V> {
  /**
   * 数字或数字数组，可以深层嵌套
   */
  layout: GridLayoutType;
  type: 'grid';
  props?: SchemaFormFieldProps;
  xProps?: {
    /**
     * 栅格之间的间隙
     */
    gutter?: number;
    /**
     * 是否对单个栅格使用行组件包裹，即每个栅格占用一行
     */
    wrapSingle?: boolean;
    /**
     * 行样式
     */
    rowStyle?: Partial<CSSStyleDeclaration> | ((rowIndex: number) => Partial<CSSStyleDeclaration>);
    /**
     * 行class
     */
    rowClass?: ClassType | ((rowIndex: number) => ClassType);
    /**
     * 栅格class
     */
    colClass?: ClassType | ((colIndex: number) => ClassType);
    /**
     * 栅格样式
     */
    colStyle?: Partial<CSSStyleDeclaration> | ((colIndex: number) => Partial<CSSStyleDeclaration>);
  };
}

export type FlatFieldType<V = any> = {
  [key in `$${string}`]: SchemaFormField<V>;
}

interface DefaultSchemaFormField<V = any> extends BaseSchemaFormField<V> {
  /**
   * 表单项类型
   */
  type?: SchemaFormFieldType;

  fields?: FormFields;
  /**
   * 布局描述，根据不同的布局有所不同
   */
  layout?: any;
  /**
   * 表单输入组件的自定义属性
   */
  props?: SchemaFormFieldProps;
  /**
   * 表单输入组件的自定义属性, 和props的作用完全一致（props会被当成其他对象的同名属性合并，造成代码提示错误），设置了xProps则props无效
   */
  xProps?: SchemaFormFieldProps;

}


export type SchemaFormField<V = any> = (StepsField<V> | GridField<V> | DefaultSchemaFormField<V>) & FlatFieldType<V>;


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
  style?: Partial<CSSStyleDeclaration>;
  /**
   * 单选或多选时选项列表中用于选项值的属性名称
   */
  valueProperty?: string;

  [key: string]: any;
}


export interface ShowFieldCondition {
  operator?: '=' | '>' | '<' | '>=' | '<=' | 'in' | 'nin' | '!=';
  property?: string;
  value?: any;
}

export interface SchemaFormStore {
  components?: ComponentStore;
  context?: EffectsContext | null;
  disabled?: boolean;
  editable?: boolean;
  effects?: Effects;
  transition: boolean;
  transitionName: string;
  fields?: { [key: string]: FieldDefinition };
  id?: number;
  loading?: boolean;
  platform?: Platform;
  props?: FormProps;
  readonly?: boolean;
  root?: any;
  value?: any;
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
