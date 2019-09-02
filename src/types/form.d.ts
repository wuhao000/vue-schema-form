import {Platform} from '@/types/bean';
import {IField} from '@/uform/types';

export type EffectsFunction = (
  path: string | string[]
) => EffectsHandlers;

export interface EffectsContext extends EffectsFunction {
  getValue?: () => any;
}

export interface EffectsHandlers {
  hide: () => any;
  fields: () => IField[];
  onFieldChange: (value: any) => any;
  setEnum: (options: any) => any;
  setFieldProps: (props: object) => void;
  show: () => any;
  subscribe: (event: string, handler: (...args: any) => any) => any;
}

export type Effects = (context: EffectsContext) => any;


export interface SchemaFormComponent {
  component: string | object;
  forArray: boolean | null;
  getProps: (field: IField) => object;
  layout: boolean;
  layoutOptions?: LayoutOptions;
  platform: Platform;
  type: string;
}


export interface LayoutOptions {
  /**
   * 布局内的表单项是否使用表单项容器包装
   */
  wrapItems: boolean | undefined;
  /**
   * 布局控件是否使用表单项容器包装
   */
  wrapContainer: boolean | undefined;
}
