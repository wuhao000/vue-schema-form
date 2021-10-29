import {Prop} from 'vue';

export const baseUrlProps: {
  disabled: Prop<boolean>;
  protocols: Prop<any[]>;
  value: Prop<string>;
};

export const useBaseUrl: (props, ctx) => {
  protocol: string;
  domain: string;
  options: any[];
  currentValue: string;
  current: any;
  size: string;
};
