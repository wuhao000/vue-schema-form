import {ValidateRules} from "async-validator";

export type Platform = 'desktop' | 'mobile';


export interface SchemaFormField {
  array?: boolean;
  depends?: ShowFieldCondition[] | ((value: any) => boolean);
  notice?: string;
  properties?: SchemaFormField[];
  property: string;
  required?: boolean;
  span?: number;
  props?: SchemaFormFieldProps;
  slot?: string;
  title?: string;
  type: string;
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

export interface FormDescriptor {
  array?: boolean;
  fields: SchemaFormField[];
  platform: Platform;
  props?: FormProps;
}

interface FormProps {
  labelWidth?: number | string;
  rules?: ValidateRules;

  [key: string]: any;
}

