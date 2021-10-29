import {PropType, VNode} from 'vue';
import {EffectsContext, SchemaFormField} from '../../types';

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

