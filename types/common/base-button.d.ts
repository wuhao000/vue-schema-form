import {Prop} from 'vue';

export const baseButtonProps: {
  action: Prop<(...args: any[]) => any>;
  title: Prop<string>;
}

export const useBaseButton: (props) => {
  onClick: (...args: any[]) => any;
};
