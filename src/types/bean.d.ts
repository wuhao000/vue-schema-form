import {IField, IRuleDescription, Rule} from '@/uform/types';
import {ValidateRules} from 'async-validator';
import {VNode} from 'vue';

export type Platform = 'desktop' | 'mobile';


export interface SchemaFormField {
  layoutType?: string | object;
  layoutProps?: object;
  arrayComponent?: any;
  arrayProps?: object;
  layout?: any;
  /**
   * 字段值是否数组类型
   */
  array?: boolean;
  /**
   * 枚举选项
   */
  enum?: any[];
  /**
   * 依赖显示的条件，支持条件选项或函数，当函数返回false时不显示该字段
   */
  depends?: ShowFieldCondition[] | ((value: any) => boolean);
  /**
   * 提示信息
   */
  notice?: string;
  /**
   * 当字段类型为object时，子表单的字段列表
   */
  fields?: FormFields;
  /**
   * 表单属性名称
   */
  property?: string;
  /**
   * 当表单模式为详情模式时显示的内容
   */
  displayValue?: string | VNode | ((value: any) => any);
  /**
   * 表单项校验规则（async-validator）
   */
  rules?: Rule;
  /**
   * 字段是否为必填
   */
  required?: boolean;
  /**
   * 数值输入组件的最小值
   */
  min?: number;
  /**
   * 数值输入组件的最大值
   */
  max?: number;
  /**
   * 输入内容为空时的占位文字
   */
  placeholder?: string;
  /**
   * 栅格布局下的栅格数
   */
  span?: number;
  /**
   * 表单输入组件的自定义属性
   */
  props?: SchemaFormFieldProps;
  /**
   * 表单项的属性
   */
  wrapperProps?: any;
  /**
   * 表单项渲染使用插槽，当指定插槽时，字段的类型无效
   */
  slot?: string;
  /**
   * 表单项名称
   */
  title?: string | VNode;
  /**
   * 表单项类型
   */
  type?: string;
  /**
   * 默认值
   */
  default?: any;
  /**
   * 指定额外的组件类型
   */
  xType?: string;
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
  getValue: (parentValue: object, field: IField) => any;
  setValue: (parentValue: object, field: IField, fieldValue: any) => any;
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
