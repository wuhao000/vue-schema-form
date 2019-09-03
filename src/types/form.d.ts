import {Platform} from '@/types/bean';
import {IField, ISubscribers} from '@/uform/types';

export type EffectsFunction = (
  path: string | string[]
) => EffectsHandlers;

export interface EffectsContext extends EffectsFunction {
  validate: (value: any) => any;
  submit: (forceValidate: boolean, callback: (value: any) => any) => any;
  subscribes: ISubscribers;
  getValue?: () => any;
  subscribe?: (event: string, paths: string | string[] | ((...margs: any) => any), handler?: (...margs: any) => any) => any;
}

export interface EffectsHandlers {
  fields: () => IField[];
  hide: () => any;
  onFieldChange: (value: any) => any;
  setEnum: (options: any) => any;
  setFieldProps: (props: object) => void;
  show: () => any;
  subscribe: (event: string, handler: (...args: any) => any) => any;
  toggle: () => any;

  takePath(number: number): EffectsHandlers;

  appendPath(path: string): EffectsHandlers;
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
   * 布局控件是否使用表单项容器包装
   */
  wrapContainer: boolean | undefined;
  /**
   * 布局内的表单项是否使用表单项容器包装
   */
  wrapItems: boolean | undefined;
}
