import {Prop} from '@vue/runtime-core';

export const baseArrayComponentProps: BaseArrayComponentProps;

export type BaseArrayComponentProps = {
  maxLength: Prop<number>;
  showRemoveBtn: Prop<boolean>;
  showAddBtn: Prop<boolean>;
  disabled: Prop<boolean>;
  fields: Prop<any[]>;
  addBtnText: Prop<string>;
  addBtnProps: Prop<any>;
  deleteBtnProps: Prop<any>;
};
