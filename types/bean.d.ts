import {Component, VNode} from 'vue';
import {FieldDefinition} from '../src/schema-form/bean/field-definition';
import {ValidateRules} from './async-validator';
import {Effects, EffectsContext, SchemaFormComponent, SchemaFormComponentOptions} from './form';
import {DefaultPatternRule, Rule} from './uform';

export type Mode = 'edit' | 'display';

export type FieldDefinitionEnum =
  any[]
  | ((formValue: any, field: FieldDefinition) => any[] | Promise<any[]>)
  | Promise<any[]>


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

type BaseSchemaFormField<V> = {
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
  property?: (keyof V & string) | string;

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
   */
  slot?: string | (() => VNode);
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
} & FlatFieldType<V>;

type GridLayoutType = number[] | Array<number | number[]> | Array<GridLayoutType>;

type ClassType = string | string[] | { [key: string]: boolean };


export type StepsField<V = any> = {
  /**
   * 每个步骤包含的组件数量
   */
  layout?: number[];
  type?: 'steps';
  props?: SchemaFormFieldProps;
  xProps: {
    /**
     * 步骤标题，和步骤数保持一致
     */
    titles: Array<string | VNode>;
    currentStep?: number;
  };
} & DefaultSchemaFormField<V>;

export type GridField<V = any> = {
  /**
   * 数字或数字数组，可以深层嵌套
   */
  layout?: GridLayoutType;
  type?: 'grid';
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
} & DefaultSchemaFormField<V>;


type El<O extends E | E[], E = any> = O extends E[] ? O[0] : O;

type Prefix<Str extends string> = `$${Str}`;

export type FlatFieldType<V> = {
  [Key in keyof El<V> as Prefix<Key & string>]?: SchemaFormField<El<V>[Key]>;
}

type DefaultSchemaFormField<V = any> = {
  /**
   * 表单项类型
   */
  type?: SchemaFormFieldType;

  fields?: FormFields<V>;
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

  class?: string | string[] | { [key: string]: boolean };

} & BaseSchemaFormField<V>;


export type SchemaFormField<V = any> = StepsField<V> | GridField<V> | DefaultSchemaFormField<V>;


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

export type FormFields<V = Record<string, unknown>> = SchemaFormField<V>[] | { [Key in keyof V]: SchemaFormField<V[Key]> };

interface FormProps {
  labelWidth?: number | string;
  rules?: ValidateRules;

  [key: string]: any;
}
