import {PropType, VNode} from 'vue';
import {EffectsContext, SchemaFormField} from '../../types';
import { JSX } from 'vue/jsx-runtime';

export interface SchemaFormProps {
  prefixCls: string;
  disabled: boolean;
  readonly: boolean;
  loading: boolean;
  actions: any[];
  platform: string;
  editable: boolean;
  effects: ($: EffectsContext) => void;
  schema: SchemaFormField;
  props: any;
  value: { [key: string]: any } | any[];
  title: string | VNode;
  inline: boolean;
  sticky: boolean;
  components: any[];
}

export interface SelectOption {
  children?: Array<SelectOption>;
  label: string | VNode | JSX.Element;
  value: string | number;
  disabled?: boolean;
  selected?: boolean;

  [key: string]: unknown;
}

