import {Platform} from '@/types/bean';
import {IField, ISubscribers} from '@/uform/types';

export type EffectsFunction = (
    ...path: string[]
) => EffectsHandlers;

export interface EffectsContext extends EffectsFunction {
  getValue?: () => any;
  submit: (forceValidate: boolean, callback: (value: any) => any) => any;
  subscribe?: (event: string, paths: string | string[] | ((...margs: any) => any), handler?: (...margs: any) => any) => any;
  subscribes: ISubscribers;
  trigger: (event: string, value: any) => void;
  validate: (callback?: (errors, context: EffectsContext) => any) => any;
}

export interface EffectsHandlers {
  fields: () => IField[];
  hide: () => EffectsHandlers;
  onFieldBlur: (cb: (path: string) => any) => EffectsHandlers;
  onFieldChange: (cb: (value: any, path?: string) => any) => EffectsHandlers;
  onFieldCreate: (cb: (value: any, path?: string) => any) => EffectsHandlers;
  onFieldCreateOrChange: (cb: (value: any, path?: string) => any) => EffectsHandlers;
  onFieldFocus: (cb: (path?: string) => any) => EffectsHandlers;
  paths: () => string[];
  setEnum: (options: any) => EffectsHandlers;
  setFieldProps: (props: object) => EffectsHandlers;
  show: () => EffectsHandlers;
  subscribe: (event: string, handler: (...args: any) => any) => EffectsHandlers;
  toggle: () => EffectsHandlers;
  value: (value: any) => any;

  appendPath(path: string): EffectsHandlers;

  replaceLastPath(path: string): EffectsHandlers;

  takePath(number: number): EffectsHandlers;
}

export type Effects = (context: EffectsContext) => any;


export interface SchemaFormComponent {
  component: string | object;
  forArray: boolean | null;
  getDefaultValue?: (field: IField) => any;
  getProps: (field: IField) => object;
  layout: boolean;
  platform: Platform;
  type: string;
}


export interface IIcons {
  down: string;
  info: string;
  up: string;
}

export interface ILibComponents {
  alert: string;
  button: string;
  col: string;
  confirm: string;
  content: string;
  footer: string;
  form: string;
  formItem: string;
  header: string;
  icon: string;
  icons: IIcons;
  layout: string;
  popover: string;
  row: string;
  sider: string;
}

type BuiltInActions = 'submit' | 'cancel' | 'reset';

type Action = BuiltInActions | {
  name: BuiltInActions | string;
  text: string;
  props?: object;
  action?: () => {}
};

export type Actions = Action[];
