import {Platform} from '@/types/bean';
import {IField, ISubscribers} from '@/uform/types';

export type EffectsFunction = (
  ...path: string[]
) => EffectsHandlers;

export interface EffectsContext extends EffectsFunction {
  validate: (value: any) => any;
  submit: (forceValidate: boolean, callback: (value: any) => any) => any;
  subscribes: ISubscribers;
  trigger: (event: string, value: any) => void;
  getValue?: () => any;
  subscribe?: (event: string, paths: string | string[] | ((...margs: any) => any), handler?: (...margs: any) => any) => any;
}

export interface EffectsHandlers {
  fields: () => IField[];
  paths: () => string[];
  hide: () => EffectsHandlers;
  onFieldCreateOrChange: (cb: (value: any, path?: string) => any) => EffectsHandlers;
  onFieldChange: (cb: (value: any, path?: string) => any) => EffectsHandlers;
  onFieldCreate: (cb: (value: any, path?: string) => any) => EffectsHandlers;
  setEnum: (options: any) => EffectsHandlers;
  setFieldProps: (props: object) => EffectsHandlers;
  show: () => EffectsHandlers;
  subscribe: (event: string, handler: (...args: any) => any) => EffectsHandlers;
  toggle: () => EffectsHandlers;
  value: (value: any) => any;

  takePath(number: number): EffectsHandlers;

  replaceLastPath(path: string): EffectsHandlers;

  appendPath(path: string): EffectsHandlers;
}

export type Effects = (context: EffectsContext) => any;


export interface SchemaFormComponent {
  component: string | object;
  forArray: boolean | null;
  getProps: (field: IField) => object;
  layout: boolean;
  platform: Platform;
  type: string;
}


export interface IIcons {
  down: string;
  up: string;
  info: string;
}

export interface ILibComponents {
  icons: IIcons;
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
  layout: string;
  popover: string;
  row: string;
  sider: string;
}
